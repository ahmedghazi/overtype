import { ProductSingle } from "@/app/types/schema";
import React, { useEffect } from "react";
import useTypeFace, { TypeFaceContextProvider } from "./TypeFaceContext";
import clsx from "clsx";

type WaterfallItemProps = {
  input: ProductSingle;
};
const WaterfallItem = ({ input }: WaterfallItemProps) => {
  const { type, dispatchType } = useTypeFace();
  useEffect(() => {
    dispatchType(input.typeface);
  }, []);
  const isItalic = input.typeface?.slug?.current?.includes("italic");
  return (
    <>
      <div
        style={{
          fontFamily: input?.typeface?.slug?.current,
          opacity: type ? 1 : 0,
        }}
        className={clsx(
          "t-preview text-xl md:text-3xl",
          isItalic && "is-italic"
        )}>
        {input.title}
      </div>
      {isItalic && <div className='hr' />}
    </>
  );
};

type Props = {
  title: string;
  items: ProductSingle[];
};

const Waterfall = ({ title, items }: Props) => {
  return (
    <section className='waterfall' id='waterfall'>
      <div className='header'>
        <h1 className='text-xl md:text-2xl'>{title}</h1>
        <div className='text-secondary'>{items?.length} Styles</div>
      </div>
      <div className='items'>
        {items?.map((item, i) => (
          <TypeFaceContextProvider key={i}>
            <WaterfallItem input={item} />
          </TypeFaceContextProvider>
        ))}
      </div>
    </section>
  );
};

export default Waterfall;
