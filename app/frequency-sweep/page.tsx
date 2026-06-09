"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import CookieConsent from "../components/CookieConsent";
import Image from "next/image";
import { ChevronDown, Menu, X, Play, Pause } from "lucide-react";

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [startFreq, setStartFreq] = useState(20);
  const [endFreq, setEndFreq] = useState(20000);
  const [duration, setDuration] = useState(10);
  const [isSweeping, setIsSweeping] = useState(false);
  const [currentFreq, setCurrentFreq] = useState(20);
  const [progress, setProgress] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sweepRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startSweep = useCallback(() => {
    if (isSweeping) return;
    
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = ctx;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    
    oscillatorRef.current = osc;
    gainNodeRef.current = gain;
    
    setIsSweeping(true);
    setCurrentFreq(startFreq);
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const prog = Math.min(elapsed / duration, 1);
      
      // Logarithmic sweep
      const freq = startFreq * Math.pow(endFreq / startFreq, prog);
      
      if (osc) {
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
      }
      
      setCurrentFreq(Math.round(freq));
      setProgress(prog * 100);
      
      if (prog < 1) {
        sweepRef.current = requestAnimationFrame(animate);
      } else {
        stopSweep();
      }
    };
    
    sweepRef.current = requestAnimationFrame(animate);
  }, [startFreq, endFreq, duration, isSweeping]);

  const stopSweep = useCallback(() => {
    if (sweepRef.current) {
      cancelAnimationFrame(sweepRef.current);
    }
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsSweeping(false);
    setProgress(0);
    setCurrentFreq(startFreq);
  }, [startFreq]);

  useEffect(() => {
    return () => stopSweep();
  }, [stopSweep]);

  return (
    <main className="min-h-screen bg-[#08080F] text-[#E8ECF0] font-['DM_Sans',sans-serif]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080F]/90 backdrop-blur-md border-b border-[#1E1E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-2">
                <Image src="/assets/logo.svg" alt="Tone Generator" width={24} height={24} />
                <span className="font-['Space_Grotesk',sans-serif] font-bold text-lg text-[#E8ECF0]">Tone Generator</span>
              </a>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Home</a>
              <a href="/blog" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">Blog</a>
            </nav>
            <button className="md:hidden text-[#E8ECF0]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Audio Testing</p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">Sweep Through Any Frequency Range</h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">Find resonances, test speaker response, and identify audio dead spots. From 20Hz to 20kHz.</p>
        </div>
      </section>

      {/* Sweep Tool */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#0F0F1A] border border-[#1E1E2E] rounded-3xl p-6 lg:p-8">
            
            {/* Current Frequency Display */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-[#E8ECF0] tabular-nums">
                {currentFreq.toLocaleString()}
              </div>
              <div className="text-[#6B7280] text-sm mt-1">Hz</div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full h-3 bg-[#1E1E2E] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00E5CC] to-[#00E5CC]/50 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#6B7280] mt-2">
                <span>{startFreq} Hz</span>
                <span>{Math.round(progress)}%</span>
                <span>{endFreq} Hz</span>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block">Start Frequency</label>
                <input
                  type="number"
                  min="1"
                  max="19999"
                  value={startFreq}
                  onChange={(e) => setStartFreq(Math.max(1, Math.min(19999, Number(e.target.value))))}
                  disabled={isSweeping}
                  className="w-full bg-[#0F0F1A] border border-[#1E1E2E] rounded-lg px-4 py-2 text-[#E8ECF0] outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block">End Frequency</label>
                <input
                  type="number"
                  min="2"
                  max="20000"
                  value={endFreq}
                  onChange={(e) => setEndFreq(Math.max(2, Math.min(20000, Number(e.target.value))))}
                  disabled={isSweeping}
                  className="w-full bg-[#0F0F1A] border border-[#1E1E2E] rounded-lg px-4 py-2 text-[#E8ECF0] outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="text-sm text-[#6B7280] mb-2 block">Duration: {duration}s</label>
              <input
                type="range"
                min="1"
                max="60"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                disabled={isSweeping}
                className="w-full h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC] disabled:opacity-50"
              />
            </div>

            {/* Play/Stop Button */}
            <button
              onClick={isSweeping ? stopSweep : startSweep}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-2 ${
                isSweeping
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                  : 'bg-[#00E5CC] text-[#08080F] hover:bg-[#00E5CC]/90'
              }`}
            >
              {isSweeping ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isSweeping ? 'Stop Sweep' : 'Start Sweep'}
            </button>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 lg:py-32 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Use Cases</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">What Will You Test?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Speaker Test</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Test Full Speaker Response</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Your speakers sound uneven, but you don't know which frequencies are problematic.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Run a slow sweep from 20Hz to 20kHz. Hear exactly where the response drops or peaks.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Resonance</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Find Room Resonances</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Your room has weird booming or dead spots, but you can't identify the problem frequencies.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Sweep through low frequencies. Note where the volume jumps — those are your room resonances.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Hearing</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Map Your Hearing Range</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> You wonder what your actual hearing range is, compared to the theoretical 20Hz-20kHz.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Sweep slowly. Note where you stop hearing. That's your personal hearing range.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-[#08080F]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">FAQ</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">Common Questions</h2>
          </div>
          <div className="space-y-3">
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">How fast should I sweep?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">For detailed testing, sweep slowly — about 1 second per 100Hz. For quick checks, faster sweeps work fine. Adjust the slider speed to match your needs.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">What's the best range to test speakers?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Full range: 20Hz-20kHz. Focus on 100Hz-200Hz for bass quality, 1kHz-4kHz for vocal clarity, and 10kHz+ for treble detail.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can I sweep backwards (high to low)?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Yes. Set the starting frequency high and drag the slider down. Some issues are easier to notice when sweeping down.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Why do some frequencies sound louder than others?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Human hearing is not flat — we're most sensitive to 2kHz-5kHz. Plus, your speakers/headphones and room acoustics affect perceived volume.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can I save a sweep recording?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Use your device's screen recording or audio recording software while running the sweep. The tool itself doesn't record audio.</div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <a href="mailto:hello@tonetool.org" className="text-sm text-[#6B7280] hover:text-[#00E5CC] transition-colors">hello@tonetool.org</a>
            </div>
          </div>
          <div className="border-t border-[#1E1E2E] pt-8">
            <p className="font-['JetBrains_Mono',monospace] text-xs text-[#4B5563] text-center">© 2026 Tone Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </main>
  );
}
