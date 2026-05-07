"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { ProductData } from "@/app/types/extra-types";
import SvgDotsJumping from "../ui/SvgDotsJumping";

type CheckoutSuccessProps = {
  orderID: string | null;
};

const CheckoutSuccess = ({ orderID }: CheckoutSuccessProps) => {
  const [order, setOrder] = useState<any>(null);
  const [polling, setPolling] = useState(true);
  const [pollFailed, setPollFailed] = useState(false);

  useEffect(() => {
    if (!orderID) return;

    const source = new EventSource(`/api/order-status?orderId=${orderID}`);

    source.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      console.log("source.onmessage called", data);

      if (data.error) {
        console.log("source.onmessage called", data.error);
        setPolling(false);
        setPollFailed(true);
        source.close();
        return;
      }

      if (data.status === "completed") {
        setOrder(data.order);
        setPolling(false);
        source.close();
        return;
      }
    };

    source.onerror = () => {
      console.log("source.onerror called");
      setPolling(false);
      setPollFailed(true);
      source.close();
    };

    return () => source.close();
  }, [orderID]);

  const _handleDownload = async () => {
    const response = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID }),
    });

    if (!response.ok) return;

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "overtype-fonts.zip";
    a.click();
    URL.revokeObjectURL(url);
  };
  console.log(order);
  if (!order || order.status !== "completed") {
    return (
      <div className='success'>
        <div className='header mb-2xl'>
          <h1 className='md:text-2xl'>Thank you for your purchase!</h1>
          {/* <p className='m-0!'>Order ID: {orderID}</p> */}
          {order && <p>Status: {order.status}</p>}

          {polling ? (
            <>
              <p>
                <span className='inline-block '>
                  <SvgDotsJumping />
                </span>
              </p>
              <p className='md:text-xl'>
                Please wait, your order is being processed...
                <br />
                Your files will be available for download shortly.
              </p>
            </>
          ) : pollFailed ? (
            <>
              <p className='md:text-xl'>
                Unfortunately, we were unable to automatically confirm your
                order.
              </p>
              <p className='md:text-xl'>
                Please contact us at
                <a href='mailto:contact@overtypefoundy.com'>
                  contact@overtypefoundy.com
                </a>{" "}
                with your Order ID "{orderID}" and we’ll resolve the issue as
                quickly as possible.
              </p>
            </>
          ) : (
            <p className='md:text-xl'>
              Please contact us at{" "}
              <a href='mailto:contact@overtypefoundy.com'>
                contact@overtypefoundy.com
              </a>{" "}
              with your Order ID "{orderID}" and we'll sort it out right away.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='success'>
      <div className='header mb-2xl'>
        <h1 className='md:text-2xl'>Thank you for your purchase!</h1>

        <p className='md:text-xl'>
          Your files are ready to download. <br />A confirmation email is on its
          way to your inbox.
        </p>

        <p>
          Have fun with your new typefaces,
          <br />
          we can’t wait to see what you do with it.
        </p>

        {/* <ul>
          <li>Order ID: {orderID}</li>
          <li>Order status: {order.status}</li>
        </ul> */}

        <button className='ui-btn ui-btn__accent' onClick={_handleDownload}>
          Download
        </button>
        {/* <p>
          Enjoy your new typeface! <br />
          We can't wait to see what you create with it.
        </p> */}
      </div>
      <div className='products flex flex-col gap-2xs'>
        {order.items?.map((item: ProductData, i: number) => (
          <CartItem key={i} input={item} isPostCheckout={true} />
        ))}
      </div>
    </div>
  );
};

const CheckoutError = () => {
  return <div className='error'>Error</div>;
};

type Props = {};
const PostCheckout = (props: Props) => {
  const search = useSearchParams();
  const status = search.get("status");
  const orderID = search.get("orderID");
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  return (
    <div className='post-checkout px-xs md:px-md'>
      <div className='h-2xl md:h-[142px]'></div>

      <div className='c-container'>
        {/* {isLoading && <div>Loading...</div>} */}
        {status === "success" && <CheckoutSuccess orderID={orderID} />}
        {status === "canceled" && <CheckoutError />}
      </div>
    </div>
  );
};

export default PostCheckout;
