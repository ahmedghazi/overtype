"use client";

import { createContext, useEffect, useState } from "react";
import { initializePaddle, Paddle, PaddleEventData } from "@paddle/paddle-js";
import { Environment } from "@paddle/paddle-node-sdk";

type PaddleContext = any;
//pdl_live_apikey_01jzb1sqeq8jr2hyg0espv06hw_cCsgBvwbnRymJFVwT3ZJKp_A3h

const PaddleContext = createContext<PaddleContext>(null);

const PaddleProvider = ({ children }: { children: React.ReactNode }) => {
  const [paddle, setPaddle] = useState<Paddle>();
  // const [products, setProducts] = useState<Product[]>([])
  // const [cart, setCart] = useState<Product[]>([]);

  const _initializePaddle = () => {
    // const envVar = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT;
    // type PaddleOptions = NonNullable<Parameters<typeof initializePaddle>[0]>;
    // type PaddleEnv = PaddleOptions["environment"];
    // const environment: PaddleEnv =
    //   envVar === "production" ? "production" : "sandbox";

    initializePaddle({
      // environment: "sandbox",
      // environment,
      environment:
        process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production"
          ? Environment.production
          : Environment.sandbox,
      token: process.env.NEXT_PUBLIC_PADDLE_PUBLIC_KEY!,
      eventCallback: _handleEvents,
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        console.log("Paddle initialized");
        // localStorage.setItem("products", "");
        setPaddle(paddleInstance);
        // console.log(paddleInstance);
      }
    });
  };
  const _handleEvents = (data: PaddleEventData) => {
    console.log(data.name);

    if (data.name === "checkout.completed") {
      console.log(data);
      _processOrderCompleted(data);
    }
  };

  useEffect(() => {
    // Defer loading the Paddle SDK until the user actually interacts with
    // the page (or the browser goes idle), so it doesn't compete with
    // critical resources on initial page load. It's only needed once the
    // cart/checkout UI is opened, which never happens before a first
    // interaction.
    let initialized = false;
    const interactionEvents = [
      "pointerdown",
      "keydown",
      "touchstart",
      "scroll",
    ] as const;

    let idleId: unknown;

    const cancelIdle = () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId as number);
      } else {
        clearTimeout(idleId as ReturnType<typeof setTimeout>);
      }
    };

    const init = () => {
      if (initialized) return;
      initialized = true;
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, init),
      );
      cancelIdle();
      _initializePaddle();
    };

    interactionEvents.forEach((evt) =>
      window.addEventListener(evt, init, { once: true, passive: true }),
    );

    idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(init, { timeout: 5000 })
        : setTimeout(init, 3000);

    return () => {
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, init),
      );
      cancelIdle();
    };
  }, []);

  const _processOrderCompleted = async (data: PaddleEventData) => {
    console.log(data);
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    console.log(products);
    // return;
    //call api send order to server
    const response = await fetch("/api/order-completed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paddleData: data.data,
        products: products.value,
      }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <PaddleContext.Provider value={paddle}>{children}</PaddleContext.Provider>
  );
};

export { PaddleProvider, PaddleContext };
