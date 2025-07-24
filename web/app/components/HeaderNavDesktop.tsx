import React, { useEffect, useState } from "react";
import { LinkExternal, LinkInternal, Settings } from "../types/schema";
import clsx from "clsx";
import Link from "next/link";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import { ThemeToggle } from "./ThemeToggle";
import BtnCart from "./shop/BtnCart";
import BtnIcon from "./ui/buttons/BtnIcon";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { usePathname } from "next/navigation";

const NavItem = ({ item }: { item: LinkInternal | LinkExternal }) => {
  if (item._type === "linkInternal") {
    return (
      <Link href={_linkResolver(item.link)} className='ui-cartouche has-blur'>
        <div className=''>{_localizeField(item.label)}</div>
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
        <div className=''>{item.label}</div>
      </a>
    );
  }
};

type Props = {
  settings: Settings;
};

const HeaderNavDesktop = ({ settings }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { isMobile } = useDeviceDetect();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className='header-nav header-nav__desktop flex-1'>
      <div className='sm-only wrapper-open'>
        <button className='ui-cartouche has-blur' onClick={() => setOpen(true)}>
          Menu
        </button>
      </div>
      <div
        className={clsx(
          "sm-only wrapper-close",
          isMobile && !open && "hidden!"
        )}>
        <BtnIcon icon='close' onClick={() => setOpen(false)} />
      </div>
      <ul
        className={clsx(
          "menu flex justify-between gap-3xs ",
          isMobile && !open && "hidden"
        )}>
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
      </ul>
      <ul className='actions flex gap-3xs'>
        <li>
          <ThemeToggle />
        </li>
        <li>
          <BtnCart />
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavDesktop;
