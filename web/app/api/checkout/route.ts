import { NextRequest, NextResponse } from "next/server";
import { Environment, Paddle } from "@paddle/paddle-node-sdk";

/*
  interface INonCatalogBasePriceRequestBody {
      name?: string | null;
      description: string;
      unitPrice: IMoney;
      billingCycle?: ITimePeriod | null;
      trialPeriod?: ITimePeriod | null;
      taxMode?: TaxMode;
      unitPriceOverrides?: IUnitPriceOverride[];
      quantity?: IPriceQuantity;
      customData?: ICustomData | null;
  }
  */

const paddle = new Paddle(process.env.PADDLE_SECRET_KEY!, {
  environment: Environment.sandbox,
});

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    // res.status(405).json({ message: "INVALID_METHOD" });
    // return;
    return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
  // console.log(req.body);
  const body = await req.json(); // res now contains body
  const { items, custom_data } = body;
  // console.log(items);

  //export type TaxCategory = 'digital-goods' | 'ebooks' | 'implementation-services' | 'professional-services' | 'saas' | 'software-programming-services' | 'standard' | 'training-services' | 'website-hosting';

  try {
    const tsx = await paddle.transactions.create({
      currencyCode: "EUR",
      items: items,
      customData: custom_data,
    });
    // console.log(tsx);
    return NextResponse.json({ tsx: tsx.id });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ items, error });
  }
}
