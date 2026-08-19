import type { Metadata } from "next";
import Home from "../PageClient";

export const metadata: Metadata = {
  title: "Frequency Generator Online — Free Audio Signal Generator [1Hz-20kHz]",
  description:
    "Free online frequency generator. Generate precise audio signals from 1Hz to 20kHz with sine, square, sawtooth & triangle waves. Test speakers, calibrate audio, check hearing — no signup, instant playback.",
  alternates: {
    canonical: "https://tonetool.org/frequency-generator",
  },
  openGraph: {
    title: "Frequency Generator Online — Free Audio Signal Generator [1Hz-20kHz]",
    description:
      "Free online frequency generator. Generate precise audio signals from 1Hz to 20kHz with sine, square, sawtooth & triangle waves. Test speakers, calibrate audio, check hearing — no signup, instant playback.",
    url: "https://tonetool.org/frequency-generator",
    siteName: "ToneTool",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequency Generator Online — Free Audio Signal Generator [1Hz-20kHz]",
    description:
      "Free online frequency generator. Generate precise audio signals from 1Hz to 20kHz. Test speakers, calibrate audio, check hearing — no signup.",
  },
};

export default function FrequencyGeneratorPage() {
  return <Home />;
}
