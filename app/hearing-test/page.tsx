import type { Metadata } from "next";
import HearingTestPage from "./PageClient";

export const metadata: Metadata = {
  title: "Free Online Hearing Test — Check Your Hearing Range by Frequency",
  description: "Test your hearing range online with calibrated tones from 250 Hz to 8000 Hz. Quick audiometric screening. Free, works on mobile with headphones.",
  alternates: {
    canonical: "https://tonetool.org/hearing-test",
  },
};

export default function Page_hearing_test() {
  return <HearingTestPage />;
}
