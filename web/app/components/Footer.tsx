"use client";
import React from "react";
import { Settings } from "../types/schema";
import { usePageContext } from "../context/PageContext";
import { PortableText } from "next-sanity";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import portableTextComponents from "../sanity-api/portableTextComponents";
import Link from "next/link";
import website from "../config/website";
import FooterNav from "./FooterNav";

type Props = {
  settings: Settings;
};

const Footer = (props: Props) => {
  const { settings } = usePageContext();
  const { footerCta, navSecondary } = settings;
  return (
    <div className='footer-group p-xs md:p-md'>
      <div className='text  md:my-12xl- px-xs- md:px-md- footer-cta'>
        <PortableText
          value={_localizeField(footerCta)}
          components={portableTextComponents}
        />
      </div>

      <footer className=' '>
        <div className='inner rounded'>
          <FooterNav settings={settings} />
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
    </div>
  );
};

export default Footer;
