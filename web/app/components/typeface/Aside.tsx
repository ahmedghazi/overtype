import React, { useEffect, useMemo, useRef, useState } from "react";
import useTypeFace from "./TypeFaceContext";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";
import clsx from "clsx";
import Draggable from "react-draggable";
import Select from "../ui/inputs/Select";
import Range from "../ui/inputs/Range";
import { KeyVal, KeyValString, ProductSingle } from "@/app/types/schema";
import TesterTextType from "./TesterTextType";
import BtnTransform from "../ui/buttons/BtnTransform";
import BtnAlign from "../ui/buttons/BtnAlign";
import BtnIcon from "../ui/buttons/BtnIcon";
import TesterFeatures from "./TesterFeatures";

interface AsideProps {
  singles: ProductSingle[];
  target: HTMLDivElement | null;
  stylisticSets?: KeyValString[];
  openTypeFeatures?: KeyValString[];
  textType: "title" | "paragraph";
}

const Aside = ({
  singles,
  target,
  stylisticSets,
  openTypeFeatures,
  textType,
}: AsideProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState<boolean>(false);
  const { type, dispatchType } = useTypeFace();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [textTansform, setTextTansform] = useState<
    "none" | "capitalize" | "uppercase" | "lowercase"
  >("none");
  const [fontFeatures, setFontFeatures] = useState<any[]>([]);
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
    if (textType === "paragraph") setInitialSize(isMobile ? "14" : "56");
    else setInitialSize(isMobile ? "56" : "100");
  }, [textType, isMobile]);

  useEffect(() => {
    // console.log(target, textTansform, textAlign);
    if (target) {
      target.style.setProperty("--text-transform", textTansform);
      target.style.setProperty("--text-align", textAlign);
    }
  }, [textTansform, textAlign]);

  const fontStylesOptions = useMemo(() => {
    return singles.map((item, i) => ({
      key: i,
      label: item.typeface?.title,
      value: item.typeface?.slug?.current,
      // selected: item.isDefault,
    }));
  }, [singles]);

  const openTypeFeaturesOptions = useMemo(() => {
    return openTypeFeatures?.map((item, i) => ({
      key: i + "open-type-features",
      type: "open-type-features",
      label: item.key,
      value: item.val,
    }));
  }, [openTypeFeatures]);

  const stylisticSetsOptions = useMemo(() => {
    return stylisticSets?.map((item, i) => ({
      key: i + "stylistic-sets",
      type: "stylistic-sets",
      label: item.key,
      value: item.val,
    }));
  }, [stylisticSets]);

  const testerFeaturesOptions = useMemo(() => {
    const defaultValue = {
      key: "default",
      type: "default",
      label: "Features",
      value: "features",
    };
    const values = openTypeFeaturesOptions?.concat(stylisticSetsOptions || []);
    // .concat(defaultValue);
    // values?.unshift(defaultValue);
    return values;
    // const finalArray = values ? [defaultValue]?.concat(values) : values;
    // return [defaultValue].concat(values); // [ 4, 3, 2, 1 ]

    // return openTypeFeaturesOptions
    //   ?.concat(stylisticSetsOptions || [])
    //   .concat(defaultValue);
  }, [openTypeFeaturesOptions, stylisticSetsOptions]);

  const defaultStyle = useMemo(() => {
    return singles.find((el) => el.isDefault);
  }, [singles]);

  const getSingleBySlug = (slug: string) => {
    return singles.find((el) => el.typeface?.slug?.current === slug);
  };

  const _handleFeatures = (set: any[]) => {
    if (!target) return;
    if (set) {
      setFontFeatures(set);
    } else {
      setFontFeatures([]);
    }
  };

  useEffect(() => {
    if (!target) return;
    // console.log(fontFeatures);

    const fontFeatureSettings = fontFeatures.map((item) => {
      return `"${item.value}" on`;
    });
    // console.log(fontFeatureSettings);

    target.style.setProperty(
      "--font-feature-settings",
      fontFeatureSettings.join(", ")
    );
  }, [fontFeatures]);

  // console.log(stylisticSetsOptions);
  if (!ready) return null;
  return (
    <Draggable handle='.handle' nodeRef={nodeRef}>
      <aside className='rounded)' ref={nodeRef}>
        <div className='bg rounded'></div>
        <div className='handle'></div>

        <div className=''>
          <Select
            name='font-tyles'
            options={fontStylesOptions}
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
            <div className='sizes'>
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
              {testerFeaturesOptions && (
                <div className='mb-2xs'>
                  <TesterFeatures
                    options={testerFeaturesOptions}
                    label='Stylistic Sets'
                    onChange={(e: any) => {
                      _handleFeatures(e);
                    }}
                  />
                </div>
              )}

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
