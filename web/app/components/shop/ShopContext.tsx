"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useReducer,
} from "react";
import {
  LicenseType,
  Product,
  ProductBundle,
  ProductSingle,
  SanityKeyed,
} from "@/app/types/schema";
import { usePathname } from "next/navigation";
import {
  ProductBundleExtend,
  ProductSingleExtend,
} from "@/app/types/extra-types";

interface ShopContextProps {
  // location?: object;
  children: ReactNode;
  licenses: LicenseType[] | undefined;
  // pageContext: object;
}

// An enum with all the types of actions to use in our reducer
// enum CountActionKind {
//   INCREASE = "INCREASE",
//   DECREASE = "DECREASE",
// }

// // An interface for our actions
// interface CountAction {
//   type: CountActionKind;
//   payload: number;
// }

// // An interface for our state
// interface CountState {
//   count: number;
// }

function productsReducer(state: any, action: any) {
  // console.log(state, action);
  const { type, payload } = action;
  // console.log(type, payload);
  switch (type) {
    case "SET":
      return payload;
    case "ADD":
      return [...state, payload];
    case "REMOVE":
      return state.filter((item: any) => item.sku !== payload.sku);

    case "REPLACE":
      return state.map((item: any) => {
        return item.sku === payload.sku ? payload : item;
      });
    case "REMOVE_ALL":
      return [];
    default:
      throw new Error();
  }
}

function trialsReducer(state: any, action: any) {
  // console.log(state);
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      return [...state, payload];
    case "REMOVE":
      return state.filter((item: SanityKeyed<ProductSingle>) => {
        // console.log(item._key, payload._key);
        return item._key !== payload._key;
      });

    // case "REPLACE":
    //   return state.map((item: any) =>
    //     item.title === payload.title ? payload : item
    //   );
    case "REMOVE_ALL":
      return [];
    default:
      throw new Error();
  }
}

export interface ProductData {
  type: "ProductBundle" | "ProductSingle";
  sku: string;
  price: number;
  discount: number;
  finalPrice: number;
  // url: string;
  typefaceName: string;
  background: string;
  foreground: string;
  title: string;
  description: string;
  license: string;
  licenseInfos: string;
  isLogo: boolean;
  // customFields: any[];
  // metadata: string;
}

type ContextProps = {
  cartObject: any;
  products: ProductData[];
  // products: (
  //   | SanityKeyed<ProductBundleExtend>
  //   | SanityKeyed<ProductSingleExtend>
  // )[];
  setProducts: Function;
  dialogProducts: ProductData[];
  // dialogProducts: (
  //   | SanityKeyed<ProductBundleExtend>
  //   | SanityKeyed<ProductSingleExtend>
  // )[];
  setDialogProducts: Function;
  licenseType: LicenseType | null;
  setLicenseType: Function;
  isLogo: boolean;
  setIsLogo: Function;
};

const ShopContext = createContext<ContextProps>({} as ContextProps);

// type EmptyObj = Record<PropertyKey, never | any>;

export const ShopWrapper = ({ children, licenses }: ShopContextProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [products, setProducts] = useReducer(productsReducer, []);
  const [dialogProducts, setDialogProducts] = useReducer(productsReducer, []);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [licenseType, setLicenseType] = useState<LicenseType | null>(null);
  const [isLogo, setIsLogo] = useState<boolean>(false);
  const [cartObject, setCartObject] = useState(null);
  const pathname = usePathname();
  // console.log(dialogProducts, products);

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        dialogProducts,
        setDialogProducts,
        licenseType,
        setLicenseType,
        cartObject,
        isLogo,
        setIsLogo,
      }}>
      {children}
    </ShopContext.Provider>
  );
};
export default function useShop() {
  return useContext(ShopContext);
}
