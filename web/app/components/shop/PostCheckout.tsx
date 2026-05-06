"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { ProductData } from "@/app/types/extra-types";

type CheckoutSuccessProps = {
  orderID: string | null;
};

const MAX_POLL_ATTEMPTS = 3;
const POLL_INTERVAL_MS = 2000;

const CheckoutSuccess = ({ orderID }: CheckoutSuccessProps) => {
  const [order, setOrder] = useState<any>(null);
  const [polling, setPolling] = useState(true);
  const [pollFailed, setPollFailed] = useState(false);
  const attemptRef = React.useRef(0);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchOrder = React.useCallback(() => {
    if (!orderID) return;
    fetch(`/api/order?orderId=${orderID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data.order);
          if (data.order?.status === "completed") {
            setPolling(false);
            return;
          }
        }
        attemptRef.current += 1;
        if (attemptRef.current >= MAX_POLL_ATTEMPTS) {
          setPolling(false);
          setPollFailed(true);
        } else {
          timerRef.current = setTimeout(fetchOrder, POLL_INTERVAL_MS);
        }
      })
      .catch(() => {
        attemptRef.current += 1;
        if (attemptRef.current >= MAX_POLL_ATTEMPTS) {
          setPolling(false);
          setPollFailed(true);
        } else {
          timerRef.current = setTimeout(fetchOrder, POLL_INTERVAL_MS);
        }
      });
  }, [orderID]);

  useEffect(() => {
    fetchOrder();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [fetchOrder]);

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

  if (!order || order.status !== "completed") {
    return (
      <div className='success'>
        <div className='header mb-2xl'>
          <h1 className='md:text-2xl'>Thank you for your purchase!</h1>
          <p>Order ID: {orderID}</p>
          {order && <p className=''>Status: {order.status}</p>}
          {polling ? (
            <p className='md:text-xl'>Your order is being processed…</p>
          ) : pollFailed ? (
            <p className='md:text-xl'>
              We couldn't confirm your order automatically. Please contact us at{" "}
              <a href='mailto:hello@overtype.studio'>hello@overtype.studio</a>{" "}
              with your Order ID and we'll sort it out right away.
            </p>
          ) : (
            <p className='md:text-xl'>
              Your order is being processed. Your download link is on its way to
              your inbox.
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
        <p>Order ID: {orderID}</p>
        <p>Order status: {order.status}</p>
        <p className='md:text-xl'>Your files are ready to download.</p>
        <button className='ui-btn ui-btn__accent' onClick={_handleDownload}>
          Download
        </button>
        <p>
          Enjoy your new typeface! <br />
          We can't wait to see what you create with it.
        </p>
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className='post-checkout px-xs md:px-md'>
      <div className='h-2xl md:h-[142px]'></div>

      <div className='c-container'>
        {isLoading && <div>Loading...</div>}
        {status === "success" && !isLoading && (
          <CheckoutSuccess orderID={orderID} />
        )}
        {status === "canceled" && <CheckoutError />}
      </div>
    </div>
  );
};

export default PostCheckout;
