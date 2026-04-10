import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LBRBDA — 50 Years of Strategic Repositioning | Golden Jubilee 2026",
  description:
    "Celebrating 50 years of the Lower Benue River Basin Development Authority. Advancing the Renewed Hope Agenda in Water and Agricultural Transformation across Benue, Nasarawa, Plateau, and Kogi States.",
  keywords: [
    "LBRBDA",
    "Lower Benue River Basin",
    "Nigeria Agriculture",
    "Climate Finance",
    "Irrigation",
    "Golden Jubilee",
    "Renewed Hope Agenda",
  ],
  openGraph: {
    title: "LBRBDA — 50 Years of Strategic Repositioning",
    description:
      "Celebrating 50 years of the Lower Benue River Basin Development Authority. Join us in transforming the basin into Africa's leading climate-smart agricultural corridor.",
    type: "website",
    images: ["/jubilee-logo.png"],
  },
};

import OrientationBarrier from "@/components/OrientationBarrier";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import PasswordGate from "@/components/PasswordGate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <OrientationBarrier />
        <PasswordGate>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </PasswordGate>
      </body>
    </html>
  );
}
