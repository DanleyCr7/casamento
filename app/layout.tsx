import type { Metadata } from "next";
import { Cormorant_Garamond, Parisienne, Poppins } from "next/font/google";
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

const ui = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-ui",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const sharingTitle = "Melinda | 1 aninho no Bosque Encantado";
const sharingDescription = "Um convite encantado para o aniversário de 1 aninho da Melinda.";
const sharingImage = `${basePath}/images/whatsapp-preview-melinda-v2.jpg`;
const sharingImageAlt =
  "Convite de 1 aninho da Melinda com sua foto em um envelope rosa no Bosque Encantado.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://festas.convidei.digital"),
  ),
  title: "Aniversário da Melinda",
  description: "Um convite encantado para o aniversário de 1 aninho da Melinda.",
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
        height: 797,
        type: "image/jpeg",
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
      <body className={`${serif.variable} ${script.variable} ${ui.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
