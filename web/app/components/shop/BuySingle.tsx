import { Product, ProductSingle, SanityKeyed } from "@/app/types/schema";
import React, { useEffect, useMemo, useState } from "react";
import Checkbox from "../ui/inputs/Checkbox";
import useShop from "./ShopContext";
import Price from "./Price";
import clsx from "clsx";
import { _getPriceWithDiscount } from "./utils";
import useTypeFace from "../typeface/TypeFaceContext";
import { _localizeField } from "@/app/sanity-api/utils";
import { ProductData } from "@/app/types/extra-types";
import { usePageContext } from "@/app/context/PageContext";

type Props = {
  product: Product;
  background: string;
  foreground: string;
  input: SanityKeyed<ProductSingle>;
};

const BuySingle = ({ input, product, background, foreground }: Props) => {
  const { products, dialogProducts, setDialogProducts, licenseType, isLogo } =
    useShop();
  const {
    settings: { logoPriceMultiplier },
  } = usePageContext();
  const [checked, setChecked] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState<boolean>(false);

  useEffect(() => {
    if (!input.discount) return;
    // if (!checked) return;
    if (input.relatedTypeface) {
      const relatedTypefaceIsInDialogProducts = dialogProducts.some(
        (el) => el.sku + "-italic" === input.sku?.current
      );
      const relatedTypefaceIsInProducts = products.some(
        (el) => el.sku + "-italic" === input.sku?.current
      );

      if (relatedTypefaceIsInDialogProducts) {
        setApplyDiscount(true);
      }
      if (relatedTypefaceIsInProducts) {
        setApplyDiscount(true);
      }
      if (!relatedTypefaceIsInDialogProducts && !relatedTypefaceIsInProducts) {
        setApplyDiscount(false);
      }
    }
  }, [dialogProducts, input.relatedTypeface]);

  useEffect(() => {
    if (applyDiscount) {
      setDialogProducts({ type: "REPLACE", payload: _productData });
    }
  }, [applyDiscount]);

  let priceMultiplier = licenseType?.priceMultiplier || 1;
  if (isLogo && logoPriceMultiplier) priceMultiplier += logoPriceMultiplier;

  const price = input.price ? input.price * priceMultiplier : 0;
  const totalDiscount = applyDiscount && input.discount ? input.discount : 0;
  const finalPrice =
    applyDiscount && input.discount
      ? _getPriceWithDiscount(price, totalDiscount)
      : price;

  const _productData: ProductData = {
    productType: "ProductSingle",
    productTypeRef: input._key,
    productId: product._id,
    productTitle: product.title || "",
    fullTitle: product.title + " " + input.title,
    description: input.description || "",
    sku: input.sku?.current || "",
    price: price,
    discount: totalDiscount,
    applyDiscount: applyDiscount,
    relatedTypefaceSku: input.relatedTypeface
      ? `single-${input.relatedTypeface?.slug?.current}`
      : "",
    finalPrice: finalPrice,
    background: background || "",
    foreground: foreground || "",
    license: _localizeField(licenseType?.label) || "",
    licenseInfos: _localizeField(licenseType?.infos) || "",
    isLogo: isLogo || false,
  };
  console.log(_productData);

  const { type, dispatchType } = useTypeFace();
  useEffect(() => {
    dispatchType(input.typeface);
  }, []);

  const onChange = (checked: boolean) => {
    setChecked(checked);
  };

  useEffect(() => {
    if (checked) {
      setDialogProducts({ type: "ADD", payload: _productData });
    } else {
      setDialogProducts({ type: "REMOVE", payload: _productData });
    }
  }, [checked, input, setDialogProducts]);

  const isIn =
    dialogProducts.some((el) => el.sku === input.sku?.current) ||
    products.some((el) => el.sku === input.sku?.current);
  const isInCart = products.some((el) => el.sku === input.sku?.current);
  //need to check product is in dialogProducts, has a discount but not yet applyed
  // console.log({ applyDiscount });
  return (
    <div
      className={clsx("ui-single", isIn && "is-active", isInCart && "disabled")}
      onClick={() => setChecked(!checked)}>
      <div className='t-preview' style={{ fontFamily: type?.slug?.current }}>
        <Checkbox
          // checked={checked}
          // checked={isIn}
          checked={checked}
          name={input.title || "single"}
          onChange={onChange}
        />
      </div>

      <div className='footer'>
        {applyDiscount && input.discount && (
          <div className='discount ui-btn--pill ui-btn--pill__accent'>
            <span>-{input.discount}%</span>
          </div>
        )}
        {input.price && (
          <Price
            price={price}
            discount={applyDiscount ? input.discount : 0}
            displayOldPrice={!applyDiscount}
          />
        )}
      </div>
    </div>
  );
};

export default BuySingle;
