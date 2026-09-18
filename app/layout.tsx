import type { Metadata } from "next";
import { Cormorant_Garamond, Parisienne } from "next/font/google";
import type { ReactNode } from "react";
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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const sharingTitle = "Jessé & Flávia | Convite de casamento";
const sharingDescription = "Um convite de casamento delicado para Jessé e Flávia.";
const sharingImage = `${basePath}/images/whatsapp-preview-casamento-v1.png`;
const sharingImageAlt =
  "Convite de casamento de Jessé e Flávia com a foto do casal em um envelope azul.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://festas.convidei.digital"),
  ),
  title: "Convite de Casamento",
  description: "Um convite de casamento delicado para Jessé e Flávia.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${basePath}/`,
    title: sharingTitle,
    description: sharingDescription,
    images: [
      {
        url: sharingImage,
        width: 1154,
        height: 850,
        type: "image/png",
        alt: sharingImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: sharingTitle,
    description: sharingDescription,
    images: [{ url: sharingImage, alt: sharingImageAlt }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${serif.variable} ${script.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
