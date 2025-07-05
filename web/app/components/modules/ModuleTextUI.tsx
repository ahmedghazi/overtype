"use client";
import React from "react";
import clsx from "clsx";
import { TextUI } from "@/app/types/schema";
import { PortableText } from "next-sanity";
import { _localizeField } from "@/app/sanity-api/utils";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import "./ModuleTextUI.scss";

interface Props {
  input: TextUI;
}

const ModuleTextUI = ({ input }: Props) => {
  const { text, title, fullWidth } = input;
  return (
    <section
      className={clsx("module module--text-ui px-md", fullWidth && "w-full")}>
      {title && <h2 className='md:text-2xl'>{title}</h2>}
      <div className='text '>
        <PortableText
          value={_localizeField(text)}
          components={portableTextComponents}
        />
      </div>
    </section>
  );
};

export default ModuleTextUI;
