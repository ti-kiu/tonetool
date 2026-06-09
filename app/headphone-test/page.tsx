

"use client";

import { useState } from 'react';
import AudioEngine from "../components/AudioEngine";
import CookieConsent from "../components/CookieConsent";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";


export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <main className="min-h-screen bg-[#08080F] text-[#E8ECF0] font-['DM_Sans',sans-serif]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080F]/90 backdrop-blur-md border-b border-[#1E1E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-2">
                <Image src="/assets/logo.svg" alt="Tone Generator" width={24} height={24} />
                <span className="font-['Space_Grotesk',sans-serif] font-bold text-lg text-[#E8ECF0]">
                  Tone Generator
                </span>
              </a>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Home</a>
              <a href="/blog" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Blog</a>
            </nav>
            
            <a 
              href="#audio-tool" 
              className="hidden md:inline-flex items-center px-5 py-2.5 border border-[#00E5CC] text-[#00E5CC] font-['Space_Grotesk',sans-serif] font-semibold text-sm rounded-xl hover:bg-[#00E5CC]/10 transition-colors"
            >
              Open Tool
            </a>
            
            <button 
              className="md:hidden text-[#E8ECF0]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#1E1E2E]">
              <nav className="flex flex-col gap-4">
                <a href="/" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</a>
                <a href="/blog" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors" onClick={() => setMobileMenuOpen(false)}>Blog</a>
                <a 
                  href="#audio-tool" 
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-[#00E5CC] text-[#00E5CC] font-['Space_Grotesk',sans-serif] font-semibold text-sm rounded-xl hover:bg-[#00E5CC]/10 transition-colors mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Open Tool
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">
            Headphone Testing
          </p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">
            Test Your Headphones with Precise Audio Tones
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">
            Find dead spots, frequency drops, and distortion in any headphones. Generate test tones from 20Hz to 20kHz instantly.
          </p>
          <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">
            Free online tool · Works on mobile · No signup
          </p>
        </div>
      </section>

      <section id="audio-tool" className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AudioEngine />
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Use Cases</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">What Will You Test?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Quality Check</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">New Headphone Quality Check</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> You bought headphones online. They sound off, but you can't tell if it's the bass, mids, or highs.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Run a quick frequency sweep from 20Hz to 20kHz. Find the dead spot at 4kHz. Return window still open.</p>
        </div>
      </div>
      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Channel Balance</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Left/Right Channel Balance Test</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> One ear sounds quieter than the other, but you're not sure if it's your hearing or the headphones.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Play the same tone in both channels. Switch sides. Instantly identify if the imbalance is in the headphones or your ears.</p>
        </div>
      </div>
      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Bass Response</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Bass Response Evaluation</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> Your headphones claim 'deep bass' but you're not feeling it. Is it the headphones or the music?</p>
          <p><span className="text-[#E8ECF0]">After:</span> Generate a 20Hz-200Hz sweep. Feel every frequency. Know exactly how low your headphones can go.</p>
        </div>
      </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#08080F]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">FAQ</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">Common Questions</h2>
          </div>
          <div className="space-y-3">
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">What frequency should I test my headphones at?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Start with a full sweep from 20Hz to 20kHz. Pay special attention to 100Hz (bass), 1kHz (mids), and 4kHz-8kHz (highs) — these are where most headphone issues appear.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">How do I know if my headphones have a dead driver?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Play a tone and switch ears. If one side is completely silent at all frequencies, you likely have a dead driver. Test multiple frequencies to confirm.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can this damage my headphones?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          No. The tones are generated at normal listening volumes. Keep the volume at a comfortable level — if it sounds loud to your ears, it's loud for your headphones too.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">What's the difference between sine and square wave testing?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Sine waves test pure frequency response. Square waves add harmonics and are better for detecting distortion and ringing. Use sine for basic tests, square for advanced diagnostics.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Why do my headphones sound different on different devices?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Different devices have different output power and DAC quality. Test with the device you use most. If headphones sound bad on all devices, the issue is the headphones.
        </div>
      </details>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gradient-to-b from-[#08080F] to-[#0A1518]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8ECF0] mb-6">
            Start Testing Now
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-lg mx-auto">
            The tool is free, works in your browser, and runs on any device.
          </p>
          <a href="#audio-tool" className="inline-flex items-center px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors">
            Open Tone Generator
          </a>
          <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] mt-4">
            No signup · No download · Works on any device
          </p>
        </div>
      </section>

      <footer className="bg-[#050508] border-t border-[#1E1E2E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image src="/assets/logo.svg" alt="Tone Generator" width={20} height={20} />
                <span className="font-['Space_Grotesk',sans-serif] font-bold text-[#E8ECF0]">Tone Generator</span>
              </div>
              <p className="text-sm text-[#6B7280]">Precise audio frequencies in your browser.</p>
            </div>
            <div>
              <h4 className="font-['Space_Grotesk',sans-serif] font-semibold text-[#E8ECF0] mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Home</a></li>
                <li><a href="/blog" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Space_Grotesk',sans-serif] font-semibold text-[#E8ECF0] mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Terms of Service</a></li>
                <li><a href="/cookie-policy" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Cookie Policy</a></li>
                <li><a href="/refund" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Space_Grotesk',sans-serif] font-semibold text-[#E8ECF0] mb-4">Contact</h4>
              <a href="mailto:hello@tonetool.org" className="text-sm text-[#6B7280] hover:text-[#00E5CC] transition-colors">
                hello@tonetool.org
              </a>
            </div>
          </div>
          <div className="border-t border-[#1E1E2E] pt-8">
            <p className="font-['JetBrains_Mono',monospace] text-xs text-[#4B5563] text-center">
              © 2026 Tone Generator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </main>
  );
}