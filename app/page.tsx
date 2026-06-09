"use client";

import { useState } from 'react';
import AudioEngine from "./components/AudioEngine";
import CookieConsent from "./components/CookieConsent";
import Image from "next/image";
import { 
  Waves, 
  Sliders, 
  Play, 
  Headphones, 
  Ear, 
  Guitar,
  Activity,
  Smartphone,
  Link,
  Zap,
  Check,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <main className="min-h-screen bg-[#08080F] text-[#E8ECF0] font-['DM_Sans',sans-serif]">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080F]/90 backdrop-blur-md border-b border-[#1E1E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image src="/assets/logo.svg" alt="Tone Generator" width={24} height={24} />
              <span className="font-['Space_Grotesk',sans-serif] font-bold text-lg text-[#E8ECF0]">
                Tone Generator
              </span>
            </div>
            
            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">How It Works</a>
              <a href="#faq" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">FAQ</a>
              <a href="#use-cases" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Use Cases</a>
              <a href="/blog" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Blog</a>
            </nav>
            
            {/* CTA */}
            <a 
              href="#audio-tool" 
              className="hidden md:inline-flex items-center px-5 py-2.5 border border-[#00E5CC] text-[#00E5CC] font-['Space_Grotesk',sans-serif] font-semibold text-sm rounded-xl hover:bg-[#00E5CC]/10 transition-colors"
            >
              Open Tool
            </a>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-[#E8ECF0]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#1E1E2E]">
              <nav className="flex flex-col gap-4">
                <a href="#how-it-works" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#faq" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <a href="#use-cases" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors" onClick={() => setMobileMenuOpen(false)}>Use Cases</a>
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

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">
            Free Online Tool
          </p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">
            Generate Any Frequency in Seconds
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">
            Test headphones, tune instruments, match tinnitus tones — all in your browser. No download. No signup. Completely free.
          </p>
          <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">
            No signup required · Works on mobile · 100% free
          </p>
        </div>
      </section>

      {/* Audio Tool - The CTA */}
      <section id="audio-tool" className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#0F0F1A] border border-[#1E1E2E] rounded-3xl p-6 lg:p-8 shadow-[inset_0_0_60px_rgba(0,229,204,0.03)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5CC]/5 to-transparent rounded-3xl pointer-events-none" />
            <div className="relative">
              <AudioEngine />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-[#08080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">
              How It Works
            </p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">
              Three Steps to Any Tone
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Set Your Frequency",
                desc: "Drag the slider or type any value from 1Hz to 20,000Hz.",
                icon: Sliders
              },
              {
                num: "02",
                title: "Pick Your Waves",
                desc: "Choose sine, square, triangle, or sawtooth — whatever your test needs.",
                icon: Waves
              },
              {
                num: "03",
                title: "Hit Play",
                desc: "Hear the tone instantly. Adjust volume anytime. Share settings via URL.",
                icon: Play
              }
            ].map((step) => (
              <div key={step.num} className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
                <span className="font-['JetBrains_Mono',monospace] text-5xl font-bold text-[#00E5CC]/20">
                  {step.num}
                </span>
                <step.icon className="w-6 h-6 text-[#00E5CC] mt-4 mb-3" />
                <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#6B7280] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-24 lg:py-32 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">
              Use Cases
            </p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">
              What Will You Test?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">
                Headphone Testing
              </span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">
                Test Your New Headphones
              </h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> You bought headphones online. They sound off, but you can't tell if it's the bass, mids, or highs.</p>
                <p><span className="text-[#E8ECF0]">After:</span> You run a quick frequency sweep from 20Hz to 20kHz. You find the dead spot at 4kHz. Return window still open.</p>
                <p className="text-[#00E5CC]">Tone Generator plays any frequency instantly. You hear exactly what your headphones reproduce — and what they don't.</p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">
                Hearing Care
              </span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">
                Describe Tinnitus to Your Doctor
              </h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Your doctor asks, "What pitch is your ringing?" You shrug. You can't describe a sound.</p>
                <p><span className="text-[#E8ECF0]">After:</span> You dial up frequencies until one matches your ringing. You note the exact Hz. Your doctor now knows what to test.</p>
                <p className="text-[#00E5CC]">Precise 1Hz-step control lets you zero in on any tone. No guessing. No medical jargon needed.</p>
              </div>
              <p className="mt-4 text-xs text-[#6B7280] italic">
                Note: This is not a medical device. Use it to prepare for your appointment, not to self-diagnose.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">
                Music & Audio
              </span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">
                Tune Instruments Without Gear
              </h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Your guitar sounds off, but you don't own a tuner. You download an app, create an account, get hit with ads.</p>
                <p><span className="text-[#E8ECF0]">After:</span> You open Tone Generator, set A4 = 440Hz, play the tone, tune your string. Done in 30 seconds.</p>
                <p className="text-[#00E5CC]">A4, E, B, and common tuning frequencies are one click away. No account. No ads. Just the tone you need.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 lg:py-32 bg-[#08080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">
              Features
            </p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">
              Built for Precision
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Full Range */}
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <Activity className="w-6 h-6 text-[#00E5CC] mb-4" />
              <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] mb-2">
                Full 1Hz–20kHz Range
              </h3>
              <p className="text-[#6B7280] mb-6">
                Generate any frequency from 1Hz to 20,000Hz with precise digital input or smooth slider control. Competitors limit you to preset steps — we don't.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-['JetBrains_Mono',monospace] text-[#6B7280]">1Hz</span>
                <div className="flex-1 h-1 bg-[#1E1E2E] rounded-full relative">
                  <div className="absolute left-0 right-0 h-full bg-gradient-to-r from-[#00E5CC]/20 via-[#00E5CC]/40 to-[#00E5CC]/20 rounded-full" />
                  <div className="absolute left-[10%] w-1 h-2 bg-[#00E5CC] rounded-full -top-0.5" />
                  <div className="absolute left-[50%] w-1 h-2 bg-[#00E5CC] rounded-full -top-0.5" />
                  <div className="absolute right-[10%] w-1 h-2 bg-[#00E5CC] rounded-full -top-0.5" />
                </div>
                <span className="font-['JetBrains_Mono',monospace] text-[#6B7280]">20kHz</span>
              </div>
              <div className="flex justify-between text-xs text-[#6B7280] mt-1 px-8">
                <span>20Hz</span>
                <span>1kHz</span>
                <span>10kHz</span>
              </div>
            </div>
            
            {/* Card 2 - Mobile-First */}
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <Smartphone className="w-6 h-6 text-[#00E5CC] mb-4" />
              <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] mb-2">
                Mobile-First Design
              </h3>
              <p className="text-[#6B7280]">
                Full functionality on phone, tablet, and desktop with touch-optimized controls. Test your new earbuds on the bus. No laptop needed.
              </p>
            </div>
            
            {/* Card 3 - URL Sharing */}
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <Link className="w-6 h-6 text-[#00E5CC] mb-4" />
              <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] mb-2">
                URL Sharing
              </h3>
              <p className="text-[#6B7280]">
                Every setting is encoded in the URL — frequency, waveform, volume. Send a 440Hz sine wave link to a student. Bookmark your tinnitus match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 lg:py-32 bg-[#08080F]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">
              FAQ
            </p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">
              Common Questions
            </h2>
          </div>
          
          <div className="space-y-3">
            {[
              {
                q: "Is it really free?",
                a: "Yes. The tone generator is completely free — all waveforms, full frequency range, visualization, and mobile support. No signup needed."
              },
              {
                q: "Do I need to create an account?",
                a: "No. The tool works instantly in your browser. We don't collect your email or personal data for basic use."
              },
              {
                q: "How accurate are the frequencies?",
                a: "Frequencies are generated digitally via the Web Audio API with sample-accurate timing. For most testing purposes — headphones, speakers, instrument tuning — the precision is more than sufficient. This is not a calibrated laboratory instrument."
              },
              {
                q: "Can I use this for medical diagnosis?",
                a: "No. Tone Generator is not a medical device. It can help you identify a tinnitus frequency to discuss with your doctor, but it cannot diagnose hearing loss or any medical condition. Always consult a healthcare professional."
              },
              {
                q: "Is my audio data stored?",
                a: "No. All audio generation happens locally in your browser. We never upload, store, or process your audio."
              },
              {
                q: "How is this different from onlinetonegenerator.com?",
                a: "Three things: cleaner design (no cluttered interface), better mobile experience, and no intrusive ads. We focus on doing one thing well — generating precise tones instantly."
              }
            ].map((item, i) => (
              <details key={i} className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">
                    {item.q}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-[#08080F] to-[#0A1518]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8ECF0] mb-6">
            You already know what frequency you need to hear.
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-lg mx-auto">
            The hard part is finding a tool that works instantly, doesn't bombard you with ads, and runs on your phone.
          </p>
          <a 
            href="#audio-tool" 
            className="inline-flex items-center px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors"
          >
            Open Tone Generator
          </a>
          <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] mt-4">
            No signup · No download · Works on any device
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050508] border-t border-[#1E1E2E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image src="/assets/logo.svg" alt="Tone Generator" width={20} height={20} />
                <span className="font-['Space_Grotesk',sans-serif] font-bold text-[#E8ECF0]">
                  Tone Generator
                </span>
              </div>
              <p className="text-sm text-[#6B7280]">
                Precise audio frequencies in your browser.
              </p>
            </div>
            
            {/* Product */}
            <div>
              <h4 className="font-['Space_Grotesk',sans-serif] font-semibold text-[#E8ECF0] mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "FAQ", "Use Cases", "Blog"].map((link) => (
                  <li key={link}>
                    <a href={link === 'Blog' ? '/blog' : `#${link.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Tools */}
            <div>
              <h4 className="font-['Space_Grotesk',sans-serif] font-semibold text-[#E8ECF0] mb-4">Tools</h4>
              <ul className="space-y-2">
                {[
                  { label: "Headphone Test", href: "/headphone-test" },
                  { label: "Tinnitus Match", href: "/tinnitus-frequency" },
                  { label: "Sine Wave", href: "/sine-wave-generator" },
                  { label: "Frequency Sweep", href: "/frequency-sweep" },
                  { label: "Instrument Tuner", href: "/instrument-tuner" },
                  { label: "Subwoofer Test", href: "/subwoofer-test" },
                  { label: "Hearing Test", href: "/hearing-test" },
                  { label: "Binaural Beats", href: "/binaural-beats" },
                  { label: "White Noise", href: "/white-noise" },
                  { label: "440Hz Tone", href: "/440hz" },
                  { label: "432Hz Tone", href: "/432hz" },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="font-['Space_Grotesk',sans-serif] font-semibold text-[#E8ECF0] mb-4">Legal</h4>
              <ul className="space-y-2">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Cookie Policy", href: "/cookie-policy" },
                  { label: "Refund Policy", href: "/refund" }
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact */}
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

      {/* Cookie Consent */}
      <CookieConsent />
    </main>
  );
}
