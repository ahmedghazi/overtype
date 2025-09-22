import React from "react";
import ProductImage from "./ProductImage";
import { ToastContentProps } from "react-toastify";
import { publish } from "pubsub-js";

type Props = ToastContentProps<{
  title: string;
  background?: string;
  foreground?: string;
  icon?: string;
}>;

const CardToast = ({ data }: Props) => {
  const _openCart = () => {
    publish("DIALOG.CLOSE");
    setTimeout(() => {
      publish("CART_OPEN");
    }, 600);
  };

  return (
    <div
      className='card card--toast rounded has-blur- flex gap-md items-center w-full p-2xs cursor-pointer'
      onClick={_openCart}>
      <div className='media'>
        <ProductImage
          title={data.title}
          background={data.background || "var(--color-bg)"}
          foreground={data.foreground || "var(--color-primary)"}
          icon={data.icon}
        />
      </div>
      <div className='col-infos text-white'>
        <div className='msg text-sm text-secondary'>Added!</div>
        <div className='title '>{data.title}</div>
      </div>
    </div>
  );
};

export default CardToast;
