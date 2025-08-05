import { Product } from "@/app/types/schema";
import React from "react";
import { TypeFaceContextProvider } from "../typeface/TypeFaceContext";
import CardProduct from "./CardProduct";
import LinkWithIcon from "../ui/buttons/LinkWithIcon";
import { usePageContext } from "@/app/context/PageContext";
import { _linkResolver } from "@/app/sanity-api/utils";
import clsx from "clsx";

type Props = {
  title: string;
  items: Product[];
};

const RelatedProducts = ({ title, items }: Props) => {
  const { settings } = usePageContext();
  const { shopPage } = settings;
  // const gridLength = items.length < 4 ? items.length : 4;
  const gridLength = 2;
  return (
    <section className='related px-xs md:px-md products'>
      <div className='header mb-lg'>
        <h2 className='md:text-2xl'>{title}</h2>
        <div className='hidden-sm'>
          <div className='actions md:tex-lg text-secondary'>
            <LinkWithIcon
              label='View All'
              link={_linkResolver(shopPage)}
              icon='arrow-e'
            />
          </div>
        </div>
      </div>

      <div
        className={clsx("grid gap-xs md:gap-md", `md:grid-cols-${gridLength}`)}>
        {items.map((item, index) => (
          <div className='item' key={index}>
            <TypeFaceContextProvider>
              <CardProduct key={index} input={item} layout='square' />
            </TypeFaceContextProvider>
          </div>
        ))}
      </div>

      <div className='footer sm-only pt-2xl'>
        {shopPage && (
          <div className='flex justify-center text-lg text-secondary'>
            <LinkWithIcon
              label='View All'
              link={_linkResolver(shopPage)}
              icon='arrow-e'
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
