import React from "react";

type Props = {
  title: string;
  background: string;
  foreground?: string;
  icon?: string;
};

const ProductImage = ({ title, background, foreground, icon }: Props) => {
  console.log(icon);
  return (
    <div
      className='product-image text-base'
      style={{ backgroundColor: background, color: foreground }}>
      {!icon && title}
      {icon && <img src={icon} alt='' width={43} height='auto' />}
    </div>
  );
};

export default ProductImage;
