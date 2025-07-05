import React from "react";
import clsx from "clsx";
import { FontsInUseUI } from "@/app/types/schema";
import LinkWithIcon from "../ui/buttons/LinkWithIcon";
import CardFontInUse from "../CardFontInUse";
import "./ModuleFontsInUseUI.scss";

interface Props {
  input: FontsInUseUI;
}

const ModuleFontsInUseUI = ({ input }: Props) => {
  const { title, items } = input;

  return (
    <section className={clsx("module module--fonts-in-use-ui ")}>
      <div className='header mb-lg px-md'>
        <h2 className='sans'>{title}</h2>
        <div className='actions'>
          <LinkWithIcon label='View All' link='/products' icon='arrow-e' />
        </div>
      </div>
      <div className='items'>
        <div className='scroll-x px-md'>
          <div className='flex gap-md'>
            {items?.map((item, i) => (
              <CardFontInUse key={i} input={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleFontsInUseUI;
