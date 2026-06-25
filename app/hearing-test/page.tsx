'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from "next/image";
import { ChevronDown, Menu, X, Headphones, Ear, BarChart3, Play, Volume2 } from "lucide-react";
import DynamicCookieConsent from "../components/DynamicCookieConsent";
import { FAQList } from "../components/FAQ";

const FREQUENCIES = [250, 500, 1000, 2000, 4000, 8000];
const VOLUME = 0.3;
const TONE_DURATION = 1000; // 1 second
const PAUSE_BETWEEN = 500;  // 500ms pause

type TestState = 'idle' | 'playing' | 'waiting' | 'complete';

const hearingTestFAQ = [
  {
    question: "What is a hearing test?",
    answer: "A hearing test measures your ability to hear different frequencies (pitches) of sound. This test plays tones at standard audiometric frequencies — from low (250Hz) to high (8000Hz) — and records which ones you can hear. It provides a simple estimation of your hearing range."
  },
  {
    question: "Is this a clinical hearing test?",
    answer: "No. This is a basic screening tool, not a replacement for a professional audiometric examination. Clinical hearing tests are performed in soundproof booths with calibrated equipment by certified audiologists. If you have concerns about your hearing, please consult a healthcare professional."
  },
  {
    question: "Why do I need headphones for this test?",
    answer: "Headphones (or earbuds) provide consistent sound delivery to your ears and reduce ambient noise interference. The test results are more accurate when using headphones compared to speakers, as external sounds can mask the test tones and affect your responses."
  },
  {
    question: "What frequencies does the test cover?",
    answer: "This test covers six standard audiometric frequencies: 250Hz, 500Hz, 1000Hz, 2000Hz, 4000Hz, and 8000Hz. These span the critical range of human hearing relevant to speech and music. Normal human hearing typically ranges from about 20Hz to 20,000Hz."
  },
  {
    question: "What does my hearing range mean?",
    answer: "Your hearing range shows the spectrum of frequencies you can perceive. A wider range means you can hear both very low and very high pitches. Age, noise exposure, and genetics all affect hearing range. Losing the ability to hear high frequencies (above 4000Hz) is a common sign of age-related or noise-induced hearing loss."
  }
];

export default function HearingTestPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testState, setTestState] = useState<TestState>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Record<number, boolean | null>>({});

  useEffect(() => {
    document.title = 'Hearing Test - Check Your Frequency Range | Tone Generator';
  }, []);

  useEffect(() => {
    const link = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', 'https://tonetool.org/hearing-test');
    } else {
      const newLink = document.createElement('link');
      newLink.setAttribute('rel', 'canonical');
      newLink.setAttribute('href', 'https://tonetool.org/hearing-test');
      document.head.appendChild(newLink);
    }
  }, []);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback((frequency: number) => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(VOLUME, ctx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);

    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + TONE_DURATION / 1000);

    setTimeout(() => {
      oscillator.stop();
      oscillator.disconnect();
      gainNode.disconnect();
    }, TONE_DURATION);
  }, [getAudioContext]);

  const startTest = useCallback(() => {
    setTestState('playing');
    setCurrentIndex(0);
    setResults({});
    playTone(FREQUENCIES[0]);
    timeoutRef.current = setTimeout(() => {
      setTestState('waiting');
    }, TONE_DURATION + 200);
  }, [playTone]);

  const handleResponse = useCallback((heard: boolean) => {
    const freq = FREQUENCIES[currentIndex];
    setResults(prev => ({ ...prev, [freq]: heard }));

    if (currentIndex < FREQUENCIES.length - 1) {
      setTestState('playing');
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      playTone(FREQUENCIES[nextIndex]);
      timeoutRef.current = setTimeout(() => {
        setTestState('waiting');
      }, TONE_DURATION + 200);
    } else {
      setTestState('complete');
    }
  }, [currentIndex, playTone]);

  const retakeTest = useCallback(() => {
    setTestState('idle');
    setCurrentIndex(0);
    setResults({});
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  const heardFrequencies = FREQUENCIES.filter(f => results[f] === true);
  const hearingRange = heardFrequencies.length > 0
    ? `${heardFrequencies[0]}Hz – ${heardFrequencies[heardFrequencies.length - 1]}Hz`
    : 'No frequencies detected';

  const getAssessment = () => {
    const heardCount = heardFrequencies.length;
    if (heardCount === 6) return { message: "Your hearing range appears to be very good! You can hear across the full standard audiometric spectrum.", color: "text-[#00E5CC]" };
    if (heardCount >= 4) return { message: "Your hearing covers most frequencies. Some high or low frequencies may be slightly reduced, which is common.", color: "text-[#00E5CC]" };
    if (heardCount >= 2) return { message: "You may have some difficulty hearing certain frequencies. Consider consulting an audiologist for a comprehensive evaluation.", color: "text-[#E5A500]" };
    return { message: "You may want to consult a hearing specialist. This simple test suggests your hearing range may be limited.", color: "text-[#E55050]" };
  };

  // FAQPage Schema for AEO/GEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": hearingTestFAQ.map(faq => ({
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
              Start Test
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
                  Start Test
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">
            Health &amp; Wellness
          </p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">
            Hearing Test — Check Your Frequency Range
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">
            Discover which frequencies you can hear. Our simple audio test plays tones across the standard audiometric spectrum and estimates your hearing range in seconds.
          </p>
          <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">
            Free online tool · Works on mobile · No signup required
          </p>
        </div>
      </section>

      {/* Audio Tool */}
      <section id="audio-tool" className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {testState === 'idle' && (
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8 sm:p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#00E5CC]/10 flex items-center justify-center mx-auto mb-6">
                <Headphones className="w-10 h-10 text-[#00E5CC]" />
              </div>
              <h2 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-[#E8ECF0] mb-3">
                Ready to Test Your Hearing?
              </h2>
              <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
                Put on your headphones and find a quiet space. The test will play 6 tones at different frequencies and ask if you can hear each one.
              </p>
              <div className="bg-[#08080F] border border-[#1E1E2E] rounded-xl p-4 mb-8 text-left">
                <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] mb-2 uppercase tracking-wider">What to expect</p>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li className="flex items-center gap-2"><span className="text-[#00E5CC]">✓</span> 6 frequencies tested: 250Hz – 8000Hz</li>
                  <li className="flex items-center gap-2"><span className="text-[#00E5CC]">✓</span> Each tone plays for 1 second</li>
                  <li className="flex items-center gap-2"><span className="text-[#00E5CC]">✓</span> Answer &quot;Heard it&quot; or &quot;Didn&apos;t hear it&quot;</li>
                  <li className="flex items-center gap-2"><span className="text-[#00E5CC]">✓</span> Results with hearing range estimate</li>
                </ul>
              </div>
              <button
                onClick={startTest}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Hearing Test
              </button>
              <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] mt-4">
                Use headphones for best results
              </p>
            </div>
          )}

          {testState === 'playing' && (
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8 sm:p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#00E5CC]/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Volume2 className="w-10 h-10 text-[#00E5CC]" />
              </div>
              <p className="font-['JetBrains_Mono',monospace] text-xs text-[#00E5CC] uppercase tracking-widest mb-2">
                Playing Tone
              </p>
              <p className="font-['Space_Grotesk',sans-serif] text-5xl font-bold text-[#E8ECF0] mb-2">
                {FREQUENCIES[currentIndex]}Hz
              </p>
              <p className="text-[#6B7280] text-sm mb-6">
                Tone {currentIndex + 1} of {FREQUENCIES.length}
              </p>
              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto h-2 bg-[#1E1E2E] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00E5CC] rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / FREQUENCIES.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {testState === 'waiting' && (
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8 sm:p-12 text-center">
              <p className="font-['JetBrains_Mono',monospace] text-xs text-[#00E5CC] uppercase tracking-widest mb-2">
                Frequency {currentIndex + 1} of {FREQUENCIES.length}
              </p>
              <p className="font-['Space_Grotesk',sans-serif] text-5xl font-bold text-[#E8ECF0] mb-2">
                {FREQUENCIES[currentIndex]}Hz
              </p>
              <p className="text-[#6B7280] text-sm mb-8">
                Did you hear the tone?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleResponse(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors"
                >
                  <Ear className="w-5 h-5" />
                  Yes, I heard it
                </button>
                <button
                  onClick={() => handleResponse(false)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#6B7280] text-[#6B7280] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:border-[#E8ECF0] hover:text-[#E8ECF0] transition-colors"
                >
                  No, I didn&apos;t hear it
                </button>
              </div>
              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto h-2 bg-[#1E1E2E] rounded-full overflow-hidden mt-8">
                <div
                  className="h-full bg-[#00E5CC] rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / FREQUENCIES.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {testState === 'complete' && (
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8 sm:p-12">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-[#00E5CC]/10 flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-10 h-10 text-[#00E5CC]" />
                </div>
                <h2 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-bold text-[#E8ECF0] mb-3">
                  Your Results
                </h2>
                <p className="text-[#6B7280] mb-2">Hearing Range: <span className="text-[#E8ECF0] font-semibold">{hearingRange}</span></p>
                <p className={`text-sm ${getAssessment().color}`}>{getAssessment().message}</p>
              </div>

              {/* CSS Bar Chart */}
              <div className="bg-[#08080F] border border-[#1E1E2E] rounded-xl p-6 mb-8">
                <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] uppercase tracking-wider mb-6">Frequency Response</p>
                <div className="flex items-end justify-between gap-2 sm:gap-4" style={{ height: '200px' }}>
                  {FREQUENCIES.map(freq => {
                    const heard = results[freq] === true;
                    return (
                      <div key={freq} className="flex flex-col items-center flex-1 h-full justify-end">
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#6B7280] mb-2">
                          {results[freq] === null ? '—' : (heard ? '✓' : '✗')}
                        </span>
                        <div
                          className="w-full rounded-t-lg transition-all duration-500"
                          style={{
                            height: heard ? '100%' : '20%',
                            backgroundColor: heard ? '#00E5CC' : '#2A1515',
                            borderBottom: heard ? '3px solid #00E5CC' : '3px solid #E55050',
                          }}
                        />
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#6B7280] mt-2">
                          {freq}Hz
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#1E1E2E]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#00E5CC]" />
                    <span className="text-xs text-[#6B7280]">Heard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#2A1515]" />
                    <span className="text-xs text-[#6B7280]">Not heard</span>
                  </div>
                </div>
              </div>

              {/* Detail cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {FREQUENCIES.map(freq => (
                  <div
                    key={freq}
                    className={`rounded-xl p-4 text-center border ${
                      results[freq] === true
                        ? 'bg-[#00E5CC]/10 border-[#00E5CC]/30'
                        : 'bg-[#1E1515] border-[#E55050]/30'
                    }`}
                  >
                    <p className="font-['Space_Grotesk',sans-serif] font-bold text-xl text-[#E8ECF0]">{freq}Hz</p>
                    <p className={`text-xs mt-1 ${results[freq] === true ? 'text-[#00E5CC]' : 'text-[#E55050]'}`}>
                      {results[freq] === true ? '✓ Heard' : '✗ Not heard'}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={retakeTest}
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[#00E5CC] text-[#00E5CC] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/10 transition-colors"
                >
                  Retake Test
                </button>
              </div>

              <p className="text-center text-xs text-[#6B7280] mt-4 max-w-lg mx-auto">
                This is a basic screening tool. For a comprehensive hearing evaluation, consult an audiologist or hearing healthcare professional.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 lg:py-32 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Use Cases</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">Who Benefits From This Test?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Health</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Personal Health Check</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> You suspect your hearing might be declining but aren&apos;t sure which frequencies are affected.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Get an instant overview of which frequencies you can and can&apos;t hear, giving you a clear picture of your hearing profile.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Education</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Auditory Science Lessons</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Teaching students about human hearing ranges and frequency perception is abstract and hard to demonstrate.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Students experience hearing different frequencies firsthand and understand concepts like frequency range, pitch, and audiometric testing.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Audio</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Audio Equipment Testing</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> You want to verify that your speakers, headphones, or audio setup can reproduce the full frequency spectrum.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Play each frequency and verify your gear reproduces it clearly. Identify dead spots or frequency gaps in your audio chain.</p>
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
          <FAQList items={hearingTestFAQ} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-[#08080F] to-[#0A1518]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8ECF0] mb-6">
            Check Your Hearing Now
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-lg mx-auto">
            Quick, free, and runs right in your browser. No downloads or signups needed.
          </p>
          <a href="#audio-tool" className="inline-flex items-center px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors">
            Start Hearing Test
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
