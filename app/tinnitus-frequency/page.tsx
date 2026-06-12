

"use client";

import { useState } from 'react';
import AudioEngine from "../components/AudioEngine";
import DynamicCookieConsent from "../components/DynamicCookieConsent";
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
            Hearing Care
          </p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">
            Match Your Tinnitus Frequency
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">
            Identify the exact pitch of your ringing. Prepare for your doctor's appointment with precise frequency data.
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
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Doctor Visit</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Describe Tinnitus to Your Doctor</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> Your doctor asks, 'What pitch is your ringing?' You shrug. You can't describe a sound.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Dial up frequencies until one matches your ringing. Note the exact Hz. Your doctor now knows what to test.</p>
        </div>
      </div>
      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Monitoring</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Track Tinnitus Changes Over Time</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> Your ringing seems to change, but you have no way to document it.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Bookmark your match frequency. Check monthly. See if the pitch shifts — useful data for your audiologist.</p>
        </div>
      </div>
      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Sound Therapy</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Find Masking Frequencies</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> White noise apps don't help. You need a tone that specifically masks your tinnitus.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Find your tinnitus frequency, then try nearby frequencies to find what masks it best. Share the Hz with your therapist.</p>
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
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Is this a medical diagnosis tool?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          No. This tool helps you identify a frequency to discuss with your doctor. It cannot diagnose hearing loss, tinnitus causes, or any medical condition. Always consult a healthcare professional.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Why does my tinnitus have multiple tones?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Many people hear multiple frequencies. Match the loudest one first, then try to identify secondary tones. Document all frequencies for your doctor.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can matching my tinnitus make it worse?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Keep the volume low and take breaks. If listening to the tone increases your tinnitus perception, stop and consult a doctor.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">What frequency is most common for tinnitus?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Most tinnitus falls between 3kHz and 8kHz, but it varies widely. Use the slider to sweep through this range first, then expand if needed.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can I save my matched frequency?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Yes. Once you find the match, copy the URL. The frequency is encoded in the link. Bookmark it or share it with your doctor.
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

      <DynamicCookieConsent />
    </main>
  );
}