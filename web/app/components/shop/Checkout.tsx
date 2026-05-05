"use client";
import React, { useContext, useEffect } from "react";
import { PaddleContext } from "./Paddle/PaddleProvider";
import useShop from "./ShopContext";
import website from "@/app/config/website";
import { ProductData } from "@/app/types/extra-types";
import clsx from "clsx";

type Props = {
  canCheckout: boolean;
};

const BtnCheckout = ({ canCheckout }: Props) => {
  const paddle = useContext(PaddleContext);
  const { products, licenseFor, licenseForData } = useShop();
  // console.log(products);
  // define customer details
  const customerInfo = {
    email: licenseForData.email || "",
    // address: {
    //   countryCode: "FR",
    //   postalCode: "75018",
    // },
  };

  const storeProducts = async (products: ProductData[], ttl: number) => {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: products,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem("products", JSON.stringify(item));

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products, licenseFor, licenseForData }),
      });
      const data = await res.json();
      console.log("Draft Order created:", data);
      return data.orderId as string | undefined;
    } catch (err) {
      console.error("Failed to create order record:", err);
    }
  };

  const handleCheckout = async () => {
    if (!paddle) return alert("Paddle not initialized");

    console.log("BtnCheckout clicked");

    // Prevent checkout when cart is empty
    if (!products || products.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    //store products (with custom data) locale storage
    const orderId = await storeProducts(products, 300);
    console.log("Order ID:", orderId);
    // then on order completed, get thoses produicts and post to sanity
    const items = products.map((product) => ({
      quantity: 1,
      price: {
        // name: `${product.fullTitle}`,
        name: `${product.fullTitle} license: ${product.license}, Use in logo/wordmark: ${product.isLogo}`,

        description: product.sku,
        quantity: {
          minimum: 1,
          maximum: 1,
        },
        unitPrice: {
          amount: String(product.finalPrice * 100), // in cents
          currencyCode: "EUR",
        },
        product: {
          // name: product.fullTitle,
          name: `${product.fullTitle}`,

          description: product.sku || "sku",
          taxCategory: "standard",
        },
        // use camelCase per Paddle SDK expectations
        customData: {
          type: product.productType,
          isLogo: product.isLogo,
          license: product.license,
          sku: product.sku,
          licenseFor,
          licenseForData,
        },
      },
    }));
    // console.log(items);
    // return;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
        // use camelCase per Paddle SDK expectations
        customData: {
          order_id: orderId,
          license_for: licenseFor,
          license_for_data: licenseForData,
        },
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
        successUrl: `${website.url}/post-checkout?status=success&orderID=${orderId ?? ""}`,
        variant: "multi-page",
      },
    });
  };
  return (
    <div className='flex justify-center'>
      <button
        className={clsx("ui-btn ui-btn__accent", !canCheckout && "disabled")}
        onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default BtnCheckout;
