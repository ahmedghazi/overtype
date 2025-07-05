import { ProductBundle, ProductSingle, SanityKeyed } from "@/app/types/schema";
import { ProductData } from "./ShopContext";

export const _getPriceWithDiscount = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

export const cartTotalPrice = (items: ProductData[]) => {
  let total = 0;
  items.forEach((el) => {
    const price = el.finalPrice || 0;
    total += price;
  });
  return total;
};

export const _slugify = (str: string) => {
  return str.replace(" ", "-").toLowerCase();
};
// export const _skyFy = (
//   input: SanityKeyed<ProductBundle> | SanityKeyed<ProductSingle>
// ) => {
//   const { _key, title } = input;
//   const titleSlug = title?.replace(" ", "-").toLowerCase();
//   return `${title}-${_key}`;
// };

export const _getItalic = () => {};
