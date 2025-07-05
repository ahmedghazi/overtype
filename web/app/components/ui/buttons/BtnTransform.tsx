import clsx from "clsx";
import React, { useEffect, useState } from "react";
import BtnPill from "./BtnPill";

type Props = {
  onClick?: (value: "none" | "uppercase" | "lowercase") => void;
};

const BtnTransform = ({ onClick }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const [textTransform, setTextTransform] = useState<
    "none" | "uppercase" | "lowercase"
  >("none");
  const [label, setLabel] = useState<"Aa" | "AA" | "aa">("Aa");

  useEffect(() => {
    if (typeof onClick === "function") onClick(textTransform);
    if (textTransform === "none") setLabel("Aa");
    if (textTransform === "uppercase") setLabel("AA");
    if (textTransform === "lowercase") setLabel("aa");
  }, [textTransform]);

  const _onClick = () => {
    setActive(!active);
    const arr = ["none", "uppercase", "lowercase"] as const;
    const index = arr.indexOf(textTransform);
    const nextIndex = (index + 1) % arr.length;
    setTextTransform(arr[nextIndex]);
  };

  return <BtnPill label={label} onClick={_onClick} />;
};

export default BtnTransform;
