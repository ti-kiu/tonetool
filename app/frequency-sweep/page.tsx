import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Frequency Sweep Generator [Free] — Test Speakers & Hearing Range (2025)",
  description: "Run frequency sweeps from 20Hz to 20kHz to test speakers, headphones, and hearing range. Instant playback in your browser — try free, no signup.",
  alternates: {
    canonical: "https://tonetool.org/frequency-sweep",
  },
  openGraph: {
    title: "Frequency Sweep Generator [Free] — Test Speakers & Hearing Range (2025)",
    description: "Run frequency sweeps from 20Hz to 20kHz to test speakers, headphones, and hearing range. Instant playback in your browser — try free, no signup.",
    url: "https://tonetool.org/frequency-sweep",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequency Sweep Generator [Free] — Test Speakers & Hearing Range (2025)",
    description: "Run frequency sweeps from 20Hz to 20kHz to test speakers, headphones, and hearing range. Instant playback in your browser — try free, no signup.",
  },
};

export default function Page_frequency_sweep() {
  return <Page />;
}
