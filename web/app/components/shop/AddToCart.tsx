"use client";
import React, { useMemo } from "react";
import useShop from "./ShopContext";
import { _getPriceWithDiscount } from "./utils";
import CardToast from "./CardToast";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { ProductData } from "@/app/types/extra-types";
import { publish } from "pubsub-js";

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
    items.forEach((item) => {
      setProducts({ type: "ADD", payload: item });
      // TOASTER
      // publish("DIALOG.CLOSE");
    });
    if (items.length > 0) {
      const lastItem = items.pop();
      if (lastItem) notify(lastItem);

      publish("DIALOG.CLOSE");
      setTimeout(() => {
        publish("CART_OPEN");
      }, 700);
    }
  };

  const notify = (item: ProductData) => {
    toast(CardToast, {
      closeButton: false,
      // progress: 0.7,
      data: {
        title: item.productTitle,
        background: item.background,
        foreground: item.foreground,
      },
      className: "rounded has-blur bg-btn",
    });
  };

  const total = useMemo(() => {
    const priceMultiplier = licenseType?.priceMultiplier || 1;
    let finalPrice = 0;

    items.forEach((el) => {
      const itemPrice = el.discount
        ? _getPriceWithDiscount(el.price || 0, el.discount)
        : el.price;
      // if (itemPrice) finalPrice += itemPrice * priceMultiplier;
      if (itemPrice) finalPrice += itemPrice;
    });
    return finalPrice;
  }, [items]);

  return (
    <div className='add-to-cart'>
      <button className='ui-btn ui-btn__accent' onClick={handleAddToCart}>
        Add to cart
        {dialogProducts.length > 0 && <span className='ml-2'>{total}€</span>}
      </button>

      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
    </div>
  );
};

export default AddToCart;
