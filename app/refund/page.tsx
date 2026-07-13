import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | Tone Generator',
  description: 'Refund policy for Tone Generator (tonetool.org). We offer a 14-day unconditional refund guarantee on all premium features and subscriptions.',
};

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-300 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Refund Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toISOString().split('T')[0]}</p>

        <div className="prose prose-invert prose-gray max-w-none">
          <section className="mb-8 bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-cyan-400 mb-3">14-Day Unconditional Refund</h2>
            <p className="text-gray-300 leading-relaxed">
              We offer a <strong className="text-white">14-day unconditional refund</strong> on all purchases. 
              No questions asked. If you are not satisfied for any reason, you can request a full refund within 14 days of purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">How to Request a Refund</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-800/30 rounded-xl p-5">
                <h3 className="text-lg font-medium text-white mb-2">Option 1: Creem Customer Portal (Recommended)</h3>
                <ol className="list-decimal list-inside text-gray-400 space-y-1">
                  <li>Visit the <a href="https://creem.io" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Creem Customer Portal</a></li>
                  <li>Log in with your purchase email</li>
                  <li>Find your ToneGen Pro purchase</li>
                  <li>Click &quot;Request Refund&quot;</li>
                </ol>
              </div>

              <div className="bg-gray-800/30 rounded-xl p-5">
                <h3 className="text-lg font-medium text-white mb-2">Option 2: Contact Us</h3>
                <p className="text-gray-400 mb-2">Email us with the following information:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Your purchase email</li>
                  <li>Purchase date</li>
                  <li>Reason for refund (optional — helps us improve)</li>
                </ul>
                <p className="text-gray-500 italic mt-2">
                  Email us at{' '}
                  <a href="mailto:support@tonetool.org" className="text-cyan-400 hover:underline">support@tonetool.org</a>
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">Refund Processing</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Refunds are processed within 5-10 business days</li>
              <li>Refunds are issued to your original payment method</li>
              <li>You will receive an email confirmation when the refund is processed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">What Happens After Refund</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Your license key will be deactivated</li>
              <li>Pro features will no longer be accessible</li>
              <li>You can continue using the free version</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">Exceptions</h2>
            <p className="text-gray-400 leading-relaxed">
              There are no exceptions. All purchases are eligible for refund within 14 days, no questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p className="text-gray-400 leading-relaxed">
              Email us at{' '}
              <a href="mailto:support@tonetool.org" className="text-cyan-400 hover:underline">support@tonetool.org</a>.
            </p>
            <p className="text-gray-400 leading-relaxed mt-3">
              For refund-related privacy questions, see our{' '}
              <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
