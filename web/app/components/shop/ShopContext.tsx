"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
} from "react";
import {
  LicenseType,
  Product,
  ProductSingle,
  SanityKeyed,
} from "@/app/types/schema";
import { usePathname } from "next/navigation";
import { ProductData } from "@/app/types/extra-types";
import { _getPriceWithDiscount } from "./utils";

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

function dialogProductsReducer(state: any, action: any) {
  // console.log(state, action);
  const { type, payload } = action;
  // console.log(type, payload);
  switch (type) {
    case "SET":
      return payload;
    case "ADD":
      const exist = state.filter((item: any) => item.sku === payload.sku);
      if (exist.length === 0) {
        return [...state, payload];
      }
      return state;
    case "REMOVE":
      return state.filter((item: any) => item.sku !== payload.sku);
    case "REMOVE_BY_SKU":
      console.log("REMOVE_BY_SKU", payload);
      // console.log(state);
      return state.filter((item: any) => item.sku !== payload);
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

function productsReducer(state: any, action: any) {
  // console.log(state, action);
  const { type, payload } = action;
  // console.log(type, payload);
  switch (type) {
    case "SET":
      return payload;
    case "ADD":
      const exist = state.filter((item: any) => item.sku === payload.sku);
      if (exist.length === 0) {
        return [...state, payload];
      }
      return state;
    case "REMOVE":
      return state.filter((item: any) => item.sku !== payload.sku);
    case "REMOVE_BY_SKU":
      console.log("REMOVE_BY_SKU", payload);
      // console.log(state);
      return state.filter((item: any) => item.sku !== payload);
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
      return state.filter((item: Product) => {
        // console.log(item._key, payload._key);
        return item._id !== payload._id;
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

type ContextProps = {
  // cartObject: any;
  trials: SanityKeyed<Product>[] | null;
  setTrials: Function;

  products: ProductData[];
  setProducts: Function;

  dialogProducts: ProductData[];
  setDialogProducts: Function;

  licenseType: LicenseType | null;
  setLicenseType: Function;
  isLogo: string | boolean | undefined;
  setIsLogo: Function;
  licenseFor: "me" | "client";
  setLicenseFor: Function;
  licenseForData: {
    companyName?: string;
    email?: string;
    inUseFor?: string;
  };
  setLicenseForData: Function;
};

const ShopContext = createContext<ContextProps>({} as ContextProps);

// type EmptyObj = Record<PropertyKey, never | any>;

export const ShopWrapper = ({ children, licenses }: ShopContextProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [products, setProducts] = useReducer(productsReducer, []);
  const [dialogProducts, setDialogProducts] = useReducer(
    dialogProductsReducer,
    []
  );
  const [trials, setTrials] = useReducer(trialsReducer, []);
  const [licenseType, setLicenseType] = useState<LicenseType | null>(null);
  const [licenseFor, setLicenseFor] = useState<"me" | "client">("me");
  const [licenseForData, setLicenseForData] = useState<{
    companyName?: string;
    email?: string;
    inUseFor?: string;
  }>({
    companyName: "",
    email: "",
    inUseFor: "",
  });
  const [isLogo, setIsLogo] = useState<string | boolean | undefined>(undefined);

  useEffect(() => {
    const cart = localStorage.getItem("overtype-cart");
    if (cart) {
      const cartArr = JSON.parse(cart);
      cartArr.forEach((item: ProductData) => {
        setProducts({ type: "ADD", payload: item });
      });
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("overtype-cart", JSON.stringify(products));
    }
  }, [products, ready]);

  return (
    <ShopContext.Provider
      value={{
        trials,
        setTrials,
        products,
        setProducts,
        dialogProducts,
        setDialogProducts,
        licenseType,
        setLicenseType,
        // cartObject,
        isLogo,
        setIsLogo,
        licenseFor,
        setLicenseFor,
        licenseForData,
        setLicenseForData,
      }}>
      {children}
    </ShopContext.Provider>
  );
};
export default function useShop() {
  return useContext(ShopContext);
}
