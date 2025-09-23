import { PortableTextComponents } from "@portabletext/react";
// import { urlFor } from "./sanity-utils";
// import Image from "next/image";
import Link from "next/link";
import { _linkResolver } from "./utils";
import Accordion from "../components/ui/Accordion";
import Figure from "../components/ui/Figure";
import KeyValStringComponent from "../components/ui/KeyValString";
// import Figure from "../components/ui/Figure";
// import clsx from "clsx";
// import { VideoWrapper } from "../components/ui/player";

const portableTextComponents: PortableTextComponents = {
  // block(props) {
  //   console.log(props)
  //   switch (props.node?.style) {
  //     case "h2":
  //       return <h2>{props.children}</h2>
  //     case "text-lg":
  //       return <p className="text-lg">{props.children}</p>
  //     case "text-xl":
  //       return <p className="text-xl">{props.children}</p>
  //     default:
  //       return <p>{props.children}</p>
  //   }
  // },
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
    // pill: ({ children, value }) => {
    //   let background = value.background;
    //   if (background && background !== "" && background.indexOf("#") === -1)
    //     background = `#${background}`;
    //   return (
    //     <span
    //       className='pill pill--md'
    //       style={{
    //         background: background,
    //       }}>
    //       {children}
    //     </span>
    //   );
    // },
  },
};

export default portableTextComponents;
