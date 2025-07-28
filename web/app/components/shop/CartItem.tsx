import { ProductData } from "@/app/types/extra-types";
import React, { useEffect, useMemo, useState } from "react";
import ProductImage from "./ProductImage";
import useShop from "./ShopContext";
import { _getPriceWithDiscount } from "./utils";

type Props = {
  input: ProductData;
  _delete?: Function;
};

const CartItem = ({ input, _delete }: Props) => {
  const { products, setProducts } = useShop();
  const [hasRelatedTypefaceInProducts, setHasRelatedTypefaceInProducts] =
    useState<boolean>(false);
  // const [updatedProduct, setUpdatedProduct] = useState<ProductData | null>(
  //   null
  // );

  useEffect(() => {
    // if (!input.applyDiscount) return;
    if (!input.relatedTypefaceSku || input.relatedTypefaceSku === "") return;
    const res = products.some((el) => {
      return el.sku === input.relatedTypefaceSku;
    });
    console.log(input.sku, res);
    setHasRelatedTypefaceInProducts(res);
  }, [products, input.applyDiscount, input.relatedTypefaceSku]);

  useEffect(() => {
    if (!input.relatedTypefaceSku || input.relatedTypefaceSku === "") return;
    console.log(input.sku, hasRelatedTypefaceInProducts);
    if (hasRelatedTypefaceInProducts && input.applyDiscount === false) {
      const finalPrice =
        input.applyDiscount && input.discount
          ? _getPriceWithDiscount(input.price, input.discount)
          : input.price;
      const updatedProduct = {
        ...input,
        finalPrice: finalPrice,
        applyDiscount: true,
      };
      // setProducts({ type: "REPLACE", payload: updatedProduct });
    } else {
      const updatedProduct = {
        ...input,
        finalPrice: input.price,
        applyDiscount: false,
      };
      // setProducts({ type: "REPLACE", payload: updatedProduct });
    }
  }, [hasRelatedTypefaceInProducts, products, input]);

  return (
    <div className='cart-item gap-md- rounded'>
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
            {hasRelatedTypefaceInProducts && input.applyDiscount && (
              <div className='discount ui-btn--pill ui-btn--pill__accent'>
                <span>-{input.discount}%</span>
              </div>
            )}
            <div className='price'>{input.finalPrice}€</div>
          </div>
        </div>
        {_delete && (
          <button className='btn__delete' onClick={() => _delete(input.sku)}>
            <i className='icon-delete'></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
