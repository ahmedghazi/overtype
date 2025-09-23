import { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import Accordion from "../components/ui/Accordion";
import Figure from "../components/ui/Figure";
import KeyValStringComponent from "../components/ui/KeyValString";
import { _linkResolver } from "./utils";

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className='md:text-xl'>{children}</h2>,
    "text-lg": ({ children }) => (
      <p className='text-2xl md:text-3xl'>{children}</p>
    ),
  },
  types: {
    image: ({ value }) => {
      return <Figure asset={value.asset} />;
    },

    accordion: ({ value }) => {
      return <Accordion input={value} />;
    },
    keyValString: ({ value }) => {
      return <KeyValStringComponent input={value} />;
    },
  },

  marks: {
    linkInternal: ({ children, value }) => {
      return <Link href={_linkResolver(value.reference)}>{children}</Link>;
    },

    linkExternal: ({ children, value }) => {
      const { href, cta } = value;

      return (
        <a
          href={href}
          rel={"noreferrer noopener"}
          target='_blank'
          className={cta ? "ui-btn ui-btn__accent " : ""}>
          <span>{children}</span>
        </a>
      );
    },
    align_left: ({ children }) => (
      <span className='text-left block'>{children}</span>
    ),
    align_center: ({ children }) => (
      <span className='text-center block'>{children}</span>
    ),
    align_right: ({ children }) => (
      <span className='text-right block'>{children}</span>
    ),
  },
};

export default portableTextComponents;
