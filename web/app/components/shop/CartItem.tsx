import { ProductData } from "@/app/types/extra-types";
import React, { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import useShop from "./ShopContext";

type Props = {
  input: ProductData;
  _delete?: Function;
};

const CartItem = ({ input, _delete }: Props) => {
  const { products } = useShop();
  const hasRelatedTypeface = input.relatedTypefaceSku;
  const relatedTypefaceIsInProducts = products.some(
    (el) => el.sku + "-italic" === "single-" + hasRelatedTypeface + ""
  );
  // console.log(input);

  return (
    <div className='cart-item gap-md'>
      <div className='inner'>
        <div className='media'>
          <ProductImage
            title={input.productTitle}
            background={input.background}
            foreground={input.foreground}
          />
        </div>
        <div className='col-infos'>
          <div className='cart-item-row'>
            <div className='title '>{input.fullTitle}</div>
          </div>
          <div className='cart-item-row'>
            <div className='metas'>
              <div>Use in logo/wordmark : {input.isLogo ? "Yes" : "No"}</div>
              <div>
                Size licenses : {input.license}{" "}
                <span className='text-secondary'>{input.licenseInfos}</span>
              </div>
            </div>
            <div className='price'>{input.finalPrice}€</div>
          </div>
        </div>
        {_delete && !relatedTypefaceIsInProducts && (
          <button className='btn__delete' onClick={() => _delete(input.sku)}>
            <i className='icon-delete'></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
