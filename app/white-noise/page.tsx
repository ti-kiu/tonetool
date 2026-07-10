import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "White Noise Generator — Free Online Sleep & Focus Sound",
  description: "Generate white noise, pink noise, and brown noise online. Perfect for sleep, focus, studying, and tinnitus relief. Free, no signup required.",
  alternates: {
    canonical: "https://tonetool.org/white-noise",
  },
  openGraph: {
    title: "White Noise Generator — Free Online Sleep & Focus Sound",
    description: "Generate white, pink, and brown noise online. Perfect for sleep, focus, studying, and tinnitus relief. Free, works on any device.",
    url: "https://tonetool.org/white-noise",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "White Noise Generator — Free Online Sleep & Focus Sound",
    description: "Generate white, pink, and brown noise online. Perfect for sleep, focus, studying, and tinnitus relief. Free, works on any device.",
  },
};

export default function Page_white_noise() {
  return <Page />;
}
