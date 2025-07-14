import React from "react";
import Logo from "./Logo";

type Props = {};

const ContentLanding = (props: Props) => {
  return (
    <div className='content content--landing'>
      <div className='c-container '>
        <div className=''>
          <div className='body center-x-y h-screen'>
            <div className='flex flex-col items-center gap-lg'>
              <Logo />
              <p className='md:text-xl'>
                Overtype is a type design studio uniting expressivity and
                functionality to craft high-end, contemporary fonts.
              </p>
              <p className='md:text-lg text-secondary'>Website coming soon…</p>
            </div>
          </div>
          <div className='footer'>
            <ul className='flex justify-center gap-2xl'>
              <li>
                <a href='http://' target='_blank' rel='noopener noreferrer'>
                  Instagram
                </a>
              </li>
              <li>
                <a href='http://' target='_blank' rel='noopener noreferrer'>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLanding;
