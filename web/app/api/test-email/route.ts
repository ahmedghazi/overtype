import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { environment } from "@/env.mjs";

export async function POST(request: Request) {
  try {
    // Send email to user
    const res = await sendEmail("atmet.ghazi@gmail.com");

    return NextResponse.json({ success: true, res });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process order" },
      { status: 500 }
    );
  }
}

async function sendEmail(to: string) {
  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
      user: environment.email.user as string,
      pass: environment.email.pass as string,
    },
  });

  let mailOptions = {
    from: environment.email.from as string,
    to: to,
    subject: "Test email from Overtype",
    html: generateEmailHtml(),
  };

  await transporter.sendMail(mailOptions);
}

function generateEmailHtml() {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      test

      <div style="margin-top: 30px; text-align: center; color: #888;">
        <p>Best regards,</p>
        <p>Overtype Team</p>
      </div>
    </div>
  `;
}
