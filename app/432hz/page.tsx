import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "432 Hz Tone Generator — Free Online 432Hz Frequency Tool",
  description: "Generate a pure 432 Hz tone online. Compare 432 Hz vs 440 Hz tuning. Free, no signup. Perfect for meditation, relaxation, and music tuning.",
  alternates: {
    canonical: "https://tonetool.org/432hz",
  },
};

export default function Page_432hz() {
  return <Page />;
}
