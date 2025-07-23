import clsx from "clsx";
import React, { useEffect, useState } from "react";

type Props = {
  label: string;
  withIcon?: "dotGreen" | "textLeft" | "textCenter";
  withActive?: boolean;
  onClick?: (active: boolean) => void;
  isActive?: boolean;
};

const BtnPill = ({
  label,
  withIcon,
  withActive = true,
  onClick,
  isActive = false,
}: Props) => {
  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    if (typeof onClick === "function") onClick(active);
  }, [active]);

  useEffect(() => {
    if (isActive) setActive(isActive);
  }, [isActive]);

  return (
    <div
      className={clsx(
        "ui-btn ui-btn--pill",
        withIcon && "has-icon",
        withActive && active && "is-active"
      )}
      onClick={() => setActive(!active)}>
      {withIcon && (
        <span className='icon'>
          {withIcon === "dotGreen" && <i className='icon-dot-green'></i>}
          {withIcon === "textCenter" && <i className='icon-text-center'></i>}
          {withIcon === "textLeft" && <i className='icon-text-left'></i>}
        </span>
      )}
      <span>{label}</span>
    </div>
  );
};

export default BtnPill;
