import React from "react";
import clsx from "clsx";
import { FontsInUseUI } from "@/app/types/schema";
import LinkWithIcon from "../ui/buttons/LinkWithIcon";
import CardFontInUse from "../CardFontInUse";
import "./ModuleFontsInUseUI.scss";
import { usePageContext } from "@/app/context/PageContext";
import { _linkResolver } from "@/app/sanity-api/utils";

interface Props {
  input: FontsInUseUI;
}

const ModuleFontsInUseUI = ({ input }: Props) => {
  const { title, cta, items } = input;
  const {
    settings: { shopPage },
  } = usePageContext();

  return (
    <section className={clsx("module module--fonts-in-use-ui ")}>
      <div className='header mb-lg px-xs md:px-md'>
        <h2 className='sans'>{title}</h2>
        <div className='actions'>
          <LinkWithIcon
            label={cta?.label || "View All"}
            link={cta?.link || "/"}
            icon='arrow-e'
          />
        </div>
      </div>
      <div className='items'>
        <div className='scroll-x px-xs md:px-md'>
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
