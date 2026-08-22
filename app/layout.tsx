import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteBackground } from "./components/site-background";
import { SiteRails } from "./components/site-rails";

// Brand face. Headings 600, body 400/500 (brand guidelines §06).
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Keys, order IDs and amounts are always set in mono (§06, §08).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TokenSupply · Automated key delivery for digital goods stores",
  description:
    "TokenSupply connects the channels you already sell on: G2A, Eneba, Kinguin, eBay and Shopify. Every key is delivered the second the order lands.",
  openGraph: {
    title: "TokenSupply · Automated key delivery",
    description:
      "Every key delivered the second the order lands. Stock synced, nothing oversold, no manual steps.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SiteBackground />
        <SiteRails />
        {/* Page content sits above the fixed background layer. */}
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
