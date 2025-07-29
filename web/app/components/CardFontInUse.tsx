"use client";
import React from "react";
import { FontInUse } from "../types/schema";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import Figure from "./ui/Figure";
import BtnLink from "./ui/buttons/BtnLink";
import BtnIcon from "./ui/buttons/BtnIcon";

type Props = {
  input: FontInUse;
};

const CardFontInUse = ({ input }: Props) => {
  const { image, title, product, source } = input;
  return (
    <article className='card card--font-in-use'>
      <div className='image rounded'>
        {image && <Figure asset={image?.image?.asset} />}
        {/* <div className='overlay'>
          <BtnIcon icon='see' onClick={() => {}} />
        </div> */}
      </div>
      <div className='header'>
        <div>
          <h3 className=''>{_localizeField(title)}</h3>
          <div className='by'>by {source}</div>
        </div>

        {product && (
          <BtnLink
            label={product?.title || ""}
            link={_linkResolver(product)}
            background={product?.background?.hex || "var(--color-bg)"}
            foreground={product?.foreground?.hex || "var(--color-primary)"}
          />
        )}
      </div>
    </article>
  );
};

export default CardFontInUse;
