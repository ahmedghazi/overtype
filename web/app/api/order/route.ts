import { NextResponse } from "next/server";
import { client } from "@/app/sanity-api/sanity-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { success: false, error: "Missing orderId" },
      { status: 400 },
    );
  }

  const order = await client.fetch(
    `*[_type == "order" && _id == $orderId][0]{
      _id,
      title,
      creationDate,
      status,
      totalAmount,
      invoiceNumber,
      licenseFor,
      licenseForData,
      user->{
        _id,
        name,
        email
      },
      items[]->{
        ...,
        downloadLink
      }
    }`,
    { orderId },
  );

  if (!order) {
    return NextResponse.json(
      { success: false, error: "Order not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, order });
}
