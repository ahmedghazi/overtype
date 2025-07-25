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
  const { toolTipLocenseFor } = settings;

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

  // const LicenseForValues = [
  //   {
  //     label: "Me",
  //     value: "me",
  //   },
  //   {
  //     label: "My client",
  //     value: "client",
  //   },
  // ];
  return (
    <div className={clsx("cart")}>
      <div className='header'>
        <h2 className='text-2xl'>Cart</h2>
      </div>
      <div className='body'>
        {products && products.length === 0 && (
          <section className='cart-empty py-xl flex justify-center'>
            <div className='flex flex-col items-center gap-md'>
              <div className='md:text-2xl '>Your cart is empty</div>
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
          <section className='products mb-lg'>
            {products &&
              products.map((item, i) => (
                <CartItem
                  key={i}
                  input={item}
                  _delete={() => _delete(item.sku)}
                />
              ))}
          </section>
          <section className='total md:mb-4xl mb-lg'>
            <div className='label'>Total (excl. VAT)</div>
            <div className='price'>{cartTotalPrice(products)}€ </div>
          </section>
          <section className='licenseFor  md:mb-4xl mb-lg'>
            <form action=''>
              <div className='box'>
                <div className='form-field ui-radio--group'>
                  {/* <RadioGroup
                    name='licenseFor'
                    label='Who is the license owner?'
                    values={LicenseForValues}
                    onChange={(value) => setLicenseFor(value)}
                    tooltip={_localizeField(toolTipLocenseFor) || ""}
                  /> */}

                  <div className='header'>
                    <h4 className='text-lg'>Who is the license owner?</h4>
                    <BtnToolTip text={_localizeField(toolTipLocenseFor)} />
                  </div>
                  <div className='grid md:grid-cols-2 gap-2xs'>
                    <Radio
                      name='forLogo'
                      label='me'
                      isChecked={licenseFor === "me"}
                      onChange={(value) => setLicenseFor(value)}
                    />
                    <Radio
                      name='forLogo'
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
                  />
                </div>
              </div>
            </form>
          </section>

          <section className='checkout'>
            <BtnCheckout />
          </section>
        </div>
      )}
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
