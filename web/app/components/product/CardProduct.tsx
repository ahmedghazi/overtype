"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../types/schema";
import Link from "next/link";
import { _linkResolver, _localizeField } from "../../sanity-api/utils";
import useTypeFace from "../typeface/TypeFaceContext";
import clsx from "clsx";
import BtnPill from "../ui/buttons/BtnPill";
import BtnIcon from "../ui/buttons/BtnIcon";

type Props = {
  input: Product;
  layout?: "wide" | "square";
};

const CardProduct = ({ input, layout }: Props) => {
  console.log(input);
  const { type, dispatchType } = useTypeFace();
  const [ready, setReady] = useState(false);
  const defaultTypeface = input.defaultTypeface;

  useEffect(() => {
    if (!defaultTypeface) return;
    dispatchType(defaultTypeface);
    setReady(true);
  }, [input]);

  if (!defaultTypeface) return null;
  const style = {
    background: input.background.hex || "var(--color-bg)",
    color: input.foreground.hex || "var(--color-primary)",
  };
  return (
    <article
      className={clsx(
        "card  card--product card__rounded",
        {
          "opacity-0": !ready,
        },
        layout === "square" && "is-square"
      )}
      style={style}>
      <Link href={_linkResolver(input)}>
        {/* {_linkResolver(input)} */}
        <div
          className='t-preview'
          style={{
            fontFamily: type?.slug?.current,
          }}>
          <h3 className='text-10xl'>{input.title}</h3>
        </div>
      </Link>
      <div className='gradient'></div>
      <div className='header'>
        {input.tag && (
          <BtnPill
            label={_localizeField(input.tag.title)}
            withIcon='dotGreen'
          />
        )}
      </div>
      <div className='footer'>
        <div className='group'>
          <div className='title ui-cartouche'>{input.title}</div>
          <div className='styles ui-cartouche'>
            <span>{input.singles?.length}</span> <span>styles</span>
          </div>
        </div>
        <div className='group'>
          <BtnIcon icon='see' />
        </div>
      </div>
    </article>
  );
};

export default CardProduct;
