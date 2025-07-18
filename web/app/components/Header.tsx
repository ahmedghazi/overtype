"use client";
import React from "react";
import { LinkExternal, LinkInternal, Settings } from "../types/schema";
import Link from "next/link";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import BtnCart from "./shop/BtnCart";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import clsx from "clsx";
import HeaderNav from "./HeaderNav";

type Props = {
  settings: Settings;
};

const Header = (props: Props) => {
  const { settings } = props;
  return (
    <header>
      <div className='flex gap-xl'>
        <div className='site-name'>
          <Link href='/'>
            <Logo />
          </Link>
        </div>
        <HeaderNav settings={settings} />
      </div>
    </header>
  );
};

export default Header;
