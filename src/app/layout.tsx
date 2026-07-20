
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

const siteUrl = process.env.NEXTAUTH_URL || 'https://vela-travels-kkos-seven.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vela Travels | Car Rental & Taxi Service in Nenmara, Palakkad",
    template: "%s | Vela Travels Nenmara"
  },
  description: "Best Car Rental, Taxi Service & Tour Operator in Nenmara, Aliyur (near NSS College), Palakkad, Kerala. Luxury cars, self-drive rentals, airport transfers & Ayurveda wellness tours.",
  keywords: [
    "Car Rental Nenmara",
    "Taxi Service Nenmara Palakkad",
    "Car Rental Aliyur",
    "Car Rental near NSS College Nemmara",
    "Self Drive Cars Palakkad",
    "Best Tour Operator Nemmara",
    "Ayurveda Wellness Tours Kerala",
    "Cochin Airport Taxi Nenmara",
    "Coimbatore Airport Taxi Nemmara",
    "Vela Travels Palakkad"
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
    title: "Vela Travels | Car Rental & Taxi Service in Nenmara, Palakkad",
    description: "Premier Car Rental & Tour Operator located at Aliyur, Near NSS College, Nenmara, Palakkad. Premium cars, airport cabs & custom tour packages.",
    url: siteUrl,
    siteName: "Vela Travels",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Vela Travels Nenmara Palakkad Car Rental"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vela Travels | Car Rental in Nenmara, Palakkad",
    description: "Reliable Car Rental & Taxi Service at Aliyur, Near NSS College, Nenmara, Palakkad, Kerala.",
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
  "@type": "AutoRental",
  "name": "Vela Travels",
  "image": `${siteUrl}/og-image.jpg`,
  "@id": `${siteUrl}/#organization`,
  "url": siteUrl,
  "telephone": "+919207050525",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Aliyur, Near NSS College",
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
    { "@type": "Place", "name": "Aliyur" },
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
        <meta name="google-site-verification" content="wjcDMXNI74xDU2PI5VUWWRo3gUqneGdtI6s0ftNGc2U" />
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
