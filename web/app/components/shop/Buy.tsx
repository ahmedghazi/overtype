import React, { useEffect, useState } from "react";
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
import { ProductData } from "@/app/types/extra-types";
import TextOrEmailOrNumberInput from "../ui/inputs/TextOrEmailOrNumberInput";

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
    companySizeText,
    toolTipLicenseFor,
    toolTipCompanyName,
    toolTipEmail,
    toolTipInUseFor,
  } = settings;

  const {
    licenseType,
    setLicenseType,
    isLogo,
    setIsLogo,
    dialogProducts,
    setDialogProducts,
    licenseFor,
    setLicenseFor,
    setLicenseForValue,
    licenseForData,
    setLicenseForData,
  } = useShop();

  const _updateLicense = (license: LicenseType) => {
    //reset
    setDialogProducts({ type: "REMOVE_ALL" });
    setLicenseType(null);
    setTimeout(() => {
      setLicenseType(license);
    }, 150);
  };

  // useEffect(() => {
  //   //if isLogo changes, update dialogProducts
  //   dialogProducts.forEach((item: ProductData) => {
  //     const newItem = { ...item };
  //     newItem.isLogo = isLogo;
  //     if (isLogo === "Yes" && logoPriceMultiplier) {
  //       newItem.price *= 1 + logoPriceMultiplier;
  //     } else {
  //       newItem.price /= 1 + logoPriceMultiplier;
  //     }
  //     console.log(newItem);
  //     setDialogProducts({ type: "REPLACE", payload: newItem });
  //   });
  // }, [isLogo]);

  const messageDialogBuyLocalized = _localizeField(messageDialogBuy);
  // console.log(messageDialogBuyLocalized);
  return (
    <div className='buy'>
      <div className='header'>
        <h2 className='text-2xl'>Purchase {input.title}</h2>
        {messageDialogBuyLocalized && (
          <PortableText
            value={messageDialogBuyLocalized}
            components={portableTextComponents}
          />
        )}
      </div>
      <div className='body'>
        <h3 className='text-sm'>1/ Select your license</h3>

        <section className='licenseFor box rounded bg-btn mb-3xl!'>
          <form action='' onSubmit={(e) => e.preventDefault()}>
            <div className='box'>
              <div className='form-field ui-radio--group'>
                <div className='header'>
                  <h4 className='text-lg'>
                    The typeface is being used in a project for
                  </h4>
                  <BtnToolTip text={_localizeField(toolTipLicenseFor)} />
                </div>
                <div className='grid grid-cols-2 gap-2xs'>
                  <Radio
                    name='lincenseFor'
                    label='me'
                    isChecked={licenseFor === "me"}
                    onChange={(value) => setLicenseFor(value)}
                  />
                  <Radio
                    name='lincenseFor'
                    label='client'
                    // isChecked={isLogo}
                    isChecked={licenseFor === "client"}
                    onChange={(value) => setLicenseFor(value)}
                  />
                </div>
              </div>
              <div className='form-field'>
                <TextOrEmailOrNumberInput
                  label={
                    licenseFor === "me"
                      ? "Your company name"
                      : "Your client’s company name"
                  }
                  name='companyName'
                  type='text'
                  required
                  onChange={(e) => {
                    setLicenseForData({
                      ...licenseForData,
                      companyName: e.target.value,
                    });
                    // setLicenseForValue(e.target.value);
                  }}
                  tooltip={_localizeField(toolTipCompanyName)}
                />
              </div>
            </div>
          </form>
        </section>
        <section className='licenseType box rounded bg-btn mb-3xl!'>
          <div className='header'>
            <h4 className='text-md md:text-lg'>What’s your company size?</h4>
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
            {companySizeText && (
              <div className='text-sm pt-sm px-md'>
                <a
                  href='mailto:contact@overtypefoundry.com'
                  className='underline!'>
                  {_localizeField(companySizeText)}
                </a>
              </div>
            )}
          </div>
        </section>

        {logoPriceMultiplier && (
          <section className='isLogo box rounded bg-btn mb-3xl'>
            <div className='logo'>
              <div className='header'>
                <h4 className='text-md md:text-lg'>
                  Will the font be used in a logo or wordmark?
                </h4>
                <BtnToolTip text={_localizeField(toolTipLogo)} />
              </div>
              <div className='content'>
                <div className='grid md:grid-cols-2 gap-3xs'>
                  <Radio
                    name='forLogo'
                    label='Yes'
                    isChecked={isLogo === "Yes"}
                    onChange={() => setIsLogo("Yes")}
                  />
                  <Radio
                    name='forLogo'
                    label='No'
                    isChecked={isLogo === "No"}
                    onChange={() => setIsLogo("No")}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
        {/* <pre>{JSON.stringify(isLogo, null, 2)}</pre> */}
        {licenseType && isLogo !== undefined && (
          <>
            <h3 className='md:text-sm'>2/ Select your styles</h3>

            {input.bundles && (
              <section className=' box rounded bg-btn mb-3xl!'>
                <div className='box-item mb-3xl'>
                  <div className='header'>
                    <h4 className='text-md md:text-lg'>Bundles</h4>
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
              </section>
            )}
            {input.singles && (
              <section className=' box rounded bg-btn mb-3xl!'>
                <div className='box-item'>
                  <div className='header'>
                    <h4 className='text-md md:text-lg'>Single Styles</h4>
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
              </section>
            )}

            <section className='flex  justify-center px-2xl !py-2xl'>
              <AddToCart items={dialogProducts} />
            </section>
            {/* <pre>{JSON.stringify(dialogProducts, null, 2)}</pre> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Buy;
