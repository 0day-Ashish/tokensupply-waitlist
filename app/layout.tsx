import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteBackground } from "./components/site-background";
import { SmoothScroll } from "./components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Display face for headings. Ships at 400 only — no bolder weight exists, so
// headings must not set font-weight or the browser will synthesise a fake bold.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TokenSupply — Automated key delivery for digital goods stores",
  description:
    "TokenSupply connects the channels you already sell on: G2A, Eneba, Kinguin, eBay and Shopify. Every key is delivered the second the order lands.",
  openGraph: {
    title: "TokenSupply — Automated key delivery",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        {/* Apply the saved theme before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <SiteBackground />
        <SmoothScroll>
          {/* Page content sits above the fixed background layer. */}
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
