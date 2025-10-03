import { ProductData } from "@/app/types/extra-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProductImage from "./ProductImage";
import useShop from "./ShopContext";
import { _getPriceWithDiscount } from "./utils";
import { log } from "console";

type Props = {
  input: ProductData;
  _delete?: Function;
};

const CartItem = ({ input, _delete }: Props) => {
  const { products, setProducts } = useShop();
  const [hasRelatedTypefaceInProducts, setHasRelatedTypefaceInProducts] =
    useState<boolean>(false);

  // Memoize the input prop to prevent unnecessary re-renders
  const memoizedInput = useMemo(
    () => input,
    [
      input.sku,
      input.relatedTypefaceSku,
      input.applyDiscount,
      input.price,
      input.discount,
    ]
  );
  // console.log("CartItem", input.sku, memoizedInput.sku);

  // Memoize the product update function to avoid recreating it on every render
  // const updateProduct = useMemo(
  //   () =>
  //     (product: ProductData): ProductData => ({
  //       ...product,
  //       applyDiscount: hasRelatedTypefaceInProducts,
  //       finalPrice: hasRelatedTypefaceInProducts
  //         ? _getPriceWithDiscount(product.price, product.discount)
  //         : product.price,
  //     }),
  //   [hasRelatedTypefaceInProducts]
  // );

  // Memoize the products array to prevent unnecessary re-renders
  const memoizedProducts = useMemo(() => products, [products]);

  // Check for related product and update state only once per render
  useEffect(() => {
    if (
      !memoizedInput.relatedTypefaceSku ||
      memoizedInput.relatedTypefaceSku === ""
    ) {
      // Only clear hasRelatedTypefaceInProducts, keep other state
      setHasRelatedTypefaceInProducts(false);
      return;
    }

    const hasRelated = memoizedProducts.some(
      (el) => el.sku === memoizedInput.relatedTypefaceSku
    );
    setHasRelatedTypefaceInProducts(hasRelated);
  }, [memoizedProducts, memoizedInput.relatedTypefaceSku, products]);

  // Update product state only when hasRelatedTypefaceInProducts changes
  useEffect(() => {
    if (
      !memoizedInput.relatedTypefaceSku ||
      memoizedInput.relatedTypefaceSku === ""
    )
      return;

    const updatedProduct = {
      ...memoizedInput,
      applyDiscount: hasRelatedTypefaceInProducts,
      finalPrice: hasRelatedTypefaceInProducts
        ? _getPriceWithDiscount(memoizedInput.price, memoizedInput.discount)
        : memoizedInput.price,
    };
    setProducts({ type: "REPLACE", payload: updatedProduct });
  }, [hasRelatedTypefaceInProducts, memoizedInput, setProducts]);

  // console.log("CartItem", input);
  return (
    <div className='cart-item rounded'>
      <div className='inner'>
        <div className='media'>
          <ProductImage
            title={input.productTitle}
            background={input.background}
            foreground={input.foreground}
            icon={input.icon}
          />
        </div>
        <div className='col-infos'>
          <div className='cart-item-row'>
            <div className='title '>{input.fullTitle}</div>
          </div>
          <div className='cart-item-row'>
            <div className='metas'>
              <div>Use in logo/wordmark : {input.isLogo}</div>
              <div>
                Size licenses : {input.license}{" "}
                <span className='text-secondary'>{input.licenseInfos}</span>
              </div>
            </div>
            {hasRelatedTypefaceInProducts && memoizedInput.applyDiscount && (
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
      {/* <pre>
        hasRelatedTypefaceInProducts:{" "}
        {JSON.stringify(hasRelatedTypefaceInProducts, null, 2)}
      </pre>
      <pre>applyDiscount: {JSON.stringify(input.applyDiscount, null, 2)}</pre> */}
    </div>
  );
};

export default CartItem;
