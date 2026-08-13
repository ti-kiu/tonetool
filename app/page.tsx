import type { Metadata } from "next";
import Home from "./PageClient";

export const metadata: Metadata = {
  title: "Free Online Tone Generator — 1Hz to 20kHz Frequency Generator",
  description:
    "Generate any frequency from 1Hz to 20kHz instantly. Free tone generator with sine, square, sawtooth & triangle waves. Test speakers, headphones & hearing — no signup, works on mobile.",
  alternates: {
    canonical: "https://tonetool.org",
  },
  openGraph: {
    title: "Free Online Tone Generator — 1Hz to 20kHz Frequency Generator",
    description:
      "Generate any frequency from 1Hz to 20kHz instantly. Free tone generator with sine, square, sawtooth & triangle waves. Test speakers, headphones & hearing — no signup.",
    url: "https://tonetool.org",
    siteName: "ToneTool",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tone Generator — 1Hz to 20kHz Frequency Generator",
    description:
      "Generate any frequency from 1Hz to 20kHz instantly. Free tone generator with sine, square, sawtooth & triangle waves.",
  },
};

export default function Page() {
  return <Home />;
}
