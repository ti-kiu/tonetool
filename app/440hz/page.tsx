import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "440 Hz Tuning Tone — Free Online Standard Pitch Reference",
  description: "Generate a precise 440 Hz A4 reference tone online. Standard tuning pitch for musical instruments. Free, no signup required.",
  alternates: {
    canonical: "https://tonetool.org/440hz",
  },
};

export default function Page_440hz() {
  return <Page />;
}
