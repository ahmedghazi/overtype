"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import CartItem from "./CartItem";
import { ProductData } from "@/app/types/extra-types";

type Props = {};

const CheckoutSuccess = () => {
  const items = JSON.parse(localStorage.getItem("products") || "[]");
  return (
    <div className='success'>
      <div className='header md:mb-2xl'>
        <h1 className='md:text-2xl'>Order recap</h1>
      </div>
      <div className='products flex flex-col gap-md'>
        {items?.map((item: ProductData, i: number) => (
          <CartItem key={i} input={item} />
        ))}
      </div>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
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
    <div className='post-checkout px-md'>
      <div className='c-container'>
        {status === "success" && <CheckoutSuccess />}
        {status === "canceled" && <CheckoutError />}
      </div>
    </div>
  );
};

export default PostCheckout;
