"use client";
import React, { useEffect, useState } from "react";
import { Product, ProductSingle } from "../types/schema";
import useTypeFace, {
  TypeFaceContextProvider,
} from "./typeface/TypeFaceContext";
import Waterfall from "./typeface/Waterfall";
import TypeTester from "./typeface/TypeTester";
import { PortableText } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";
import { _localizeField } from "../sanity-api/utils";
import Figure from "./ui/Figure";
import clsx from "clsx";
import Btn from "./ui/buttons/Btn";
import RelatedProducts from "./product/RelatedProducts";
import { Dialog } from "./ui/Dialog";
import Buy from "./shop/Buy";

type Props = {
  input: Product;
};

const ContentProduct = ({ input }: Props) => {
  // console.log(input);
  const { title, singles, hero, text, images, related } = input;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const _scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className='content--product '>
      <div className='inner'>
        {hero && hero.image && (
          <section className='hero px-md'>
            <Figure asset={hero.image.asset} />
          </section>
        )}
        <Waterfall title={title || ""} items={singles || []} />
        <section className='about px-md' id='about'>
          <h2 className='md:text-2xl'>About {title}</h2>
          <div className='text'>
            <PortableText
              value={_localizeField(text)}
              components={portableTextComponents}
            />
          </div>
        </section>
        <section className='tester' id='tester'>
          <TypeTester singles={singles || []} />
        </section>
        <section className='images px-md'>
          <div className='grid md:grid-cols-2 gap-md'>
            {images?.map((item, i) => (
              <div
                className={clsx(
                  "grid-item col-span-1",
                  item.colSize === 2 && "col-span-2"
                )}
                key={i}>
                <Figure asset={item.image?.image?.asset || null} />
              </div>
            ))}
          </div>
        </section>
        <nav className='py-xl-'>
          <ul className='flex justify-center gap-3xs'>
            <li>
              <Btn label='Styles' onClick={() => _scrollTo("waterfall")} />
            </li>
            <li>
              <Btn label='About' onClick={() => _scrollTo("about")} />
            </li>
            <li>
              <Btn label='Test' onClick={() => _scrollTo("tester")} />
            </li>
            <li>
              <Btn
                label='Purtchase'
                variant='accent'
                onClick={() => setIsOpen(true)}
              />
            </li>
          </ul>
        </nav>
      </div>

      {related && (
        <RelatedProducts
          title='Discover our other fonts'
          items={related || []}
        />
      )}

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Buy input={input} />
      </Dialog>
      {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
    </div>
  );
};

export default ContentProduct;
