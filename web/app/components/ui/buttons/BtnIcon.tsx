"use client";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

type Props = {
  icon?:
    | "dotGreen"
    | "textLeft"
    | "textCenter"
    | "dark-mode"
    | "cart"
    | "question"
    | "delete"
    | "see"
    | "close";
  size?: "sm" | "md" | "lg";
  onClick?: (active: boolean) => void;
};

const BtnIcon = ({ icon, size = "md", onClick }: Props) => {
  const [active, setActive] = useState(false);

  const _onClick = () => {
    setActive(!active);
    if (typeof onClick === "function") onClick(active);
  };

  return (
    <button
      className={clsx(
        "ui-btn ui-btn--icon has-blur",
        `ui-btn--icon__${icon}`,
        size === "sm" && "ui-btn--icon__sm rounded",
        size === "md" && "ui-btn--icon__md",
        size === "lg" && "ui-btn--icon__lg"
      )}
      onClick={() => _onClick()}>
      <span className='icon'>
        {icon === "dotGreen" && <i className='icon-dot-green'></i>}
        {icon === "textCenter" && <i className='icon-text-center'></i>}
        {icon === "textLeft" && <i className='icon-text-left'></i>}
        {icon === "dark-mode" && <i className='icon-dark-mode'></i>}
        {icon === "cart" && <i className='icon-cart'></i>}
        {icon === "question" && <span className='icn-question'>?</span>}
        {icon === "delete" && <i className='icon-delete'></i>}
        {icon === "see" && <i className='icon-see'></i>}
        {icon === "close" && <i className='icon-close'></i>}
      </span>
    </button>
  );
};

export default BtnIcon;
