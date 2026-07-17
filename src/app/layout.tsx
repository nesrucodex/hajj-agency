import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Jost,
  Amiri,
  Noto_Serif_Ethiopic,
  Noto_Sans_Ethiopic,
} from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/locale";
import StructuredData from "@/components/StructuredData";
import { mediaUrl } from "@/lib/media";

const OG_IMAGE = mediaUrl("/assets/image/26.jpg")!;

// Latin display — high-contrast elegant serif
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Latin body — geometric, refined
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

// Arabic — for Qur'anic verses and the basmala
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

// Ethiopic display + body — used when the locale is Amharic
const ethSerif = Noto_Serif_Ethiopic({
  variable: "--font-eth-serif",
  subsets: ["ethiopic"],
  display: "swap",
});
const ethSans = Noto_Sans_Ethiopic({
  variable: "--font-eth-sans",
  subsets: ["ethiopic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gorabelu.example"),
  title: {
    default: "ጎራ በሉ ትራቨል · ሐጅና ዑምራ · Gora Belu Travel",
    template: "%s · Gora Belu Travel",
  },
  description:
    "ጎራ በሉ ትራቨል · ወደ መካና መዲና በአክብሮትና በእንክብካቤ የታጀበ የሐጅና ዑምራ ጉዞ። Guided Hajj & Umrah journeys from Addis Ababa with reverence and care.",
  keywords: [
    "Hajj",
    "Umrah",
    "ሐጅ",
    "ዑምራ",
    "Gora Belu",
    "ጎራ በሉ ትራቨል",
    "Hajj from Ethiopia",
    "Umrah from Addis Ababa",
    "Umrah package Ethiopia",
    "ከኢትዮጵያ ሐጅ",
    "ከአዲስ አበባ ዑምራ",
    "Ethiopian Airlines Umrah",
    "Addis Ababa travel agent",
  ],
  applicationName: "Gora Belu Travel",
  authors: [{ name: "Gora Belu Travel Agent" }],
  category: "travel",
  alternates: {
    canonical: "/",
    languages: { "am-ET": "/", "en": "/", "x-default": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Gora Belu Travel · Hajj & Umrah from Ethiopia",
    description:
      "Guided Hajj & Umrah journeys from Addis Ababa with reverence and care, in partnership with Ethiopian Airlines.",
    url: "/",
    siteName: "Gora Belu Travel",
    locale: "am_ET",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Gora Belu Travel · Hajj & Umrah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gora Belu Travel · Hajj & Umrah from Ethiopia",
    description:
      "Guided Hajj & Umrah journeys from Addis Ababa with reverence and care.",
    images: [OG_IMAGE],
  },
};

const fontVars = [
  cormorant.variable,
  jost.variable,
  amiri.variable,
  ethSerif.variable,
  ethSans.variable,
].join(" ");

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="am"
      data-locale="am"
      data-theme="light"
      className={`${fontVars} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        <StructuredData />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
