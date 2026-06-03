import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Tone Generator',
  description: 'Privacy policy for Tone Generator (tonetool.org). Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-300 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toISOString().split('T')[0]}</p>

        <div className="prose prose-invert prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p className="text-gray-400 leading-relaxed">
              Tone Generator (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates tonetool.org. 
              This Privacy Policy explains how we collect, use, and protect your information 
              when you use our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-white mb-2">2.1 Information You Provide</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              <strong>Email address:</strong> When you purchase a Pro license, your email is collected 
              by Creem (our payment processor) and used by us to send your license key via Resend.
            </p>

            <h3 className="text-lg font-medium text-white mb-2">2.2 Information Collected Automatically</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
              <li><strong>Usage data:</strong> Pages visited, time spent, clicks — via Google Analytics 4</li>
              <li><strong>Device data:</strong> Browser type, screen size, operating system — via Google Analytics 4</li>
              <li><strong>Cookie data:</strong> See our <a href="/cookie-policy" className="text-cyan-400 hover:underline">Cookie Policy</a></li>
            </ul>

            <h3 className="text-lg font-medium text-white mb-2">2.3 Information We Do NOT Collect</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>We do not collect or store audio you generate. All audio processing happens locally in your browser.</li>
              <li>We do not require account registration.</li>
              <li>We do not collect payment information directly (handled by Creem).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-2 pr-4 text-white font-medium">Purpose</th>
                    <th className="py-2 text-white font-medium">Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">Website analytics</td>
                    <td className="py-2">Legitimate interest</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">Advertising</td>
                    <td className="py-2">Your consent (via cookie banner)</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">Processing purchases</td>
                    <td className="py-2">Contract performance</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">Sending license keys</td>
                    <td className="py-2">Contract performance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-2 pr-4 text-white font-medium">Service</th>
                    <th className="py-2 pr-4 text-white font-medium">Purpose</th>
                    <th className="py-2 text-white font-medium">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">Google Analytics 4</td>
                    <td className="py-2 pr-4">Traffic analysis</td>
                    <td className="py-2"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">google.com/privacy</a></td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">Google AdSense</td>
                    <td className="py-2 pr-4">Advertising</td>
                    <td className="py-2"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">google.com/privacy</a></td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">Creem</td>
                    <td className="py-2 pr-4">Payment processing</td>
                    <td className="py-2"><a href="https://creem.io/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">creem.io/privacy</a></td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">Resend</td>
                    <td className="py-2 pr-4">Email delivery</td>
                    <td className="py-2"><a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">resend.com/privacy</a></td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">Cloudflare</td>
                    <td className="py-2 pr-4">Hosting / CDN</td>
                    <td className="py-2"><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">cloudflare.com/privacy</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">5. Cookies and Local Storage</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We use cookies and browser localStorage to provide and improve our service. 
              See our <a href="/cookie-policy" className="text-cyan-400 hover:underline">Cookie Policy</a> for details.
            </p>
            <h3 className="text-lg font-medium text-white mb-2">Local Storage Items</h3>
            <p className="text-gray-400 leading-relaxed mb-2">
              In addition to cookies, we store the following data in your browser's localStorage:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">tonegen_license</code> — Your Pro license key (if purchased)</li>
              <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">tonegen_pro</code> — Your Pro subscription status</li>
              <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">tonegen_cookie_consent</code> — Your cookie consent preferences</li>
              <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">tonegen_volume_warning_dismissed</code> — Whether you dismissed the volume warning</li>
              <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">tonegen_highfreq_warning_dismissed</code> — Whether you dismissed the high frequency warning</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              These items are stored locally on your device and are not transmitted to our servers. 
              You can clear them at any time through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights (GDPR / CCPA)</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Deletion:</strong> Request deletion of your data</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interest</li>
              <li><strong>Withdraw consent:</strong> Disable cookies at any time via the cookie banner</li>
            </ul>
            <p className="text-gray-400 leading-relaxed">
              To exercise these rights, contact us at:{' '}
              <span className="text-gray-500 italic">[contact email pending — will be updated after domain email setup]</span>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">7. Data Retention</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Analytics data: 14 months (GA4 default)</li>
              <li>License records: Retained for the duration of your subscription or lifetime access</li>
              <li>Email addresses: Retained for license delivery and support purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">8. International Transfers</h2>
            <p className="text-gray-400 leading-relaxed">
              Your data may be transferred to and processed in the United States by our service providers 
              (Google, Creem, Resend). These transfers are protected by standard contractual clauses 
              where required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-gray-400 leading-relaxed">
              Our service is not intended for children under 13. We do not knowingly collect data from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">10. Changes to This Policy</h2>
            <p className="text-gray-400 leading-relaxed">
              We may update this policy. Changes will be posted here with an updated date. 
              Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact</h2>
            <p className="text-gray-400 leading-relaxed">
              <span className="text-gray-500 italic">[Contact email will be added after domain email setup]</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}