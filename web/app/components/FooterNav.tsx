import React from "react";
import { Settings } from "../types/schema";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import Link from "next/link";

type Props = {
  settings: Settings;
};

const FooterNav = ({ settings }: Props) => {
  const { navSecondary } = settings;
  return (
    <nav id='nav-secondary'>
      <div className='grid md:grid-cols-6 gap-md'>
        {navSecondary?.map((item, index) => (
          <div key={index}>
            <h4 className='text-sm text-secondary'>
              {_localizeField(item.title)}
            </h4>
            <ul className='text-xl md:text-lg'>
              {item.items?.map((item, index) => (
                <li key={index}>
                  {item._type === "linkInternal" && (
                    <Link href={_linkResolver(item.link)}>
                      {_localizeField(item.label)}
                    </Link>
                  )}
                  {item._type === "linkExternal" && (
                    <a
                      href={item.link}
                      target='_blank'
                      rel='noopener noreferrer'>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default FooterNav;
