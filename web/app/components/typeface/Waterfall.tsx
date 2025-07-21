import { ProductSingle } from "@/app/types/schema";
import React, { useEffect } from "react";
import useTypeFace, { TypeFaceContextProvider } from "./TypeFaceContext";

type WaterfallItemProps = {
  input: ProductSingle;
};
const WaterfallItem = ({ input }: WaterfallItemProps) => {
  const { type, dispatchType } = useTypeFace();
  useEffect(() => {
    dispatchType(input.typeface);
  }, []);
  return (
    <div
      style={{
        fontFamily: input?.typeface?.slug?.current,
        opacity: type ? 1 : 0,
      }}
      className='t-preview text-xl md:text-3xl'>
      {input.title}
    </div>
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
          <div key={i}>
            <TypeFaceContextProvider>
              <WaterfallItem input={item} />
            </TypeFaceContextProvider>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Waterfall;
