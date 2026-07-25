import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Sine Wave Generator [Free] — Pure Tone from 1Hz to 20kHz (2025)",
  description: "Generate clean sine waves from 1Hz to 20kHz with adjustable frequency and volume. Perfect for audio testing, calibration, and education — try free now.",
  alternates: {
    canonical: "https://tonetool.org/sine-wave-generator",
  },
  openGraph: {
    title: "Sine Wave Generator [Free] — Pure Tone from 1Hz to 20kHz (2025)",
    description: "Generate clean sine waves from 1Hz to 20kHz with adjustable frequency and volume. Perfect for audio testing, calibration, and education — try free now.",
    url: "https://tonetool.org/sine-wave-generator",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sine Wave Generator [Free] — Pure Tone from 1Hz to 20kHz (2025)",
    description: "Generate clean sine waves from 1Hz to 20kHz with adjustable frequency and volume. Perfect for audio testing, calibration, and education — try free now.",
  },
};

export default function Page_sine_wave_generator() {
  return <Page />;
}
