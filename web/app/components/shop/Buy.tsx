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

type Props = {
  input: Product;
};

const Buy = ({ input }: Props) => {
  // console.log(input);
  const { settings } = usePageContext();
  const { licenses } = settings;
  const {
    licenseType,
    setLicenseType,
    isLogo,
    setIsLogo,
    dialogProducts,
    setDialogProducts,
  } = useShop();

  const _updateLicense = (license: LicenseType) => {
    setLicenseType(license);
    setDialogProducts({ type: "REMOVE_ALL" });
    // setProducts({ type: "REMOVE_ALL" });
  };
  // console.log(licenseType);
  return (
    <div className='buy'>
      <div className='header'>
        <h2 className='md:text-2xl'>Purchase {input.title}</h2>
        <p>
          Pricing scales with your company size. Our licenses are all-in-one,
          you can use the font anywhere. Just add the “logo/wordmark” option if
          you're using it in a logo. Have a quick look at our EULA to make sure
          you're all set.
        </p>
      </div>
      <div className='body'>
        <section>
          <h3 className='md:text-sm'>1/ Select your license</h3>
          <div className='box rounded bg-btn'>
            <div>
              <div className='header'>
                <h4 className='md:text-lg'>What’s your company size?</h4>
                <BtnToolTip text='It’s the size of the end user’s company that matters (not the size of the agency or service provider).' />
              </div>
              <div className='content'>
                <div className='flex flex-col gap-3xs'>
                  {licenses?.map((item, i) => (
                    <Radio
                      key={i}
                      name='licenseSize'
                      isChecked={licenseType === item}
                      label={
                        _localizeField(item.label) +
                        ": (x" +
                        item.priceMultiplier +
                        ")"
                      }
                      subLabel={_localizeField(item.infos)}
                      onChange={() => _updateLicense(item)}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* <div className='header'>
              <h4 className='md:text-lg'>
                Would you use the font in a logo/wordmark?
              </h4>
              <BtnToolTip text='It’s the size of the end user’s company that matters (not the size of the agency or service provider).' />
            </div>
            <div className='content'>
              <div className='flex flex-col gap-3xs'>
                <Radio
                  name='forLogo'
                  label='Yes'
                  isChecked={isLogo}
                  onChange={() => setIsLogo(true)}
                />
                <Radio
                  name='forLogo'
                  label='No'
                  isChecked={!isLogo}
                  onChange={() => setIsLogo(false)}
                />
              </div>
            </div> */}
          </div>
        </section>
        {licenseType && (
          <>
            <section>
              <h3 className='md:text-sm'>2/ Select your styles</h3>
              <div className='box rounded bg-btn'>
                <div className='header'>
                  <h4 className='md:text-lg'>Packs</h4>
                </div>

                <div className='content'>
                  <div className='flex flex-col gap-3xs'>
                    {input.bundles?.map((item, i) => (
                      <BuyBundle
                        key={i}
                        input={item}
                        typefaceName={input.title || ""}
                        background={input.background?.hex || ""}
                        foreground={input.foreground?.hex || ""}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h3 className='md:text-sm'>2/ Select your styles</h3>
              <div className='box rounded bg-btn'>
                <div className='header'>
                  <h4 className='md:text-lg'>Single Styles</h4>
                </div>
                <div className='content'>
                  <div className='grid md:grid-cols-2 gap-3xs'>
                    {input.singles?.map((item, i) => (
                      <TypeFaceContextProvider key={i}>
                        <BuySingle
                          key={i}
                          input={item}
                          typefaceName={input.title || ""}
                          background={input.background?.hex || ""}
                          foreground={input.foreground?.hex || ""}
                        />
                      </TypeFaceContextProvider>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className='flex  justify-center py-2xl'>
              <AddToCart items={dialogProducts} />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Buy;
