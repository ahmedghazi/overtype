import { KeyVal, KeyValString, ProductSingle } from "@/app/types/schema";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useTypeFace, { TypeFaceContextProvider } from "./TypeFaceContext";
import { usePageContext } from "@/app/context/PageContext";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import TextPreview from "./TextPreview";
import Aside from "./Aside";
import "./TypeTester.scss";

type TypeTesterProps = {
  singles: ProductSingle[];
  initialPangram: string[];
  stylisticSets?: KeyValString[];
};

const TypeTester = ({
  singles,
  initialPangram,
  stylisticSets,
}: TypeTesterProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [textType, setTextType] = useState<"title" | "paragraph">("title");
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setReady(true);
    const token = subscribe("TESTER_TEXT", (msg, { type }) => {
      setTextType(type);
    });
    // console.log(previewRef);
    // if (!previewRef.current) {
    setTimeout(() => {
      const fallbackPreviewRef = document.querySelector(
        ".canvas .t-preview"
      ) as HTMLDivElement;
      setTarget(fallbackPreviewRef);
      // if (fallbackPreviewRef) previewRef.current = fallbackPreviewRef;
    }, 250);
    // }
    return () => {
      unsubscribe(token);
    };
  }, []);

  const {
    settings: { pangrams },
  } = usePageContext();
  // console.log(initialPangram);
  const randomInitialPagran = useMemo(() => {
    if (!initialPangram) return "";
    const randomIndex = Math.floor(Math.random() * initialPangram.length);
    return initialPangram[randomIndex] || "Test font here";
  }, [initialPangram]);

  const randomPagran = useMemo(() => {
    if (!pangrams) return "";
    const randomIndex = Math.floor(Math.random() * pangrams.length);
    return pangrams[randomIndex];
  }, [pangrams]);

  return (
    <div className='type-tester rounded'>
      <TypeFaceContextProvider>
        <div className='canvas'>
          <div className='inner'>
            <TextPreview
              ref={previewRef}
              pangram={
                textType === "title" ? randomInitialPagran : randomPagran
              }
              isParagraph={textType === "paragraph"}
            />
          </div>
        </div>
        {ready && (
          <Aside
            singles={singles}
            target={target}
            stylisticSets={stylisticSets}
            textType={textType}
          />
        )}
      </TypeFaceContextProvider>
    </div>
  );
};

export default TypeTester;
