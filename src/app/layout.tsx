import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import { AuthDialog } from "@/components/auth/AuthDialog";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "mobile car wash Cairo",
    "car detailing Cairo",
    "car care at home",
    "GLIO",
    "car polishing Egypt",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1536, height: 1024, alt: "The GLIO service van" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2b2b2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>
        <a
          href="#main"
          className="sr-only z-[70] rounded-full bg-lime px-5 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
        <AuthDialog />
      </body>
    </html>
  );
}
