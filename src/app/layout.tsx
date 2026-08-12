
import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import ClientLayout from "@/components/layout/ClientLayout";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const siteUrl = process.env.NEXTAUTH_URL || 'https://velatravelsco.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vela Travels | Premium Fleets & Taxi Service in Nenmara, Palakkad",
    template: "%s | Vela Travels Nenmara"
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  description: "Best Premium Fleets, Taxi Service & Tour Operator in Nenmara, Palakkad, Kerala. Luxury cars, airport transfers & Ayurveda wellness tours.",
  keywords: [
    "Vela Travels",
    "Vehicle Rent Kerala",
    "Premium Fleets Nenmara",
    "Car Rental Nenmara",
    "Best Tour Operator Nemmara",
    "Ayurveda Spa Massage Kerala",
    "Cochin Airport Taxi Nenmara",
    "Coimbatore Airport Taxi Nemmara",
    "Premium Vehicle Rentals"
  ],
  authors: [{ name: "Vela Travels" }],
  creator: "Vela Travels",
  publisher: "Vela Travels",
  formatDetection: {
    telephone: true,
    address: true,
    email: true
  },

  openGraph: {
    title: "Vela Travels | Premium Fleets & Taxi Service in Nenmara, Palakkad",
    description: "Premier Premium Fleets & Tour Operator located at Nenmara, Palakkad. Premium cars, airport cabs & custom tour packages.",
    url: siteUrl,
    siteName: "Vela Travels",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Vela Travels Nenmara Palakkad Premium Fleets"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vela Travels | Premium Fleets in Nenmara, Palakkad",
    description: "Reliable Premium Fleets & Taxi Service at Nenmara, Palakkad, Kerala.",
    images: [`${siteUrl}/og-image.jpg`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoRental", "TravelAgency", "HealthAndBeautyBusiness"],
  "name": "Vela Travels | Vehicle Rent & Tours",
  "image": `${siteUrl}/og-image.jpg`,
  "@id": `${siteUrl}/#organization`,
  "url": siteUrl,
  "telephone": "+919207050525",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nenmara",
    "addressLocality": "Nenmara",
    "addressRegion": "Kerala",
    "postalCode": "678508",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.5925,
    "longitude": 76.6021
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "areaServed": [
    { "@type": "Place", "name": "Nenmara" },
    { "@type": "Place", "name": "Palakkad" },
    { "@type": "Place", "name": "Kerala" },
    { "@type": "Place", "name": "Cochin International Airport" },
    { "@type": "Place", "name": "Coimbatore Airport" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="google-site-verification" content="f52j6_XzU-9ZJN_Ys1nLLqK6SVw-VYDV-EF9mzO0boI" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <NextAuthProvider>
          <ClientLayout 
            navbar={
              <Suspense fallback={<div className="h-20 bg-white/50 animate-pulse fixed top-0 w-full z-[100]" />}>
                <Navbar />
              </Suspense>
            }
            footer={
              <Suspense fallback={<div className="h-64 bg-slate-900 animate-pulse" />}>
                <Footer />
              </Suspense>
            }
          >
            {children}
          </ClientLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
