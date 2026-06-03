import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Tone Generator",
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#08080F] text-[#E8ECF0] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-['JetBrains_Mono',monospace] text-6xl font-bold text-[#00E5CC] mb-4">
          404
        </p>
        <h1 className="font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#E8ECF0] mb-4">
          Frequency Not Found
        </h1>
        <p className="text-[#6B7280] mb-8">
          This tone doesn&apos;t exist on our spectrum. Let&apos;s get you back to a frequency that works.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#FFBF00] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold rounded-xl hover:bg-[#e6ac00] transition-colors"
        >
          Back to Tone Generator
        </Link>
      </div>
    </main>
  );
}
