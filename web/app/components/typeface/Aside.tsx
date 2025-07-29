import React, { useEffect, useMemo, useRef, useState } from "react";
import useTypeFace from "./TypeFaceContext";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";
import clsx from "clsx";
import Draggable from "react-draggable";
import Select from "../ui/inputs/Select";
import Range from "../ui/inputs/Range";
import { ProductSingle } from "@/app/types/schema";
import TesterTextType from "./TesterTextType";
import BtnTransform from "../ui/buttons/BtnTransform";
import BtnAlign from "../ui/buttons/BtnAlign";
import BtnIcon from "../ui/buttons/BtnIcon";

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
            className={clsx("body pt-0 md:pt-3xl-", {
              "is-collapsed": collapse,
            })}>
            <div className='sizes md:mb-3xl-'>
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
                min='-0.1'
                max='0.15'
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
          <BtnIcon
            icon={collapse ? "see" : "mask"}
            onClick={() => setCollapse(!collapse)}
          />
        </div>
      </aside>
    </Draggable>
  );
};

export default Aside;
