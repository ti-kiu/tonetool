import type { Metadata } from "next";
import Home from "../PageClient";

export const metadata: Metadata = {
  title: "Frequency Generator [Free] — 1Hz to 20kHz Audio Signal Generator (2026)",
  description:
    "Free online frequency generator. Generate precise audio signals from 1Hz to 20kHz with sine, square, sawtooth & triangle waves. Test speakers, calibrate audio, and check hearing — no signup.",
  alternates: {
    canonical: "https://tonetool.org/frequency-generator",
  },
  openGraph: {
    title: "Frequency Generator [Free] — 1Hz to 20kHz Audio Signal Generator",
    description:
      "Free online frequency generator. Generate precise audio signals from 1Hz to 20kHz with sine, square, sawtooth & triangle waves. No signup required.",
    url: "https://tonetool.org/frequency-generator",
    siteName: "ToneTool",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequency Generator [Free] — 1Hz to 20kHz Audio Signal Generator",
    description:
      "Free online frequency generator. Generate precise audio signals from 1Hz to 20kHz. No signup required.",
  },
};

export default function FrequencyGeneratorPage() {
  return <Home />;
}
