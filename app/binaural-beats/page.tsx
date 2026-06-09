

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
            Wellness
          </p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">
            Generate Binaural Beats for Focus & Sleep
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">
            Create custom brainwave entrainment tones. Delta for sleep, theta for meditation, alpha for focus, beta for alertness.
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
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Focus</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Enhance Concentration</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> You can't focus on work. Coffee makes you jittery. You need something to help you concentrate.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Generate beta waves (14-30Hz difference). Use headphones. Many people report improved focus and alertness.</p>
        </div>
      </div>
      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Sleep</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Fall Asleep Faster</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> You lie awake for hours. Your mind won't shut down. Sleep aids make you groggy.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Generate delta waves (0.5-4Hz difference). Listen through earbuds as you fall asleep. Gentle, non-habit forming.</p>
        </div>
      </div>
      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
        <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Meditation</span>
        <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Deepen Meditation Practice</h3>
        <div className="space-y-3 text-[#6B7280]">
          <p><span className="text-[#6B7280]">Before:</span> Your meditation practice feels shallow. You struggle to reach deeper states.</p>
          <p><span className="text-[#E8ECF0]">After:</span> Generate theta waves (4-8Hz difference). Many meditators find this helps access deeper, more relaxed states.</p>
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
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">How do binaural beats work?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Play slightly different frequencies in each ear (e.g., 200Hz left, 210Hz right). Your brain perceives the difference (10Hz) and may synchronize to that frequency.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Do I need headphones for binaural beats?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Yes. The effect requires different frequencies reaching each ear separately. Speakers won't work effectively.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">What frequency should I use for focus?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Beta range: 14-30Hz difference. Try 20Hz first. Everyone responds differently, so experiment to find what works for you.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Are binaural beats scientifically proven?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Research is mixed. Some studies show benefits for anxiety and focus, others find no effect. Individual responses vary widely. Try it and see if it works for you.
        </div>
      </details>
      <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can binaural beats be harmful?</span>
          <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          Generally no. Avoid high volumes. If you have epilepsy or a seizure disorder, consult a doctor before using brainwave entrainment.
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