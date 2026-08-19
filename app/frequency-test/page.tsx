import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Frequency Test [Free] — Test Any Audio Frequency Online 1Hz-20kHz (2025)",
  description: "Test any audio frequency online with our free frequency test tool. Generate and test tones from 1Hz to 20kHz for speaker testing, hearing checks, and audio calibration.",
  alternates: {
    canonical: "https://tonetool.org/frequency-test",
  },
  openGraph: {
    title: "Frequency Test [Free] — Test Any Audio Frequency Online 1Hz-20kHz (2025)",
    description: "Test any audio frequency online with our free frequency test tool. Generate and test tones from 1Hz to 20kHz for speaker testing, hearing checks, and audio calibration.",
    url: "https://tonetool.org/frequency-test",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequency Test [Free] — Test Any Audio Frequency Online 1Hz-20kHz (2025)",
    description: "Test any audio frequency online with our free frequency test tool. Generate and test tones from 1Hz to 20kHz for speaker testing, hearing checks, and audio calibration.",
  },
};

export default function Page_frequency_test() {
  return <Page />;
}
