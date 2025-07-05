import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = {
  label?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  variant?: "accent";
};

const Btn = ({ label, children, size = "md", onClick, variant }: Props) => {
  const _onClick = () => {
    if (typeof onClick === "function") onClick();
  };
  return (
    <button
      className={clsx(
        "ui-btn has-blur",
        size === "sm" && "ui-btn--sm",
        variant === "accent" && "ui-btn__accent"
      )}
      onClick={_onClick}>
      {children || label}
    </button>
  );
};

export default Btn;
