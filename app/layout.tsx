import type { Metadata } from "next";
import { Manrope, Fraunces } from "next/font/google";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BeBrand — Desarrollo web y software a medida",
  description: "Páginas web, e-commerce y software a medida. Tu siguiente etapa, la desarrollamos. BeBrand Desarrollo.",
  metadataBase: new URL("https://bebrand.dev"),
  alternates: { canonical: "https://bebrand.dev" },
  openGraph: { title: "BeBrand — Tu siguiente etapa. La desarrollamos.", description: "Desarrollo web, e-commerce y software a medida para tu negocio.", locale: "es_EC", type: "website", url: "https://bebrand.dev" },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/brand/bebr-blue-square.jpeg",
    shortcut: "/brand/bebr-blue-square.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
