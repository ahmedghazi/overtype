"use client";

import { createContext, useEffect, useState } from "react";
// import Script from "next/script";
// import { initializePaddle } from "@paddle/paddle-js";
import { initializePaddle, Paddle, PaddleEventData } from "@paddle/paddle-js";

type PaddleContext = any;
//pdl_live_apikey_01jzb1sqeq8jr2hyg0espv06hw_cCsgBvwbnRymJFVwT3ZJKp_A3h

const PaddleContext = createContext<PaddleContext>(null);

const PaddleProvider = ({ children }: { children: React.ReactNode }) => {
  const [paddle, setPaddle] = useState<Paddle>();
  // const [products, setProducts] = useState<Product[]>([])
  // const [cart, setCart] = useState<Product[]>([]);

  const _initializePaddle = () => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_PUBLIC_KEY!,
      eventCallback: _handleEvents,
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        console.log("Paddle initialized");
        setPaddle(paddleInstance);
        console.log(paddleInstance);
      }
    });
  };
  const _handleEvents = (data: PaddleEventData) => {
    if (data.name == "checkout.completed") {
      console.log(data);
    }
  };

  useEffect(() => {
    _initializePaddle();
  }, []);

  return (
    <PaddleContext.Provider value={paddle}>{children}</PaddleContext.Provider>
  );
};

export { PaddleProvider, PaddleContext };
