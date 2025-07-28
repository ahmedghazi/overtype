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
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import Figure from "./ui/Figure";
import clsx from "clsx";
import Btn from "./ui/buttons/Btn";
import RelatedProducts from "./product/RelatedProducts";
import { Dialog } from "./ui/Dialog";
import Buy from "./shop/Buy";
import HeroSlider from "./HeroSlider";
import CardFontInUse from "./CardFontInUse";
import LinkWithIcon from "./ui/buttons/LinkWithIcon";
import { usePageContext } from "../context/PageContext";

type Props = {
  input: Product;
};

const ContentProduct = ({ input }: Props) => {
  // console.log(input);
  const { title, singles, hero, text, images, inUse, inUseCta, related } =
    input;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const _scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  const {
    settings: { shopPage },
  } = usePageContext();

  return (
    <div className='content--product '>
      <div className='inner'>
        {/* {hero && hero.image && (
          <section className='hero px-md'>
            <Figure asset={hero.image.asset} />
          </section>
        )} */}
        <HeroSlider input={hero || []} />
        <Waterfall title={title || ""} items={singles || []} />
        <section className='about px-md' id='about'>
          <h2 className='text-xl md:text-2xl'>About {title}</h2>
          <div className='text'>
            <PortableText
              value={_localizeField(text)}
              components={portableTextComponents}
            />
          </div>
        </section>
        <section className='tester px-md' id='tester'>
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
          <ul className='flex flex-col md:flex-row justify-center gap-3xs'>
            <li className='hidden-sm'>
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
                label='Purchase'
                variant='accent'
                onClick={() => setIsOpen(true)}
              />
            </li>
          </ul>
        </nav>
      </div>

      {/* <pre>{JSON.stringify(inUse, null, 2)}</pre> */}
      {inUse && (
        <section className='in-use px-md-'>
          <div className='header mb-lg px-xs md:px-md'>
            <h2 className='sans'>In Use</h2>
            <div className='actions'>
              <LinkWithIcon
                label={inUseCta?.label || "View"}
                link={inUseCta?.link || ""}
                icon='arrow-e'
              />
            </div>
          </div>
          <div className='items'>
            <div className='scroll-x px-xs md:px-md'>
              <div className='flex gap-md'>
                {inUse?.map((item, i) => (
                  <CardFontInUse key={i} input={item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
