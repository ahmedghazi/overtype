"use client";
import React, { useEffect, useState } from "react";
import useShop from "./ShopContext";
import { subscribe, unsubscribe } from "pubsub-js";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import ProductImage from "./ProductImage";
import TextOrEmailInput from "../ui/inputs/TextOrEmailInput";
import RadioGroup from "../ui/inputs/RadioGroup";
import BtnCheckout from "./Checkout";
import { cartTotalPrice } from "./utils";
import { ProductData } from "@/app/types/extra-types";
import Link from "next/link";
import { usePageContext } from "@/app/context/PageContext";
import { _linkResolver, _localizeField } from "@/app/sanity-api/utils";
import CartItem from "./CartItem";
import Radio from "../ui/inputs/Radio";
import BtnToolTip from "../ui/buttons/BtnToolTip";
import { PortableText } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";

type Props = {};

const Cart = (props: Props) => {
  // alert("here");
  const {
    products,
    setProducts,
    licenseFor,
    setLicenseFor,
    licenseForData,
    setLicenseForData,
  } = useShop();
  const { settings } = usePageContext();
  const {
    toolTipLocenseFor,
    toolTipCompanyName,
    toolTipEmail,
    toolTipInUseFor,
    textOptin,
  } = settings;
  const isEmpty = products.length === 0;
  const [canCheckout, setCanCheckout] = useState<boolean>(false);
  const [optin, setOptin] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    // console.log(licenseForData);
    const allFieldsFilled =
      licenseForData.companyName != "" &&
      licenseForData.email != "" &&
      licenseForData.inUseFor != "" &&
      optin === true;
    setCanCheckout(allFieldsFilled);
  }, [licenseForData, optin]);
  // console.log(products);
  // const [open, setOpen] = useState<boolean>(false);
  // const [licenseFor, setLicenseFor] = useState<"me" | "client">("me");
  // const [licenseForData, setLicenseForData] = useState<LicenseForData>({
  //   companyName: "",
  //   email: "",
  //   inUseFor: "",
  // });
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    const tokenOpen = subscribe("CART_OPEN", () => {
      // setOpen(true);
    });

    return () => {
      unsubscribe(tokenOpen);
    };
  }, []);

  const _delete = (sku: string) => {
    setProducts({ type: "REMOVE_BY_SKU", payload: sku });
  };

  // console.log("products");
  // console.log(products);
  return (
    <div className={clsx("cart", { "is-empty": isEmpty })}>
      <div className='inner'>
        <div className='header'>
          <h2 className='text-2xl'>Cart</h2>
        </div>
        <div className='body'>
          {isEmpty && (
            <section className='cart-empty py-xl flex justify-center'>
              <div className='flex flex-col items-center gap-md'>
                <div className='text-2xl '>Your cart is empty</div>
                <Link
                  href={_linkResolver(settings.shopPage)}
                  className='ui-btn ui-btn__accent'>
                  Explore our catalogue
                </Link>
              </div>
            </section>
          )}
        </div>
        {products && products.length > 0 && (
          <div className='cart-content'>
            <section className='products mb-lg flex flex-col gap-2xs'>
              {products &&
                products.map((item, i) => (
                  <CartItem
                    key={i}
                    input={item}
                    _delete={() => _delete(item.sku)}
                  />
                ))}
            </section>
            <section className='total mb-4xl'>
              <div className='label'>Total (excl. VAT)</div>
              <div className='price'>{cartTotalPrice(products)}€ </div>
            </section>
            <section className='licenseFor md:mb-4xl- mb-2xl- rounded'>
              <form action='' onSubmit={(e) => e.preventDefault()}>
                <div className='box'>
                  <div className='form-field ui-radio--group'>
                    <div className='header'>
                      <h4 className='text-lg'>Who is the license owner?</h4>
                      <BtnToolTip text={_localizeField(toolTipLocenseFor)} />
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
                    <TextOrEmailInput
                      label='Company name'
                      name='companyName'
                      type='text'
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          companyName: e.target.value,
                        });
                      }}
                      tooltip={_localizeField(toolTipCompanyName)}
                    />
                  </div>
                  <div className='form-field'>
                    <TextOrEmailInput
                      label='Email'
                      name='email'
                      type='email'
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          email: e.target.value,
                        });
                      }}
                      tooltip={_localizeField(toolTipEmail)}
                    />
                  </div>
                  <div className='form-field'>
                    <TextOrEmailInput
                      label='Where the font will be used?'
                      name='inUseFor'
                      type='text'
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          inUseFor: e.target.value,
                        });
                      }}
                      tooltip={_localizeField(toolTipInUseFor)}
                    />
                  </div>
                </div>
              </form>
            </section>

            <section className='optin md:mb-4xl mb-2xl mt-md'>
              <div className='form-field optin'>
                <input
                  type='checkbox'
                  id='optin'
                  required
                  onChange={(e) => {
                    setOptin(e.target.checked);
                    setStatus("optin");
                  }}
                />
                <label htmlFor='optin'>
                  <PortableText
                    value={_localizeField(textOptin)}
                    components={portableTextComponents}
                  />
                </label>
              </div>
            </section>

            <section className='checkout'>
              <BtnCheckout canCheckout={canCheckout} />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

// const _sampleProducts: ProductData[] = [
//   {
//     type: "ProductSingle",
//     sku: "bundle-last-duo",
//     price: 120,
//     discount: 25,
//     finalPrice: 90,
//     typefaceName: "Last",
//     background: "rgba(107, 21, 255, 1)",
//     foreground: "white",
//     title: "Duo",
//     description: "",
//     isLogo: false,
//     license: "SM",
//     licenseInfos: "(1-5 workers)",
//   },
//   {
//     type: "ProductSingle",
//     sku: "single-last-regular-italic",
//     price: 60,
//     discount: 0,
//     finalPrice: 60,
//     typefaceName: "Demorny",
//     background: "rgba(255, 103, 21, 1)",
//     foreground: "white",
//     title: "Regular Italic",
//     description: "",
//     isLogo: true,
//     license: "XL",
//     licenseInfos: "(6-20 workers)",
//   },
// ];
