import { NextResponse } from "next/server";
import { environment } from "@/env.mjs";
import { client } from "@/app/sanity-api/sanity-client";
import { createTransporter } from "../lib/mailer";
import { findUserByEmail } from "../lib/sanity-user";
import {
  collectProductsOrderData,
  collectProductsOrderZips,
  generateAttachments,
} from "../lib/products";
import { v4 as uuidv4 } from "uuid";
import { Order, User } from "@/app/types/schema";
import { ProductData } from "@/app/types/extra-types";

interface PaddleWebhookData {
  id: string;
  transaction_id: string;
  status: string;
  currency_code: string;
  custom_data: {
    license_for: string;
    license_for_data: {
      email: string;
      in_use_for: string;
      company_name: string;
    };
  };
  customer: {
    id: string;
    email: string;
    address: {
      country_code: string;
      postal_code: string;
      city: string;
      region: string;
      first_line: string;
    };
    business?: {
      name?: string;
      tax_identifier?: string;
    };
  };
  items: Array<{
    price_id: string;
    product: {
      id: string;
      name: string;
      description: string;
    };
    totals: {
      total: number;
    };
    billing_cycle: any;
  }>;
}

const formatedTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

export async function POST(request: Request) {
  try {
    const { paddleData, products } = (await request.json()) as {
      paddleData: PaddleWebhookData;
      products: ProductData[];
    };
    // return NextResponse.json({ success: true, paddleData, products });

    const { customer, items, id: transactionId } = paddleData;

    const totalAmount = products.reduce((sum: number, item) => {
      return sum + item.finalPrice;
    }, 0);

    // Prepare attachments before any Sanity writes so email goes out first
    const _productOrderData = collectProductsOrderData(products);
    const _productOrderDataZips =
      await collectProductsOrderZips(_productOrderData);
    if (!_productOrderDataZips) {
      await notifyAdminError("Product order data not found", {
        transactionId,
        customerEmail: customer.email,
      });
      return NextResponse.json(
        { success: false, error: "Product order data not found" },
        { status: 500 },
      );
    }

    const _attachments = generateAttachments(_productOrderDataZips);
    if (!_attachments) {
      await notifyAdminError("Attachments not found", {
        transactionId,
        customerEmail: customer.email,
      });
      return NextResponse.json(
        { success: false, error: "Attachments not found" },
        { status: 500 },
      );
    }

    // Send emails first — before any Sanity writes that could delay or fail
    await sendEmail(
      customer.email,
      customer.business?.name || customer.email.split("@")[0],
      {
        invoiceNumber: transactionId,
        items: products,
        totalAmount,
        currencyCode: "€",
      },
      "user",
      "€",
      _attachments,
    );

    await sendEmail(
      environment.email.from as string,
      "Admin",
      {
        invoiceNumber: transactionId,
        items,
        totalAmount,
        currencyCode: "€",
        customer: {
          email: customer.email,
          name: customer.business?.name || customer.email.split("@")[0],
          address: customer.address,
        },
      },
      "admin",
      "€",
    );

    // Store user and order in Sanity after email is confirmed sent
    const user = await _storeUser(customer);
    const userId = user._id;

    if (!userId) {
      await notifyAdminError("User not found after store", {
        transactionId,
        customerEmail: customer.email,
      });
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 500 },
      );
    }

    const order = await _storeOrder(userId, paddleData, products);
    const orderId = order._id;

    if (!orderId) {
      await notifyAdminError("Order not found after store", {
        transactionId,
        customerEmail: customer.email,
        userId,
      });
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 500 },
      );
    }

    console.log("userId", userId);
    console.log("orderId", orderId);

    await client
      .patch(userId)
      .setIfMissing({ orders: [] })
      .append("orders", [
        {
          _type: "reference",
          _ref: orderId,
          _key: uuidv4(),
        },
      ])
      .commit();

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Error processing order:", error);
    try {
      const body = await request
        .clone()
        .json()
        .catch(() => ({}));
      await notifyAdminError("Unhandled exception in order-completed", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        body,
      });
    } catch (_) {}
    return NextResponse.json(
      { success: false, error: "Failed to process order" },
      { status: 500 },
    );
  }
}

async function notifyAdminError(subject: string, context: Record<string, any>) {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: environment.email.from as string,
      to: environment.email.from as string,
      subject: `[Overtype Error] ${subject}`,
      html: `
        <div style="font-family: monospace; max-width: 700px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #c00;">Order Processing Error</h2>
          <p><strong>${subject}</strong></p>
          <pre style="background:#f4f4f4; padding:15px; border-radius:5px; overflow:auto;">${JSON.stringify(context, null, 2)}</pre>
          <p style="color:#999; font-size:12px;">${new Date().toISOString()}</p>
        </div>
      `,
    });
  } catch (emailError) {
    console.error("Failed to send admin error notification:", emailError);
  }
}

async function _storeUser(data: any): Promise<User> {
  try {
    const user =
      (await findUserByEmail(data.email)) ??
      (await client.create({
        _type: "user",
        email: data.email,
        name: data.business?.name || data.email.split("@")[0],
        orders: [],
      }));

    return user;
  } catch (error) {
    console.error("Error storing user:", error);
    throw new Error("Failed to store user data");
  }
}

async function _storeOrder(
  userId: string,
  paddleData: PaddleWebhookData,
  products: ProductData[],
): Promise<Order> {
  try {
    const { id: transactionId, status, items, custom_data } = paddleData;

    const totalAmount = products.reduce((sum: number, item) => {
      return sum + item.finalPrice;
    }, 0);

    // Create order items documents in Sanity
    const orderItems = await Promise.all(
      products.map(async (item) => {
        const res = await client.create({
          _type: "orderItem",
          ...item,
          isLogo: item.isLogo === "Yes" ? true : false,
        });
        return res;
      }),
    );
    console.log("license_for:", custom_data.license_for);
    console.log("license_for_data:", custom_data.license_for_data);
    const order: any = await client.create({
      _type: "order",
      title: `Order #${transactionId}`,
      invoiceNumber: transactionId,
      creationDate: formatedTimestamp(),
      user: {
        _type: "reference",
        _ref: userId,
      },
      items: orderItems.map((item) => ({
        _type: "reference",
        _ref: item._id,
        _key: uuidv4(),
      })),
      json: JSON.stringify(items),
      totalAmount,
      status,
      transactionId,
      licenseFor: custom_data?.license_for,
      licenseForData: JSON.stringify(custom_data?.license_for_data, null, 2),
    });

    // const orderId = await client.create(orderData);
    return order;
  } catch (error) {
    console.error("Error storing order:", error);
    //later send error email to admin
    throw new Error("Failed to store order data");
  }
}

async function sendEmail(
  to: string,
  name: string,
  order: any,
  type: "user" | "admin",
  currencyCode: string,
  payload?: any,
) {
  const transporter = createTransporter();

  const mailOptions = {
    from: environment.email.from as string,
    to: to,
    cci: "contact@overtypefoundry.com, hello@ahmedghazi.com",
    subject:
      type === "user" ? "Your Order Confirmation" : "New Client Order Received",
    html:
      type === "user"
        ? generateUserEmailHtml(name, order, currencyCode)
        : generateAdminEmailHtml(order, currencyCode),
    attachments: type === "user" ? payload : null,
  };

  await transporter.sendMail(mailOptions);
}

// function generateUserEmailHtml(
//   name: string,
//   order: any,
//   currencyCode: string
// ) {
//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//       <h1 style="color: #333;">Your Order from Overtype</h1>
//       <p style="color: #666;">Hi ${name},</p>
//       <p style="color: #666;">Thank you for your order!</p>
//       <p style="color: #666;">We hope you enjoy using your new fonts. Don't hesitate to share your work with us-we'd love to see what you create!</p>

//       <h2 style="color: #333; margin-top: 20px;">Order Details</h2>
//       <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
//         <p><strong>Invoice Number:</strong> ${order.invoiceNumber}</p>
//         <p><strong>Total Amount:</strong> ${
//           order.totalAmount
//         } ${currencyCode}</p>
//       </div>

//       <div style="margin-top: 20px;">
//         <p style="color: #666;">If you have any questions, please don't hesitate to contact us.</p>
//       </div>

//       <div style="margin-top: 30px; text-align: center; color: #888;">
//         <p>Best regards,</p>
//         <p>Overtype Team</p>
//       </div>
//     </div>
//   `;
// }

function generateAdminEmailHtml(order: any, currencyCode: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">New Order Received</h1>
      <p style="color: #666;">Dear Team,</p>
      <p style="color: #666;">You have received a new order from Overtype.</p>

      <h2 style="color: #333; margin-top: 20px;">Order Details</h2>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
        <p><strong>Invoice Number:</strong> ${order.invoiceNumber}</p>
        <p><strong>Total Amount:</strong> ${order.totalAmount} ${currencyCode}</p>
      </div>

      <div style="margin-top: 20px;">
        <p style="color: #666;">Please process this order as soon as possible.</p>
      </div>

      <div style="margin-top: 30px; text-align: center; color: #888;">
        <p>Best regards,</p>
        <p>Overtype Team</p>
      </div>
    </div>
  `;
}

function generateUserEmailHtml(name: string, order: any, currencyCode: string) {
  let items = "";
  order.items.forEach((el: any) => {
    if (el && el.fullTitle) {
      const _html = `<div style="background: #ededed; padding: 15px; border-radius: 5px; margin-bottom:10px">
        <h3 style="margin-top:0;color: #666;">${el.fullTitle}</h3>
        <div style="color: #666;">Use in logo/wordmark: ${el.isLogo}</div>
        <div style="color: #666;">Size licenses: ${el.license} ${el.licenseInfos}</div>
      </div>`;
      items += _html;
    }
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; font-weight: 400; text-align:center">Your Order from Overtype</h1>
      <p style="color: #666;">Hi,</p>
      <p style="color: #666;">Thank you for your order!</p>
      <p style="color: #666;">We hope you enjoy using your new fonts. Don't hesitate to share your work with us — we'd love to see what you create!</p>

      <h2 style="color: #333;font-weight: 400; margin-top: 20px;">Order Details</h2>
      ${items}

      <div style="font-size: 1.5em">
        <p>Order Number: ${order.invoiceNumber}<br/>
       Total Amount: ${order.totalAmount}${currencyCode}</p>
      </div>

      <div style="margin-top: 20px;">
        <p style="color: #999;">If you encounter any issues with the files or have questions about the licenses, feel free to <a href="mailto:contact@overtypefoundry.com">contact us</a>.</p>
        <p style="color: #999;">You'll receive your invoice from Paddle by email.</p>
      </div>

      <div style="margin-top: 30px;  color: #333;">
        <p>All the best,<br />
        Overtype</p>
      </div>
      <div>
        <div style="margin:0 auto; width:119px">
          <img src="https://cdn.sanity.io/images/ltdaocfm/production/bbaeb32bbba9a7a83dd9e98c55aa849d694959d0-120x80.png" width="119" height="80" alt="logo overtype" />

        </div>

      </div>
    </div>
  `;
}
