"use client";
import React, { useContext, useEffect, useMemo } from "react";
import { PaddleContext } from "./Paddle/PaddleProvider";
import { ProductBundle, ProductSingle, SanityKeyed } from "@/app/types/schema";
import useShop, { ProductData } from "./ShopContext";
import {
  ProductBundleExtend,
  ProductSingleExtend,
} from "@/app/types/extra-types";
import { _getPriceWithDiscount } from "./utils";

type Props = {
  items: ProductData[];
};

const AddToCart = ({ items }: Props) => {
  const { licenseType, dialogProducts, products, setProducts } = useShop();
  const handleAddToCart = async () => {
    //clean
    products.forEach((product) => {
      if (
        dialogProducts.some(
          (dialogProduct) => dialogProduct.sku === product.sku
        )
      ) {
        setProducts({ type: "REMOVE", payload: product });
      }
    });

    // console.log(uniqueBundlesOrSingles);
    items.forEach((element) => {
      setProducts({ type: "ADD", payload: element });
      // TOASTER
    });
  };

  const total = useMemo(() => {
    const priceMultiplier = licenseType?.priceMultiplier || 1;
    let finalPrice = 0;

    items.forEach((el) => {
      const itemPrice = el.discount
        ? _getPriceWithDiscount(el.price || 0, el.discount)
        : el.price;
      if (itemPrice) finalPrice += itemPrice * priceMultiplier;
    });
    return finalPrice;
  }, [items]);

  return (
    <div className='add-to-cart'>
      <button className='ui-btn ui-btn__accent' onClick={handleAddToCart}>
        Add To Cart
        {dialogProducts.length > 0 && <span className='ml-2'>{total}€</span>}
      </button>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};

export default AddToCart;
