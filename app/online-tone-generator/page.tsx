import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Free Online Tone Generator — Generate Sine, Square, Sawtooth Waves",
  description: "Generate pure tones from 1 Hz to 20 kHz online. Choose sine, square, triangle, or sawtooth waveforms. Free, no signup, works on mobile.",
  alternates: {
    canonical: "https://tonetool.org/online-tone-generator",
  },
};

export default function Page_online_tone_generator() {
  return <Page />;
}
