import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Tinnitus Frequency Matcher — Find Your Exact Tinnitus Pitch Online",
  description: "Match your tinnitus frequency with our free online tone generator. Identify the exact pitch of your ringing, buzzing, or hissing. Precise Hz control.",
  alternates: {
    canonical: "https://tonetool.org/tinnitus-frequency",
  },
};

export default function Page_tinnitus_frequency() {
  return <Page />;
}
