"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import DynamicCookieConsent from "../components/DynamicCookieConsent";
import { FAQList } from "../components/FAQ";
import Image from "next/image";
import { Menu, X, Play, Pause } from "lucide-react";

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [duration, setDuration] = useState(5);
  const [isSweeping, setIsSweeping] = useState(false);
  const [currentFreq, setCurrentFreq] = useState(20);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const startFreq = 20;
  const endFreq = 200;

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);
  const startRef = useRef(0);

  // Cleanup function — safe to call multiple times
  const cleanup = useCallback(() => {
    isPlayingRef.current = false;

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    try {
      if (oscRef.current) {
        oscRef.current.onended = null;
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
    } catch (_) { /* already stopped */ }

    try {
      if (gainRef.current) {
        gainRef.current.disconnect();
      }
    } catch (_) {}

    oscRef.current = null;
    gainRef.current = null;
  }, []);

  // Unmount cleanup
  useEffect(() => {
    return () => {
      cleanup();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [cleanup]);

  const startSweep = useCallback(async () => {
    if (isPlayingRef.current) return;
    setErrorMsg(null);

    try {
      // 1. Get AudioContext constructor
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) {
        setErrorMsg('Your browser does not support Web Audio API. Please use Chrome, Safari, or Edge.');
        return;
      }

      // 2. Create or reuse AudioContext
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AC();
      }
      const ctx = audioCtxRef.current;

      // 3. Properly await resume
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // 4. Verify context is running
      if (ctx.state !== 'running') {
        setErrorMsg('Audio could not start. Please click the page first, then try again.');
        return;
      }

      // 5. Clean up any existing oscillator
      cleanup();

      // 6. Create oscillator and gain
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      // 7. Handle unexpected stop
      osc.onended = () => {
        if (isPlayingRef.current) {
          cleanup();
          setIsSweeping(false);
          setProgress(0);
          setCurrentFreq(startFreq);
        }
      };

      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      isPlayingRef.current = true;
      setIsSweeping(true);
      setCurrentFreq(startFreq);
      setProgress(0);
      startRef.current = performance.now();

      // 8. Animation loop using ref for isPlaying (not state)
      const animate = (now: number) => {
        if (!isPlayingRef.current) return;

        const elapsed = (now - startRef.current) / 1000;
        const prog = Math.min(elapsed / duration, 1);
        const freq = startFreq * Math.pow(endFreq / startFreq, prog);

        // Update oscillator frequency safely
        try {
          if (oscRef.current && audioCtxRef.current && audioCtxRef.current.state === 'running') {
            oscRef.current.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
          }
        } catch (_) {}

        setCurrentFreq(Math.round(freq));
        setProgress(prog * 100);

        if (prog >= 1) {
          // Sweep complete
          cleanup();
          setIsSweeping(false);
          setProgress(0);
          setCurrentFreq(startFreq);
          return;
        }

        animFrameRef.current = requestAnimationFrame(animate);
      };

      animFrameRef.current = requestAnimationFrame(animate);
    } catch (err: any) {
      setErrorMsg('Audio failed to start: ' + (err?.message || 'Unknown error'));
      cleanup();
      setIsSweeping(false);
    }
  }, [startFreq, endFreq, duration, cleanup]);

  const stopSweep = useCallback(() => {
    cleanup();
    setIsSweeping(false);
    setProgress(0);
    setCurrentFreq(startFreq);
  }, [cleanup, startFreq]);

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
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">Subwoofer Frequency Test</h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">Test your subwoofer response from 20Hz to 200Hz. Find the sweet spot and identify weak spots in your bass.</p>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#0F0F1A] border border-[#1E1E2E] rounded-3xl p-6 lg:p-8">

            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-[#E8ECF0] tabular-nums">
                {currentFreq.toLocaleString()}
              </div>
              <div className="text-[#6B7280] text-sm mt-1">Hz</div>
              <div className="text-[#00E5CC] text-xs mt-2 font-['JetBrains_Mono',monospace]">
                {currentFreq < 40 ? 'Deep Bass' : currentFreq < 80 ? 'Bass' : currentFreq < 120 ? 'Mid Bass' : 'Upper Bass'}
              </div>
            </div>

            <div className="mb-8">
              <div className="w-full h-3 bg-[#1E1E2E] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00E5CC] to-[#00E5CC]/50 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#6B7280] mt-2">
                <span>20 Hz</span>
                <span>{Math.round(progress)}%</span>
                <span>200 Hz</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-sm text-[#6B7280] mb-2 block">Duration: {duration}s</label>
              <input
                type="range"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                disabled={isSweeping}
                className="w-full h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC] disabled:opacity-50"
              />
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                {errorMsg}
              </div>
            )}

            <button
              onClick={isSweeping ? stopSweep : startSweep}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-2 ${
                isSweeping
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                  : 'bg-[#00E5CC] text-[#08080F] hover:bg-[#00E5CC]/90'
              }`}
            >
              {isSweeping ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isSweeping ? 'Stop Sweep' : 'Start Subwoofer Test'}
            </button>
          </div>
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
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Subwoofer</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Test Subwoofer Response</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Your subwoofer sounds boomy or thin, but you don&apos;t know which frequencies are the problem.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Sweep through 20-200Hz. Hear exactly where your subwoofer performs best and where it struggles.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Room Modes</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Find Room Resonances</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Your room has boomy bass in corners or dead spots where bass disappears.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Low frequencies reveal room modes. Note where volume jumps — those are resonances to treat.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Placement</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Optimize Subwoofer Placement</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> You placed your subwoofer randomly and hope it sounds good.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Run the test, move the subwoofer, run again. Compare response at different positions.</p>
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
          <FAQList
            items={[
              { question: "What frequencies should my subwoofer reproduce?", answer: "Most subwoofers handle 20Hz-200Hz. The crossover point with your main speakers is typically 80Hz-120Hz. Below 40Hz is deep bass that you feel more than hear." },
              { question: "Why does bass sound different in different rooms?", answer: "Room modes are standing waves created by your room's dimensions. They boost some frequencies and cancel others. This is why subwoofer placement and room treatment matter." },
              { question: "How do I know if my subwoofer is working properly?", answer: "Run this sweep. A good subwoofer should produce audible output from about 30Hz up. If you hear rattling, distortion, or sudden volume drops, there may be an issue." },
              { question: "Should I use one or two subwoofers?", answer: "Two subwoofers in opposite corners can smooth out room modes and provide more even bass response throughout the room. One subwoofer is fine for smaller spaces." },
              { question: "What's the best sweep speed for subwoofer testing?", answer: "For detailed analysis, use a slower sweep (10-15 seconds). This lets you hear subtle variations. For quick checks, 5 seconds works fine." },
            ]}
          />
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gradient-to-b from-[#08080F] to-[#0A1518]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8ECF0] mb-6">
            Test Your Subwoofer Now
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-lg mx-auto">
            Free online tool. Works on any device with a subwoofer connected.
          </p>
          <a href="#audio-tool" className="inline-flex items-center px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors">
            Start Subwoofer Test
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
              <a href="mailto:hello@tonetool.org" className="text-sm text-[#6B7280] hover:text-[#00E5CC] transition-colors">hello@tonetool.org</a>
            </div>
          </div>
          <div className="border-t border-[#1E1E2E] pt-8">
            <p className="font-['JetBrains_Mono',monospace] text-xs text-[#4B5563] text-center">&copy; 2026 Tone Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <DynamicCookieConsent />
    </main>
  );
}
