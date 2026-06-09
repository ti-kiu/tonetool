

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
            Focus & Sleep
          </p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">
            Generate White, Pink & Brown Noise
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">
            Mask distractions, improve sleep, and focus better. Choose the noise color that works for you.
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
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Sleep</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Sleep Through Noise</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> Street noise, snoring, or a ticking clock keeps you awake. You need consistent background sound.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Generate pink noise. It has a balanced, natural sound. Many people find it more soothing than white noise for sleep.</p>
        </div>
      </div>
      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Focus</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Block Office Distractions</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> Coworker conversations, phone calls, and keyboard clicks break your concentration every few minutes.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Generate white noise through headphones. It masks speech frequencies effectively. Create your own focus bubble.</p>
        </div>
      </div>
      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Tinnitus</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Mask Tinnitus Ringing</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> Your tinnitus is loudest in quiet environments. Silence makes it unbearable.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Generate brown noise. Its deep, rumbling quality masks low-frequency tinnitus effectively. Adjust volume to match your ringing.</p>
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
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">What's the difference between white, pink, and brown noise?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          White noise = equal energy at all frequencies (sounds harsh). Pink noise = equal energy per octave (balanced, natural). Brown noise = more energy at low frequencies (deep, rumbling).
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Which noise color is best for sleep?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Most people prefer pink or brown noise for sleep. White noise can sound too harsh. Experiment to find what masks your environment best.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can noise damage my hearing?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          At moderate volumes, no. Keep the volume just loud enough to mask distractions. If you need it very loud, the underlying noise problem may need a different solution.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Why does white noise help with focus?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          It masks variable sounds (speech, clicks, etc.) with a consistent sound. Your brain stops reacting to every little noise because the background is predictable.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can I use this instead of a white noise machine?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Yes. This generates the same sounds as physical white noise machines. Use your phone or computer speakers, or connect to a Bluetooth speaker.
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