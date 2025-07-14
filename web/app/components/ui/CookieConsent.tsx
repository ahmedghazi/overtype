"use client";
import React from "react";
import { hasCookie, setCookie, deleteCookie } from "cookies-next";

const CookieConsent = () => {
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
      <div className='inner flex justify-between gap-xl '>
        <div className=''>
          This website uses cookies to ensure you get the best experience. Learn
          more in our Privacy Policy.
        </div>
        <div className='flex gap-3xs'>
          <button
            className='ui-btn ui-btn__accent'
            onClick={() => acceptCookie()}>
            ACCEPT
          </button>
          <button className='ui-btn' onClick={() => refuseCookie()}>
            DECLINE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
