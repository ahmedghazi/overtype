"use client";
import React, { useEffect, useState } from "react";
import useShop from "./ShopContext";
import { subscribe, unsubscribe } from "pubsub-js";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import BtnCheckout from "./Checkout";
import { cartTotalPrice } from "./utils";
import Link from "next/link";
import { usePageContext } from "@/app/context/PageContext";
import { _linkResolver, _localizeField } from "@/app/sanity-api/utils";
import CartItem from "./CartItem";
import Radio from "../ui/inputs/Radio";
import BtnToolTip from "../ui/buttons/BtnToolTip";
import { PortableText } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import TextOrEmailOrNumberInput from "../ui/inputs/TextOrEmailOrNumberInput";
import Select from "../ui/inputs/Select";
import countries from "../ui/inputs/countries.json";

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
    toolTipLicenseFor,
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
      !!licenseForData.email &&
      !!licenseForData.first_name &&
      !!licenseForData.last_name &&
      !!licenseForData.companyName &&
      !!licenseForData.street &&
      !!licenseForData.city &&
      !!licenseForData.postalCode &&
      !!licenseForData.country &&
      // !!licenseForData.inUseFor &&
      optin === true;
    setCanCheckout(allFieldsFilled);
  }, [licenseForData, optin]);

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

  const region = new Intl.Locale(navigator.language)
    .maximize()
    .region?.toLowerCase(); // "fr"
  const defaultCountry = countries.find((c) => c.key === region)?.value || "";

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
              {products.map((item, i) => (
                <CartItem
                  key={i}
                  input={item}
                  _delete={() => _delete(item.sku)}
                />
              ))}
              {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
            </section>
            <section className='total mb-4xl'>
              <div className='label'>Total (excl. VAT)</div>
              <div className='price'>{cartTotalPrice(products)}€ </div>
            </section>
            <section className='licenseFor md:mb-4xl- mb-2xl- rounded '>
              <form action='' onSubmit={(e) => e.preventDefault()}>
                <div className='box'>
                  {/* <div className='form-field ui-radio--group hidden-'>
                    <div className='header'>
                      <h4 className='text-lg'>Who is the license owner?</h4>
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
                  </div> */}

                  <div className='form-field'>
                    <TextOrEmailOrNumberInput
                      label='Email'
                      name='email'
                      placeholder='myadress@mail.fr'
                      type='email'
                      required
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          email: e.target.value,
                        });
                      }}
                      // tooltip={_localizeField(toolTipEmail)}
                    />
                  </div>
                  <div className='form-field form-field--group'>
                    <TextOrEmailOrNumberInput
                      label='First name'
                      name='first_name'
                      placeholder='John'
                      type='text'
                      required
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          first_name: e.target.value,
                        });
                      }}
                      // tooltip={_localizeField(toolTipEmail)}
                    />
                    <TextOrEmailOrNumberInput
                      label='Last name'
                      name='last_name'
                      placeholder='Doe'
                      type='text'
                      required
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          last_name: e.target.value,
                        });
                      }}
                      // tooltip={_localizeField(toolTipEmail)}
                    />
                  </div>
                  <div className='form-field'>
                    <TextOrEmailOrNumberInput
                      label='Organisation/Company'
                      name='companyName'
                      placeholder='Nike'
                      type='text'
                      required
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          companyName: e.target.value,
                        });
                      }}
                      // tooltip={_localizeField(toolTipCompanyName)}
                    />
                  </div>
                  <div className='form-field'>
                    <TextOrEmailOrNumberInput
                      label='Street'
                      name='street'
                      placeholder='4 Rue des Nains de Jardin'
                      type='text'
                      required
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          street: e.target.value,
                        });
                      }}
                      // tooltip={_localizeField(toolTipCompanyName)}
                    />
                  </div>
                  <div className='form-field form-field--group'>
                    <TextOrEmailOrNumberInput
                      label='City'
                      name='city'
                      placeholder='New york'
                      type='text'
                      required
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          city: e.target.value,
                        });
                      }}
                      // tooltip={_localizeField(toolTipCompanyName)}
                    />
                    <TextOrEmailOrNumberInput
                      label='Zip Code'
                      name='postalCode'
                      placeholder='123456'
                      type='text'
                      required
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          postalCode: e.target.value,
                        });
                      }}
                      // tooltip={_localizeField(toolTipCompanyName)}
                    />
                  </div>
                  <div className='form-field form-field--select '>
                    <div className='header'>
                      <label htmlFor='country'>Country*</label>
                    </div>
                    <Select
                      name='country'
                      options={countries}
                      defaultValue={defaultCountry}
                      required
                      onChange={(value: string) => {
                        setLicenseForData({
                          ...licenseForData,
                          country: value,
                        });
                      }}
                    />
                    {/* <TextOrEmailOrNumberInput
                      label='Country'
                      name='country'
                      placeholder='USA'
                      type='text'
                      onChange={(e) => {
                        setLicenseForData({
                          ...licenseForData,
                          country: e.target.value,
                        });
                      }}
                      // tooltip={_localizeField(toolTipCompanyName)}
                    /> */}
                  </div>

                  {/* <div className='form-field'>
                    <TextOrEmailOrNumberInput
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
                  </div> */}
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

            <pre>{JSON.stringify(licenseForData, null, 2)}</pre>
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
