'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#08080F] text-[#E8ECF0] flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#E8ECF0]">Something went wrong</h2>
        <p className="text-[#6B7280] mb-6">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#00E5CC] text-[#08080F] rounded-lg font-semibold hover:bg-[#00E5CC]/90 transition"
        >
          Try Again
        </button>
        {error && (
          <details className="mt-6 text-left">
            <summary className="text-[#6B7280] text-sm cursor-pointer hover:text-[#E8ECF0]">
              Technical details
            </summary>
            <pre className="mt-2 text-xs text-[#6B7280] bg-[#0F0F1A] p-4 rounded-lg overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
