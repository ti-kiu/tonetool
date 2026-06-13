"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import DynamicCookieConsent from "../components/DynamicCookieConsent";
import Image from "next/image";
import { ChevronDown, Menu, X, Play, Pause } from "lucide-react";

type NoiseType = 'white' | 'pink' | 'brown';

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [noiseType, setNoiseType] = useState<NoiseType>('white');
  const [volume, setVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'White Noise Generator - Sleep & Focus | Tone Generator';
  }, []);
  
  useEffect(() => {
    const link = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', 'https://tonetool.org/white-noise');
    } else {
      const newLink = document.createElement('link');
      newLink.setAttribute('rel', 'canonical');
      newLink.setAttribute('href', 'https://tonetool.org/white-noise');
      document.head.appendChild(newLink);
    }
  }, []);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const cleanup = useCallback(() => {
    try {
      if (noiseNodeRef.current) {
        noiseNodeRef.current.stop();
        noiseNodeRef.current.disconnect();
      }
    } catch (e) {}
    try {
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
    } catch (e) {}
    try {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    } catch (e) {}
    noiseNodeRef.current = null;
    gainNodeRef.current = null;
    audioContextRef.current = null;
  }, []);

  const createNoiseBuffer = (ctx: AudioContext, type: NoiseType) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.11;
        b6 = white * 0.115926;
      }
    } else if (type === 'brown') {
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }
    }
    
    return buffer;
  };

  const startNoise = () => {
    if (isPlaying) return;
    setErrorMsg(null);
    
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) {
        setErrorMsg('Your browser does not support Web Audio API. Please use Chrome, Safari, or Edge.');
        return;
      }
      
      cleanup();
      
      const ctx = new AC();
      audioContextRef.current = ctx;
      
      const buffer = createNoiseBuffer(ctx, noiseType);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start();
      
      noiseNodeRef.current = source;
      gainNodeRef.current = gain;
      setIsPlaying(true);
    } catch (err: any) {
      setErrorMsg('Audio failed to start: ' + (err?.message || 'Unknown error'));
      cleanup();
    }
  };

  const stopNoise = () => {
    cleanup();
    setIsPlaying(false);
  };

  const switchNoiseType = (type: NoiseType) => {
    setNoiseType(type);
    if (isPlaying) {
      // Restart with new type
      setTimeout(() => {
        cleanup();
        startNoise();
      }, 50);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        gainNodeRef.current.gain.setValueAtTime(newVol, audioContextRef.current.currentTime);
      } catch (e) {}
    }
  };

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
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Focus & Sleep</p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">Generate White, Pink & Brown Noise</h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">Mask distractions, improve sleep, and focus better. Choose the noise color that works for you.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-6">
          <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] mb-4">
            How to Use White Noise
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-[#6B7280]">
            <div className="flex items-start gap-3">
              <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">1</span>
              <p>Choose your noise type: White, Pink, or Brown</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">2</span>
              <p>Adjust the volume to a comfortable level</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">3</span>
              <p>Click Play — use for sleep, focus, or sound masking</p>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#0F0F1A] border border-[#1E1E2E] rounded-3xl p-6 lg:p-8">
            
            <div className="grid grid-cols-3 gap-3 mb-8">
              {(['white', 'pink', 'brown'] as NoiseType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => switchNoiseType(type)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition capitalize ${
                    noiseType === type
                      ? 'bg-[#00E5CC] text-[#08080F]'
                      : 'bg-[#0F0F1A] border border-[#1E1E2E] text-[#6B7280] hover:bg-[#1E1E2E]'
                  }`}
                >
                  {type} Noise
                </button>
              ))}
            </div>

            <div className="mb-8 rounded-xl overflow-hidden border border-[#1E1E2E] bg-[#08080F] h-[120px] flex items-center justify-center">
              {isPlaying ? (
                <div className="flex items-end gap-1 h-[60px]">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 bg-[#00E5CC]/60 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 40 + 20}px`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
              ) : (
                <span className="text-[#6B7280] text-sm">Press play to generate noise</span>
              )}
            </div>

            <div className="mb-8 flex items-center gap-4">
              <span className="text-[#6B7280] text-sm w-16">Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="flex-1 h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC]"
              />
              <span className="text-[#E8ECF0] text-sm w-12 text-right">{Math.round(volume * 100)}%</span>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                {errorMsg}
              </div>
            )}

            <button
              onClick={isPlaying ? stopNoise : startNoise}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-2 ${
                isPlaying
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                  : 'bg-[#00E5CC] text-[#08080F] hover:bg-[#00E5CC]/90'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Stop' : 'Play'} {noiseType.charAt(0).toUpperCase() + noiseType.slice(1)} Noise
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
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">White noise = equal energy at all frequencies (sounds harsh). Pink noise = equal energy per octave (balanced, natural). Brown noise = more energy at low frequencies (deep, rumbling).</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Which noise color is best for sleep?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Most people prefer pink or brown noise for sleep. White noise can sound too harsh. Experiment to find what masks your environment best.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can noise damage my hearing?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">At moderate volumes, no. Keep the volume just loud enough to mask distractions. If you need it very loud, the underlying noise problem may need a different solution.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Why does white noise help with focus?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">It masks variable sounds (speech, clicks, etc.) with a consistent sound. Your brain stops reacting to every little noise because the background is predictable.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can I use this instead of a white noise machine?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Yes. This generates the same sounds as physical white noise machines. Use your phone or computer speakers, or connect to a Bluetooth speaker.</div>
            </details>
          </div>
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
            <p className="font-['JetBrains_Mono',monospace] text-xs text-[#4B5563] text-center">© 2026 Tone Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <DynamicCookieConsent />
    </main>
  );
}
