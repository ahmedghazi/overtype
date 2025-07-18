"use client";
import React from "react";
import { Project } from "../types/schema";
import Figure from "./ui/Figure";
import Modules from "./modules";
import { _localizeField } from "../sanity-api/utils";
import { PortableText } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";

type Props = {
  input: Project;
};

const ContentProject = ({ input }: Props) => {
  const { title, modules, hero, text } = input;
  return (
    <div className='content--project px-xs md:px-md'>
      <div className='h-3xl md:h-[112px]'></div>
      {hero && (
        <section className='hero'>
          <Figure asset={hero.image?.asset || null} />
        </section>
      )}
      <div className='c-container'>
        <h1>{_localizeField(title)}</h1>
        {text && (
          <div className='text'>
            <PortableText
              value={_localizeField(text)}
              components={portableTextComponents}
            />
          </div>
        )}
      </div>
      {modules && <Modules modules={modules} />}
    </div>
  );
};

export default ContentProject;
