import React, { useEffect, useState } from "react";
import BtnIcon from "../ui/buttons/BtnIcon";
import { Dialog } from "../ui/Dialog";
import Cart from "./Cart";
import { subscribe, unsubscribe } from "pubsub-js";
import useShop from "./ShopContext";
import clsx from "clsx";

type Props = {};

const BtnCart = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  ``;
  const { products } = useShop();
  const hasProducts = products.length > 0;

  useEffect(() => {
    const token = subscribe("CART_OPEN", () => {
      setOpen(true);
    });
    return () => {
      unsubscribe(token);
    };
  }, []);
  return (
    <>
      <div className={clsx("btn-cart", hasProducts && "has-products")}>
        <BtnIcon icon='cart' onClick={() => setOpen(true)} />
      </div>
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <Cart />
      </Dialog>
    </>
  );
};

export default BtnCart;
