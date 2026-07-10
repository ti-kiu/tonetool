import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "White Noise Generator — Free Online Sleep & Focus Sound",
  description: "Generate white noise, pink noise, and brown noise online. Perfect for sleep, focus, studying, and tinnitus relief. Free, no signup required.",
  alternates: {
    canonical: "https://tonetool.org/white-noise",
  },
};

export default function Page_white_noise() {
  return <Page />;
}
