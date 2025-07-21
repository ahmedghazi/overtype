import { ProductData } from "@/app/types/extra-types";
import React from "react";
import ProductImage from "./ProductImage";

type Props = {
  input: ProductData;
  _delete?: Function;
};

const CartItem = ({ input, _delete }: Props) => {
  return (
    <div className='cart-item gap-md'>
      <div className='inner'>
        <div className='media'>
          <ProductImage
            title={input.fullTitle}
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
        {_delete && (
          <button className='btn__delete' onClick={() => _delete(input.sku)}>
            {/* <BtnIcon icon='delete' /> */}
            <i className='icon-delete'></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
