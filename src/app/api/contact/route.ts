import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escapeHtml = (value: string) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildEmailHtml = ({
  name,
  email,
  phone,
  preferredContact,
  legalArea,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  preferredContact: string;
  legalArea: string;
  message: string;
}) => {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#6b7280;width:170px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;color:#111827;vertical-align:top;">${value}</td>
    </tr>`;

  return `
  <div style="background-color:#f4f4f5;padding:32px 16px;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr>
        <td style="background-color:#D10000;padding:24px 28px;">
          <span style="font-size:20px;font-weight:600;color:#ffffff;letter-spacing:0.02em;">Kanooni Astra</span>
          <div style="font-size:13px;color:#ffe5e5;margin-top:2px;">New Contact Form Submission</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px 8px 28px;">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            ${row("Name", escapeHtml(name))}
            ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#D10000;text-decoration:none;">${escapeHtml(email)}</a>`)}
            ${row("Phone", `<a href="tel:${escapeHtml(phone)}" style="color:#D10000;text-decoration:none;">${escapeHtml(phone)}</a>`)}
            ${row("Preferred Contact", escapeHtml(preferredContact))}
            ${row("Legal Area", escapeHtml(legalArea))}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 28px 28px 28px;">
          <div style="font-size:14px;color:#6b7280;margin-bottom:8px;">Message</div>
          <div style="font-size:15px;line-height:1.6;color:#111827;background-color:#f9fafb;border:1px solid #f0f0f0;border-radius:8px;padding:16px;white-space:pre-wrap;">${escapeHtml(message)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;background-color:#fafafa;border-top:1px solid #f0f0f0;">
          <span style="font-size:12px;color:#9ca3af;">Sent from the contact form on kanooniastra.com</span>
        </td>
      </tr>
    </table>
  </div>`;
};

export async function POST(request: Request) {
  const { name, email, phone, preferredContact, legalArea, message } =
    await request.json();

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: `${email}`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission${legalArea ? ` — ${legalArea}` : ""}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Preferred Contact Method: ${preferredContact}
        Legal Area: ${legalArea}
        Message: ${message}
      `,
      html: buildEmailHtml({ name, email, phone, preferredContact, legalArea, message }),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
