"use client";
import React, { useEffect, useState } from "react";
import useShop, { ProductData } from "./ShopContext";
import { subscribe, unsubscribe } from "pubsub-js";
import clsx from "clsx";
import Figure from "../ui/Figure";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ProductImage from "./ProductImage";
import BtnIcon from "../ui/buttons/BtnIcon";
import Radio from "../ui/inputs/Radio";
import TextOrEmailInput from "../ui/inputs/TextOrEmailInput";
import RadioGroup from "../ui/inputs/RadioGroup";
import Btn from "../ui/buttons/Btn";
import BtnCheckout from "./Checkout";
import { cartTotalPrice } from "./utils";
// import useLocalStorage from "@/app/hooks/useLocalStorage";

// type CartSuccessProps = {};
// const CartSuccess = (props: CartSuccessProps) => {
//   const [cartItems] = useLocalStorage("cartItems", "");
//   const [checkoutSession] = useLocalStorage("checkoutSession", "");

//   // console.log(cartItems);
//   // console.log(checkoutSession);
//   return (
//     <div className='cart-success'>
//       {/* {checkoutSession && (
//         <div className='status'>{checkoutSession.payment_status}</div>
//       )} */}
//       {cartItems && checkoutSession && (
//         <div>
//           <h2 className='mb-md text-lg'>Thx for your order</h2>

//           <div className='body'>
//             <div className='items'>
//               {cartItems &&
//                 cartItems.map((item: ProductExtend, i: number) => (
//                   <CartItem key={i} input={item} />
//                 ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {checkoutSession && checkoutSession.payment_status === "paid" && (
//         <div className='footer'>
//           <div className='inner'>
//             <div className='sub-total flex justify-between'>
//               <div className='label'>{_localizeText("subTotal")}</div>
//               <div className='price'>
//                 {checkoutSession.amount_subtotal / 100}€
//               </div>
//             </div>
//             <div className='shipping flex justify-between'>
//               <div className='label'>{_localizeText("shipping")}</div>
//               <div className='price'>
//                 {checkoutSession.shipping_cost.amount_total / 100}€
//               </div>
//             </div>
//             <div className='total flex justify-between'>
//               <div className='label'>{_localizeText("total")}</div>
//               <div className='price'>{checkoutSession.amount_total / 100}€</div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

type CartItemProps = {
  input: ProductData;
  _delete?: Function;
};
const CartItem = ({ input, _delete }: CartItemProps) => (
  <div className='cart-item gap-md'>
    <div className='media'>
      <ProductImage
        title={input.typefaceName}
        background={input.background}
        foreground={input.foreground}
      />
    </div>
    <div className='col-infos'>
      <div className='cart-item-row'>
        <div className='title '>{input.title}</div>
        {_delete && (
          <button onClick={() => _delete(input.sku)}>
            {/* <BtnIcon icon='delete' /> */}
            <i className='icon-delete'></i>
          </button>
        )}
      </div>
      <div className='cart-item-row'>
        <div className='metas'>
          <div>Use in logo/wordmark : {input.isLogo ? "Yes" : "No"}</div>
          <div>
            Size licenses : {input.license}{" "}
            <span className='text-secondary'>{input.licenseInfos}</span>
          </div>
        </div>
        <div className='price'>{input.finalPrice}€</div>
      </div>
    </div>
  </div>
);

type Props = {};
type LicenseForData = {
  companyName?: string;
  email?: string;
  inUseFor?: string;
};

const Cart = (props: Props) => {
  // alert("here");
  const {
    products,
    setProducts,
    setLicenseFor,
    licenseForData,
    setLicenseForData,
  } = useShop();

  // console.log(products);
  const [open, setOpen] = useState<boolean>(false);
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
      setOpen(true);
    });

    return () => {
      unsubscribe(tokenOpen);
    };
  }, []);

  const _delete = (sku: string) => {
    setProducts({ type: "DELETE", payload: sku });
  };

  const LicenseForValues = [
    {
      label: "Me",
      value: "me",
    },
    {
      label: "My client",
      value: "client",
    },
  ];
  return (
    <div className={clsx("cart")}>
      <div className='header'>
        <h2 className='md:text-2xl'>Cart</h2>
      </div>
      <div className='body'>
        {products && products.length === 0 && (
          <div className='cart-empty py-xl'>
            <div className='inner'>Your cart is empty</div>
          </div>
        )}
        <div className='products mb-lg'>
          {products &&
            products.map((item, i) => (
              <CartItem
                key={i}
                input={item}
                _delete={() => _delete(item.sku)}
              />
            ))}
        </div>
        <div className='total md:mb-4xl mb-lg'>
          <div className='label'>Total (excl. VAT)</div>
          <div className='price'>{cartTotalPrice(products)}€ </div>
        </div>
      </div>

      <section className='licenseFor  md:mb-4xl mb-lg'>
        {/* <pre>{JSON.stringify(licenseForData, null, 2)}</pre> */}
        <div className='box'>
          <div className='form-field'>
            <RadioGroup
              name='licenseFor'
              label='Who is the license owner?'
              values={LicenseForValues}
              onChange={(value) => setLicenseFor(value)}
            />
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
      </section>

      <section className='checkout'>
        <BtnCheckout />
      </section>
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
