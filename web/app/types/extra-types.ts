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

export interface _ProductExtend extends Product {
  defaultTypeface: ProductSingle;
}

export interface ProductBundleExtend extends SanityKeyed<ProductBundle> {
  finalPrice: number;
}
export interface ProductSingleExtend extends SanityKeyed<ProductSingle> {
  finalPrice: number;
}
