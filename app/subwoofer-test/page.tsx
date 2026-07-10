import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Subwoofer Bass Test — Free Online Low Frequency Generator",
  description: "Test your subwoofer with deep bass tones from 20 Hz to 200 Hz. Free online bass test for car audio, home theater, and speaker setup.",
  alternates: {
    canonical: "https://tonetool.org/subwoofer-test",
  },
};

export default function Page_subwoofer_test() {
  return <Page />;
}
