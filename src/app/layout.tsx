import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_URL as siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "A researched, sourced catalog of real problems people and businesses face in Nepal — across agriculture, healthcare, fintech, tourism, governance and more. Browse them for your next startup idea.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Samasya Nepal — real problems worth solving",
    template: "%s — Samasya Nepal",
  },
  description,
  keywords: [
    "Nepal startup ideas",
    "problems in Nepal",
    "Nepal business opportunities",
    "Nepal problem statements",
    "startup ideas for Nepal",
    "Nepal founders",
    "samasya nepal",
  ],
  authors: [{ name: "Samasya Nepal" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Samasya Nepal",
    title: "Samasya Nepal — real problems worth solving",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Samasya Nepal — real problems worth solving",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
