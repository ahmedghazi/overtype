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
  >("lowercase");
  const [label, setLabel] = useState<"Aa" | "AA" | "aa">("aa");

  useEffect(() => {
    if (typeof onClick === "function") onClick(textTransform);
    switch (textTransform) {
      case "none":
        setLabel("Aa");
        break;
      case "uppercase":
        setLabel("AA");
        break;
      case "lowercase":
        setLabel("aa");
        break;
    }
  }, [textTransform]);

  const _onClick = () => {
    setActive(!active);
    const arr = ["none", "uppercase", "lowercase"] as const;
    const index = arr.indexOf(textTransform);
    const nextIndex = (index + 1) % arr.length;
    console.log(arr[nextIndex]);
    setTextTransform(arr[nextIndex]);
  };

  return <BtnPill label={label} onClick={_onClick} />;
};

export default BtnTransform;
