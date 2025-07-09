// "use client";
// import { useState, useEffect } from "react";
// // import { loadPaddle } from "@paddle/paddle-js";

// interface ProductData {
//   title: string;
//   typefaceName: string;
//   description?: string;
//   license: string;
//   sku: string;
//   finalPrice: number;
//   type: string;
//   isLogo: boolean;
// }

// interface LicenseForData {
//   clientName: string;
//   [key: string]: any;
// }

// export function useCheckoutWithPaddle() {
//   const [Paddle, setPaddle] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // async function initPaddle() {
//     //   const paddle = await loadPaddle({
//     //     environment: "production", // or "sandbox"
//     //     token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string,
//     //   });
//     //   setPaddle(paddle);
//     // }
//     // initPaddle();
//   }, []);

//   async function startCheckout({
//     product,
//     licenseFor,
//     licenseForData,
//     customerEmail,
//   }: {
//     product: ProductData;
//     licenseFor: string;
//     licenseForData: LicenseForData;
//     customerEmail: string;
//   }) {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           product,
//           licenseFor,
//           licenseForData,
//           customerEmail,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Checkout failed");
//       }

//       // ✅ Open Paddle Checkout Overlay
//       Paddle.Checkout.open({ checkoutId: data.checkoutId });
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return {
//     startCheckout,
//     loading,
//     error,
//   };
// }
