import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "White Noise Generator Online [Free] — Sleep, Focus & Study Sounds (2025)",
  description: "Free white noise generator online. Generate white, pink, and brown noise for sleep, focus, studying, and tinnitus relief. Instant playback in your browser, no signup.",
  alternates: {
    canonical: "https://tonetool.org/white-noise",
  },
  openGraph: {
    title: "White Noise Generator Online [Free] — Sleep, Focus & Study Sounds (2025)",
    description: "Free white noise generator online. Generate white, pink, and brown noise for sleep, focus, studying, and tinnitus relief. Instant playback in your browser, no signup.",
    url: "https://tonetool.org/white-noise",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "White Noise Generator Online [Free] — Sleep, Focus & Study Sounds (2025)",
    description: "Free white noise generator online. Generate white, pink, and brown noise for sleep, focus, studying, and tinnitus relief. Instant playback in your browser, no signup.",
  },
};

export default function Page_white_noise() {
  return <Page />;
}
