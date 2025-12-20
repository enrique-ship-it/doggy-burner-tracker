import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/components/Providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DOGGY Burner Tracker - El Ranking de los que se Atreven",
  description: "Compite quemando DOGGY. Gana tu badge conmemorativo. El leaderboard oficial de quemadores.",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "DOGGY Burner Tracker - El Ranking de los que se Atreven",
    description: "Compite quemando DOGGY. Gana tu badge conmemorativo. ¿Tienes lo que se necesita?",
    url: "https://doggyburner.chebtc.com",
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
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
