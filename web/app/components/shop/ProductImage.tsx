import React from "react";

type Props = {
  title: string;
  background: string;
  foreground?: string;
};

const ProductImage = ({ title, background, foreground }: Props) => {
  return (
    <div
      className='product-image text-base'
      style={{ backgroundColor: background, color: foreground }}>
      {title}
      {/* <span className='text-2xl'>Aa</span> */}
    </div>
  );
};

export default ProductImage;
