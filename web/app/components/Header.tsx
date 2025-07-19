"use client";
import React from "react";
import { Settings } from "../types/schema";
import Link from "next/link";
import Logo from "./Logo";
import HeaderNavDesktop from "./HeaderNavDesktop";
import useDeviceDetect from "../hooks/useDeviceDetect";
import HeaderNavMobile from "./HeaderNavMobile";

type Props = {
  settings: Settings;
};

const Header = (props: Props) => {
  const { settings } = props;
  const { isMobile } = useDeviceDetect();
  return (
    <header>
      <div className='flex gap-xl'>
        <div className='site-name'>
          <Link href='/'>
            <Logo />
          </Link>
        </div>
        {isMobile ? (
          <HeaderNavMobile settings={settings} />
        ) : (
          <HeaderNavDesktop settings={settings} />
        )}
      </div>
    </header>
  );
};

export default Header;
