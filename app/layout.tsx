import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletProvider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DOGGY Burner Tracker - Quema tus tokens profesionalmente",
  description: "Track y quema tokens DOGGY. Leaderboard de DoggyQuemadores.",
  openGraph: {
    title: "DOGGY Burner Tracker",
    description: "Compite en el leaderboard quemando DOGGY tokens",
    url: "https://burner.chebtc.com",
    siteName: "DOGGY Burner Tracker",
    images: [
      {
        url: "/og-image.png", // TODO: crear imagen 1200x630
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOGGY Burner Tracker",
    description: "Compite en el leaderboard quemando DOGGY tokens",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Umami Analytics (privacidad-friendly, GDPR compliant) */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js"}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          ></script>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
