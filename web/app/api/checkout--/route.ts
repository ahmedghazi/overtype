import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product, licenseFor, licenseForData, customerEmail } = body;

    if (!product || !customerEmail) {
      return NextResponse.json(
        { error: "Missing product or customerEmail" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.paddle.com/checkout-sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: {
          email: customerEmail,
        },
        items: [
          {
            price: {
              name: `${product.typefaceName} ${product.title} ${product.license}`,
              description: product.description || "Font license",
              quantity: {
                minimum: 1,
                maximum: 1,
              },
              unitPrice: {
                amount: String(product.finalPrice * 100), // in cents
                currencyCode: "EUR",
              },
              product: {
                name: product.title,
                description: product.sku || "sku",
                taxCategory: "standard",
              },
              custom_data: {
                type: product.type,
                isLogo: product.isLogo,
                license: product.license,
                sku: product.sku,
                licenseFor,
                licenseForData,
              },
            },
          },
        ],
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout-success`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Paddle error:", errorData);
      return NextResponse.json(
        { error: "Paddle error", details: errorData },
        { status: 500 }
      );
    }

    const checkout = await response.json();

    return NextResponse.json({
      url: checkout.url,
      checkoutId: checkout.id,
    });
  } catch (error) {
    console.error("Error creating checkout:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
