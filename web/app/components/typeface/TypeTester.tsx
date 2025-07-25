import { ProductSingle } from "@/app/types/schema";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "../ui/inputs/Select";
import useTypeFace, { TypeFaceContextProvider } from "./TypeFaceContext";
import Range from "../ui/inputs/Range";
import BtnTransform from "../ui/buttons/BtnTransform";
import BtnAlign from "../ui/buttons/BtnAlign";
import clsx from "clsx";
import Btn from "../ui/buttons/Btn";
import Draggable from "react-draggable";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";
import { usePageContext } from "@/app/context/PageContext";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import TesterTextType from "./TesterTextType";
import "./TypeTester.scss";
import BtnIcon from "../ui/buttons/BtnIcon";

interface TextPrevizewProps {
  ref?: React.RefObject<HTMLDivElement>;
  pangram: string;
  isParagraph: boolean;
}

const TextPrevizew = React.forwardRef<HTMLDivElement, TextPrevizewProps>(
  ({ pangram, isParagraph }, ref) => {
    TextPrevizew.displayName = "TextPrevizew";
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
          isParagraph && "md:columns-3 gap-md"
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

interface AsideProps {
  singles: ProductSingle[];
  target: HTMLDivElement | null;
  textType: "title" | "paragraph";
}
const Aside = ({ singles, target, textType }: AsideProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState<boolean>(false);
  const { type, dispatchType } = useTypeFace();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [textTansform, setTextTansform] = useState<
    "none" | "capitalize" | "uppercase" | "lowercase"
  >("none");
  const [textAlign, setTextAlign] = useState<string>("center");
  const { isMobile } = useDeviceDetect();
  const [initialSize, setInitialSize] = useState<string>(
    isMobile ? "56" : "100"
  );
  useEffect(() => {
    setReady(true);
    const initialType = singles.find((el) => el.isDefault);
    if (initialType) dispatchType(initialType.typeface);
  }, []);

  useEffect(() => {
    if (textType === "paragraph") setInitialSize(isMobile ? "14" : "12");
    else setInitialSize(isMobile ? "56" : "100");
  }, [textType, isMobile]);

  useEffect(() => {
    // console.log(target, textTansform, textAlign);
    if (target) {
      target.style.setProperty("--text-transform", textTansform);
      target.style.setProperty("--text-align", textAlign);
    }
  }, [textTansform, textAlign]);

  const fontStyles = useMemo(() => {
    return singles.map((item, i) => ({
      key: i,
      label: item.typeface?.title,
      value: item.typeface?.slug?.current,
      // selected: item.isDefault,
    }));
  }, [singles]);

  const defaultStyle = useMemo(() => {
    return singles.find((el) => el.isDefault);
  }, [singles]);

  const getSingleBySlug = (slug: string) => {
    return singles.find((el) => el.typeface?.slug?.current === slug);
  };

  if (!ready) return null;
  return (
    <Draggable handle='.handle' nodeRef={nodeRef}>
      <aside className='rounded' ref={nodeRef}>
        <div className='handle'></div>

        <div className=''>
          <Select
            name='font-tyles'
            options={fontStyles}
            defaultValue={defaultStyle?.typeface?.slug?.current}
            onChange={(e: any) => {
              const single = getSingleBySlug(e);
              if (single) dispatchType(single.typeface);
            }}
          />
        </div>
        {target && (
          <div
            className={clsx("body pt-0 md:pt-3xl", {
              "is-collapsed": collapse,
            })}>
            <div className='sizes md:mb-3xl'>
              <Range
                min='12'
                max='200'
                step='1'
                unit='px'
                label='Size'
                initialValue={initialSize}
                target={target}
                cssVar='--font-size'
              />
              <Range
                min='-0.2'
                max='0.2'
                step='0.005'
                initialValue='0'
                unit='em'
                label='Letter spacing'
                target={target}
                cssVar='--letter-spacing'
              />
              <Range
                min='0.7'
                max='2'
                step='0.1'
                unit=''
                label='Line height'
                initialValue='1'
                target={target}
                cssVar='--line-height'
              />
            </div>
            <div className='styles'>
              <select className='ui-select mb-2xs' name='open-type' id=''>
                <option value='ss01'>ss01</option>
                <option value='ss02'>ss02</option>
                <option value='ss03'>ss03</option>
              </select>
              <div className='flex flex-wrap items-start gap-0.5 gap-y-2xs'>
                <TesterTextType type={textType} />

                <div className='wrap'></div>

                <BtnTransform
                  onClick={(val) => {
                    setTextTansform(val);
                  }}
                />
                <BtnAlign
                  onClick={(val) => {
                    setTextAlign(val);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className='footer'>
          {/* <Btn size='md' onClick={() => setCollapse(!collapse)}>
            {!collapse ? (
              <i className='icon-mask'></i>
            ) : (
              <i className='icon-see'></i>
            )}
          </Btn> */}

          <BtnIcon
            icon={collapse ? "see" : "mask"}
            onClick={() => setCollapse(!collapse)}
          />
        </div>
      </aside>
    </Draggable>
  );
};

type TypeTesterProps = {
  singles: ProductSingle[];
};

const TypeTester = ({ singles }: TypeTesterProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [textType, setTextType] = useState<"title" | "paragraph">("title");
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setReady(true);
    const token = subscribe("TESTER_TEXT", (msg, { type }) => {
      setTextType(type);
    });
    // console.log(previewRef);
    // if (!previewRef.current) {
    setTimeout(() => {
      const fallbackPreviewRef = document.querySelector(
        ".canvas .t-preview"
      ) as HTMLDivElement;
      setTarget(fallbackPreviewRef);
      // if (fallbackPreviewRef) previewRef.current = fallbackPreviewRef;
    }, 250);
    // }
    return () => {
      unsubscribe(token);
    };
  }, []);

  const {
    settings: { pangrams },
  } = usePageContext();

  const randomPagran = useMemo(() => {
    if (!pangrams) return "";
    const randomIndex = Math.floor(Math.random() * pangrams.length);
    return pangrams[randomIndex];
  }, [pangrams]);

  return (
    <div className='type-tester rounded'>
      <TypeFaceContextProvider>
        <div className='canvas'>
          <TextPrevizew
            ref={previewRef}
            pangram={textType === "title" ? "Test font here" : randomPagran}
            isParagraph={textType === "paragraph"}
          />
        </div>
        {ready && (
          <Aside singles={singles} target={target} textType={textType} />
        )}
      </TypeFaceContextProvider>
    </div>
  );
};

export default TypeTester;
