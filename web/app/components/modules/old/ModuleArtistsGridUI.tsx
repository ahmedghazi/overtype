import React, { useRef } from "react";
import clsx from "clsx";
import { PortableText } from "@portabletext/react";
import Figure from "../ui/Figure";
import { ArtistsGridUI } from "@/app/types/schema";
import CardArtist from "../CardArtist";
import AOS from "../ui/AOS";
import { _localizeField } from "@/app/sanity-api/utils";
import "./ModuleArtistsGridUI.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  input: ArtistsGridUI;
}

const ModuleArtistsGridUI = ({ input }: Props) => {
  const { items = [] } = input;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("h2, li", { opacity: 0, y: "10", stagger: 0.1 });
    },
    { scope: ref }
  );
  return (
    <section className='module module--artists-grid-ui' ref={ref}>
      <div className='grid grid-cols-2 md:grid-cols-8 gap-y-lg'>
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "artist-goup col-span-2",
              `md:col-span-${item.items?.length}`
            )}>
            <h2 className='text-lg--mobile md:text-xl'>
              {_localizeField(item.tag?.title)}
            </h2>
            <div className='items'>
              <ul
                className={clsx(
                  "grid gap-y-md",
                  `grid-cols-2 md:grid-cols-${item.items?.length}`
                )}>
                {item.items?.map((item, _index) => (
                  <li key={_index}>
                    <CardArtist input={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ModuleArtistsGridUI;
