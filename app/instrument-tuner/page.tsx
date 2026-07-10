import type { Metadata } from "next";
import InstrumentTunerPage from "./PageClient";

export const metadata: Metadata = {
  title: "Online Instrument Tuner — Tune Guitar, Violin, Bass Free",
  description: "Tune any instrument online with our free pitch detection tool. Real-time microphone-based tuning for guitar, violin, bass, and more.",
  alternates: {
    canonical: "https://tonetool.org/instrument-tuner",
  },
  openGraph: {
    title: "Online Instrument Tuner — Tune Guitar, Violin, Bass Free",
    description: "Tune any instrument online with our free pitch detection tool. Real-time microphone-based tuning for guitar, violin, bass, and more.",
    url: "https://tonetool.org/instrument-tuner",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Instrument Tuner — Tune Guitar, Violin, Bass Free",
    description: "Tune any instrument online with our free pitch detection tool. Real-time microphone-based tuning for guitar, violin, bass, and more.",
  },
};

export default function Page_instrument_tuner() {
  return <InstrumentTunerPage />;
}
