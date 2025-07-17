"use client";
import React from "react";
import { Project } from "../types/schema";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import Figure from "./ui/Figure";
import Link from "next/link";
import BtnPill from "./ui/buttons/BtnPill";

type Props = {
  input: Project;
};

const CardProject = ({ input }: Props) => {
  const { imageCover, title, tag } = input;
  return (
    <article className='card card--project'>
      <Link href={_linkResolver(input)}>
        <div className='image rounded'>
          {imageCover && <Figure asset={imageCover?.asset} />}
        </div>
        {input.tag && (
          <div className='header-top text-sm'>
            <div className='tag  ui-cartouche has-blur'>
              {_localizeField(input.tag.title)}
            </div>
          </div>
        )}
        <div className='header'>
          <div>
            <h3 className=''>{_localizeField(title)}</h3>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CardProject;
