import React from "react";

type Props = {
  title: string;
  background: string;
  foreground?: string;
};

const ProductImage = ({ title, background, foreground }: Props) => {
  return (
    <div
      className='product-image'
      style={{ backgroundColor: background, color: foreground }}>
      {title}
    </div>
  );
};

export default ProductImage;
