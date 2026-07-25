import type { Metadata } from "next";
import InstrumentTunerPage from "./PageClient";

export const metadata: Metadata = {
  title: "Online Instrument Tuner [Free] — Tune Guitar, Violin & Bass (2025)",
  description: "Tune your guitar, violin, bass, or any instrument using your microphone. Real-time pitch detection in your browser — try free, no app download needed.",
  alternates: {
    canonical: "https://tonetool.org/instrument-tuner",
  },
  openGraph: {
    title: "Online Instrument Tuner [Free] — Tune Guitar, Violin & Bass (2025)",
    description: "Tune your guitar, violin, bass, or any instrument using your microphone. Real-time pitch detection in your browser — try free, no app download needed.",
    url: "https://tonetool.org/instrument-tuner",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Instrument Tuner [Free] — Tune Guitar, Violin & Bass (2025)",
    description: "Tune your guitar, violin, bass, or any instrument using your microphone. Real-time pitch detection in your browser — try free, no app download needed.",
  },
};

export default function Page_instrument_tuner() {
  return <InstrumentTunerPage />;
}
