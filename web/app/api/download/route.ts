import { NextResponse } from "next/server";
import { client } from "@/app/sanity-api/sanity-client";
import {
  collectProductsOrderData,
  collectProductsOrderZips,
} from "../lib/products";
import { buildZipStream } from "../lib/zip-archive";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    console.log(body);
    const { transactionId } = body;
    if (!transactionId) {
      return NextResponse.json(
        { error: "Missing transactionId" },
        { status: 400 },
      );
    }

    const order = await client.fetch(
      `*[_type == "order" && invoiceNumber == $transactionId][0]{
        items[]->{
          ...,
          downloadLink
        }
      }`,
      { transactionId },
    );
    console.log(order);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const productOrderData = collectProductsOrderData(order.items);
    const productZips = await collectProductsOrderZips(productOrderData);
    console.log(productZips);
    const zips = productZips
      .filter((z) => z.zip?.asset?.url)
      .map((z) => ({
        link: z.zip!.asset.url as string,
        label: `${z.zipTitle.replace(/ /g, "-").toLowerCase()}.zip`,
      }));

    if (!zips.length) {
      return NextResponse.json({ error: "No files found" }, { status: 404 });
    }

    const stream = await buildZipStream(zips);

    return new Response(stream as any, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="overtype-fonts.zip"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
