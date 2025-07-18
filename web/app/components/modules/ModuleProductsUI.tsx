"use client";
import React from "react";
import clsx from "clsx";
import CardProduct from "../product/CardProduct";
import { TypeFaceContextProvider } from "../typeface/TypeFaceContext";
import LinkWithIcon from "../ui/buttons/LinkWithIcon";
import "./ModuleProductsUI.scss";
import { Product } from "@/app/types/schema";
import { usePageContext } from "@/app/context/PageContext";
import { _linkResolver } from "@/app/sanity-api/utils";

interface Props {
  input: {
    title: string;
    withToggle?: boolean;
    withCta?: boolean;
    items: Product[];
  };
}

const ModuleProductsUI = ({ input }: Props) => {
  const { title, items, withToggle, withCta } = input;
  const [view, setView] = React.useState("list");
  const { settings } = usePageContext();
  const { shopPage } = settings;
  return (
    <section className={clsx("module module--products-ui px-xs md:px-md")}>
      <div className='header mb-lg'>
        <h2 className='sans'>{title}</h2>
        <div className='actions md:tex-lg'>
          {/* <Link href={"/products"}>View all</Link> */}
          {withCta && shopPage && (
            <LinkWithIcon
              label='View All'
              link={_linkResolver(shopPage)}
              icon='arrow-e'
            />
          )}
          {withToggle && (
            <>
              <button className='toggle' onClick={() => setView("list")}>
                List
              </button>
              <button className='toggle' onClick={() => setView("grid")}>
                Grid
              </button>
            </>
          )}
        </div>
      </div>
      {view === "list" && (
        <div className='view flex flex-col gap-xs md:gap-md'>
          {items?.map((item, index) => (
            <div className='item' key={index}>
              <TypeFaceContextProvider>
                <CardProduct key={index} input={item} />
              </TypeFaceContextProvider>
            </div>
          ))}
        </div>
      )}
      {view === "grid" && (
        <div className='view grid md:grid-cols-2 gap-xs md:gap-md'>
          {items?.map((item, index) => (
            <div className='item' key={index}>
              <TypeFaceContextProvider>
                <CardProduct key={index} input={item} />
              </TypeFaceContextProvider>
            </div>
          ))}
        </div>
      )}

      <div className='footer sm-only pt-2xl'>
        {withCta && shopPage && (
          <div className='flex justify-center text-lg'>
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

export default ModuleProductsUI;
