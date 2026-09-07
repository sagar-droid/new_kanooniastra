import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Barlow_Condensed } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Provider from "./provider";
import Footer from "@/components/footer/Footer";
import NextTopLoader from "nextjs-toploader";
import PublicChrome from "@/components/layout/PublicChrome";
import FloatingContact from "@/components/contact/FloatingContact";
import { connectToDatabase } from "@/lib/mongodb";
import TeamMemberModel from "@/models/TeamMember";
import { services } from "../../data/services";

// const inter = Inter({ subsets: ["latin"] });
const barlow = Barlow_Condensed({
  weight: ["400"],
  subsets: ["latin"],
});

const siteUrl = "https://kanooniastra.com";
const defaultTitle = "Kanooni Astra | Law Firm in Kathmandu, Nepal";
const defaultDescription =
  "Kanooni Astra is a Kathmandu-based law firm serving clients across corporate law, foreign direct investment, intellectual property, litigation, family law, and more.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Kanooni Astra",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    type: "website",
    locale: "en-US",
    siteName: "Kanooni Astra",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Kanooni Astra logo" }],
  },
  twitter: {
    card: "summary",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const baseOrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LegalService"],
  name: "Kanooni Astra",
  alternateName: "Kanooniastra",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/logo.png`,
  description: defaultDescription,
  foundingDate: "2022-12-05",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ghattekulo marg",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 27.7032936,
    longitude: 85.3169575,
  },
  areaServed: {
    "@type": "Country",
    name: "Nepal",
  },
  telephone: ["+977-9843671048", "+977-9844393183", "+977-9867350369"],
  email: "kanooniastra@gmail.com",
  sameAs: [
    "https://www.facebook.com/KanooniAstra",
    "https://www.linkedin.com/company/kanooni-astra",
    "https://www.instagram.com/kanooni_astra/?hl=en",
  ],
  knowsAbout: services.map((service) => service.title),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectToDatabase();
  const founders = await TeamMemberModel.find({
    status: "published",
    designation: { $regex: "founder", $options: "i" },
  }).lean();

  const organizationJsonLd = {
    ...baseOrganizationJsonLd,
    founder: founders.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.designation,
      url: `${siteUrl}/ourteam/${member.slug}`,
    })),
  };

  return (
    <html lang="en">
      <body className={`${barlow.className} overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <NextTopLoader height={4} color="#FF0000" showSpinner={false} />
        <Provider />
        <PublicChrome>
          <Navbar />
        </PublicChrome>
        {children}
        <PublicChrome>
          <Footer />
        </PublicChrome>
        <PublicChrome>
          <FloatingContact />
        </PublicChrome>
      </body>
    </html>
  );
}
