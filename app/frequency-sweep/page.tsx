import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Frequency Sweep Generator — Test Speakers & Hearing Online Free",
  description: "Generate frequency sweeps from 20 Hz to 20 kHz online. Test speaker response, hearing range, and audio equipment. Free, no signup required.",
  alternates: {
    canonical: "https://tonetool.org/frequency-sweep",
  },
};

export default function Page_frequency_sweep() {
  return <Page />;
}
