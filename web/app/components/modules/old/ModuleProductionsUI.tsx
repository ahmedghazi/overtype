"use client";
import React, { useEffect, useState } from "react";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { _localizeField } from "@/app/sanity-api/utils";
import { ProductionsUI } from "@/app/types/schema";
import { PortableText } from "next-sanity";
import ProductionItemComponent from "../ProductionItem";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import "./ModuleProductionsUI.scss";

type Props = {
  input: ProductionsUI;
};

const ModuleProductionsUI = ({ input }: Props) => {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <section className='module module--productions-ui px-sm'>
      <div className='intro grid md:grid-cols-2 gap-sm'>
        <div className='text text-lg-alt--mobile md:text-xl'>
          <PortableText
            value={_localizeField(input.text)}
            components={portableTextComponents}
          />
        </div>
        <div className='featured'>
          {input.featured && (
            <ProductionItemComponent
              input={input.featured}
              className='featured-item'
            />
          )}
        </div>
      </div>

      {ready && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}>
          <Masonry>
            {input.items?.map((item, i) => (
              <ProductionItemComponent key={i} input={item} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}

      <div className='footer sans'>
        <PortableText
          value={_localizeField(input.footer)}
          components={portableTextComponents}
        />
      </div>
    </section>
  );
};

export default ModuleProductionsUI;
