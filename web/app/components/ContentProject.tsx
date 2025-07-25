"use client";
import React from "react";
import { Project } from "../types/schema";
import Figure from "./ui/Figure";
import Modules from "./modules";
import { _localizeField } from "../sanity-api/utils";
import { PortableText } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";
import CardProject from "./CardProject";

type Props = {
  input: Project;
};

const ContentProject = ({ input }: Props) => {
  const { title, modules, hero, text, related } = input;
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

      {related && (
        <section className='related md:mt-12xl'>
          <div className='header mb-lg'>
            <h2 className='md:text-2xl'>Next projects</h2>
            {/* <div className='actions md:tex-lg text-secondary'>
          <LinkWithIcon
            label='View All'
            link={_linkResolver(shopPage)}
            icon='arrow-e'
          />
        </div> */}
          </div>
          <div className='items'>
            <div className='grid md:grid-cols-2 gap-md'>
              {related?.map((item, i) => (
                <CardProject key={i} input={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ContentProject;
