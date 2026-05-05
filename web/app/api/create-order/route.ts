import { NextResponse } from "next/server";
import { client } from "@/app/sanity-api/sanity-client";
import { findUserByEmail } from "../lib/sanity-user";
import { v4 as uuidv4 } from "uuid";
import { ProductData } from "@/app/types/extra-types";

interface CreateOrderPayload {
  products: ProductData[];
  licenseFor: string;
  licenseForData: {
    email: string;
    in_use_for?: string;
    company_name?: string;
  };
}

export async function POST(request: Request) {
  try {
    const { products, licenseFor, licenseForData } =
      (await request.json()) as CreateOrderPayload;

    const email = licenseForData?.email;
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Missing customer email" },
        { status: 400 },
      );
    }

    const user =
      (await findUserByEmail(email)) ??
      (await client.create({
        _type: "user",
        email,
        name: licenseForData.company_name || email.split("@")[0],
        orders: [],
      }));

    const totalAmount = products.reduce((sum, p) => sum + p.finalPrice, 0);

    const orderItems = await Promise.all(
      products.map((item) =>
        client.create({
          _type: "orderItem",
          ...item,
          isLogo: item.isLogo === "Yes" ? true : false,
        }),
      ),
    );

    const order = await client.create({
      _type: "order",
      title: `Draft order — ${email}`,
      creationDate: new Date().toISOString(),
      status: "pending",
      totalAmount,
      user: { _type: "reference", _ref: user._id },
      items: orderItems.map((item) => ({
        _type: "reference",
        _ref: item._id,
        _key: uuidv4(),
      })),
      licenseFor,
      licenseForData: JSON.stringify(licenseForData, null, 2),
    });

    await client
      .patch(user._id)
      .setIfMissing({ orders: [] })
      .append("orders", [
        { _type: "reference", _ref: order._id, _key: uuidv4() },
      ])
      .commit();

    return NextResponse.json({ success: true, orderId: order._id });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 },
    );
  }
}
