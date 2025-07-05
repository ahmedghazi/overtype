import React from "react";
import { Home } from "../types/schema";
import AddToCart from "./shop/AddToCart";

type Props = {
  input: Home;
};

const ContentHome = ({ input }: Props) => {
  return (
    <div className='content--home px-md '>
      <AddToCart />
    </div>
  );
};

export default ContentHome;
