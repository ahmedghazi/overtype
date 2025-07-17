"use client";
import React from "react";
import { LinkExternal, LinkInternal, Settings } from "../types/schema";
import Link from "next/link";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import BtnCart from "./shop/BtnCart";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import clsx from "clsx";

type Props = {
  settings: Settings;
};

const NavItem = ({ item }: { item: LinkInternal | LinkExternal }) => {
  if (item._type === "linkInternal") {
    return (
      <Link href={_linkResolver(item.link)} className='ui-cartouche has-blur'>
        <div className='ui-cartouche- has-blur- '>
          {_localizeField(item.label)}
        </div>
      </Link>
    );
  }
  if (item._type === "linkExternal") {
    return (
      <a
        href={item.link}
        target='_blank'
        rel='noopener noreferrer'
        className='ui-cartouche has-blur'>
        <div className='ui-cartouche has-blur '>
          {_localizeField(item.label)}
        </div>
      </a>
    );
  }
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
        <nav className='flex-1'>
          <ul className='flex justify-between gap-3xs '>
            {settings.navPrimary?.map((item, i) => (
              <li
                key={i}
                className={clsx(
                  item._type === "linkInternal" && item.subMenu && "has-submenu"
                )}>
                <NavItem item={item} />
                {item._type === "linkInternal" && item.subMenu && (
                  <i className='icon icon-drop-down'></i>
                )}
                {item._type === "linkInternal" && item.subMenu && (
                  <ul className='sub-menu'>
                    {item.subMenu.map((subItem, i) => (
                      <li key={i} className='mb-3xs'>
                        <NavItem item={subItem} />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li className='actions flex gap-3xs'>
              <ThemeToggle />
              <BtnCart />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
