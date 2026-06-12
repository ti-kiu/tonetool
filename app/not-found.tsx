import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08080F] text-[#E8ECF0] flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold mb-4 text-[#00E5CC]">404</h1>
        <h2 className="text-2xl font-bold mb-4 text-[#E8ECF0]">Page Not Found</h2>
        <p className="text-[#6B7280] mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#00E5CC] text-[#08080F] rounded-lg font-semibold hover:bg-[#00E5CC]/90 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
