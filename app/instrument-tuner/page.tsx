"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import DynamicCookieConsent from "../components/DynamicCookieConsent";
import { FAQList } from '../components/FAQ';
import Image from "next/image";
import { Mic, MicOff, Volume2, VolumeX, Menu, X, Headphones } from "lucide-react";

import Navigation from "../../components/Navigation";
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

type TunerState = 'idle' | 'listening' | 'error';

interface NoteInfo {
  note: string;
  octave: number;
  cents: number;
  frequency: number;
}

function autoCorrelate(buf: Float32Array, sampleRate: number): number {
  const SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1; // not enough signal

  let r1 = 0;
  let r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buf[i]) < thres) { r1 = i; break; }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
  }

  const trimmed = buf.slice(r1, r2);
  const trimmedSize = trimmed.length;

  const c = new Array(trimmedSize).fill(0);
  for (let i = 0; i < trimmedSize; i++) {
    for (let j = 0; j < trimmedSize - i; j++) {
      c[i] = c[i] + trimmed[j] * trimmed[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;
  let maxval = -1;
  let maxpos = -1;
  for (let i = d; i < trimmedSize; i++) {
    if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
  }
  let T0 = maxpos;

  // Parabolic interpolation
  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  return sampleRate / T0;
}

function frequencyToNote(freq: number, a4Ref: number): NoteInfo {
  const semitones = 12 * Math.log2(freq / a4Ref);
  const noteNum = Math.round(semitones) + 69;
  const noteIndex = noteNum % 12;
  const octave = Math.floor(noteNum / 12) - 1;
  const noteFreq = a4Ref * Math.pow(2, (noteNum - 69) / 12);
  const cents = Math.round(1200 * Math.log2(freq / noteFreq));
  return {
    note: NOTE_NAMES[noteIndex],
    octave,
    cents,
    frequency: noteFreq,
  };
}

function getCentsColor(cents: number): string {
  const abs = Math.abs(cents);
  if (abs <= 12) return '#00E5CC'; // green/tuned
  if (abs <= 25) return '#F59E0B'; // yellow
  return '#EF4444'; // red
}

function getCentsLabel(cents: number): string {
  if (Math.abs(cents) <= 5) return 'Perfectly in tune';
  if (cents < 0) return 'Flat — tighten';
  return 'Sharp — loosen';
}

const REFERENCE_FREQUENCIES = [440, 432, 415];

export default function InstrumentTunerPage() {
  
  const [tunerState, setTunerState] = useState<TunerState>('idle');
  const [noteInfo, setNoteInfo] = useState<NoteInfo | null>(null);
  const [detectedFrequency, setDetectedFrequency] = useState<number | null>(null);
  const [a4Ref, setA4Ref] = useState(440);
  const [isPlayingRefTone, setIsPlayingRefTone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.title = 'Instrument Tuner - Tune Any Instrument | Tone Generator';
  }, []);

  useEffect(() => {
    const link = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', 'https://tonetool.org/instrument-tuner');
    } else {
      const newLink = document.createElement('link');
      newLink.setAttribute('rel', 'canonical');
      newLink.setAttribute('href', 'https://tonetool.org/instrument-tuner');
      document.head.appendChild(newLink);
    }
  }, []);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const refOscillatorRef = useRef<OscillatorNode | null>(null);
  const refGainRef = useRef<GainNode | null>(null);
  const rafRef = useRef<number>(0);

  const detectPitch = useCallback(() => {
    if (!analyserRef.current || !audioContextRef.current) return;

    const bufferLength = analyserRef.current.fftSize;
    const buffer = new Float32Array(bufferLength);
    analyserRef.current.getFloatTimeDomainData(buffer);

    const frequency = autoCorrelate(buffer, audioContextRef.current.sampleRate);

    if (frequency > 0) {
      const info = frequencyToNote(frequency, a4Ref);
      setNoteInfo(info);
      setDetectedFrequency(frequency);
    } else {
      setNoteInfo(null);
      setDetectedFrequency(null);
    }

    rafRef.current = requestAnimationFrame(detectPitch);
  }, [a4Ref]);

  const startListening = useCallback(async () => {
    try {
      setErrorMessage('');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        }
      });

      streamRef.current = stream;
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) {
        setErrorMessage('Web Audio API not supported');
        setTunerState('error');
        return;
      }
      const audioContext = new AC();
      
      // Resume if suspended (browser autoplay policy)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 4096;
      source.connect(analyser);
      analyserRef.current = analyser;

      setTunerState('listening');
      rafRef.current = requestAnimationFrame(detectPitch);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      if (message.includes('NotAllowed') || message.includes('Permission')) {
        setErrorMessage('Microphone access denied. Please allow microphone access in your browser settings.');
      } else if (message.includes('NotFound')) {
        setErrorMessage('No microphone found. Please connect a microphone.');
      } else {
        setErrorMessage('Could not access microphone: ' + message);
      }
      setTunerState('error');
    }
  }, [detectPitch]);

  const stopListening = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setTunerState('idle');
    setNoteInfo(null);
    setDetectedFrequency(null);
  }, []);

  const toggleRefTone = useCallback(async () => {
    if (isPlayingRefTone) {
      // Stop reference tone
      if (refOscillatorRef.current) {
        try { refOscillatorRef.current.stop(); } catch (_) {}
        refOscillatorRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      setIsPlayingRefTone(false);
    } else {
      // Start reference tone
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return;
      
      const ctx = new AC();
      
      // Resume if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = a4Ref;
      osc.type = 'sine';
      gain.gain.value = 0.3;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      refOscillatorRef.current = osc;
      refGainRef.current = gain;
      audioContextRef.current = ctx;
      setIsPlayingRefTone(true);
    }
  }, [isPlayingRefTone, a4Ref]);

  // Update reference tone frequency if playing
  useEffect(() => {
    if (isPlayingRefTone && refOscillatorRef.current) {
      refOscillatorRef.current.frequency.value = a4Ref;
    }
  }, [a4Ref, isPlayingRefTone]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (refOscillatorRef.current) {
        try { refOscillatorRef.current.stop(); } catch {}
      }
    };
  }, []);

  const centsPosition = noteInfo ? Math.max(0, Math.min(100, (noteInfo.cents + 50) / 100 * 100)) : 50;
  const centsColor = noteInfo ? getCentsColor(noteInfo.cents) : '#6B7280';
  const centsLabel = noteInfo ? getCentsLabel(noteInfo.cents) : '';

  const faqItems = [
    {
      question: 'How does the instrument tuner work?',
      answer: 'The tuner uses your device\'s microphone to listen to the pitch of your instrument. It analyzes the audio in real-time using autocorrelation, a mathematical technique that finds the fundamental frequency of the sound. It then displays the note name, octave, and how many cents (hundredths of a semitone) the detected pitch is from the target note.',
    },
    {
      question: 'What instruments can I tune with this?',
      answer: 'Any instrument that produces a clear, sustained pitch works well — guitar, violin, cello, flute, trumpet, piano, ukulele, saxophone, and more. The tuner detects frequencies from approximately 20Hz to 4000Hz, covering the full range of most instruments.',
    },
    {
      question: 'How accurate is this tuner?',
      answer: 'The autocorrelation algorithm can detect pitch to within ±1 cent (1/100th of a semitone) under good conditions. Accuracy depends on microphone quality and background noise. For most instruments, this is comparable to dedicated clip-on tuners.',
    },
    {
      question: 'What if my microphone doesn\'t work?',
      answer: 'Make sure you\'ve granted microphone permission to the browser. Check that no other app is using the microphone. Try a quieter environment if background noise is interfering. On mobile, ensure the browser has microphone access in your device settings.',
    },
    {
      question: 'What is A4 reference frequency?',
      answer: 'A4=440Hz is the international standard for concert pitch — the frequency of the A note above middle C. Some orchestras use 442Hz or 443Hz for a brighter sound. Historical tunings like Baroque used around 415Hz. You can switch between 440Hz, 432Hz, and 415Hz with the selector.',
    },
  ];

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
            Music Reference
          </p>
          <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8ECF0] leading-[1.1] mb-4">
            Instrument Tuner — Tune Any Instrument
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-6">
            Real-time pitch detection using your microphone. Instantly identify notes, check tuning accuracy, and tune any instrument to concert pitch.
          </p>
          <p className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">
            Free online tool · Works on mobile · No signup
          </p>
        </div>
      </section>

      {/* Instructions */}
      <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-6 mb-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-semibold text-[#E8ECF0] mb-4">
          <Headphones className="w-5 h-5 inline mr-2 text-[#00E5CC]" />
          How to Tune Your Instrument
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-[#6B7280]">
          <div className="flex items-start gap-3">
            <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">1</span>
            <p>Click 'Start Listening' and allow microphone access</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">2</span>
            <p>Play a note on your instrument near the microphone</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-['JetBrains_Mono',monospace] text-[#00E5CC] font-bold">3</span>
            <p>Watch the display — green means in tune, adjust if needed</p>
          </div>
        </div>
      </div>

      {/* Tuner Tool Section */}
      <section id="audio-tool" className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
            {/* Reference Frequency Selector */}
            <div className="mb-8">
              <label className="block font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#6B7280] mb-3">
                Reference Tuning (A4)
              </label>
              <div className="flex gap-3">
                {REFERENCE_FREQUENCIES.map(freq => (
                  <button
                    key={freq}
                    onClick={() => setA4Ref(freq)}
                    className={`px-6 py-2.5 rounded-xl font-['JetBrains_Mono',monospace] text-sm font-semibold transition-all ${
                      a4Ref === freq
                        ? 'bg-[#00E5CC] text-[#08080F]'
                        : 'bg-[#1E1E2E] text-[#6B7280] hover:text-[#E8ECF0] hover:bg-[#2A2A3E]'
                    }`}
                  >
                    {freq}Hz
                  </button>
                ))}
              </div>
            </div>

            {/* Large Note Display */}
            <div className="text-center mb-8">
              {tunerState === 'listening' && noteInfo ? (
                <>
                  <div className="font-['Space_Grotesk',sans-serif] text-8xl sm:text-9xl font-bold leading-none" style={{ color: centsColor }}>
                    {noteInfo.note}
                    <span className="text-4xl sm:text-5xl text-[#6B7280] align-top ml-2">{noteInfo.octave}</span>
                  </div>
                  <div className="font-['JetBrains_Mono',monospace] text-2xl text-[#E8ECF0] mt-2">
                    {detectedFrequency?.toFixed(1)} Hz
                  </div>
                </>
              ) : tunerState === 'listening' ? (
                <>
                  <div className="font-['Space_Grotesk',sans-serif] text-8xl sm:text-9xl font-bold text-[#6B7280] leading-none">
                    —
                  </div>
                  <div className="font-['JetBrains_Mono',monospace] text-lg text-[#6B7280] mt-2">
                    Listening...
                  </div>
                </>
              ) : (
                <>
                  <div className="font-['Space_Grotesk',sans-serif] text-6xl sm:text-7xl font-bold text-[#6B7280]/30 leading-none">
                    🎵
                  </div>
                  <div className="font-['JetBrains_Mono',monospace] text-lg text-[#6B7280] mt-2">
                    {tunerState === 'error' ? errorMessage : 'Press Start to begin tuning'}
                  </div>
                </>
              )}
            </div>

            {/* Cents Deviation Gauge */}
            {tunerState === 'listening' && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">-50¢ (flat)</span>
                  <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold" style={{ color: centsColor }}>
                    {noteInfo ? `${noteInfo.cents > 0 ? '+' : ''}${noteInfo.cents}¢` : '0¢'}
                  </span>
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280]">+50¢ (sharp)</span>
                </div>
                <div className="relative h-3 bg-[#1E1E2E] rounded-full overflow-hidden">
                  {/* Color zones */}
                  <div className="absolute inset-0 flex">
                    <div className="w-[25%] bg-red-500/20" />
                    <div className="w-[25%] bg-yellow-500/20" />
                    <div className="w-[25%] bg-[#00E5CC]/20" />
                    <div className="w-[25%] bg-red-500/20" />
                  </div>
                  {/* Center line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#00E5CC]/60 -translate-x-1/2" />
                  {/* Needle */}
                  {noteInfo && (
                    <div
                      className="absolute top-0 bottom-0 w-1 rounded-full transition-all duration-100"
                      style={{
                        left: `${centsPosition}%`,
                        backgroundColor: centsColor,
                        boxShadow: `0 0 8px ${centsColor}`,
                      }}
                    />
                  )}
                </div>
                <div className="text-center mt-3">
                  <span className="font-['JetBrains_Mono',monospace] text-sm" style={{ color: centsColor }}>
                    {centsLabel}
                  </span>
                </div>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              {tunerState !== 'listening' ? (
                <button
                  onClick={startListening}
                  className="flex items-center gap-3 px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors"
                >
                  <Mic className="w-5 h-5" />
                  Start Listening
                </button>
              ) : (
                <button
                  onClick={stopListening}
                  className="flex items-center gap-3 px-8 py-4 bg-red-500/20 text-red-400 border border-red-500/30 font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-red-500/30 transition-colors"
                >
                  <MicOff className="w-5 h-5" />
                  Stop
                </button>
              )}

              <button
                onClick={toggleRefTone}
                className={`flex items-center gap-3 px-6 py-4 border font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl transition-colors ${
                  isPlayingRefTone
                    ? 'bg-[#00E5CC]/10 border-[#00E5CC] text-[#00E5CC]'
                    : 'bg-[#1E1E2E] border-[#2A2A3E] text-[#6B7280] hover:text-[#E8ECF0] hover:border-[#3A3A4E]'
                }`}
              >
                {isPlayingRefTone ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                {isPlayingRefTone ? `Stop ${a4Ref}Hz` : `Play ${a4Ref}Hz Tone`}
              </button>
            </div>

            {/* Status Indicator */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                tunerState === 'listening' ? 'bg-[#00E5CC] animate-pulse' : 
                tunerState === 'error' ? 'bg-red-500' : 'bg-[#6B7280]'
              }`} />
              <span className="font-['JetBrains_Mono',monospace] text-xs text-[#6B7280] uppercase tracking-wider">
                {tunerState === 'listening' ? 'Listening' : 
                 tunerState === 'error' ? 'Error' : 'Idle'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 lg:py-32 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#00E5CC] mb-4">Use Cases</p>
            <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-bold text-[#E8ECF0]">What Will You Tune?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Guitar</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Guitar Tuning</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Your guitar sounds off but you left your clip-on tuner at home. Tuning apps are filled with ads and require accounts.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Open this tuner, grant mic access, and instantly see which string is sharp or flat. Adjust until it&apos;s green — done in seconds.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Orchestra</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Orchestra Reference</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> Your orchestra tunes to A4=440Hz but your electronic tuner died mid-rehearsal.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Switch to reference tone mode and play 440Hz. The oboe plays, the section tunes. Or use the mic tuner to verify each player in real-time.</p>
              </div>
            </div>
            <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-2xl p-8">
              <span className="inline-block px-3 py-1 bg-[#00E5CC]/10 text-[#00E5CC] font-['JetBrains_Mono',monospace] text-xs uppercase rounded-md mb-4">Quick Check</span>
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#E8ECF0] mb-4">Quick Pitch Check</h3>
              <div className="space-y-3 text-[#6B7280]">
                <p><span className="text-[#6B7280]">Before:</span> You need to verify if your instrument is in tune before a gig, but there&apos;s no time to set up hardware.</p>
                <p><span className="text-[#E8ECF0]">After:</span> Pull out your phone, open the browser, start the tuner. Check each note in under a minute. No apps to install.</p>
              </div>
            </div>
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
            Start Tuning Now
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-lg mx-auto">
            The tool is free, works in your browser, and runs on any device with a microphone.
          </p>
          <a href="#audio-tool" className="inline-flex items-center px-8 py-4 bg-[#00E5CC] text-[#08080F] font-['Space_Grotesk',sans-serif] font-semibold text-base rounded-xl hover:bg-[#00E5CC]/90 transition-colors">
            Open Instrument Tuner
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
