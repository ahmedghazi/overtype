import { Product, ProductSingle, SanityKeyed } from "@/app/types/schema";
import React, { useEffect, useMemo, useState } from "react";
import Checkbox from "../ui/inputs/Checkbox";
import useShop from "./ShopContext";
import Price from "./Price";
import clsx from "clsx";
import { _getPriceWithDiscount } from "./utils";
import useTypeFace from "../typeface/TypeFaceContext";
import { _localizeField } from "@/app/sanity-api/utils";
import { Console } from "console";
import { ProductData } from "@/app/types/extra-types";

type Props = {
  product: Product;
  background: string;
  foreground: string;
  input: SanityKeyed<ProductSingle>;
};

const BuySingle = ({ input, product, background, foreground }: Props) => {
  const { dialogProducts, setDialogProducts, licenseType, isLogo } = useShop();
  const [checked, setChecked] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState<boolean>(false);
  // console.log(input);

  /**
   * ne pas faire useMemo, car le apply discount peux changer si un related est présent
   */
  // const applyDiscount = useMemo(() => {
  //   if (!input.discount) return false;
  //   if (input.relatedTypeface) {
  //     const relatedTypefaceIsInDialogProducts = dialogProducts.some(
  //       (el) => el.sku + "-italic" === input.sku?.current
  //     );
  //     if (relatedTypefaceIsInDialogProducts) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }, [dialogProducts, input.relatedTypeface]);
  useEffect(() => {
    if (!input.discount) return;
    if (!checked) return;
    if (input.relatedTypeface) {
      const relatedTypefaceIsInDialogProducts = dialogProducts.some(
        (el) => el.sku + "-italic" === input.sku?.current
      );
      if (relatedTypefaceIsInDialogProducts) {
        setApplyDiscount(true);
      }
    }
  }, [dialogProducts, input.relatedTypeface]);

  useEffect(() => {
    if (applyDiscount) {
      setDialogProducts({ type: "REPLACE", payload: _productData });
    }
  }, [applyDiscount]);

  const priceMultiplier = licenseType?.priceMultiplier || 1;
  const price = input.price ? input.price * priceMultiplier : 0;
  const priceDiscount = applyDiscount && input.discount ? input.discount : 0;
  const finalPrice =
    applyDiscount && input.discount
      ? _getPriceWithDiscount(price, priceDiscount)
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
    discount: priceDiscount,
    applyDiscount: applyDiscount,
    finalPrice: finalPrice,
    background: background || "",
    foreground: foreground || "",
    license: _localizeField(licenseType?.label) || "",
    licenseInfos: _localizeField(licenseType?.infos) || "",
    isLogo: isLogo || false,
  };

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

  const isIn = dialogProducts.some((el) => el.sku === input.sku?.current);

  //need to check product is in dialogProducts, has a discount but not yet applyed
  // console.log({ applyDiscount });
  return (
    <div
      className={clsx("ui-single", isIn && "is-active")}
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
