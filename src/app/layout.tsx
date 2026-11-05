import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-cairo",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abrag-alzil.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "أبراج العزل | عزل أسطح وكشف تسربات المياه وعزل خزانات",
    template: "%s | أبراج العزل",
  },
  description:
    "شركة أبراج العزل لعزل الأسطح وكشف تسربات المياه وعزل الخزانات في الرياض وجدة والدمام. مواد معتمدة، تنفيذ سريع، وضمان حتى 10 سنوات. اطلب كشف مجاني اليوم.",
  keywords: [
    "عزل اسطح",
    "كشف تسربات المياه",
    "عزل خزانات",
    "أبراج العزل",
    "عزل فوم",
    "عزل حراري",
    "عزل مائي",
    "شركة عزل الرياض",
    " Towers of Insulation",
  ],
  authors: [{ name: "أبراج العزل" }],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: "أبراج العزل",
    title: "أبراج العزل | عزل أسطح وكشف تسربات وعزل خزانات",
    description:
      "حماية احترافية للأسطح والخزانات وكشف دقيق لتسربات المياه مع ضمان مكتوب حتى 10 سنوات.",
    images: [{ url: "/images/hero-roof.jpg", width: 1200, height: 630, alt: "عزل أسطح أبراج العزل" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "أبراج العزل | عزل أسطح وكشف تسربات وعزل خزانات",
    description: "عزل احترافي وكشف تسربات بضمان حتى 10 سنوات.",
    images: ["/images/hero-roof.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className={`${cairo.className} bg-mist text-ink antialiased`}>{children}</body>
    </html>
  );
}
