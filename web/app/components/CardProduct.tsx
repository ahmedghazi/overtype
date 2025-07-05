"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../types/schema";
import Link from "next/link";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import useTypeFace from "./typeface/TypeFaceContext";
import { _ProductExtend } from "../types/extra-types";
import clsx from "clsx";
import BtnPill from "./ui/buttons/BtnPill";

type Props = {
  input: Product;
  layout?: "wide" | "square";
};

const CardProduct = ({ input, layout }: Props) => {
  // console.log(input);
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
          <h3 className='text-10xl'>AaXxHhGg {input.title}</h3>
        </div>
      </Link>
      {input.tag && (
        <BtnPill label={_localizeField(input.tag.title)} withIcon='dotGreen' />
      )}
    </article>
  );
};

export default CardProduct;
