"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import DynamicCookieConsent from "../components/DynamicCookieConsent";
import Image from "next/image";
import { ChevronDown, Menu, X, Play, Pause } from "lucide-react";

type BeatPreset = 'delta' | 'theta' | 'alpha' | 'beta' | 'gamma';

const PRESETS: Record<BeatPreset, { name: string; freq: number; desc: string }> = {
  delta: { name: 'Delta (Sleep)', freq: 2, desc: 'Deep sleep & healing' },
  theta: { name: 'Theta (Meditation)', freq: 6, desc: 'Deep meditation & creativity' },
  alpha: { name: 'Alpha (Relaxation)', freq: 10, desc: 'Relaxed focus & calm' },
  beta: { name: 'Beta (Focus)', freq: 20, desc: 'Alertness & concentration' },
  gamma: { name: 'Gamma (Cognition)', freq: 40, desc: 'High-level cognition' },
};

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [baseFreq, setBaseFreq] = useState(200);
  const [beatFreq, setBeatFreq] = useState(10);
  const [volume, setVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePreset, setActivePreset] = useState<BeatPreset | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Binaural Beats - Relaxation & Meditation | Tone Generator';
  }, []);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscRef = useRef<OscillatorNode | null>(null);
  const rightOscRef = useRef<OscillatorNode | null>(null);
  const leftGainRef = useRef<GainNode | null>(null);
  const rightGainRef = useRef<GainNode | null>(null);
  const mergerRef = useRef<ChannelMergerNode | null>(null);

  const cleanup = useCallback(() => {
    [leftOscRef, rightOscRef].forEach(ref => {
      try {
        if (ref.current) {
          ref.current.stop();
          ref.current.disconnect();
        }
      } catch (e) {}
    });
    [leftGainRef, rightGainRef].forEach(ref => {
      try {
        if (ref.current) ref.current.disconnect();
      } catch (e) {}
    });
    try {
      if (mergerRef.current) mergerRef.current.disconnect();
    } catch (e) {}
    try {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    } catch (e) {}
    leftOscRef.current = null;
    rightOscRef.current = null;
    leftGainRef.current = null;
    rightGainRef.current = null;
    mergerRef.current = null;
    audioContextRef.current = null;
  }, []);

  const startBinaural = () => {
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
      
      const leftOsc = ctx.createOscillator();
      leftOsc.type = 'sine';
      leftOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      
      const rightOsc = ctx.createOscillator();
      rightOsc.type = 'sine';
      rightOsc.frequency.setValueAtTime(baseFreq + beatFreq, ctx.currentTime);
      
      const leftGain = ctx.createGain();
      leftGain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
      
      const rightGain = ctx.createGain();
      rightGain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
      
      const merger = ctx.createChannelMerger(2);
      
      leftOsc.connect(leftGain);
      rightOsc.connect(rightGain);
      leftGain.connect(merger, 0, 0);
      rightGain.connect(merger, 0, 1);
      merger.connect(ctx.destination);
      
      leftOsc.start();
      rightOsc.start();
      
      leftOscRef.current = leftOsc;
      rightOscRef.current = rightOsc;
      leftGainRef.current = leftGain;
      rightGainRef.current = rightGain;
      mergerRef.current = merger;
      
      setIsPlaying(true);
    } catch (err: any) {
      setErrorMsg('Audio failed to start: ' + (err?.message || 'Unknown error'));
      cleanup();
    }
  };

  const stopBinaural = () => {
    cleanup();
    setIsPlaying(false);
  };

  const applyPreset = (preset: BeatPreset) => {
    setActivePreset(preset);
    setBeatFreq(PRESETS[preset].freq);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (leftGainRef.current && rightGainRef.current && audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        const now = audioContextRef.current.currentTime;
        leftGainRef.current.gain.setValueAtTime(newVol * 0.5, now);
        rightGainRef.current.gain.setValueAtTime(newVol * 0.5, now);
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
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Wellness</p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">Generate Binaural Beats for Focus & Sleep</h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">Create custom brainwave entrainment tones. Delta for sleep, theta for meditation, alpha for focus, beta for alertness.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-6">
          <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] mb-4">
            How to Experience Binaural Beats
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-[#6B7280]">
            <div className="flex items-start gap-3">
              <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">1</span>
              <p>Put on headphones — binaural beats require stereo separation</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">2</span>
              <p>Choose a brainwave preset (Delta for sleep, Alpha for relaxation)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">3</span>
              <p>Click Play and relax — the beats work best with eyes closed</p>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#0F0F1A] border border-[#1E1E2E] rounded-3xl p-6 lg:p-8">
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
              {(Object.keys(PRESETS) as BeatPreset[]).map((preset) => (
                <button
                  key={preset}
                  onClick={() => applyPreset(preset)}
                  className={`py-3 px-2 rounded-xl text-xs font-medium transition ${
                    activePreset === preset
                      ? 'bg-[#00E5CC] text-[#08080F]'
                      : 'bg-[#0F0F1A] border border-[#1E1E2E] text-[#6B7280] hover:bg-[#1E1E2E]'
                  }`}
                >
                  <div>{PRESETS[preset].name}</div>
                  <div className="opacity-70 text-[10px] mt-1">{PRESETS[preset].desc}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-[#08080F] rounded-xl border border-[#1E1E2E]">
                <div className="text-sm text-[#6B7280] mb-1">Left Ear</div>
                <div className="text-3xl font-bold text-[#E8ECF0]">{baseFreq}</div>
                <div className="text-xs text-[#6B7280]">Hz</div>
              </div>
              <div className="text-center p-4 bg-[#08080F] rounded-xl border border-[#1E1E2E]">
                <div className="text-sm text-[#6B7280] mb-1">Right Ear</div>
                <div className="text-3xl font-bold text-[#00E5CC]">{baseFreq + beatFreq}</div>
                <div className="text-xs text-[#6B7280]">Hz</div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-sm text-[#6B7280] mb-2">Beat Frequency: {beatFreq} Hz</div>
              <input
                type="range"
                min="1"
                max="50"
                value={beatFreq}
                onChange={(e) => {
                  setBeatFreq(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="w-full h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC]"
              />
              <div className="flex justify-between text-xs text-[#6B7280] mt-1">
                <span>1 Hz</span>
                <span>25 Hz</span>
                <span>50 Hz</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-sm text-[#6B7280] mb-2 block">Base Frequency: {baseFreq} Hz</label>
              <input
                type="range"
                min="100"
                max="1000"
                value={baseFreq}
                onChange={(e) => setBaseFreq(Number(e.target.value))}
                className="w-full h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC]"
              />
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
              onClick={isPlaying ? stopBinaural : startBinaural}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-2 ${
                isPlaying
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                  : 'bg-[#00E5CC] text-[#08080F] hover:bg-[#00E5CC]/90'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Stop' : 'Start'} Binaural Beat
            </button>

            <p className="mt-4 text-center text-[#6B7280] text-xs">Use headphones for binaural effect · Left and right ears receive different frequencies</p>
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
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Play slightly different frequencies in each ear (e.g., 200Hz left, 210Hz right). Your brain perceives the difference (10Hz) and may synchronize to that frequency.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Do I need headphones for binaural beats?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Yes. The effect requires different frequencies reaching each ear separately. Speakers won't work effectively.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">What frequency should I use for focus?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Beta range: 14-30Hz difference. Try 20Hz first. Everyone responds differently, so experiment to find what works for you.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Are binaural beats scientifically proven?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Research is mixed. Some studies show benefits for anxiety and focus, others find no effect. Individual responses vary widely. Try it and see if it works for you.</div>
            </details>
            <details className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">Can binaural beats be harmful?</span>
                <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">Generally no. Avoid high volumes. If you have epilepsy or a seizure disorder, consult a doctor before using brainwave entrainment.</div>
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
