import type { Metadata } from 'next';

const siteUrl = process.env.NEXTAUTH_URL || 'https://vela-travels-kkos-seven.vercel.app';

export const metadata: Metadata = {
  title: "Contact Us | Vela Travels Nenmara Palakkad | Phone & WhatsApp",
  description: "Contact Vela Travels at Ayilur, Near NSS College, Nenmara, Palakkad. Call +91 9207050525 for 24/7 Car Rentals, Airport Taxis & Tour Packages.",
  keywords: [
    "Contact Vela Travels",
    "Car Rental Phone Number Nenmara",
    "Taxi Booking Number Palakkad",
    "Ayilur Taxi Contact",
    "NSS College Nemmara Taxi",
    "Cochin Airport Cab Contact Nenmara"
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Us | Vela Travels Nenmara Palakkad",
    description: "24/7 Taxi & Car Rental Contact: +91 9207050525. Located at Ayilur, Near NSS College, Nenmara, Palakkad.",
    url: `${siteUrl}/contact`,
    siteName: "Vela Travels",
    locale: "en_IN",
    type: "website",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Vela Travels Nenmara",
    description: "Contact Vela Travels at Ayilur, Near NSS College, Nenmara, Palakkad. Call +91 9207050525.",
    images: [`${siteUrl}/og-image.jpg`]
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
