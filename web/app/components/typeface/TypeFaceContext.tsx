"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Typeface } from "@/app/types/schema";

interface TypeFaceContextProps {
  // location?: object;
  children: ReactNode;
  // typeface: Typeface;
  // base64: string;
  // pageContext: object;
}

type ContextProps = {
  type: Typeface | null;
  dispatchType: Function;
  types: Typeface[] | null;
  dispatchTypes: Function;
};

const TypeFaceContext = createContext<ContextProps>({} as ContextProps);

// Encode asset ref for the proxy URL (same logic as server)
function encodeAssetId(assetRef: string): string {
  return btoa(assetRef)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Get font URL via proxy
function getFontUrl(typefaceFile: Typeface["typefaceFile"]): string | null {
  if (!typefaceFile) return null;

  const assetRef = typefaceFile.asset?._ref;
  if (!assetRef) return null;

  const encodedId = encodeAssetId(assetRef);
  return `/api/font?id=${encodedId}`;
}

export const TypeFaceContextProvider = ({
  children,
}: // typeface,
TypeFaceContextProps) => {
  const [types, dispatchTypes] = useState<Typeface[] | null>([]);
  const [type, dispatchType] = useState<Typeface | null>(null);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  // useEffect(() => {
  //   if (type) _loadFont(type);
  //   if (types) {
  //     types.forEach((el) => {
  //       _loadFont(el);
  //     });
  //   }
  // }, [type]);

  // const _loadFont = async (item: Typeface) => {
  //   if (!item || !item.slug) return;
  //   const font = new FontFace(
  //     item.slug?.current || "",
  //     `url(${item.typefaceFile?.base64})`,
  //     {
  //       // style: "normal",
  //       // weight: "400",
  //       // stretch: "condensed",
  //     },
  //   );
  //   await font.load();
  //   document.fonts.add(font);
  // };

  const loadFont = useCallback(
    async (item: Typeface) => {
      if (!item || !item.slug) return;

      const slug = item.slug.current || "";
      if (loadedFonts.has(slug)) return;
      // console.log("Loading font:", slug);
      const fontUrl = getFontUrl(item.typefaceFile);
      console.log("fontUrl:", fontUrl);

      if (!fontUrl) return;

      const font = new FontFace(slug, `url(${fontUrl})`);
      console.log({ font });
      await font.load();
      document.fonts.add(font);
      setLoadedFonts((prev) => new Set(prev).add(slug));
    },
    [loadedFonts],
  );

  useEffect(() => {
    console.log("type:", type);
    // console.log("types:", types);
    if (type) loadFont(type);
    if (types) {
      types.forEach((el) => {
        loadFont(el);
      });
    }
  }, [type, types, loadFont]);

  return (
    <TypeFaceContext.Provider
      value={{ type, dispatchType, types, dispatchTypes }}>
      {children}
    </TypeFaceContext.Provider>
  );
};

export default function useTypeFace() {
  return useContext(TypeFaceContext);
}
