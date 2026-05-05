import nodemailer from "nodemailer";
import { environment } from "@/env.mjs";

export function createTransporter() {
  return nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
      user: environment.email.user as string,
      pass: environment.email.pass as string,
    },
  });
}
