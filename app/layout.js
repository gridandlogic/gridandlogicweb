import { Geist } from "next/font/google";
import "./globals.css";
import "./agency-motion.css";
import "./reference-blend.css";
import { AgencyHeader, AgencyFooter } from "@/app/components/AgencyChrome";
import { MotionController } from "@/app/components/MotionController";
import { siteUrl } from "@/app/lib/site-url";
const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  title: {
    default: "Website Development Agency & 3D Configurators | Grid & Logic",
    template: "%s | Grid & Logic",
  },
  description:
    "Grid & Logic is a website development agency building fast business websites, ecommerce stores, and interactive 3D product configurators for brands worldwide.",
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    siteName: "Grid & Logic",
    title: "Website Development Agency & 3D Configurators | Grid & Logic",
    description:
      "Web development, ecommerce, and interactive 3D product configurators by Grid & Logic, an independent digital agency working worldwide.",
    images: [
      {
        url: "/assets/social-card.png",
        width: 1200,
        height: 630,
        alt: "Grid & Logic — Good design. Smart logic. Real impact.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/assets/social-card.png"] },
  icons: {
    icon: [{ url: "/icon-512.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080a0b",
  colorScheme: "dark",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <AgencyHeader />
        {children}
        <AgencyFooter />
        <MotionController />
      </body>
    </html>
  );
}
