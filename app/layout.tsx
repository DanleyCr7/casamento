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

export const metadata: Metadata = {
  title: "Convite de Casamento",
  description: "Convite interativo para casamento com Pix em destaque.",
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
