import type { Metadata } from "next";
import { Cormorant_Garamond, Parisienne, Poppins } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
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
const gardenImage = (filename: string) =>
  `url("${basePath}/images/jardim-borboletas/${filename}")`;

const gardenBackgrounds = {
  "--garden-hero": gardenImage("hero-envelope-garden.png"),
  "--garden-hero-mobile": gardenImage("hero-envelope-garden-mobile.png"),
  "--garden-event": gardenImage("background-event-garden.png"),
  "--garden-memories": gardenImage("background-memories.png"),
  "--garden-divider-flowers": gardenImage("divider-flowers-butterfly.png"),
  "--garden-divider-garland": gardenImage("divider-garland-bird.png"),
  "--garden-rsvp": gardenImage("background-rsvp-gift.png"),
  "--garden-closing": gardenImage("closing-garden.png"),
} as CSSProperties;

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
    url: `${basePath}/`,
    title: "Jardim das Borboletas | 1 ano da Pérola",
    description:
      "Esperamos você para celebrar conosco o primeiro ano da Pérola no Jardim das Borboletas.",
    images: [
      {
        url: `${basePath}/images/whatsapp-preview-perola-v3.png`,
        width: 1144,
        height: 744,
        type: "image/png",
        alt: "Esperamos você para celebrar conosco o primeiro ano da Pérola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jardim das Borboletas | 1 ano da Pérola",
    description:
      "Esperamos você para celebrar conosco o primeiro ano da Pérola no Jardim das Borboletas.",
    images: [`${basePath}/images/whatsapp-preview-perola-v3.png`],
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
        style={gardenBackgrounds}
      >
        {children}
      </body>
    </html>
  );
}
