import type { Metadata } from 'next';

const siteUrl = process.env.NEXTAUTH_URL || 'https://vela-travels-kkos-seven.vercel.app';

export const metadata: Metadata = {
  title: "About Us | Vela Travels Nenmara Palakkad",
  description: "Learn about Vela Travels in Ayilur, Nenmara (near NSS College). Premier taxi & premium fleets, airport transfers, and custom Kerala tour packages with transparent pricing.",
  keywords: [
    "About Vela Travels",
    "Premium Fleets Nenmara",
    "Taxi Operator Palakkad",
    "Travel Agency Nemmara",
    "Ayilur Premium Fleets",
    "Best Tour Operators Palakkad"
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About Us | Vela Travels Nenmara Palakkad",
    description: "Premier Taxi & Vehicle Fleets Operator located at Ayilur, Near NSS College, Nenmara, Palakkad.",
    url: `${siteUrl}/about`,
    siteName: "Vela Travels",
    locale: "en_IN",
    type: "website",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Vela Travels Nenmara",
    description: "Premier Taxi & Vehicle Fleets Operator located at Ayilur, Near NSS College, Nenmara, Palakkad.",
    images: [`${siteUrl}/og-image.jpg`]
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
