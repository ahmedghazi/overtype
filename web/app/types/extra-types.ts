import { SanityKeyed } from "sanity-codegen";
import {
  FontsInUseUI,
  ImagesUI,
  Product,
  ProductBundle,
  ProductSingle,
  ProductsUI,
  ProjectsUI,
  SliderStoriesUI,
  TextUI,
} from "./schema";

export interface _ModulesList {
  modules?: Array<
    | SanityKeyed<TextUI>
    | SanityKeyed<ImagesUI>
    | SanityKeyed<ProductsUI>
    | SanityKeyed<SliderStoriesUI>
    | SanityKeyed<ProjectsUI>
    | SanityKeyed<FontsInUseUI>
  >;
}

export interface ProductBundleExtend extends SanityKeyed<ProductBundle> {
  finalPrice: number;
}
export interface ProductSingleExtend extends SanityKeyed<ProductSingle> {
  finalPrice: number;
}

export interface ProductData {
  productType: "ProductBundle" | "ProductSingle";
  productTypeRef: string;
  sku: string;
  price: number;
  discount: number;
  finalPrice: number;
  background: string;
  foreground: string;
  productId: string;
  productTitle: string;
  fullTitle: string;
  description: string;
  license: string;
  licenseInfos: string;
  isLogo: boolean;
}
