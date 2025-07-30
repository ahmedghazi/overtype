import React, { useEffect, useMemo, useRef, useState } from "react";
import useTypeFace from "./TypeFaceContext";
import clsx from "clsx";

interface TextPrevizewProps {
  ref?: React.RefObject<HTMLDivElement>;
  pangram: string;
  isParagraph: boolean;
}

const TextPreview = React.forwardRef<HTMLDivElement, TextPrevizewProps>(
  ({ pangram, isParagraph }, ref) => {
    TextPreview.displayName = "TextPreview";
    const { type } = useTypeFace();

    const [content, setContent] = useState(pangram || "AaBbCcXx");
    useEffect(() => {
      setContent(pangram || "AaBbCcXx");
    }, [pangram]);

    const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
      setContent(e.target.textContent || "");
    };

    if (!type) return null;

    return (
      <div
        ref={ref}
        className={clsx(
          "t-preview md:text-10xl",
          isParagraph && "is-paragraph"
        )}
        contentEditable={true}
        suppressContentEditableWarning={true}
        spellCheck='false'
        autoCorrect='off'
        // onInput={handleContentChange}
        // dangerouslySetInnerHTML={{ __html: content }}
        style={{
          fontFamily: type.slug?.current || "inherit",
        }}>
        {content}
      </div>
    );
  }
);

export default TextPreview;
