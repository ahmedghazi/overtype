import React, { useEffect, useState } from "react";
import BtnPill from "../ui/buttons/BtnPill";
import { publish } from "pubsub-js";
import clsx from "clsx";

type Props = {
  type: "title" | "paragraph";
};

const TesterTextType = ({ type }: Props) => {
  const [textType, setTextType] = useState<"title" | "paragraph">(type);
  useEffect(() => {
    publish("TESTER_TEXT", { type: textType });
  }, [textType]);

  return (
    <div className='tester-text-type flex flex-wrap gap-0.5'>
      <div
        className={clsx(
          "ui-btn ui-btn--pill",
          textType === "title" && "is-active"
        )}
        onClick={() => setTextType("title")}>
        <span>Title</span>
      </div>
      <div
        className={clsx(
          "ui-btn ui-btn--pill",
          textType === "paragraph" && "is-active"
        )}
        onClick={() => setTextType("paragraph")}>
        <span>Paragraph</span>
      </div>
    </div>
  );
};

export default TesterTextType;
