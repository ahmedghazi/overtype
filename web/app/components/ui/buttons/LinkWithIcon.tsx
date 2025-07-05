import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = {
  link: string;
  label: string;
  icon?: "arrow-e" | "arrow-s";
};

const LinkWithIcon = ({ label, link, icon }: Props) => {
  return (
    <Link
      href={link}
      className={clsx("ui-link color-secondary", icon && "has-icon")}>
      <span>{label}</span>
      {icon && (
        <span className='icon'>
          {icon === "arrow-e" && <i className='icon-arrow-e'>→</i>}
          {icon === "arrow-s" && <i className='icon-arrow-s'>↓</i>}
        </span>
      )}
    </Link>
  );
};

export default LinkWithIcon;
