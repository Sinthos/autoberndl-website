import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteName = "Auto Berndl";
const siteDescription = "Ihr Partner für erstklassige Gebrauchtfahrzeuge, professionellen Werkstatt-Service und fairen Fahrzeugankauf. Über 40 Jahre Erfahrung.";

export const metadata: Metadata = {
  title: {
    default: "Auto Berndl – Gebrauchtwagen, Service & Fahrzeugankauf",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Auto Berndl",
    "Gebrauchtwagen",
    "Fahrzeugankauf",
    "Werkstatt",
    "Auto Service",
    "Muenchen",
    "Bayern",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Auto Berndl – Gebrauchtwagen, Service & Fahrzeugankauf",
    description: siteDescription,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Berndl – Gebrauchtwagen, Service & Fahrzeugankauf",
    description: siteDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
