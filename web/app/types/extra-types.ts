import { SanityKeyed } from "sanity-codegen";
import {
  FaqUI,
  FontsInUseUI,
  ImagesUI,
  Product,
  ProductBundle,
  ProductSingle,
  ProductsUI,
  ProjectsUI,
  SliderStoriesUI,
  TextUI,
  TrialsUI,
} from "./schema";

export interface _ModulesList {
  modules?: Array<
    | SanityKeyed<TextUI>
    | SanityKeyed<ImagesUI>
    | SanityKeyed<ProductsUI>
    | SanityKeyed<SliderStoriesUI>
    | SanityKeyed<ProjectsUI>
    | SanityKeyed<FontsInUseUI>
    | SanityKeyed<TrialsUI>
    | SanityKeyed<FaqUI>
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
  applyDiscount?: boolean;
  relatedTypefaceSku?: string;
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
