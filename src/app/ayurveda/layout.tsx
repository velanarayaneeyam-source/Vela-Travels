import type { Metadata } from 'next';

const siteUrl = process.env.NEXTAUTH_URL || 'https://vela-travels-kkos-seven.vercel.app';

export const metadata: Metadata = {
  title: "Ayurveda Wellness & Spa Tours in Kerala | Vela Travels Nenmara",
  description: "Authentic Ayurveda wellness & spa tour packages in Kerala. Rejuvenating health retreats & comfortable transport from Nenmara, Palakkad.",
  keywords: [
    "Ayurveda Tour Kerala",
    "Wellness Retreat Palakkad",
    "Ayurvedic Spa Packages Kerala",
    "Vela Travels Ayurveda",
    "Nenmara Ayurveda Tour"
  ],
  alternates: {
    canonical: `${siteUrl}/ayurveda`,
  },
  openGraph: {
    title: "Ayurveda Wellness & Spa Tours in Kerala | Vela Travels",
    description: "Rejuvenating Ayurveda & spa retreats in Kerala with private transport from Nenmara, Palakkad.",
    url: `${siteUrl}/ayurveda`,
    siteName: "Vela Travels",
    locale: "en_IN",
    type: "website",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayurveda Wellness & Spa Tours in Kerala",
    description: "Rejuvenating Ayurveda & spa retreats in Kerala with private transport from Nenmara, Palakkad.",
    images: [`${siteUrl}/og-image.jpg`]
  }
};

export default function AyurvedaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
