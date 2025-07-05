"use client";
import React, { useContext, useEffect } from "react";
import { PaddleContext } from "./Paddle/PaddleProvider";

type Props = {};

const AddToCart = (props: Props) => {
  // const [paddle, setPaddle] = useState<Paddle>();
  const paddle = useContext(PaddleContext);
  useEffect(() => {}, []);

  // define customer details
  const customerInfo = {
    email: "sam@example.com",
    address: {
      countryCode: "US",
      postalCode: "10021",
    },
  };

  const handleAddToCart = async () => {
    if (!paddle) return alert("Paddle not initialized");

    console.log("Add to cart clicked");

    const response = await fetch("/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            quantity: 1,
            price: {
              name: "Test Product price",
              description: "Test Product price Description",
              quantity: {
                minimum: 1,
                maximum: 1,
              },
              unitPrice: {
                currencyCode: "EUR",
                amount: "190000",
              },
              product: {
                name: "Test Product",
                description: "Test Product Description",
                taxCategory: "standard",
              },
              customData: {
                licenseFor: "the client",
              },
            },
          },
        ],
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
    <div className='add-to-cart'>
      <button className='outline p-1 px-3 ' onClick={handleAddToCart}>
        Tu à gagné
      </button>
    </div>
  );
};

export default AddToCart;
