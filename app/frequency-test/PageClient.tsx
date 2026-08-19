'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import DynamicCookieConsent from "../components/DynamicCookieConsent";
import { FAQList } from "../components/FAQ";
import Image from "next/image";
import { Play, Pause, Download, Volume2, Info } from "lucide-react";
import { downloadWav } from "../../lib/wav";

import Navigation from "../../components/Navigation";

const FREQUENCY_PRESETS = [
  { label: "20Hz", freq: 20, category: "Sub Bass" },
  { label: "50Hz", freq: 50, category: "Bass" },
  { label: "100Hz", freq: 100, category: "Bass" },
  { label: "250Hz", freq: 250, category: "Low Mid" },
  { label: "440Hz", freq: 440, category: "Mid (A4)" },
  { label: "1kHz", freq: 1000, category: "Mid" },
  { label: "2kHz", freq: 2000, category: "Upper Mid" },
  { label: "4kHz", freq: 4000, category: "Presence" },
  { label: "8kHz", freq: 8000, category: "Brilliance" },
  { label: "12kHz", freq: 12000, category: "Air" },
  { label: "16kHz", freq: 16000, category: "Ultra High" },
];

const faqItems = [
  {
    question: "What is a frequency test?",
    answer: "A frequency test lets you play a specific audio frequency (measured in Hz) to check how your speakers, headphones, or hearing respond to that pitch. It's used for audio calibration, speaker testing, and hearing screening."
  },
  {
    question: "What frequency range can I test?",
    answer: "You can test any frequency from 20Hz to 20kHz — the full range of human hearing. Low frequencies (20-250Hz) are bass, mid frequencies (250Hz-4kHz) cover most speech and music, and high frequencies (4kHz-20kHz) are treble and overtones."
  },
  {
    question: "How do I test my speakers with this tool?",
    answer: "Start with a low frequency (50-100Hz) and gradually increase. Listen for distortion, rattling, or dropouts. A good speaker should produce clean output across its rated frequency range. Use the sweep feature to test continuously."
  },
  {
    question: "What is 440Hz used for?",
    answer: "440Hz is the standard tuning pitch for musical instruments — it's the A above middle C (A4). Orchestras and tuners worldwide use this as their reference frequency. It's the most commonly tested single frequency in audio."
  },
  {
    question: "Can I download test tones?",
    answer: "Yes. Click the download button to save a WAV file of any preset frequency. Use these offline test tones for speaker calibration, room acoustics testing, or audio equipment setup."
  },
  {
    question: "Is this frequency test tool free?",
    answer: "Yes, completely free. No signup, no downloads, no ads that interfere with audio. It runs entirely in your browser using the Web Audio API."
  }
];

const useCases = [
  {
    tag: "Speaker Testing",
    title: "Test Your Speakers & Headphones",
    before: "You bought new speakers but don't know if they deliver clean bass or crisp highs.",
    after: "Sweep through frequencies from 20Hz to 20kHz. Hear exactly where your speakers excel and where they struggle."
  },
  {
    tag: "Audio Calibration",
    title: "Calibrate Your Audio Setup",
    before: "Your home theater sounds off but you can't pinpoint the problem frequency.",
    after: "Test specific frequencies to identify room resonances, speaker crossover issues, or EQ problems. Download tones for offline use."
  },
  {
    tag: "Hearing Check",
    title: "Quick Hearing Frequency Check",
    before: "You're not sure if you can still hear high frequencies clearly.",
    after: "Test your hearing range by playing tones from low to high. Note where your perception drops — useful data for your audiologist."
  }
];

export default function Page() {
  
  const [frequency, setFrequency] = useState(440);
  const [volume, setVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    document.title = 'Frequency Test - Test Any Audio Frequency Online | Tone Generator';
  }, []);

  useEffect(() => {
    const link = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', 'https://tonetool.org/frequency-test');
    } else {
      const newLink = document.createElement('link');
      newLink.setAttribute('rel', 'canonical');
      newLink.setAttribute('href', 'https://tonetool.org/frequency-test');
      document.head.appendChild(newLink);
    }
  }, []);

  const createAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const stopTone = useCallback(() => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (_) {}
      oscRef.current = null;
    }
    if (gainRef.current) {
      try { gainRef.current.disconnect(); } catch (_) {}
      gainRef.current = null;
    }
    setIsPlaying(false);
    setActivePreset(null);
  }, []);

  const playTone = useCallback(async (freq: number) => {
    stopTone();
    
    try {
      const ctx = createAudioContext();
      if (ctx.state === 'suspended') await ctx.resume();
      if (ctx.state !== 'running') return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlaying(true);
      setActivePreset(freq);
    } catch (_) {}
  }, [volume, createAudioContext, stopTone]);

  const updateFrequency = useCallback((newFreq: number) => {
    const clamped = Math.max(20, Math.min(20000, Math.round(newFreq)));
    setFrequency(clamped);
    setActivePreset(null);
    
    if (isPlaying && oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(clamped, audioCtxRef.current.currentTime);
    }
  }, [isPlaying]);

  const updateVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(clamped, audioCtxRef.current.currentTime);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTone();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopTone]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="min-h-screen bg-[#08080F] text-[#E8ECF0] font-['DM_Sans',sans-serif]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />

      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Audio Testing</p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">Frequency Test Online</h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">Test any audio frequency from 20Hz to 20kHz. Perfect for speaker testing, hearing checks, and audio calibration.</p>
          <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">Free online tool · Works on mobile · No signup</p>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#0F0F1A] border border-[#1E1E2E] rounded-3xl p-6 lg:p-8">
            {/* Frequency Display */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-[#E8ECF0] tabular-nums">
                {frequency.toLocaleString()}
              </div>
              <div className="text-[#6B7280] text-sm mt-1">Hz</div>
              <div className="text-[#00E5CC] text-xs mt-2 font-['JetBrains_Mono',monospace]">
                {frequency < 80 ? 'Sub Bass' : frequency < 250 ? 'Bass' : frequency < 500 ? 'Low Mid' : frequency < 2000 ? 'Mid' : frequency < 4000 ? 'Upper Mid' : frequency < 8000 ? 'Presence' : 'Brilliance'}
              </div>
            </div>

            {/* Frequency Slider */}
            <div className="mb-6">
              <input
                type="range"
                min="20"
                max="20000"
                value={frequency}
                onChange={(e) => updateFrequency(Number(e.target.value))}
                className="w-full h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC]"
              />
              <div className="flex justify-between text-xs text-[#6B7280] mt-2">
                <span>20 Hz</span>
                <span>200 Hz</span>
                <span>2 kHz</span>
                <span>20 kHz</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#6B7280]" />
                  <span className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#6B7280]">Volume</span>
                </div>
                <span className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(volume * 100)}
                onChange={(e) => updateVolume(Number(e.target.value) / 100)}
                className="w-full h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC]"
              />
            </div>

            {/* Play/Stop Button */}
            <button
              onClick={isPlaying ? stopTone : () => playTone(frequency)}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-2 ${
                isPlaying
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                  : 'bg-[#00E5CC] text-[#08080F] hover:bg-[#00E5CC]/90'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Stop Tone' : 'Play Frequency'}
            </button>

            {/* Download Button */}
            <button
              onClick={() => downloadWav(frequency, 3, `frequency-test-${frequency}hz.wav`)}
              className="w-full mt-3 py-3 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 bg-[#0F0F1A] border border-[#1E1E2E] text-[#6B7280] hover:bg-[#1E1E2E] hover:text-[#E8ECF0]"
            >
              <Download className="w-4 h-4" />
              Download {frequency}Hz Test Tone (3s)
            </button>
          </div>

          {/* Preset Frequencies */}
          <div className="mt-8 bg-[#0F0F1A] border border-[#1E1E2E] rounded-3xl p-6 lg:p-8">
            <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] mb-2">
              Quick Frequency Test
            </h3>
            <p className="text-sm text-[#6B7280] mb-4">
              Click any button to test that frequency. Click again to stop.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {FREQUENCY_PRESETS.map((preset) => (
                <button
                  key={preset.freq}
                  onClick={() => activePreset === preset.freq ? stopTone() : playTone(preset.freq)}
                  className={`py-3 px-2 rounded-xl text-sm font-medium transition ${
                    activePreset === preset.freq
                      ? 'bg-[#00E5CC] text-[#08080F]'
                      : 'bg-[#08080F] text-[#6B7280] hover:bg-[#1E1E2E] border border-[#1E1E2E]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 lg:py-32 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Use Cases</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">What Will You Test?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <div key={i} className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
                <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">{uc.tag}</span>
                <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">{uc.title}</h3>
                <div className="space-y-3 text-[#6B7280]">
                  <p><span className="text-[#6B7280]">Before:</span> {uc.before}</p>
                  <p><span className="text-[#E8ECF0]">After:</span> {uc.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 bg-[#08080F]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">FAQ</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">Common Questions</h2>
          </div>
          <FAQList items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-[#08080F] to-[#0A1518]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8ECF0] mb-6">
            Test Any Frequency Now
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-lg mx-auto">
            Free online frequency test tool. Works on any device with speakers or headphones.
          </p>
          <a href="#audio-tool" className="inline-flex items-center px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors">
            Start Frequency Test
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
