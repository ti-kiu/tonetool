import type { Metadata } from "next";
import HearingTestPage from "./PageClient";

export const metadata: Metadata = {
  title: "Hearing Range Test [Free] — Test Your Hearing Frequency Range Online (2025)",
  description: "Test your hearing range with our free online hearing frequency range test. Sound generator with calibrated tones from 250Hz to 8kHz. Works on mobile with headphones.",
  alternates: {
    canonical: "https://tonetool.org/hearing-test",
  },
  openGraph: {
    title: "Hearing Range Test [Free] — Test Your Hearing Frequency Range Online (2025)",
    description: "Test your hearing range with our free online hearing frequency range test. Sound generator with calibrated tones from 250Hz to 8kHz. Works on mobile with headphones.",
    url: "https://tonetool.org/hearing-test",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hearing Range Test [Free] — Test Your Hearing Frequency Range Online (2025)",
    description: "Test your hearing range with our free online hearing frequency range test. Sound generator with calibrated tones from 250Hz to 8kHz. Works on mobile with headphones.",
  },
};

export default function Page_hearing_test() {
  return <HearingTestPage />;
}
