import React, { useState } from "react";
import clsx from "clsx";

type Props = {
  text: string;
  size?: "sm" | "md" | "lg";
};

const BtnToolTip = ({ text, size = "sm" }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <button
      className={clsx(
        "ui-btn ui-btn--tooltip has-blur",
        size === "sm" && "ui-btn--tooltip__sm rounded",
        size === "md" && "ui-btn--tooltip__md",
        size === "lg" && "ui-btn--tooltip__lg"
      )}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}>
      <span className='icon'>?</span>
      {active && <div className='tooltip'>{text}</div>}
    </button>
  );
};

export default BtnToolTip;
