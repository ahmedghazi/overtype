import React from "react";
import ProductImage from "./ProductImage";
import { ToastContentProps } from "react-toastify";

type Props = ToastContentProps<{
  title: string;
  background?: string;
  foreground?: string;
}>;

const CardToast = ({ data }: Props) => {
  return (
    <div className='card-toast rounded has-blur flex gap-md items-center w-full p-2xs'>
      <div className='media'>
        <ProductImage
          title={data.title}
          background={data.background || "var(--color-bg)"}
          foreground={data.foreground || "var(--color-primary)"}
        />
      </div>
      <div className='col-infos'>
        <div className='msg text-sm'>Added!</div>
        <div className='title '>{data.title}</div>
      </div>
    </div>
  );
};

export default CardToast;
