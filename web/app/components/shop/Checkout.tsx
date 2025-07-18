"use client";
import React, { useContext, useEffect } from "react";
import { PaddleContext } from "./Paddle/PaddleProvider";
import useShop from "./ShopContext";
import website from "@/app/config/website";

type Props = {};

const BtnCheckout = (props: Props) => {
  // const [paddle, setPaddle] = useState<Paddle>();
  const paddle = useContext(PaddleContext);
  const { products, licenseFor, licenseForData } = useShop();
  // console.log(products, licenseFor, licenseForData);
  // define customer details
  const customerInfo = {
    email: "hello@ahmedghazi.com",
    address: {
      countryCode: "FR",
      postalCode: "75018",
    },
  };

  const handleCheckout = async () => {
    if (!paddle) return alert("Paddle not initialized");

    console.log("BtnCheckout clicked");

    //store products (with custom data) locale storage
    localStorage.setItem("products", JSON.stringify(products));
    // then on order completed, get thoses produicts and post to sanity
    const items = products.map((product) => ({
      quantity: 1,
      price: {
        name: `${product.fullTitle} ${product.license}`,
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
          name: product.fullTitle,
          description: product.sku || "sku",
          taxCategory: "standard",
        },
        custom_data: {
          type: product.productType,
          isLogo: product.isLogo,
          license: product.license,
          sku: product.sku,
          licenseFor,
          licenseForData,
        },
      },
    }));
    console.log(items);

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
        custom_data: {
          licenseFor: licenseFor,
          licenseForData: licenseForData,
        },
      }),
    });
    const data = await response.json();
    console.log("Response from server:", data.tsx);
    paddle?.Checkout.open({
      allowQuantity: false,
      transactionId: data.tsx,
      // customer: customerInfo,
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: `${website.url}/post-checkout?status=success`,
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
