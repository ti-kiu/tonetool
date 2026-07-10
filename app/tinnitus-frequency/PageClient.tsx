'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import DynamicCookieConsent from "../components/DynamicCookieConsent";
import { FAQList } from "../components/FAQ";
import Image from "next/image";
import { ChevronDown, Menu, X, Play, Square, Save, Trash2, Clock, Volume2, Ear, Search, Stethoscope, TrendingUp, Info, Minus, Plus } from "lucide-react";

import Navigation from "../../components/Navigation";
const FREQUENCY_MIN = 200;
const FREQUENCY_MAX = 12000;
const DEFAULT_FREQUENCY = 4000;

const faqItems = [
  {
    question: "Is this a medical diagnosis tool?",
    answer: "No. This tool helps you identify a frequency to discuss with your doctor. It cannot diagnose hearing loss, tinnitus causes, or any medical condition. Always consult a healthcare professional for diagnosis and treatment."
  },
  {
    question: "How do I match my tinnitus frequency?",
    answer: "Start at 4000Hz (the most common tinnitus frequency). Play the tone and use the slider or +/- buttons to sweep up or down. When the played tone blends with or disappears into your tinnitus, you've found a close match. Fine-tune with the +/- 1Hz buttons for precision."
  },
  {
    question: "Why does my tinnitus have multiple tones?",
    answer: "Many people perceive multiple frequencies simultaneously. Match the loudest or most bothersome tone first, then try to identify secondary tones. Record all matched frequencies — this data is valuable for your audiologist."
  },
  {
    question: "Can matching my tinnitus make it worse?",
    answer: "Keep the volume low and take regular breaks. If listening to the tone increases your tinnitus perception or causes discomfort, stop immediately and consult a doctor. Never force a match at high volumes."
  },
  {
    question: "What frequency range is most common for tinnitus?",
    answer: "Most tinnitus falls between 3kHz and 8kHz, with 4kHz being particularly common. However, tinnitus can occur at any audible frequency. The default starting point of 4000Hz is chosen because it covers the most frequently reported range."
  }
];

const useCases = [
  {
    tag: "Find Your Frequency",
    title: "Identify Your Exact Tone",
    before: "Your doctor asks 'What pitch is your ringing?' You shrug. You can't describe a sound in words.",
    after: "Dial up frequencies until one matches your ringing. Note the exact Hz. Your doctor now has precise data to work with."
  },
  {
    tag: "Compare with Doctor",
    title: "Bring Data to Your Appointment",
    before: "You visit the audiologist but can only say 'it rings sometimes.' They have to guess which frequencies to test.",
    after: "Show your saved frequency list with timestamps. Your audiologist can immediately target the right frequency range during testing."
  },
  {
    tag: "Track Changes",
    title: "Monitor Tinnitus Over Time",
    before: "Your ringing seems to change pitch occasionally, but you have no way to document or prove it.",
    after: "Save matches weekly or monthly. Compare your history to see if the pitch shifts — useful longitudinal data for your healthcare team."
  }
];

export default function Page() {
  
  const [frequency, setFrequency] = useState(DEFAULT_FREQUENCY);
  const [volume, setVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState<{ frequency: number; timestamp: string }[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Tinnitus Frequency Matcher - Find Your Tone | Tone Generator';
  }, []);

  useEffect(() => {
    const link = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', 'https://tonetool.org/tinnitus-frequency');
    } else {
      const newLink = document.createElement('link');
      newLink.setAttribute('rel', 'canonical');
      newLink.setAttribute('href', 'https://tonetool.org/tinnitus-frequency');
      document.head.appendChild(newLink);
    }
  }, []);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tinnitus-frequency-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        setHistory([]);
      }
    }
    setHistoryLoaded(true);
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (historyLoaded) {
      localStorage.setItem('tinnitus-frequency-history', JSON.stringify(history));
    }
  }, [history, historyLoaded]);

  const createAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const startTone = useCallback(() => {
    const ctx = createAudioContext();
    
    // Stop existing oscillator
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    setIsPlaying(true);
  }, [frequency, volume, createAudioContext]);

  const stopTone = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const updateFrequency = useCallback((newFreq: number) => {
    const clamped = Math.max(FREQUENCY_MIN, Math.min(FREQUENCY_MAX, Math.round(newFreq)));
    setFrequency(clamped);
    
    if (isPlaying && oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(clamped, audioContextRef.current.currentTime);
    }
  }, [isPlaying]);

  const updateVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    
    if (isPlaying && gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(clamped, audioContextRef.current.currentTime);
    }
  }, [isPlaying]);

  const saveFrequency = useCallback(() => {
    const entry = {
      frequency,
      timestamp: new Date().toLocaleString()
    };
    setHistory(prev => [entry, ...prev]);
  }, [frequency]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('tinnitus-frequency-history');
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopTone();
    } else {
      startTone();
    }
  }, [isPlaying, startTone, stopTone]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // FAQPage Schema for AEO/GEO
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
      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">
            Hearing Care
          </p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">
            Tinnitus Frequency Matcher — Find Your Tone
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">
            Identify the exact pitch of your tinnitus by matching it with a precise tone. Save frequencies, track changes over time, and bring data to your doctor.
          </p>
          <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">
            Free online tool · Works on mobile · No signup
          </p>
          
          {/* 工具截图 - 图片SEO */}
          <div className="mt-8 mb-8">
            <Image 
              src="/images/tinnitus-match-tool.png" 
              alt="Tinnitus Frequency Matcher - Find Your Tone Online"
              width={800}
              height={450}
              className="rounded-xl border border-[#1E1E2E] mx-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Audio Tool Section */}
      <section id="audio-tool" className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-6 sm:p-8">
            
            {/* Frequency Display */}
            <div className="text-center mb-8">
              <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-2">Frequency</p>
              <div className="font-['JetBrains_Mono',monospace] text-5xl sm:text-6xl font-bold text-[#E8ECF0] mb-2">
                {frequency}<span className="text-2xl text-[#6B7280]">Hz</span>
              </div>
              <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">200Hz — 12,000Hz range</p>
            </div>

            {/* Frequency Slider */}
            <div className="mb-6">
              <input
                type="range"
                min={FREQUENCY_MIN}
                max={FREQUENCY_MAX}
                value={frequency}
                onChange={(e) => updateFrequency(parseInt(e.target.value))}
                className="w-full h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#00E5CC] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,229,204,0.5)]"
              />
              <div className="flex justify-between mt-1">
                <span className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">200Hz</span>
                <span className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">12kHz</span>
              </div>
            </div>

            {/* Frequency Input + Fine-tune Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateFrequency(frequency - 10)}
                  className="flex items-center justify-center w-10 h-10 bg-[#1E1E2E] border border-[#2E2E3E] rounded-lg text-[#6B7280] hover:text-[#E8ECF0] hover:border-[#00E5CC]/50 transition-colors"
                  title="-10Hz"
                >
                  <Minus className="w-4 h-4" />
                  <span className="font-['JetBrains_Mono',monospace] text-xs ml-0.5">10</span>
                </button>
                <button
                  onClick={() => updateFrequency(frequency - 1)}
                  className="flex items-center justify-center w-10 h-10 bg-[#1E1E2E] border border-[#2E2E3E] rounded-lg text-[#6B7280] hover:text-[#E8ECF0] hover:border-[#00E5CC]/50 transition-colors"
                  title="-1Hz"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={FREQUENCY_MIN}
                  max={FREQUENCY_MAX}
                  value={frequency}
                  onChange={(e) => updateFrequency(parseInt(e.target.value) || FREQUENCY_MIN)}
                  className="w-24 text-center font-['JetBrains_Mono',monospace] text-lg font-bold bg-[#1E1E2E] border border-[#2E2E3E] rounded-lg px-3 py-2 text-[#E8ECF0] focus:outline-none focus:border-[#00E5CC] transition-colors"
                />
                <span className="font-['JetBrains_Mono',monospace] text-sm text-[#6B7280]">Hz</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateFrequency(frequency + 1)}
                  className="flex items-center justify-center w-10 h-10 bg-[#1E1E2E] border border-[#2E2E3E] rounded-lg text-[#6B7280] hover:text-[#E8ECF0] hover:border-[#00E5CC]/50 transition-colors"
                  title="+1Hz"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => updateFrequency(frequency + 10)}
                  className="flex items-center justify-center w-10 h-10 bg-[#1E1E2E] border border-[#2E2E3E] rounded-lg text-[#6B7280] hover:text-[#E8ECF0] hover:border-[#00E5CC]/50 transition-colors"
                  title="+10Hz"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-['JetBrains_Mono',monospace] text-xs ml-0.5">10</span>
                </button>
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
                min={0}
                max={100}
                value={Math.round(volume * 100)}
                onChange={(e) => updateVolume(parseInt(e.target.value) / 100)}
                className="w-full h-2 bg-[#1E1E2E] rounded-lg appearance-none cursor-pointer accent-[#00E5CC] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#00E5CC] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,229,204,0.5)]"
              />
            </div>

            {/* Play/Stop + Save Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={togglePlay}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-['Space_Grotesk',sans-serif] font-semibold text-base transition-all ${
                  isPlaying
                    ? 'bg-[#E8ECF0] text-[#08080F] hover:bg-[#E8ECF0]/90'
                    : 'bg-[#00E5CC] text-[#08080F] hover:bg-[#00E5CC]/90 shadow-[0_0_20px_rgba(0,229,204,0.3)]'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="w-5 h-5" />
                    Stop Tone
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Play Tone
                  </>
                )}
              </button>
              <button
                onClick={saveFrequency}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-[#1E1E2E] border border-[#2E2E3E] text-[#E8ECF0] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:border-[#00E5CC]/50 hover:text-[#00E5CC] transition-colors"
              >
                <Save className="w-5 h-5" />
                Save This Frequency
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#00E5CC] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-['Space_Grotesk',sans-serif] font-semibold text-[#E8ECF0] mb-2">How to Match Your Tinnitus</h3>
                  <ol className="text-sm text-[#6B7280] space-y-1 list-decimal list-inside">
                    <li>Start at 4000Hz — the most common tinnitus frequency</li>
                    <li>Press Play and listen at a low volume</li>
                    <li>Use the slider or +/- buttons to sweep through frequencies</li>
                    <li>When the tone blends with your tinnitus, you&apos;re close</li>
                    <li>Fine-tune with the +/- 1Hz buttons for a precise match</li>
                    <li>Save your frequency and compare over time</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* History Panel */}
            <div className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00E5CC]" />
                  <h3 className="font-['Space_Grotesk',sans-serif] font-semibold text-[#E8ECF0]">Saved Frequencies</h3>
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">({history.length})</span>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#EF4444] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear All
                  </button>
                )}
              </div>
              
              {history.length === 0 ? (
                <p className="text-sm text-[#6B7280] text-center py-4">No saved frequencies yet. Match a tone and click &quot;Save This Frequency&quot;.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {history.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[#1E1E2E] rounded-lg px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <span className="font-['JetBrains_Mono',monospace] text-sm font-bold text-[#00E5CC]">{entry.frequency}Hz</span>
                      </div>
                      <span className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">{entry.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 lg:py-32 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Use Cases</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">How People Use This Tool</h2>
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
            Start Matching Your Tinnitus
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-lg mx-auto">
            Free, private, and runs entirely in your browser. No data is sent to any server.
          </p>
          <a href="#audio-tool" className="inline-flex items-center px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors">
            Open Frequency Matcher
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