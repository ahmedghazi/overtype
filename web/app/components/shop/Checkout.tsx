"use client";
import React, { useContext, useEffect } from "react";
import { PaddleContext } from "./Paddle/PaddleProvider";
import useShop from "./ShopContext";

type Props = {};

const BtnCheckout = (props: Props) => {
  // const [paddle, setPaddle] = useState<Paddle>();
  const paddle = useContext(PaddleContext);
  const { products } = useShop();
  useEffect(() => {}, []);

  // define customer details
  const customerInfo = {
    email: "hello@ahmedghazi.com",
    address: {
      countryCode: "US",
      postalCode: "10021",
    },
  };

  const handleCheckout = async () => {
    if (!paddle) return alert("Paddle not initialized");

    console.log("BtnCheckout clicked");

    console.log(products);
    const items = products.map((product) => ({
      quantity: 1,
      price: {
        name: `${product.typefaceName} ${product.title} ${product.license}`,
        description: product.description || "desc",
        quantity: {
          minimum: 1,
          maximum: 1,
        },
        unitPrice: {
          currencyCode: "EUR",
          amount: String(product.finalPrice * 100),
        },
        product: {
          name: product.title,
          description: product.description || "desc",
          taxCategory: "standard",
        },
        customData: {
          type: product.type,
          isLogo: product.isLogo,
          license: product.license,
          sku: product.sku,
          licenseFor: "the client",
        },
      },
    }));
    const response = await fetch("/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
      }),
    });
    const data = await response.json();
    console.log("Response from server:", data.tsx);
    paddle?.Checkout.open({
      allowQuantity: false,
      transactionId: data.tsx,
      customer: customerInfo,
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: "http://localhost:3000/success",
        variant: "multi-page",
      },
    });
  };
  return (
    <div className='flex justify-center'>
      <button className='ui-btn ui-btn__accent ' onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default BtnCheckout;
