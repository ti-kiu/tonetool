'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import DynamicCookieConsent from '../components/DynamicCookieConsent';
import Image from 'next/image';
import { ChevronDown, Menu, X, Headphones, Volume2, VolumeX, ArrowLeftRight } from 'lucide-react';

import Navigation from "../../components/Navigation";
type TestMode = 'left-right' | 'frequency-balance' | 'stereo-separation';

const PRESETS = [
  { freq: 100, label: '100 Hz', desc: 'Bass' },
  { freq: 200, label: '200 Hz', desc: 'Low Mid' },
  { freq: 440, label: '440 Hz', desc: 'Concert A' },
  { freq: 1000, label: '1 kHz', desc: 'Mid Range' },
  { freq: 2000, label: '2 kHz', desc: 'Upper Mid' },
  { freq: 4000, label: '4 kHz', desc: 'Presence' },
  { freq: 8000, label: '8 kHz', desc: 'Brilliance' },
];

interface TestConfig {
  mode: TestMode;
  label: string;
  description: string;
}

const testModes: TestConfig[] = [
  { mode: 'left-right', label: 'Left/Right Channel', description: 'Hear the same tone alternate between ears' },
  { mode: 'frequency-balance', label: 'Frequency Balance', description: 'Different frequencies in each ear' },
  { mode: 'stereo-separation', label: 'Stereo Separation', description: 'Low tone left, high tone right' },
];

export default function Page() {
  
  const [activeMode, setActiveMode] = useState<TestMode>('left-right');
  const [isPlaying, setIsPlaying] = useState(false);
  const [leftLevel, setLeftLevel] = useState(0);
  const [rightLevel, setRightLevel] = useState(0);
  const [leftFreq, setLeftFreq] = useState(440);
  const [rightFreq, setRightFreq] = useState(880);

  useEffect(() => {
    document.title = 'Headphone Test - Check Left/Right Balance | Tone Generator';
  }, []);

  useEffect(() => {
    const link = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', 'https://tonetool.org/headphone-test');
    } else {
      const newLink = document.createElement('link');
      newLink.setAttribute('rel', 'canonical');
      newLink.setAttribute('href', 'https://tonetool.org/headphone-test');
      document.head.appendChild(newLink);
    }
  }, []);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscLeftRef = useRef<OscillatorNode | null>(null);
  const oscRightRef = useRef<OscillatorNode | null>(null);
  const analyserLeftRef = useRef<AnalyserNode | null>(null);
  const analyserRightRef = useRef<AnalyserNode | null>(null);
  const gainLeftRef = useRef<GainNode | null>(null);
  const gainRightRef = useRef<GainNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    try {
      oscLeftRef.current?.stop();
    } catch {}
    try {
      oscRightRef.current?.stop();
    } catch {}
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    oscLeftRef.current = null;
    oscRightRef.current = null;
    analyserLeftRef.current = null;
    analyserRightRef.current = null;
    gainLeftRef.current = null;
    gainRightRef.current = null;
    setLeftLevel(0);
    setRightLevel(0);
  }, []);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const updateLevels = useCallback(() => {
    if (!analyserLeftRef.current || !analyserRightRef.current) return;

    const leftData = new Uint8Array(analyserLeftRef.current.frequencyBinCount);
    const rightData = new Uint8Array(analyserRightRef.current.frequencyBinCount);
    analyserLeftRef.current.getByteFrequencyData(leftData);
    analyserRightRef.current.getByteFrequencyData(rightData);

    const leftAvg = leftData.reduce((a, b) => a + b, 0) / leftData.length / 255;
    const rightAvg = rightData.reduce((a, b) => a + b, 0) / rightData.length / 255;

    setLeftLevel(leftAvg);
    setRightLevel(rightAvg);

    animFrameRef.current = requestAnimationFrame(updateLevels);
  }, []);

  const stopAudio = useCallback(() => {
    cleanup();
    setIsPlaying(false);
  }, [cleanup]);

  const startTest = useCallback((mode: TestMode) => {
    stopAudio();
    setActiveMode(mode);

    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const analyserLeft = ctx.createAnalyser();
    analyserLeft.fftSize = 256;
    analyserLeftRef.current = analyserLeft;

    const analyserRight = ctx.createAnalyser();
    analyserRight.fftSize = 256;
    analyserRightRef.current = analyserRight;

    const gainLeft = ctx.createGain();
    gainLeft.gain.value = 0.3;
    gainLeftRef.current = gainLeft;

    const gainRight = ctx.createGain();
    gainRight.gain.value = 0.3;
    gainRightRef.current = gainRight;

    const merger = ctx.createChannelMerger(2);

    if (mode === 'left-right') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 440;

      const panLeft = ctx.createStereoPanner();
      panLeft.pan.value = -1;
      osc.connect(panLeft);
      panLeft.connect(gainLeft);
      gainLeft.connect(analyserLeft);
      analyserLeft.connect(merger, 0, 0);

      const panRight = ctx.createStereoPanner();
      panRight.pan.value = 1;
      osc.connect(panRight);
      panRight.connect(gainRight);
      gainRight.connect(analyserRight);
      analyserRight.connect(merger, 0, 1);

      osc.start();
      oscLeftRef.current = osc;

      // Alternate between ears
      let isLeft = true;
      intervalRef.current = setInterval(() => {
        isLeft = !isLeft;
        gainLeft.gain.value = isLeft ? 0.3 : 0;
        gainRight.gain.value = isLeft ? 0 : 0.3;
      }, 1500);

      // Start with left
      gainLeft.gain.value = 0.3;
      gainRight.gain.value = 0;
    } else if (mode === 'frequency-balance') {
      const oscL = ctx.createOscillator();
      oscL.type = 'sine';
      oscL.frequency.value = leftFreq;
      const panL = ctx.createStereoPanner();
      panL.pan.value = -1;
      oscL.connect(panL);
      panL.connect(gainLeft);
      gainLeft.connect(analyserLeft);
      analyserLeft.connect(merger, 0, 0);
      oscL.start();
      oscLeftRef.current = oscL;

      const oscR = ctx.createOscillator();
      oscR.type = 'sine';
      oscR.frequency.value = rightFreq;
      const panR = ctx.createStereoPanner();
      panR.pan.value = 1;
      oscR.connect(panR);
      panR.connect(gainRight);
      gainRight.connect(analyserRight);
      analyserRight.connect(merger, 0, 1);
      oscR.start();
      oscRightRef.current = oscR;
    } else if (mode === 'stereo-separation') {
      const oscL = ctx.createOscillator();
      oscL.type = 'sine';
      oscL.frequency.value = 200;
      const panL = ctx.createStereoPanner();
      panL.pan.value = -1;
      oscL.connect(panL);
      panL.connect(gainLeft);
      gainLeft.connect(analyserLeft);
      analyserLeft.connect(merger, 0, 0);
      oscL.start();
      oscLeftRef.current = oscL;

      const oscR = ctx.createOscillator();
      oscR.type = 'sine';
      oscR.frequency.value = 4000;
      const panR = ctx.createStereoPanner();
      panR.pan.value = 1;
      oscR.connect(panR);
      panR.connect(gainRight);
      gainRight.connect(analyserRight);
      analyserRight.connect(merger, 0, 1);
      oscR.start();
      oscRightRef.current = oscR;
    }

    merger.connect(ctx.destination);
    setIsPlaying(true);
    animFrameRef.current = requestAnimationFrame(updateLevels);
  }, [stopAudio, leftFreq, rightFreq, updateLevels]);

  const faqs = [
    {
      q: 'How do I know if my headphones are balanced?',
      a: 'When playing the Left/Right Channel test, the volume should be identical in both ears. If one side sounds louder, your headphones or your hearing may be imbalanced.'
    },
    {
      q: 'What frequency should I use for testing?',
      a: '440Hz (A4) is a good middle frequency for basic testing. The Frequency Balance mode lets you test with different frequencies in each ear to check for consistency across the spectrum.'
    },
    {
      q: 'Why does stereo separation matter?',
      a: 'Stereo separation ensures you hear the full spatial detail in music. If low frequencies leak into the right channel or high frequencies into the left, the stereo image collapses.'
    },
    {
      q: 'Can I use this to test speakers too?',
      a: 'Yes! While designed for headphones, this tool works with speakers too. Position yourself between two speakers and listen for the same left/right balance.'
    },
    {
      q: 'My headphones sound different on each side. What should I do?',
      a: 'First, try a different audio source to rule out software issues. If the imbalance persists across devices, your headphones may need professional repair or replacement.'
    },
  ];

  // FAQPage Schema for AEO/GEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <main className="min-h-screen bg-[#08080F] text-[#E8ECF0] font-['DM_Sans',sans-serif]">
      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />

      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">
            Audio Testing
          </p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">
            Headphone Test — Check Left/Right Balance
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">
            Verify your headphones are properly balanced. Test stereo separation, frequency response, and channel balance in seconds.
          </p>
          <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">
            Free online tool · Works on mobile · No signup
          </p>
        </div>
      </section>

      <section id="audio-tool" className="pb-20 lg:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Instructions */}
          <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-6 mb-8">
            <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] mb-4">
              <Headphones className="w-5 h-5 inline mr-2 text-[#00E5CC]" />
              How to Test
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-[#6B7280]">
              <div className="flex items-start gap-3">
                <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">1</span>
                <p>Put on your headphones and find a quiet environment</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">2</span>
                <p>Select a test mode below and press Play</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">3</span>
                <p>Listen carefully and watch the volume indicators</p>
              </div>
            </div>
          </div>

          {/* Test Mode Selector */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {testModes.map((t) => (
              <button
                key={t.mode}
                onClick={() => {
                  if (!isPlaying || activeMode !== t.mode) {
                    startTest(t.mode);
                  }
                }}
                className={`bg-[#0F0F1A] border rounded-2xl p-5 text-left transition-all ${
                  activeMode === t.mode && isPlaying
                    ? 'border-[#00E5CC] shadow-[0_0_20px_rgba(0,229,204,0.1)]'
                    : 'border-[#1E1E2E] hover:border-[#2E2E3E]'
                }`}
              >
                <h4 className="font-['Space_Grotesk',sans-serif] text-lg font-semibold text-[#E8ECF0] mb-2">
                  {t.label}
                </h4>
                <p className="text-sm text-[#6B7280]">{t.description}</p>
                {activeMode === t.mode && isPlaying && (
                  <span className="inline-block mt-3 px-2 py-0.5 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs rounded-md">
                    Playing
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Controls & Level Meters */}
          <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
            {/* Frequency controls for frequency-balance mode */}
            {activeMode === 'frequency-balance' && (
              <div className="mb-8">
                {/* Quick Presets */}
                <div className="mb-6">
                  <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] mb-3">QUICK PRESETS</p>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.freq}
                        onClick={() => { setLeftFreq(p.freq); setRightFreq(p.freq * 2); }}
                        disabled={!isPlaying}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-50 ${
                          leftFreq === p.freq
                            ? 'bg-[#00E5CC] text-[#08080F]'
                            : 'bg-[#08080F] text-[#6B7280] hover:bg-[#1E1E2E] border border-[#1E1E2E]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frequency Sliders */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] block mb-2">
                      LEFT CHANNEL — {leftFreq}Hz
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="2000"
                      value={leftFreq}
                      onChange={(e) => setLeftFreq(Number(e.target.value))}
                      disabled={!isPlaying}
                      className="w-full accent-[#00E5CC]"
                    />
                  </div>
                  <div>
                    <label className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] block mb-2">
                      RIGHT CHANNEL — {rightFreq}Hz
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="2000"
                      value={rightFreq}
                      onChange={(e) => setRightFreq(Number(e.target.value))}
                      disabled={!isPlaying}
                      className="w-full accent-[#00E5CC]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Volume Level Meters */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] mb-3">LEFT (L)</p>
                <div className="h-48 bg-[#08080F] rounded-xl border border-[#1E1E2E] relative overflow-hidden flex items-end justify-center p-2">
                  <div
                    className="w-full bg-gradient-to-t from-[#00E5CC] to-[#00E5CC]/50 rounded-md transition-all duration-75"
                    style={{ height: `${leftLevel * 100}%`, minHeight: leftLevel > 0 ? '4px' : '0' }}
                  />
                </div>
                <p className="font-['JetBrains_Mono',monospace] text-xs text-[#E8ECF0] mt-2">
                  {Math.round(leftLevel * 100)}%
                </p>
              </div>
              <div className="text-center">
                <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] mb-3">RIGHT (R)</p>
                <div className="h-48 bg-[#08080F] rounded-xl border border-[#1E1E2E] relative overflow-hidden flex items-end justify-center p-2">
                  <div
                    className="w-full bg-gradient-to-t from-[#00E5CC] to-[#00E5CC]/50 rounded-md transition-all duration-75"
                    style={{ height: `${rightLevel * 100}%`, minHeight: rightLevel > 0 ? '4px' : '0' }}
                  />
                </div>
                <p className="font-['JetBrains_Mono',monospace] text-xs text-[#E8ECF0] mt-2">
                  {Math.round(rightLevel * 100)}%
                </p>
              </div>
            </div>

            {/* Play/Stop */}
            <div className="flex justify-center gap-4">
              {isPlaying ? (
                <button
                  onClick={stopAudio}
                  className="flex items-center gap-2 px-8 py-3 bg-red-500/10 border border-red-500/30 text-red-400 font-['Space_Grotesk',sans-serif] font-semibold rounded-xl hover:bg-red-500/20 transition-colors"
                >
                  <VolumeX className="w-5 h-5" />
                  Stop
                </button>
              ) : (
                <button
                  onClick={() => startTest(activeMode)}
                  className="flex items-center gap-2 px-8 py-3 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold rounded-xl hover:bg-[#00E5CC]/90 transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                  Play
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Use Cases</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">Why Test Your Headphones?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Quality Check</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Verify New Headphones</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> You just bought new headphones but aren&apos;t sure if they&apos;re working correctly.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Run the channel test to confirm both drivers are equally balanced before the return window closes.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Production</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Monitor Mixing</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> You&apos;re mixing a track but your headphones might have an imbalance, affecting your mix decisions.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Confirm your monitoring environment is balanced, then mix with confidence knowing your headphones are accurate.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Diagnostics</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Troubleshoot Issues</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> One ear sounds different but you can&apos;t tell if it&apos;s the headphones or a software setting.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Isolate the problem by testing at different frequencies and stereo configurations.</p>
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
            {faqs.map((faq, i) => (
              <details key={i} className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-[#6B7280] group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gradient-to-b from-[#08080F] to-[#0A1518]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8ECF0] mb-6">
            Check Your Headphones Now
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-lg mx-auto">
            Fast, free, and works on any device with a browser.
          </p>
          <a href="#audio-tool" className="inline-flex items-center px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors">
            Open Headphone Test
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
