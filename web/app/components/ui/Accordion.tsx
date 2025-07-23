"use client";
import React, { useRef, useState } from "react";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { _localizeField } from "@/app/sanity-api/utils";
import { Accordion, KeyVal } from "@/app/types/schema";
import clsx from "clsx";
import { PortableText } from "next-sanity";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

const AccordionItem = ({ item }: { item: KeyVal }) => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      // gsap code here...
      gsap.to(ref.current, {
        height: active ? "auto" : 0,
        duration: 0.3,
      }); // <-- automatically reverted
    },
    { scope: ref, dependencies: [active] }
  ); // <-- scope is for selector text (optional)

  return (
    <div className={clsx("accordion--item", active && "is-active")}>
      <div className='header' onClick={() => setActive(!active)}>
        <h3>{item.key}</h3>
        <div>
          {active ? (
            <i className='icon icon-minus'></i>
          ) : (
            <i className='icon icon-plus'></i>
          )}
        </div>
      </div>
      <div className='detail' ref={ref}>
        <div className='pb-lg'>
          <div className='text'>
            <PortableText
              value={_localizeField(item.val)}
              components={portableTextComponents}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  input: Accordion;
};

const AccordionComponent = ({ input }: Props) => {
  const { items, links } = input;
  return (
    <div className='accordion'>
      {items?.map((item, index) => (
        <AccordionItem key={index} item={item} />
      ))}
      {links?.map((link, index) => (
        <div className='accordion--item' key={index}>
          {link._type === "linkFile" && (
            <a
              href={link.file?.asset.url}
              target='_blank'
              rel='noopener noreferrer'>
              <div className='header'>
                <h3 className='label'>{link.label}</h3>
                <div>
                  <i className='icon-download'></i>
                </div>
              </div>
            </a>
          )}
          {/* {link._type === "linkInternal" &&
            <Link href={_linkResolver(link.link)}>{link.label}</Link>
          }
          {link._type === "linkExternal" &&
            <a href={link.link} target="_blank" rel="noopener noreferrer">{link.label}</a>
          } */}
        </div>
      ))}
      {/* <pre>{JSON.stringify(links, null, 2)}</pre> */}
    </div>
  );
};

export default AccordionComponent;
