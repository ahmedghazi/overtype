import Link from "next/link";
import React from "react";

type Props = {
  label: string;
  link: string;
  background?: string;
  foreground?: string;
};

const BtnLink = ({ label, link, background, foreground }: Props) => {
  return (
    <Link
      className='ui-btn'
      href={link}
      style={{ background, color: foreground }}>
      {label}
    </Link>
  );
};

export default BtnLink;
