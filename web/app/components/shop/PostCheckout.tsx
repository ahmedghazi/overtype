"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import CartItem from "./CartItem";
import { ProductData } from "@/app/types/extra-types";
import Logo from "../Logo";

type Props = {};

const CheckoutSuccess = () => {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const items = products.value;
  return (
    <div className='success'>
      <div className='header mb-2xl'>
        {/* <Logo /> */}
        <h1 className='md:text-2xl'>Thank you for your purchase!</h1>
        {/* <p className='md:text-xl'>
          Your download link is on its way to your inbox.
        </p>
        <p>
          Have fun with your new typeface, <br />
          we can’t wait to see what you do with it.
        </p> */}

        <p className='md:text-xl'>
          Your download link is on its way to your inbox.
        </p>
        <p>
          Enjoy your new typeface! <br />
          We can't wait to see what you create with it.
        </p>
      </div>
      <div className='products flex flex-col gap-2xs'>
        {items?.map((item: ProductData, i: number) => (
          <CartItem key={i} input={item} />
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
