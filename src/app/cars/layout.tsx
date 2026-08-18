import type { Metadata } from 'next';

const siteUrl = process.env.NEXTAUTH_URL || 'https://vela-travels-kkos-seven.vercel.app';

export const metadata: Metadata = {
  title: "Premium Fleets & Taxi Services in Nenmara, Palakkad | Vela Travels",
  description: "Explore our fleet of luxury sedans, SUVs, group travellers & airport cabs in Nenmara, Ayilur (near NSS College), Palakkad. Best hourly & daily booking rates.",
  keywords: [
    "Premium Fleets Nenmara",
    "Group Travellers Palakkad",
    "SUV Booking Nemmara",
    "Luxury Fleet Palakkad",
    "Premium Fleet Ayilur",
    "Taxi Service near NSS College Nemmara",
    "Wedding Car & Fleet Palakkad"
  ],
  alternates: {
    canonical: `${siteUrl}/cars`,
  },
  openGraph: {
    title: "Premium Fleets & Taxi Services in Nenmara, Palakkad | Vela Travels",
    description: "Book luxury sedans, SUVs & group travellers in Nenmara, Ayilur, Palakkad. Best rates & instant booking.",
    url: `${siteUrl}/cars`,
    siteName: "Vela Travels",
    locale: "en_IN",
    type: "website",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Fleets & Taxi Services in Nenmara, Palakkad",
    description: "Book luxury sedans, SUVs & group travellers in Nenmara, Ayilur, Palakkad.",
    images: [`${siteUrl}/og-image.jpg`]
  }
};

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
