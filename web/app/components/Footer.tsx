"use client";
import React from "react";
import { Settings } from "../types/schema";
import { usePageContext } from "../context/PageContext";
import { PortableText } from "next-sanity";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import portableTextComponents from "../sanity-api/portableTextComponents";
import Link from "next/link";
import website from "../config/website";

type Props = {
  settings: Settings;
};

const Footer = (props: Props) => {
  const { settings } = usePageContext();
  const { footerCta, navSecondary } = settings;
  return (
    <>
      <div className='text md:my-12xl px-md footer-cta'>
        <PortableText
          value={_localizeField(footerCta)}
          components={portableTextComponents}
        />
      </div>

      <footer className='rounded px-md'>
        <div className='inner'>
          <nav id='nav-secondary'>
            <div className='grid md:grid-cols-6 gap-md'>
              {navSecondary?.map((item, index) => (
                <div key={index}>
                  <h4 className='md:text-sm text-secondary'>
                    {_localizeField(item.title)}
                  </h4>
                  <ul className='md:text-lg'>
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
          <div className='credits text-secondary md:text-sm'>
            <div className='copy'>
              © {new Date().getFullYear()} {website.title}
            </div>
            <div className='colophon'>
              Designed by us Developed by{" "}
              <a
                href='http://ahmedghazi.com'
                target='_blank'
                rel='noopener noreferrer'>
                a_e_a_i_
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
