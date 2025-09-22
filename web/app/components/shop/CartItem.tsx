import { ProductData } from "@/app/types/extra-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProductImage from "./ProductImage";
import useShop from "./ShopContext";
import { _getPriceWithDiscount } from "./utils";

type Props = {
  input: ProductData;
  _delete?: Function;
};

const CartItem = ({ input, _delete }: Props) => {
  console.log(input);
  const { products, setProducts } = useShop();
  const [hasRelatedTypefaceInProducts, setHasRelatedTypefaceInProducts] =
    useState<boolean>(false);

  // Memoize the input prop to prevent unnecessary re-renders
  const memoizedInput = useMemo(
    () => input,
    [
      // input.sku,
      // input.relatedTypefaceSku,
      input.applyDiscount,
      // input.price,
      // input.discount,
    ]
  );

  // Memoize the product update function to avoid recreating it on every render
  const updateProduct = useMemo(
    () =>
      (product: ProductData): ProductData => ({
        ...product,
        applyDiscount: hasRelatedTypefaceInProducts,
        finalPrice: hasRelatedTypefaceInProducts
          ? _getPriceWithDiscount(product.price, product.discount)
          : product.price,
      }),
    [hasRelatedTypefaceInProducts]
  );

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
  }, [memoizedProducts, memoizedInput.relatedTypefaceSku]);

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

  return (
    <div className='cart-item gap-md- rounded'>
      <div className='inner'>
        <div className='media'>
          <ProductImage
            title={memoizedInput.productTitle}
            background={memoizedInput.background}
            foreground={memoizedInput.foreground}
            icon={memoizedInput.icon}
          />
        </div>
        <div className='col-infos'>
          <div className='cart-item-row'>
            <div className='title '>{memoizedInput.fullTitle}</div>
          </div>
          <div className='cart-item-row'>
            <div className='metas'>
              <div>Use in logo/wordmark : {memoizedInput.isLogo}</div>
              <div>
                Size licenses : {memoizedInput.license}{" "}
                <span className='text-secondary'>
                  {memoizedInput.licenseInfos}
                </span>
              </div>
            </div>
            {hasRelatedTypefaceInProducts && memoizedInput.applyDiscount && (
              <div className='discount ui-btn--pill ui-btn--pill__accent'>
                <span>-{memoizedInput.discount}%</span>
              </div>
            )}
            <div className='price'>{memoizedInput.finalPrice}€</div>
          </div>
        </div>
        {_delete && (
          <button
            className='btn__delete'
            onClick={() => _delete(memoizedInput.sku)}>
            <i className='icon-delete'></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
