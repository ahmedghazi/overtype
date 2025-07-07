import React, { useState } from "react";
import BtnIcon from "../ui/buttons/BtnIcon";
import { Dialog } from "../ui/Dialog";
import Cart from "./Cart";
import { ShopWrapper } from "./ShopContext";

type Props = {};

const BtnCart = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
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
