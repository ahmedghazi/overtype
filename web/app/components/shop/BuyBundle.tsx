import { ProductBundle } from "@/app/types/schema";
import React, { useEffect, useState } from "react";
import Radio from "../ui/inputs/Radio";
import Checkbox from "../ui/inputs/Checkbox";
import useShop, { ProductData } from "./ShopContext";
import Price from "./Price";
import clsx from "clsx";
import { _getPriceWithDiscount } from "./utils";
import { _localizeField } from "@/app/sanity-api/utils";

type Props = {
  input: ProductBundle;
  typefaceName: string;
  background: string;
  foreground: string;
};

const BuyBundle = ({ input, typefaceName, background, foreground }: Props) => {
  const { dialogProducts, setDialogProducts, licenseType, isLogo } = useShop();
  const [checked, setChecked] = useState(false);
  const priceMultiplier = licenseType?.priceMultiplier || 1;
  const price = input.price ? input.price * priceMultiplier : 0;
  const priceDiscount = input.discount ? input.discount : 0;
  const finalPrice = input.discount
    ? _getPriceWithDiscount(price, priceDiscount)
    : price;

  const _productData: ProductData = {
    type: "ProductSingle",
    sku: input.sku?.current || "",
    price: price,
    discount: priceDiscount,
    finalPrice: finalPrice,
    title: input.title || "",
    description: input.description || "",
    typefaceName: typefaceName || "",
    background: background || "",
    foreground: foreground || "",
    license: _localizeField(licenseType?.label) || "",
    licenseInfos: _localizeField(licenseType?.infos) || "",
    isLogo: isLogo || false,
  };

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
  return (
    <div
      className={clsx("ui-bundle", isIn && "is-active")}
      onClick={() => setChecked(!checked)}>
      <div>
        <Checkbox
          checked={isIn}
          name={input.title || "bundle"}
          onChange={onChange}
        />
        <div className='infos text-secondary'>{input.description}</div>
      </div>
      <div className='footer'>
        <div>
          {input.discount && (
            <div className='discount ui-btn--pill ui-btn--pill__accent'>
              <span>Save up {input.discount}%</span>
            </div>
          )}
        </div>
        {input.price && <Price price={price} discount={input.discount} />}
      </div>
    </div>
  );
};

export default BuyBundle;
