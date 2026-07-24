import type { Metadata } from 'next';

const siteUrl = process.env.NEXTAUTH_URL || 'https://vela-travels-kkos-seven.vercel.app';

export const metadata: Metadata = {
  title: "About Us | Vela Travels Nenmara Palakkad",
  description: "Learn about Vela Travels in Ayilur, Nenmara (near NSS College). Premier car rental, airport taxi transfers, and custom Kerala tour packages with transparent pricing.",
  keywords: [
    "About Vela Travels",
    "Car Rental Company Nenmara",
    "Taxi Operator Palakkad",
    "Travel Agency Nemmara",
    "Ayilur Car Rentals",
    "Best Tour Operators Palakkad"
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About Us | Vela Travels Nenmara Palakkad",
    description: "Premier Car Rental & Tour Operator located at Ayilur, Near NSS College, Nenmara, Palakkad.",
    url: `${siteUrl}/about`,
    siteName: "Vela Travels",
    locale: "en_IN",
    type: "website",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Vela Travels Nenmara",
    description: "Premier Car Rental & Tour Operator located at Ayilur, Near NSS College, Nenmara, Palakkad.",
    images: [`${siteUrl}/og-image.jpg`]
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
