"use client";
import React from "react";
import { PageModulaire } from "../types/schema";
import Modules from "./modules";
import Figure from "./ui/Figure";
import { _localizeField } from "../sanity-api/utils";
import clsx from "clsx";

type Props = {
  input: PageModulaire;
};

const ContentModulaire = ({ input }: Props) => {
  // console.log(input);
  const hasHero = input.hero && input.hero.image;
  const displayTitle = hasHero || input.titleXL;
  return (
    <div className='content--modulaire'>
      {hasHero && (
        <section className='hero'>
          <Figure asset={input.hero?.image?.asset || null} />
        </section>
      )}
      {displayTitle && (
        <div className='c-container'>
          <h1
            className={clsx(
              "md:text-2xl mb-4xl md:text-center",
              input.titleXL && "md:text-3xl"
            )}>
            {_localizeField(input.title)}
          </h1>
        </div>
      )}
      {input.modules && <Modules modules={input.modules} />}
    </div>
  );
};

export default ContentModulaire;
