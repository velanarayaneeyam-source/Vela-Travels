import type { Metadata } from 'next';

const siteUrl = process.env.NEXTAUTH_URL || 'https://vela-travels-kkos-seven.vercel.app';

export const metadata: Metadata = {
  title: "Car Rentals & Self Drive Vehicles in Nenmara, Palakkad | Vela Travels",
  description: "Explore our fleet of luxury sedans, SUVs, self-drive cars & airport cabs in Nenmara, Aliyur (near NSS College), Palakkad. Best hourly & daily rental rates.",
  keywords: [
    "Car Rental Nenmara",
    "Self Drive Cars Palakkad",
    "SUV Rental Nemmara",
    "Luxury Car Rental Palakkad",
    "Car Rental Aliyur",
    "Taxi Service near NSS College Nemmara",
    "Wedding Car Rental Palakkad"
  ],
  alternates: {
    canonical: `${siteUrl}/cars`,
  },
  openGraph: {
    title: "Car Rentals & Self Drive Vehicles in Nenmara, Palakkad | Vela Travels",
    description: "Book luxury sedans, SUVs & self-drive cars in Nenmara, Aliyur, Palakkad. Best rates & instant booking.",
    url: `${siteUrl}/cars`,
    siteName: "Vela Travels",
    locale: "en_IN",
    type: "website",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Rentals & Self Drive Vehicles in Nenmara, Palakkad",
    description: "Book luxury sedans, SUVs & self-drive cars in Nenmara, Aliyur, Palakkad.",
    images: [`${siteUrl}/og-image.jpg`]
  }
};

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
