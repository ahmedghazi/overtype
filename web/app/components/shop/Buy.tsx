import React, { useState } from "react";
import { LicenseType, Product } from "@/app/types/schema";
import Radio from "../ui/inputs/Radio";
import BtnToolTip from "../ui/buttons/BtnToolTip";
import { usePageContext } from "@/app/context/PageContext";
import { _localizeField } from "@/app/sanity-api/utils";
import BuyBundle from "./BuyBundle";
import useShop, { ShopWrapper } from "./ShopContext";
import AddToCart from "./AddToCart";

import BuySingle from "./BuySingle";
import { TypeFaceContextProvider } from "../typeface/TypeFaceContext";
import BtnPill from "../ui/buttons/BtnPill";
import { PortableText } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";

type Props = {
  input: Product;
};

const Buy = ({ input }: Props) => {
  // console.log(input);
  const { settings } = usePageContext();
  const {
    licenses,
    toolTipLicenses,
    toolTipLogo,
    messageDialogBuy,
    logoPriceMultiplier,
  } = settings;
  const {
    licenseType,
    setLicenseType,
    isLogo,
    setIsLogo,
    dialogProducts,
    setDialogProducts,
  } = useShop();

  const _updateLicense = (license: LicenseType) => {
    //reset
    setDialogProducts({ type: "REMOVE_ALL" });
    setLicenseType(null);
    setTimeout(() => {
      setLicenseType(license);
    }, 150);
  };
  return (
    <div className='buy'>
      <div className='header'>
        <h2 className='text-2xl'>Purchase {input.title}</h2>
        {messageDialogBuy && (
          <PortableText
            value={messageDialogBuy}
            components={portableTextComponents}
          />
        )}
      </div>
      <div className='body'>
        <section>
          <h3 className='text-sm'>1/ Select your license</h3>
          <div className='box rounded bg-btn'>
            <div className='mb-3xl'>
              <div className='header'>
                <h4 className='text-md md:text-lg'>
                  What’s your company size?
                </h4>
                <BtnToolTip text={_localizeField(toolTipLicenses)} />
              </div>
              <div className='content'>
                <div className='flex flex-col gap-3xs'>
                  {licenses?.map((item, i) => (
                    <Radio
                      key={i}
                      name='licenseSize'
                      isChecked={licenseType === item}
                      label={_localizeField(item.label)}
                      subLabel={_localizeField(item.infos)}
                      onChange={() => _updateLicense(item)}
                    />
                  ))}
                </div>
                <div className='text-sm pt-sm px-md'>
                  <a href='mailto:contact@overtype.com' className='underline!'>
                    More than 300 workers? contact us
                  </a>
                </div>
              </div>
            </div>
            {logoPriceMultiplier && (
              <div className='logo'>
                <div className='header'>
                  <h4 className='text-md md:text-lg'>
                    Would you use the font in a logo/wordmark?
                  </h4>
                  <BtnToolTip text={_localizeField(toolTipLogo)} />
                </div>
                <div className='content'>
                  <div className='grid md:grid-cols-2 gap-3xs'>
                    <Radio
                      name='forLogo'
                      label='Yes'
                      isChecked={isLogo === true}
                      onChange={() => setIsLogo(true)}
                    />
                    <Radio
                      name='forLogo'
                      label='No'
                      isChecked={isLogo === false}
                      onChange={() => setIsLogo(false)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        {/* <pre>{JSON.stringify(isLogo, null, 2)}</pre> */}
        {licenseType && (isLogo === false || isLogo === true) && (
          <>
            <section>
              <h3 className='md:text-sm'>2/ Select your styles</h3>
              <div className='box rounded bg-btn'>
                {input.bundles && (
                  <div className='box-item'>
                    <div className='header'>
                      <h4 className='text-md md:text-lg'>Packs</h4>
                    </div>
                    <div className='content'>
                      <div className='flex flex-col gap-3xs'>
                        {input.bundles?.map((item, i) => (
                          <BuyBundle
                            key={i}
                            product={input}
                            input={item}
                            background={input.background?.hex || ""}
                            foreground={input.foreground?.hex || ""}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {input.singles && (
                  <div className='box-item mt-3xl'>
                    <div className='header'>
                      <h4 className='text-md md:text-lg'>Single Styles</h4>
                      <div className='text-sm ui-btn--pill ui-btn--pill__accent sm-only'>
                        <span>-50% on the 2nd style</span>
                      </div>
                    </div>
                    <div className='content'>
                      <div className='grid md:grid-cols-2 gap-3xs'>
                        {input.singles?.map((item, i) => (
                          <TypeFaceContextProvider key={i}>
                            <BuySingle
                              key={i}
                              input={item}
                              product={input}
                              background={input.background?.hex || ""}
                              foreground={input.foreground?.hex || ""}
                            />
                          </TypeFaceContextProvider>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
            <section className='flex  justify-center px-2xl py-2xl'>
              <AddToCart items={dialogProducts} />
              {/* <pre>{JSON.stringify(dialogProducts, null, 2)}</pre> */}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Buy;
