import { NextRequest, NextResponse } from "next/server";
import { Environment, Paddle } from "@paddle/paddle-node-sdk";

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
  const { items } = body;
  console.log(items);

  //export type TaxCategory = 'digital-goods' | 'ebooks' | 'implementation-services' | 'professional-services' | 'saas' | 'software-programming-services' | 'standard' | 'training-services' | 'website-hosting';
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
  try {
    const tsx = await paddle.transactions.create({
      currencyCode: "EUR",
      items: items,
      // items: [
      //   {
      //     quantity: 1,
      //     price: {
      //       name: "Test Product price",
      //       description: "Test Product price Description",
      //       quantity: {
      //         minimum: 1,
      //         maximum: 1,
      //       },
      //       unitPrice: {
      //         currencyCode: "EUR",
      //         amount: "190000",
      //       },
      //       product: {
      //         name: "Test Product",
      //         description: "Test Product Description",
      //         taxCategory: "standard",
      //       },
      //       customData: {
      //         licenseFor: "the client",
      //       },
      //     },
      //   },
      // ],
    });
    // console.log(tsx);
    return NextResponse.json({ tsx: tsx.id });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ items, error });
  }
}
