import { Product } from "@/app/types/schema";
import React from "react";
import { TypeFaceContextProvider } from "../typeface/TypeFaceContext";
import CardProduct from "../CardProduct";
import LinkWithIcon from "../ui/buttons/LinkWithIcon";
import { usePageContext } from "@/app/context/PageContext";
import { _linkResolver } from "@/app/sanity-api/utils";

type Props = {
  title: string;
  items: Product[];
};

const RelatedProducts = ({ title, items }: Props) => {
  const { settings } = usePageContext();
  const { shopPage } = settings;
  return (
    <section className='related px-md'>
      <div className='header mb-lg'>
        <h2 className='md:text-2xl'>{title}</h2>
        <div className='actions md:text-xl text-secondary'>
          <LinkWithIcon
            label='View All'
            link={_linkResolver(shopPage)}
            icon='arrow-e'
          />
        </div>
      </div>

      <div className='grid md:grid-cols-4 gap-md'>
        {items.map((item, index) => (
          <div className='item' key={index}>
            <TypeFaceContextProvider>
              <CardProduct key={index} input={item} layout='square' />
            </TypeFaceContextProvider>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
