"use client";
import React from "react";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { _localizeField } from "@/app/sanity-api/utils";
import { FaqUI, KeyVal } from "@/app/types/schema";
import { PortableText } from "next-sanity";
import "./ModuleFaqUI.scss";

type FaqItemProps = {
  input: KeyVal;
  index: number;
};
const FaqItem = ({ input, index }: FaqItemProps) => {
  return (
    <div className='faq-item' id={`item-${index}`}>
      <h3 className='md:text-xl'>{input.key}</h3>
      <div className='text'>
        <PortableText
          value={_localizeField(input.val)}
          components={portableTextComponents}
        />
      </div>
    </div>
  );
};

type Props = {
  input: FaqUI;
};
const ModuleFaqUI = ({ input }: Props) => {
  const { items } = input;
  const _scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className='module module--faq-ui test px-md'>
      <div className='c-container'>
        <nav className='faq'>
          <ul className='flex text-sm'>
            {items?.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => _scrollTo(`item-${i}`)}
                  className='ui-cartouche'>
                  {item.key}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {items?.map((item, i) => (
          <FaqItem key={i} input={item} index={i} />
        ))}
      </div>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
    </section>
  );
};

export default ModuleFaqUI;
