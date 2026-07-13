import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Tone Generator',
  description: 'Cookie policy for Tone Generator (tonetool.org). Learn how we use cookies and similar technologies on our free online audio testing platform.',
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-300 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Cookie Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toISOString().split('T')[0]}</p>

        <div className="prose prose-invert prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">1. What Are Cookies</h2>
            <p className="text-gray-400 leading-relaxed">
              Cookies are small text files stored on your device when you visit websites. 
              They help websites function properly and provide information to site owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">2. Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-2 pr-4 text-white font-medium">Cookie</th>
                    <th className="py-2 pr-4 text-white font-medium">Provider</th>
                    <th className="py-2 pr-4 text-white font-medium">Purpose</th>
                    <th className="py-2 text-white font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">_ga</td>
                    <td className="py-2 pr-4">Google Analytics</td>
                    <td className="py-2 pr-4">Distinguish users</td>
                    <td className="py-2">2 years</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">_gid</td>
                    <td className="py-2 pr-4">Google Analytics</td>
                    <td className="py-2 pr-4">Distinguish users</td>
                    <td className="py-2">24 hours</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">_gat</td>
                    <td className="py-2 pr-4">Google Analytics</td>
                    <td className="py-2 pr-4">Throttle request rate</td>
                    <td className="py-2">1 minute</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">__gads</td>
                    <td className="py-2 pr-4">Google AdSense</td>
                    <td className="py-2 pr-4">Advertising</td>
                    <td className="py-2">Varies</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">IDE</td>
                    <td className="py-2 pr-4">Google AdSense</td>
                    <td className="py-2 pr-4">Advertising</td>
                    <td className="py-2">1 year</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">tonegen_license</td>
                    <td className="py-2 pr-4">Tone Generator</td>
                    <td className="py-2 pr-4">Store license key</td>
                    <td className="py-2">Persistent</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">tonegen_pro</td>
                    <td className="py-2 pr-4">Tone Generator</td>
                    <td className="py-2 pr-4">Store Pro status</td>
                    <td className="py-2">Persistent</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">tonegen_cookie_consent</td>
                    <td className="py-2 pr-4">Tone Generator</td>
                    <td className="py-2 pr-4">Store consent preferences</td>
                    <td className="py-2">1 year</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">tonegen_volume_warning_dismissed</td>
                    <td className="py-2 pr-4">Tone Generator</td>
                    <td className="py-2 pr-4">Track warning dismissal</td>
                    <td className="py-2">Persistent</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-2 pr-4">tonegen_highfreq_warning_dismissed</td>
                    <td className="py-2 pr-4">Tone Generator</td>
                    <td className="py-2 pr-4">Track warning dismissal</td>
                    <td className="py-2">Persistent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">3. Managing Cookies</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              You can disable cookies in your browser settings. Note that disabling cookies may affect functionality.
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                  Google Analytics Opt-out Browser Add-on
                </a>
              </li>
              <li>
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                  Google Ad Settings
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">4. Cookie Consent</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              When you first visit our site, we ask for your consent to use non-essential cookies. 
              You can change your preference at any time by clearing your browser cookies or using the cookie banner.
            </p>
            <p className="text-gray-400 leading-relaxed">
              For more information about how we handle your data, please see our{' '}
              <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Changes to This Policy</h2>
            <p className="text-gray-400 leading-relaxed">
              We may update this policy. Changes will be posted here with an updated date.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
