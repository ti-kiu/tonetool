import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Tone Generator Online — Free Frequency Generator 1Hz-20kHz (No Signup)",
  description: "Free online tone generator. Generate sine, square, triangle & sawtooth waves from 1Hz to 20kHz instantly — no signup, no download. Test speakers, tune instruments, check hearing now.",
  alternates: {
    canonical: "https://tonetool.org/online-tone-generator",
  },
  openGraph: {
    title: "Tone Generator Online — Free Frequency Generator 1Hz-20kHz (No Signup)",
    description: "Free online tone generator. Generate sine, square, triangle & sawtooth waves from 1Hz to 20kHz instantly — no signup, no download. Test speakers, tune instruments, check hearing now.",
    url: "https://tonetool.org/online-tone-generator",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tone Generator Online — Free Frequency Generator 1Hz-20kHz (No Signup)",
    description: "Free online tone generator. Generate sine, square, triangle & sawtooth waves from 1Hz to 20kHz instantly — no signup, no download. Test speakers, tune instruments, check hearing now.",
  },
};

export default function Page_online_tone_generator() {
  return <Page />;
}
