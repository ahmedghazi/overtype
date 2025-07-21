import { ProductSingle } from "@/app/types/schema";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BtnPill from "../ui/buttons/BtnPill";
import Select from "../ui/inputs/Select";
import useTypeFace, { TypeFaceContextProvider } from "./TypeFaceContext";
import Range from "../ui/inputs/Range";
import BtnTransform from "../ui/buttons/BtnTransform";
import BtnAlign from "../ui/buttons/BtnAlign";
import clsx from "clsx";
import Btn from "../ui/buttons/Btn";
import Draggable from "react-draggable";
import "./TypeTester.scss";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";

interface TextPrevizewProps {
  ref?: React.RefObject<HTMLDivElement>;
}

const TextPrevizew = React.forwardRef<HTMLDivElement, TextPrevizewProps>(
  (props, ref) => {
    TextPrevizew.displayName = "TextPrevizew";
    const { type } = useTypeFace();
    const [content, setContent] = useState("Test the font here");

    const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
      setContent(e.target.textContent || "");
    };

    if (!type)
      return (
        <div
          ref={ref}
          className='t-preview text-10xl'
          contentEditable={true}
          suppressContentEditableWarning={true}
          spellCheck='false'
          autoCorrect='off'
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );

    return (
      <div
        ref={ref}
        className='t-preview text-10xl'
        contentEditable={true}
        suppressContentEditableWarning={true}
        spellCheck='false'
        autoCorrect='off'
        onInput={handleContentChange}
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          fontFamily: type.slug?.current || "inherit",
        }}
      />
    );
  }
);

interface AsideProps {
  singles: ProductSingle[];
  target: HTMLDivElement | null;
}
const Aside = ({ singles, target }: AsideProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState<boolean>(false);
  const { type, dispatchType } = useTypeFace();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [textTansform, setTextTansform] = useState<
    "none" | "capitalize" | "uppercase" | "lowercase"
  >("none");
  const [textAlign, setTextAlign] = useState<string>("left");
  const { isMobile } = useDeviceDetect();
  const initialSize = isMobile ? "56" : "100";

  useEffect(() => {
    setReady(true);
    const initialType = singles.find((el) => el.isDefault);
    if (initialType) dispatchType(initialType.typeface);
  }, []);

  useEffect(() => {
    if (target) {
      target.style.textTransform = textTansform;
      target.style.textAlign = textAlign;
    }
  }, [textTansform, textAlign]);

  const fontStyles = useMemo(() => {
    return singles.map((item, i) => ({
      key: i,
      value: item.typeface,
      label: item.typeface?.title,
    }));
  }, [singles]);

  const _modulo = (arr: string[], value: string) => {
    const index = arr.indexOf(value);
    const nextIndex = (index + 1) % arr.length;
    return arr[nextIndex];
  };
  const _getY = () => {
    const wh = window.innerHeight;
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
            onChange={(e: any) => dispatchType(e.value)}
          />
        </div>
        <div
          className={clsx("body pt-0 md:pt-3xl", {
            "is-collapsed": collapse,
          })}>
          <div className='sizes md:mb-3xl'>
            {target && (
              <>
                <Range
                  min='12'
                  max='300'
                  step='1'
                  unit='px'
                  label='Size'
                  initialValue={initialSize}
                  target={target}
                  cssVar='--font-size'
                />
                <Range
                  min='-5'
                  max='5'
                  step='0.005'
                  initialValue='0'
                  unit='em'
                  label='Letter spacing'
                  target={target}
                  cssVar='--letter-spacing'
                />
                <Range
                  min='0'
                  max='2'
                  step='0.1'
                  unit=''
                  label='Line height'
                  initialValue='1'
                  target={target}
                  cssVar='--line-height'
                />
              </>
            )}
          </div>
          <div className='styles'>
            <select
              className='ui-select mb-2xs'
              name='open-type'
              id=''></select>
            <div className='flex flex-wrap items-start gap-0.5 gap-y-2xs'>
              <BtnPill label='Title' />
              <BtnPill label='Paragraph' />
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
        <div className='footer'>
          <Btn size='md' onClick={() => setCollapse(!collapse)}>
            {collapse ? (
              <i className='icon-mask'></i>
            ) : (
              <i className='icon-see'></i>
            )}
          </Btn>
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

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className='type-tester'>
      <TypeFaceContextProvider>
        <div className='canvas'>
          <TextPrevizew ref={previewRef} />
        </div>
        {ready && <Aside singles={singles} target={previewRef.current} />}
      </TypeFaceContextProvider>
    </div>
  );
};

export default TypeTester;
