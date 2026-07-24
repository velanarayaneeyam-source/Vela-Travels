import type { Metadata } from 'next';

const siteUrl = process.env.NEXTAUTH_URL || 'https://vela-travels-kkos-seven.vercel.app';

export const metadata: Metadata = {
  title: "Tour Packages in Palakkad & Kerala Sightseeing | Vela Travels",
  description: "Book customized tour packages in Palakkad, Nelliampathy, Wayanad & Kerala. Complete sightseeing & cab rental packages from Nenmara & Ayilur.",
  keywords: [
    "Tour Packages Palakkad",
    "Kerala Tour Operator Nemmara",
    "Nelliampathy Tour Package",
    "Palakkad Sightseeing Cab",
    "Vela Travels Tour Packages",
    "Kerala Travel Packages"
  ],
  alternates: {
    canonical: `${siteUrl}/tours`,
  },
  openGraph: {
    title: "Tour Packages in Palakkad & Kerala Sightseeing | Vela Travels",
    description: "Book custom tour packages in Palakkad, Nelliampathy & Kerala with professional guides & luxury vehicles.",
    url: `${siteUrl}/tours`,
    siteName: "Vela Travels",
    locale: "en_IN",
    type: "website",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages in Palakkad & Kerala | Vela Travels",
    description: "Book custom tour packages in Palakkad & Kerala with professional guides & luxury vehicles.",
    images: [`${siteUrl}/og-image.jpg`]
  }
};

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
