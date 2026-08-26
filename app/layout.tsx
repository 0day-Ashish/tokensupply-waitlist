import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteBackground } from "./components/site-background";
import { SiteRails } from "./components/site-rails";

// Brand face, now headings only (brand guidelines §06).
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Body copy face. 400/500 for running text.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
      data-theme="light"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the stored theme before first paint. Without this the page
            renders light, then swaps on hydration - a visible flash for anyone
            on dark. It runs inline and synchronously for that reason.
            suppressHydrationWarning above covers the attribute this rewrites. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var t=s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
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
