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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://festas.convidei.digital"),
  ),
  title: "Jardim das Borboletas | 1 ano da Pérola",
  description: "Um convite florido para celebrar o primeiro ano da Pérola no Jardim das Borboletas.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Jardim das Borboletas | 1 ano da Pérola",
    description:
      "Esperamos você para celebrar conosco o primeiro ano da Pérola no Jardim das Borboletas.",
    images: [
      {
        url: "/images/whatsapp-preview-perola.png",
        width: 2936,
        height: 1664,
        alt: "Esperamos você para celebrar conosco o primeiro ano da Pérola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jardim das Borboletas | 1 ano da Pérola",
    description:
      "Esperamos você para celebrar conosco o primeiro ano da Pérola no Jardim das Borboletas.",
    images: ["/images/whatsapp-preview-perola.png"],
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
