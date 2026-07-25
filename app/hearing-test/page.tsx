import type { Metadata } from "next";
import HearingTestPage from "./PageClient";

export const metadata: Metadata = {
  title: "Online Hearing Test [Free] — Check Your Hearing Range Instantly (2025)",
  description: "Test your hearing range with calibrated tones from 250Hz to 8kHz. Quick audiometric screening in your browser — try free, works on mobile with headphones.",
  alternates: {
    canonical: "https://tonetool.org/hearing-test",
  },
  openGraph: {
    title: "Online Hearing Test [Free] — Check Your Hearing Range Instantly (2025)",
    description: "Test your hearing range with calibrated tones from 250Hz to 8kHz. Quick audiometric screening in your browser — try free, works on mobile with headphones.",
    url: "https://tonetool.org/hearing-test",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Hearing Test [Free] — Check Your Hearing Range Instantly (2025)",
    description: "Test your hearing range with calibrated tones from 250Hz to 8kHz. Quick audiometric screening in your browser — try free, works on mobile with headphones.",
  },
};

export default function Page_hearing_test() {
  return <HearingTestPage />;
}
