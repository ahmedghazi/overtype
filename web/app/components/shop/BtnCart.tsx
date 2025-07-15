import React, { useEffect, useState } from "react";
import BtnIcon from "../ui/buttons/BtnIcon";
import { Dialog } from "../ui/Dialog";
import Cart from "./Cart";
import { subscribe, unsubscribe } from "pubsub-js";

type Props = {};

const BtnCart = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

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
      <div className='btn-cart'>
        <BtnIcon icon='cart' onClick={() => setOpen(true)} />
      </div>
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <Cart />
      </Dialog>
    </>
  );
};

export default BtnCart;
