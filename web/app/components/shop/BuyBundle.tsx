import { Product, ProductBundle, SanityKeyed } from "@/app/types/schema";
import React, { useEffect, useState } from "react";
import Radio from "../ui/inputs/Radio";
import Checkbox from "../ui/inputs/Checkbox";
import useShop from "./ShopContext";
import Price from "./Price";
import clsx from "clsx";
import { _getPriceWithDiscount } from "./utils";
import { _localizeField } from "@/app/sanity-api/utils";
import { ProductData } from "@/app/types/extra-types";
import { usePageContext } from "@/app/context/PageContext";

type Props = {
  product: Product;
  input: SanityKeyed<ProductBundle>;
  background: string;
  foreground: string;
};

const BuyBundle = ({ product, input, background, foreground }: Props) => {
  const { dialogProducts, setDialogProducts, licenseType, isLogo } = useShop();
  const [checked, setChecked] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState<boolean>(false);

  const {
    settings: { logoPriceMultiplier },
  } = usePageContext();

  useEffect(() => {
    if (!input.discount) return;
    // setApplyDiscount(isLogo === "Yes");
    setApplyDiscount(input.discount !== 0);
  }, []);

  let priceMultiplier = licenseType?.priceMultiplier || 1;

  let price = input.price ? input.price * priceMultiplier : 0;
  if (isLogo === "Yes" && logoPriceMultiplier) {
    price *= 1 + logoPriceMultiplier;
  }
  const totalDiscount = input.discount ? input.discount : 0;
  const finalPrice = input.discount
    ? _getPriceWithDiscount(price, totalDiscount)
    : price;

  const _productData: ProductData = {
    productType: "ProductBundle",
    productTypeRef: input._key,
    productId: product._id,
    productTitle: product.title || "",
    fullTitle: product.title + " " + input.title,
    description: input.description || "",
    sku: input.sku?.current || "",
    price: price,
    discount: totalDiscount,
    finalPrice: finalPrice,
    applyDiscount: applyDiscount,
    background: background || "",
    foreground: foreground || "",
    license: _localizeField(licenseType?.label) || "",
    licenseInfos: _localizeField(licenseType?.infos) || "",
    isLogo: isLogo || "No",
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

  useEffect(() => {
    setDialogProducts({ type: "REPLACE", payload: _productData });
  }, [isLogo]);

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
