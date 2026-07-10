import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Binaural Beats Generator — Free Online Brainwave Entrainment",
  description: "Generate binaural beats online for focus, sleep, and meditation. Choose delta, theta, alpha, beta, or gamma frequencies. Free, works on any device.",
  alternates: {
    canonical: "https://tonetool.org/binaural-beats",
  },
};

export default function Page_binaural_beats() {
  return <Page />;
}
