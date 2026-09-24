"use client";

import ReactDOM from "react-dom";

export default function ResourceHints() {
  ReactDOM.preload("/fonts/Last-Regular.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });
  ReactDOM.preconnect("https://cdn.paddle.com");
  ReactDOM.preconnect("https://www.googletagmanager.com");

  return null;
}
