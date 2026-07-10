import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Sine Wave Generator — Free Online Pure Tone Generator",
  description: "Generate clean sine waves from 1 Hz to 20 kHz. Adjustable frequency and volume. Free online tool for audio testing, education, and music.",
  alternates: {
    canonical: "https://tonetool.org/sine-wave-generator",
  },
  openGraph: {
    title: "Sine Wave Generator — Free Online Pure Tone Generator",
    description: "Generate clean sine waves from 1 Hz to 20 kHz. Adjustable frequency and volume. Free online tool for audio testing, education, and music.",
    url: "https://tonetool.org/sine-wave-generator",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sine Wave Generator — Free Online Pure Tone Generator",
    description: "Generate clean sine waves from 1 Hz to 20 kHz. Adjustable frequency and volume. Free online tool for audio testing, education, and music.",
  },
};

export default function Page_sine_wave_generator() {
  return <Page />;
}
