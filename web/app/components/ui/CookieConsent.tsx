"use client";
import React from "react";
import { hasCookie, setCookie, deleteCookie } from "cookies-next";
import { LocaleBlockContent } from "@/app/types/schema";
import { PortableText } from "next-sanity";
import { _localizeField } from "@/app/sanity-api/utils";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";

type Props = {
  msg: LocaleBlockContent;
};

const CookieConsent = ({ msg }: Props) => {
  const [showConsent, setShowConsent] = React.useState<
    boolean | Promise<boolean>
  >(true);
  const has: boolean | Promise<boolean> = hasCookie("localConsent");

  React.useEffect(() => {
    setShowConsent(has);
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
  };

  const refuseCookie = () => {
    setShowConsent(true);
    deleteCookie("localConsent");
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className='cookies has-blur'>
      <div className='inner flex justify-between items-center gap-xl '>
        <div className=''>
          <PortableText
            value={_localizeField(msg)}
            components={portableTextComponents}
          />
        </div>
        <div className='flex gap-3xs'>
          <button
            className='ui-btn ui-btn__accent'
            onClick={() => acceptCookie()}>
            Accept
          </button>
          <button className='ui-btn' onClick={() => refuseCookie()}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
