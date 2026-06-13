"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import DynamicCookieConsent from "../components/DynamicCookieConsent";
import { FAQList } from "../components/FAQ";
import Image from "next/image";
import { Menu, X, Play, Pause, Waves, Download } from "lucide-react";
import { downloadWav } from "../../lib/wav";

const PRESETS = [
  { freq: 100, label: '100 Hz', desc: 'Low Bass' },
  { freq: 200, label: '200 Hz', desc: 'Bass' },
  { freq: 440, label: '440 Hz', desc: 'Concert A' },
  { freq: 1000, label: '1 kHz', desc: 'Mid Range' },
  { freq: 2000, label: '2 kHz', desc: 'Upper Mid' },
  { freq: 4000, label: '4 kHz', desc: 'Presence' },
  { freq: 8000, label: '8 kHz', desc: 'Brilliance' },
  { freq: 10000, label: '10 kHz', desc: 'Air' },
];

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [frequency, setFrequency] = useState(440);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Sine Wave Generator - Pure Tone Generator | Tone Generator';
  }, []);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Canvas visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = 120 * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.fillStyle = '#0f0f1a';
      ctx.fillRect(0, 0, w, h);

      // Draw grid lines
      ctx.strokeStyle = '#1E1E2E';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = (h / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw sine wave
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00E5CC';
      ctx.beginPath();

      const sliceWidth = w / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * h) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(w, h / 2);
      ctx.stroke();
    };
    draw();
  }, []);

  const cleanup = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    try { oscRef.current?.stop(); } catch (_) {}
    try { oscRef.current?.disconnect(); } catch (_) {}
    try { gainRef.current?.disconnect(); } catch (_) {}
    try { analyserRef.current?.disconnect(); } catch (_) {}
    oscRef.current = null;
    gainRef.current = null;
    analyserRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cleanup();
      audioCtxRef.current?.close().catch(() => {});
    };
  }, [cleanup]);

  const play = useCallback(async () => {
    setErrorMsg(null);
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) {
        setErrorMsg('Browser does not support Web Audio API');
        return;
      }
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AC();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      if (ctx.state !== 'running') {
        setErrorMsg('Click the page first, then try again');
        return;
      }

      cleanup();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);

      osc.connect(gain);
      gain.connect(analyser);
      analyser.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      analyserRef.current = analyser;
      setIsPlaying(true);
      drawWaveform();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to start audio');
      cleanup();
      setIsPlaying(false);
    }
  }, [frequency, volume, cleanup, drawWaveform]);

  const stop = useCallback(() => {
    cleanup();
    setIsPlaying(false);
  }, [cleanup]);

  // Update frequency in real-time
  useEffect(() => {
    if (oscRef.current && audioCtxRef.current?.state === 'running') {
      oscRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
    }
  }, [frequency]);

  // Update volume in real-time
  useEffect(() => {
    if (gainRef.current && audioCtxRef.current?.state === 'running') {
      gainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

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
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Audio Signal</p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">Pure Sine Wave Generator</h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">Generate a clean, pure sine wave at any frequency from 1Hz to 20kHz. Perfect for audio testing, calibration, and hearing tests.</p>
        </div>
      </section>

      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-6 mb-8">
        <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] mb-4">
          <Waves className="w-5 h-5 inline mr-2 text-[#00E5CC]" />
          How to Generate Sine Waves
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-[#6B7280]">
          <div className="flex items-start gap-3">
            <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">1</span>
            <p>Choose a frequency using the slider, number input, or quick presets</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">2</span>
            <p>Adjust the volume to a comfortable level</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">3</span>
            <p>Click 'Play Sine Wave' — use Space bar to toggle playback</p>
          </div>
        </div>
      </div>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-3xl p-6 lg:p-8">

            {/* Waveform Visualization */}
            <div className="mb-6 rounded-xl overflow-hidden border border-[#1E1E2E] bg-[#0F0F1A] relative">
              <canvas ref={canvasRef} className="w-full h-[120px] block" />
              {isPlaying && (
                <div className="absolute top-3 right-3 flex items-center gap-2 px-2 py-1 bg-[#00E5CC]/10 rounded-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5CC] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5CC]" />
                  </span>
                  <span className="text-[#00E5CC] text-xs font-medium">Sine Wave</span>
                </div>
              )}
            </div>

            {/* Frequency Display */}
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-[#E8ECF0] tabular-nums">
                {frequency.toLocaleString()}
              </div>
              <div className="text-[#6B7280] text-sm mt-1">Hz</div>
              <div className="text-[#00E5CC] text-xs mt-2 font-['JetBrains_Mono',monospace]">
                λ = {(343 / frequency).toFixed(3)} m wavelength
              </div>
            </div>

            {/* Frequency Slider */}
            <div className="mb-6">
              <input
                type="range"
                min="1"
                max="20000"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC]"
              />
              <div className="flex justify-between text-xs text-[#6B7280] mt-1">
                <span>1 Hz</span>
                <span>10 kHz</span>
                <span>20 kHz</span>
              </div>
            </div>

            {/* Frequency Input */}
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-2 bg-[#0F0F1A] border border-[#1E1E2E] rounded-lg px-4 py-2">
                <input
                  type="number"
                  min="1"
                  max="20000"
                  value={frequency}
                  onChange={(e) => setFrequency(Math.max(1, Math.min(20000, Number(e.target.value))))}
                  className="bg-transparent text-[#E8ECF0] text-center w-24 outline-none"
                />
                <span className="text-[#6B7280] text-sm">Hz</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="mb-6">
              <p className="text-sm text-[#6B7280] mb-3 text-center">Quick Presets</p>
              <div className="grid grid-cols-4 gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.freq}
                    onClick={() => setFrequency(p.freq)}
                    className={`py-2 px-2 rounded-lg text-xs font-medium transition ${
                      frequency === p.freq
                        ? 'bg-[#00E5CC] text-[#08080F]'
                        : 'bg-[#0F0F1A] text-[#6B7280] hover:bg-[#1E1E2E] border border-[#1E1E2E]'
                    }`}
                  >
                    <div>{p.label}</div>
                    <div className="text-[10px] opacity-70">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Control */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[#6B7280] text-sm w-16">Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC]"
              />
              <span className="text-[#E8ECF0] text-sm w-12 text-right">{Math.round(volume * 100)}%</span>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                {errorMsg}
              </div>
            )}

            {/* Play Button */}
            <button
              onClick={isPlaying ? stop : play}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-2 ${
                isPlaying
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                  : 'bg-[#00E5CC] text-[#08080F] hover:bg-[#00E5CC]/90'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Stop' : 'Play Sine Wave'}
            </button>

            {/* Download Button */}
            <button
              onClick={() => downloadWav(frequency, 2)}
              className="w-full mt-3 py-3 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 bg-[#0F0F1A] border border-[#1E1E2E] text-[#6B7280] hover:bg-[#1E1E2E] hover:text-[#E8ECF0]"
            >
              <Download className="w-4 h-4" />
              Download WAV (2s)
            </button>

            <div className="mt-4 text-center text-[#6B7280] text-xs">
              Space: Play/Stop · ← →: Adjust frequency
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Use Cases</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">What Can You Do?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Testing</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Audio Equipment Testing</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> You need a pure reference tone to test speakers, headphones, or amplifiers.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Generate a clean sine wave at any frequency. No harmonics, no distortion — just a pure tone.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Calibration</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">System Calibration</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Your audio system needs calibration with a known reference signal.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Use 1kHz sine wave as a standard reference level for calibrating levels across your chain.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Science</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Acoustics Education</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Students need to hear pure tones to understand frequency, pitch, and wavelength.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Play different frequencies. Show the wavelength calculation. Demonstrate the relationship.</p>
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
              { question: "What is a sine wave?", answer: "A sine wave is the simplest waveform — a smooth, periodic oscillation with no harmonics. It represents a single pure frequency. All other waveforms (square, triangle, sawtooth) are made up of multiple sine waves." },
              { question: "Why use sine waves for testing?", answer: "Sine waves contain only one frequency, making them ideal for testing audio equipment. They reveal frequency response, distortion, and resonance without the complexity of harmonics found in other waveforms." },
              { question: "What frequency should I use?", answer: "For general audio testing, 1kHz is the standard reference. For speaker testing, sweep from 20Hz to 20kHz. For hearing tests, use frequencies between 250Hz and 8kHz." },
              { question: "Can I use this to test my hearing?", answer: "Yes, but use it at low volumes. Start with 1kHz at 50% volume and gradually increase. If you can't hear a frequency, note it — that may indicate hearing loss at that range." },
              { question: "How is this different from other tone generators?", answer: "This tool generates a mathematically pure sine wave using the Web Audio API. No audio files, no samples — just a perfect digital oscillator. The wavelength calculation helps you understand the physical properties of the sound." },
            ]}
          />
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gradient-to-b from-[#08080F] to-[#0A1518]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8ECF0] mb-6">
            Generate Pure Sine Waves
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-lg mx-auto">
            Free, precise, and runs entirely in your browser.
          </p>
          <a href="#" className="inline-flex items-center px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors">
            Open Sine Wave Generator
          </a>
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
