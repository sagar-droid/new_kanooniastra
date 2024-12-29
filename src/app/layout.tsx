import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Barlow_Condensed } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Provider from "./provider";
import Footer from "@/components/footer/Footer";

// const inter = Inter({ subsets: ["latin"] });
const barlow = Barlow_Condensed({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanooniastra | Law Firm",
  description: "redefine the standards of legal excellence",
  openGraph: {
    title: "Kanooniastra | Law Firm",
    description: "redefine the standards of legal excellence",
    url: "https://kanooniastra.com",
    type: "website",
    locale: "en-US",
    siteName: "Kanooniastra",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.className} overflow-x-hidden`}>
        <Provider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
