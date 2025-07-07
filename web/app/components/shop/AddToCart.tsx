"use client";
import React, { useMemo } from "react";
import useShop, { ProductData } from "./ShopContext";
import { _getPriceWithDiscount } from "./utils";
import CardToast from "./CardToast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { NotifyButton } from "../ui/Notify";
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
      notify(item);
    });
  };

  const notify = (item: ProductData) => {
    toast(CardToast, {
      closeButton: false,
      // progress: 0.7,
      data: {
        title: item.typefaceName,
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
