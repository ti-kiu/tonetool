import type { Metadata } from "next";
import Home from "./PageClient";

export const metadata: Metadata = {
  title: "Tone Generator — Free Online Frequency Generator for Audio Testing",
  description:
    "Free online tone generator. Generate sine, square, triangle, and sawtooth waves from 1 Hz to 20 kHz. Test headphones, speakers, hearing, and more. No signup required.",
  openGraph: {
    title: "Tone Generator — Free Online Frequency Generator for Audio Testing",
    description:
      "Free online tone generator. Generate sine, square, triangle, and sawtooth waves from 1 Hz to 20 kHz. Test headphones, speakers, hearing, and more.",
    url: "https://tonetool.org",
    siteName: "Tone Generator",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tone Generator — Free Online Frequency Generator for Audio Testing",
    description:
      "Free online tone generator. Generate sine, square, triangle, and sawtooth waves from 1 Hz to 20 kHz. Test headphones, speakers, hearing, and more.",
  },
};

export default function Page() {
  return <Home />;
}
