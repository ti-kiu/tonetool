import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Bass Frequency Test [Free] — Hz Subwoofer Test 20-200Hz Online (2025)",
  description: "Test bass frequency with our free online subwoofer Hz test. Generate low-frequency tones from 20-200Hz for car audio, home theater, and speaker bass test.",
  alternates: {
    canonical: "https://tonetool.org/subwoofer-test",
  },
  openGraph: {
    title: "Bass Frequency Test [Free] — Hz Subwoofer Test 20-200Hz Online (2025)",
    description: "Test bass frequency with our free online subwoofer Hz test. Generate low-frequency tones from 20-200Hz for car audio, home theater, and speaker bass test.",
    url: "https://tonetool.org/subwoofer-test",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bass Frequency Test [Free] — Hz Subwoofer Test 20-200Hz Online (2025)",
    description: "Test bass frequency with our free online subwoofer Hz test. Generate low-frequency tones from 20-200Hz for car audio, home theater, and speaker bass test.",
  },
};

export default function Page_subwoofer_test() {
  return <Page />;
}
