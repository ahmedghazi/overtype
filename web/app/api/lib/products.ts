import { client } from "@/app/sanity-api/sanity-client";
import { Product, ProductBundle, ProductSingle } from "@/app/types/schema";
import { ProductData } from "@/app/types/extra-types";

export type ProductOrderData = {
  productId: string;
  type: "ProductBundle" | "ProductSingle";
  bundleOrSingleRef: string;
};

export type AttachmentProps = {
  filename: string;
  path: string;
};

export const collectProductsOrderData = (
  items: ProductData[],
): ProductOrderData[] => {
  return items.map((item: ProductData) => ({
    productId: item.productId,
    type: item.productType,
    bundleOrSingleRef: item.productTypeRef,
  }));
};

export const getProductData = async (productId: string) => {
  const query = `*[_type == "product" && _id == $productId][0]{
    title,
    singles[]{
      _key,
      title,
      zip{
        asset->{
          url
        }
      }
    },
    bundles[]{
      _key,
      title,
      zip{
        asset->{
          url
        }
      }
    }
  }`;
  return client.fetch(query, { productId });
};

export const getBundleOrSingle = (
  type: string,
  bundleOrSingleRef: string,
  productData: Product,
): ProductBundle | ProductSingle | null => {
  const bundleOrSingle =
    type === "ProductBundle" ? productData.bundles : productData.singles;
  const filtered = bundleOrSingle?.filter((el) => el._key === bundleOrSingleRef);
  return filtered ? filtered[0] : null;
};

export const collectProductsOrderZips = async (items: ProductOrderData[]) => {
  const result = [];
  for await (const item of items) {
    const data = await getProductData(item.productId);
    const bundleOrSingle = getBundleOrSingle(item.type, item.bundleOrSingleRef, data);
    result.push({
      zipTitle: `${data.title} ${bundleOrSingle?.title}`,
      zip: bundleOrSingle?.zip,
    });
  }
  return result;
};

const sanitizeTitle = (str: string) => str.replace(/ /g, "-").toLocaleLowerCase();

export const generateAttachments = (items: any): AttachmentProps[] => {
  return items.map((item: any) => ({
    filename: sanitizeTitle(`${item.zipTitle}.zip`),
    path: item.zip.asset.url,
  }));
};
