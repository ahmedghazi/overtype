import clsx from "clsx";
import React from "react";
import { _getPriceWithDiscount } from "./utils";

type Props = {
  price: number;
  discount?: number;
  displayOldPrice?: boolean;
};

const Price = ({ price, discount, displayOldPrice = true }: Props) => {
  // const priceDiscounted = priceDiscount
  //   ? price - (price / 100) * priceDiscount
  //   : null;
  const priceDiscounted = discount
    ? _getPriceWithDiscount(price, discount)
    : null;

  return (
    <div className='price flex gap-2xs'>
      {displayOldPrice && (
        <span className={clsx("price", discount && "text-secondary")}>
          {price}€
        </span>
      )}

      {priceDiscounted && (
        <span className='price price--discounted'>{priceDiscounted}€</span>
      )}
    </div>
  );
};

export default Price;
