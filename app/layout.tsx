import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeBrand — Desarrollo web y software a medida",
  description: "Páginas web, e-commerce y software a medida. Tu siguiente etapa, la desarrollamos. BeBrand Desarrollo.",
  metadataBase: new URL("https://bebrand.dev"),
  alternates: { canonical: "https://bebrand.dev" },
  openGraph: { title: "BeBrand — Tu siguiente etapa. La desarrollamos.", description: "Desarrollo web, e-commerce y software a medida para tu negocio.", locale: "es_CO", type: "website", url: "https://bebrand.dev" },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.theme=localStorage.getItem('bebrand-theme')==='light'?'light':'blue'}catch{}" }} /></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
