import clsx from "clsx";
import React, { useEffect, useState } from "react";
import BtnIcon from "./BtnIcon";

type Props = {
  onClick?: (value: "left" | "center" | "right") => void;
};

const BtnAlign = ({ onClick }: Props) => {
  const [active, setActive] = useState(false);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "center"
  );
  const [icon, setIcon] = useState<"textLeft" | "textCenter" | "textRight">(
    "textCenter"
  );

  useEffect(() => {
    if (typeof onClick === "function") onClick(textAlign);
    if (textAlign === "left") setIcon("textLeft");
    if (textAlign === "center") setIcon("textCenter");
    if (textAlign === "right") setIcon("textRight");
  }, [textAlign]);

  const _onClick = () => {
    setActive(!active);
    const arr = ["left", "center", "right"] as const;
    const index = arr.indexOf(textAlign);
    const nextIndex = (index + 1) % arr.length;
    setTextAlign(arr[nextIndex]);
  };
  return <BtnIcon icon={icon} size='sm' onClick={_onClick} />;
};

export default BtnAlign;
