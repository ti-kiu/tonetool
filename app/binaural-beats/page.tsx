import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Binaural Beats Generator — Free Online Brainwave Entrainment",
  description: "Generate binaural beats online for focus, sleep, and meditation. Choose delta, theta, alpha, beta, or gamma frequencies. Free, works on any device.",
  alternates: {
    canonical: "https://tonetool.org/binaural-beats",
  },
  openGraph: {
    title: "Binaural Beats Generator — Free Online Brainwave Entrainment",
    description: "Generate binaural beats online for focus, sleep, and meditation. Choose delta, theta, alpha, beta, or gamma frequencies. Free, works on any device.",
    url: "https://tonetool.org/binaural-beats",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binaural Beats Generator — Free Online Brainwave Entrainment",
    description: "Generate binaural beats online for focus, sleep, and meditation. Choose delta, theta, alpha, beta, or gamma frequencies. Free, works on any device.",
  },
};

export default function Page_binaural_beats() {
  return <Page />;
}
