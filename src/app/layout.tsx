
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

export const metadata: Metadata = {
  title: "Vela Travels | Premium Vehicle Rentals",
  description: "Experience the best of India with Vela Travels. We specialize in premium vehicle rentals and seamless travel experiences.",
  keywords: "Vela Travels, Vehicle Rental India, Premium Cars India, Travel Agency",
  openGraph: {
    title: "Vela Travels | Premium Vehicle Rentals",
    description: "Book your complete India journey with Vela Travels. Premium vehicle rentals for the modern traveler.",
    images: ["/og-image.jpg"],
    url: 'https://velatravels.com',
    siteName: 'Vela Travels',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // THE SHELL IS NOW INSTANT
  // Navbar and Footer are passed as props to ClientLayout,
  // allowing them to stay as Server Components with their own Suspendable data fetching.
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="google-site-verification" content="wjcDMXNI74xDU2PI5VUWWRo3gUqneGdtI6s0ftNGc2U" />
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
