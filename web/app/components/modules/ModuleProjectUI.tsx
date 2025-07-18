import React from "react";
import clsx from "clsx";
import { ProjectsUI } from "@/app/types/schema";
import LinkWithIcon from "../ui/buttons/LinkWithIcon";
import CardFontInUse from "../CardFontInUse";
import CardProject from "../CardProject";
import "./ModuleProjectsUI.scss";
import { _linkResolver } from "@/app/sanity-api/utils";

interface Props {
  input: ProjectsUI;
}

const ModuleProjectsUI = ({ input }: Props) => {
  const { title, items, cta } = input;

  return (
    <section className={clsx("module module--projects-ui px-xs md:px-md")}>
      <div className='header mb-lg '>
        <h2 className='sans'>{title}</h2>
        {cta && (
          <div className='actions'>
            <LinkWithIcon
              label='View All'
              link={_linkResolver(cta?.link)}
              icon='arrow-e'
            />
          </div>
        )}
      </div>
      <div className='items'>
        <div className='grid md:grid-cols-2 gap-md'>
          {items?.map((item, i) => (
            <CardProject key={i} input={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModuleProjectsUI;
