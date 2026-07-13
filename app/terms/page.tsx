import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Tone Generator',
  description: 'Terms of Service for Tone Generator (tonetool.org). Read our terms for using the free online tone generator, frequency tools, and audio testing features.',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-300 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toISOString().split('T')[0]}</p>

        <div className="prose prose-invert prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              By using tonetool.org, you agree to these Terms of Service. If you do not agree, please do not use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p className="text-gray-400 leading-relaxed">
              Tone Generator is a free online tool for generating audio frequencies. The Pro version offers additional features for a fee.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">3. Free Version</h2>
            <p className="text-gray-400 leading-relaxed">
              The free version is provided &quot;as is&quot; at no cost. It includes advertising.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">4. Pro Version</h2>
            
            <h3 className="text-lg font-medium text-white mb-2">4.1 Pricing</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
              <li>Monthly: $4.99/month</li>
              <li>Lifetime: $29.99 one-time</li>
            </ul>

            <h3 className="text-lg font-medium text-white mb-2">4.2 Payment</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Payments are processed by Creem. We do not store your payment information.
            </p>

            <h3 className="text-lg font-medium text-white mb-2">4.3 Refunds</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              We offer a 14-day unconditional refund. See our <a href="/refund" className="text-cyan-400 hover:underline">Refund Policy</a> for details.
            </p>

            <h3 className="text-lg font-medium text-white mb-2">4.4 Cancellation</h3>
            <p className="text-gray-400 leading-relaxed">
              You can cancel your subscription at any time through the <a href="https://creem.io" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Creem Customer Portal</a>. Cancellation takes effect at the end of the current billing period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">5. License Key</h2>
            <p className="text-gray-400 leading-relaxed">
              Upon purchase, you receive a license key. This key is for your personal use only. Do not share or resell.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
            <p className="text-gray-400 leading-relaxed">
              All code, design, and content on tonetool.org is our property. The audio you generate is yours.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">7. Prohibited Use</h2>
            <p className="text-gray-400 leading-relaxed mb-2">You may not:</p>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Use the service for illegal purposes</li>
              <li>Attempt to reverse engineer the code</li>
              <li>Distribute license keys</li>
              <li>Abuse or overload our infrastructure</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">8. Disclaimer of Warranties</h2>
            <p className="text-gray-400 leading-relaxed uppercase">
              The service is provided &quot;as is&quot; without warranties of any kind, either express or implied.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
            <p className="text-gray-400 leading-relaxed uppercase">
              To the maximum extent permitted by law, we are not liable for any damages arising from your use of the service.
            </p>
          </section>

          <section className="mb-8 bg-red-500/5 border border-red-500/20 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              10. Hearing Safety
            </h2>
            <p className="text-red-200/80 leading-relaxed mb-3">
              <strong className="text-red-400">IMPORTANT:</strong> Prolonged exposure to loud audio can cause permanent hearing damage. 
              Always start at low volume and increase gradually. We are not responsible for hearing damage resulting from use of this tool.
            </p>
            <ul className="list-disc list-inside text-red-200/70 space-y-1">
              <li>Do not use this tool at high volume for extended periods</li>
              <li>If you experience discomfort, stop immediately</li>
              <li>This tool is not a substitute for professional hearing protection</li>
              <li>Children should only use this tool under adult supervision</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">11. Not Medical Advice</h2>
            <p className="text-gray-400 leading-relaxed">
              This tool is <strong className="text-white">not a medical device</strong>. It is not intended for diagnosis or treatment of hearing conditions. 
              If you have hearing concerns, consult a qualified healthcare professional.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">12. Changes to Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              We may update these terms. Continued use constitutes acceptance. 
              Please review our <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a> and{' '}
              <a href="/cookie-policy" className="text-cyan-400 hover:underline">Cookie Policy</a> for related information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">13. Governing Law</h2>
            <p className="text-gray-400 leading-relaxed">
              These terms are governed by the laws applicable in the jurisdiction of the service operator.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">14. Contact</h2>
            <p className="text-gray-400 leading-relaxed">
              For questions about these Terms, contact us at{' '}
              <a href="mailto:hello@tonetool.org" className="text-cyan-400 hover:underline">hello@tonetool.org</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
