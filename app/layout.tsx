import type { Metadata } from "next";
import { Cormorant_Garamond, Parisienne, Poppins } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const script = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const ui = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-ui",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const themeImage = (filename: string) => `url("${basePath}/images/isaac/${filename}")`;
const themeBackgrounds = {
  "--garden-hero": themeImage("hero-envelope-garden.webp"),
  "--garden-hero-mobile": themeImage("hero-envelope-garden-mobile.webp"),
  "--garden-event": themeImage("background-event-garden.webp"),
  "--garden-memories": themeImage("background-memories.webp"),
  "--garden-divider-flowers": themeImage("divider-flowers-butterfly.webp"),
  "--garden-divider-garland": themeImage("divider-garland-bird.webp"),
  "--garden-rsvp": themeImage("background-rsvp-gift.webp"),
  "--garden-closing": themeImage("closing-garden.webp"),
  "--garden-closing-mobile": themeImage("closing-garden-mobile.webp"),
  "--theme-ornament": themeImage("coroa-dourada.webp"),
} as CSSProperties;
const title = `${siteConfig.celebrantName} | ${siteConfig.eventAgeLabel} — ${siteConfig.themeLabel}`;
const description = `Vamos celebrar o primeiro aninho do ${siteConfig.celebrantName}! ${siteConfig.eventDayLabel}, ${siteConfig.eventDateLabel}, às ${siteConfig.eventTimeLabel}, na ${siteConfig.venueName}.`;
const previewImage = `${basePath}/images/isaac/convite-isaac.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://festas.convidei.digital"),
  ),
  title,
  description,
  icons: {
    icon: {
      url: `${basePath}/images/isaac/coroa-dourada.webp`,
      type: "image/webp",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${basePath}/`,
    title,
    description,
    images: [
      {
        url: previewImage,
        width: 721,
        height: 1280,
        type: "image/jpeg",
        alt: "Convite do primeiro aninho do Isaac, em azul e dourado, com Jesus e ovelhinhas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${serif.variable} ${script.variable} ${ui.variable} antialiased`}
        style={themeBackgrounds}
      >
        {children}
      </body>
    </html>
  );
}
