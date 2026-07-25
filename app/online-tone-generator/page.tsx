import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Online Tone Generator [Free] — Sine, Square & Sawtooth Waves (2025)",
  description: "Generate pure tones from 1Hz to 20kHz. Choose sine, square, triangle, or sawtooth waveforms. Try free — no signup, works on any mobile device.",
  alternates: {
    canonical: "https://tonetool.org/online-tone-generator",
  },
  openGraph: {
    title: "Online Tone Generator [Free] — Sine, Square & Sawtooth Waves (2025)",
    description: "Generate pure tones from 1Hz to 20kHz. Choose sine, square, triangle, or sawtooth waveforms. Try free — no signup, works on any mobile device.",
    url: "https://tonetool.org/online-tone-generator",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Tone Generator [Free] — Sine, Square & Sawtooth Waves (2025)",
    description: "Generate pure tones from 1Hz to 20kHz. Choose sine, square, triangle, or sawtooth waveforms. Try free — no signup, works on any mobile device.",
  },
};

export default function Page_online_tone_generator() {
  return <Page />;
}
