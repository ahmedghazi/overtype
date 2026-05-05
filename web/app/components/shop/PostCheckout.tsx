"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { ProductData } from "@/app/types/extra-types";

type Props = {};

const CheckoutSuccess = () => {
  // const raw = localStorage.getItem("products");
  // const storedProducts = raw ? JSON.parse(raw) : [];
  // const items = storedProducts?.value;
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const orderID = searchParams.get("orderID");
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!orderID) return;
    fetch(`/api/order?orderId=${orderID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrder(data.order);
      });
  }, [orderID]);

  const _handleDownload = async () => {
    const response = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID }),
    });

    if (!response.ok) return;

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "overtype-fonts.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='success'>
      <div className='header mb-2xl'>
        <h1 className='md:text-2xl'>Thank you for your purchase!</h1>
        <p>Order ID: {orderID}</p>
        <p className='md:text-xl'>
          Your download link is on its way to your inbox.
        </p>
        {
          <button className='ui-btn ui-btn__accent' onClick={_handleDownload}>
            Download
          </button>
        }
        <p>
          Enjoy your new typeface! <br />
          We can't wait to see what you create with it.
        </p>
      </div>
      <div className='products flex flex-col gap-2xs'>
        {order?.items?.map((item: ProductData, i: number) => (
          <CartItem key={i} input={item} isPostCheckout={true} />
        ))}
      </div>
    </div>
  );
};

const CheckoutError = () => {
  return <div className='error'>Error</div>;
};

const PostCheckout = (props: Props) => {
  const search = useSearchParams();
  const status = search.get("status");

  return (
    <div className='post-checkout px-xs md:px-md'>
      <div className='h-2xl md:h-[142px]'></div>

      <div className='c-container'>
        {status === "success" && <CheckoutSuccess />}
        {status === "canceled" && <CheckoutError />}
      </div>
    </div>
  );
};

export default PostCheckout;
