import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { environment } from "@/env.mjs";
import { client } from "@/app/sanity-api/sanity-client";
import { v4 as uuidv4 } from "uuid";
import {
  Order,
  OrderItem,
  Product,
  ProductBundle,
  ProductSingle,
  User,
} from "@/app/types/schema";
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

    const user = await _storeUser(customer);
    const userId = user._id;

    //error handle if no user
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 500 }
      );
    }

    const order = await _storeOrder(userId, paddleData, products);
    const orderId = order._id;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 500 }
      );
    }

    // Add order to user's orders array
    console.log("userId", userId);
    console.log("orderId", orderId);

    await client
      .patch(userId)
      .setIfMissing({ orders: [] })
      .append("orders", [
        {
          _type: "reference",
          _ref: orderId,
          _key: uuidv4(), // ✅ clé explicite
        },
      ])
      .commit();

    const _productOrderData = _collectProductsOrderData(products);

    const _productOrderDataZips = await _collectProductsOrderZips(
      _productOrderData
    );
    // return NextResponse.json({ success: true, _productOrderDataZips });
    if (!_productOrderDataZips) {
      return NextResponse.json(
        { success: false, error: "Product order data not found" },
        { status: 500 }
      );
    }
    // return NextResponse.json({ success: true, _productOrderDataZips });

    const _attachments = _generateAttachments(_productOrderDataZips);
    if (!_attachments) {
      return NextResponse.json(
        { success: false, error: "Attachments not found" },
        { status: 500 }
      );
    }
    // return NextResponse.json({ success: true, _attachments });

    // Send email to user
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
      _attachments
    );

    // // Send email to admin
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
      "€"
    );

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process order" },
      { status: 500 }
    );
  }
}

async function _storeUser(data: any): Promise<User> {
  try {
    const existingUser = await client.fetch(
      `
      *[_type == "user" && email == $email]
    `,
      {
        email: data.email,
      }
    );

    // Get the user ID
    const user =
      existingUser.length > 0
        ? existingUser[0]
        : await client.create({
            _type: "user",
            email: data.email,
            name: data.business?.name || data.email.split("@")[0],
            orders: [],
          });

    return user;
  } catch (error) {
    console.error("Error storing user:", error);
    throw new Error("Failed to store user data");
  }
}

async function _storeOrder(
  userId: string,
  paddleData: PaddleWebhookData,
  products: ProductData[]
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
        });
        return res;
      })
    );

    const order: any = await client.create({
      _type: "order",
      title: `Order #${transactionId}`,
      invoiceNumber: transactionId,
      // creationDate: new Date().toISOString(),
      creationDate: new Date(),
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
    throw new Error("Failed to store order data");
  }
}

const _collectProductsOrderData = (
  items: ProductData[]
): ProductOrderData[] => {
  return items.map((item: ProductData) => {
    return {
      productId: item.productId,
      type: item.productType,
      bundleOrSingleRef: item.productTypeRef,
    };
  });
};

type ProductOrderData = {
  productId: string;
  type: "ProductBundle" | "ProductSingle";
  bundleOrSingleRef: string;
};
const _collectProductsOrderZips = async (items: ProductOrderData[]) => {
  const result = [];
  for await (const item of items) {
    const data = await _getProductData(item.productId);
    // console.log(data);
    const bundleOrsingle = _getBundleOrSingle(
      item.type,
      item.bundleOrSingleRef,
      data
    );
    console.log(bundleOrsingle);
    // result.push(bundleOrsingle);
    const title = `${data.title} ${bundleOrsingle?.title}`;
    const sanitizedData = {
      zipTitle: title,
      zip: bundleOrsingle?.zip,
    };
    console.log(sanitizedData);
    result.push(sanitizedData);
  }
  return result;
};

const _getProductData = async (productId: string) => {
  const query = `*[_type == "product" && _id == $productId][0]{
    title,
    singles[]{
      _key,
      title,
      zip{
        asset->{
          url
        }
      },

    },
    bundles[]{
      _key,
      title,
      zip{
        asset->{
          url
        }
      },
    }
  }`;
  const res = await client.fetch(query, { productId: productId });
  return res;
};

/**
 *
 * @param type Bundle or Single
 * @param bundleOrSingleRef Bundle or Single key
 * @param productData Product
 * @returns
 */
const _getBundleOrSingle = (
  type: string,
  bundleOrSingleRef: string,
  productData: Product
): ProductBundle | ProductSingle | null => {
  const bundleOrSingle =
    type === "ProductBundle" ? productData.bundles : productData.singles;
  const filtered = bundleOrSingle?.filter(
    (el) => el._key === bundleOrSingleRef
  );
  return filtered ? filtered[0] : null;
};

type AttachementProps = {
  filename: string;
  path: string;
};
const _generateAttachments = (items: any): AttachementProps[] => {
  const result: any[] = [];
  items.forEach((item: any) => {
    result.push({
      filename: _sanitizeTitle(`${item.zipTitle}.zip`),
      path: item.zip.asset.url,
    });
  });
  return result;
};

const _sanitizeTitle = (str: string) =>
  str.replace(/ /g, "-").toLocaleLowerCase();

async function sendEmail(
  to: string,
  name: string,
  order: any,
  type: "user" | "admin",
  currencyCode: string,
  payload?: any
) {
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: environment.email.user as string,
  //     pass: environment.email.pass as string,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
      user: environment.email.user as string,
      pass: environment.email.pass as string,
    },
  });

  let mailOptions = {
    from: environment.email.from as string,
    to: to,
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
        <h3 style="margin-top:0">${el.fullTitle}</h3>
        <div>Use in logo/wordmark: ${el.isLogo}</div>
        <div>Size licenses: ${el.license} ${el.licenseInfos}</div>
      </div>`;
      items += _html;
    }
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; font-weight: 400; text-align:center">Your Order from Overtype</h1>
      <p style="color: #666;">Hi ${name},</p>
      <p style="color: #666;">Thank you for your order!</p>
      <p style="color: #666;">We hope you enjoy using your new fonts. Don't hesitate to share your work with us — we'd love to see what you create!</p>

      <h2 style="color: #333;font-weight: 400; margin-top: 20px;">Order Details</h2>
      ${items}

      <div style="font-size: 1.5em">
        <p>Invoice Number: ${order.invoiceNumber}<br/>
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
          <img src="https://cdn.sanity.io/images/ltdaocfm/production/138b70d9ac439acac934564a107380d9bfb80b68-119x80.svg" width="119" height="80" alt="logo overtype" />

        </div>

      </div>
    </div>
  `;
}
