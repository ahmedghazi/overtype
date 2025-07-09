/// <reference types="next" />

/**
 * This file is used by Next.js to configure environment variables.
 * Environment variables should be set in your .env.local file.
 * Variables starting with NEXT_PUBLIC_ will be available in the browser.
 * Other variables will only be available on the server side.
 */

export const environment = {
  email: {
    host: process.env.NEXT_PUBLIC_EMAIL_HOST,
    port: process.env.NEXT_PUBLIC_EMAIL_PORT,
    secure: process.env.NEXT_PUBLIC_EMAIL_SECURE === "true",
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    from: process.env.NEXT_PUBLIC_EMAIL_FROM,
  },
  paddle: {
    webhookSecret: process.env.NEXT_PUBLIC_PADDLE_WEBHOOK_SECRET,
  },
  // Add other environment variables as needed
};


