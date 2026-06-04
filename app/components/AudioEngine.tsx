'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import VolumeWarning from './VolumeWarning';

type Waveform = 'sine' | 'square' | 'triangle' | 'sawtooth';

export default function AudioEngine() {
  // Read initial values from URL
  const getInitialState = () => {
    if (typeof window === 'undefined') return { freq: 440, vol: 0.5, wave: 'sine' as Waveform };
    const params = new URLSearchParams(window.location.search);
    return {
      freq: Math.max(1, Math.min(20000, Number(params.get('f')) || 440)),
      vol: Math.max(0, Math.min(1, Number(params.get('v')) || 0.5)),
      wave: (['sine', 'square', 'triangle', 'sawtooth'].includes(params.get('w') || '')
        ? params.get('w')
        : 'sine') as Waveform,
    };
  };

  const initial = getInitialState();
  const [frequency, setFrequency] = useState(initial.freq);
  const [volume, setVolume] = useState(initial.vol);
  const [waveform, setWaveform] = useState<Waveform>(initial.wave);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  // Update URL when settings change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (frequency !== 440) params.set('f', String(frequency));
    if (volume !== 0.5) params.set('v', String(volume));
    if (waveform !== 'sine') params.set('w', waveform);
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [frequency, volume, waveform]);

  // Responsive canvas sizing
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = canvasContainerRef.current;
      if (!canvas || !container) return;
      
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = 120;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
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
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.width / dpr;
      const displayHeight = canvas.height / dpr;

      ctx.fillStyle = '#0f0f1a';
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();

      const sliceWidth = displayWidth / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * displayHeight) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(displayWidth, displayHeight / 2);
      ctx.stroke();
    };

    draw();
  }, []);

  const play = useCallback(async () => {
    // Create or get AudioContext synchronously inside user gesture
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;

    // Resume if suspended — must happen inside user gesture
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        // If resume fails, we can't play audio in this browser session
        return;
      }
    }

    // Stop existing
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Create analyser for visualization
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyserRef.current = analyser;

    // Create oscillator
    const osc = ctx.createOscillator();
    osc.type = waveform;
    osc.frequency.value = frequency;

    // Create gain node for volume
    const gain = ctx.createGain();
    gain.gain.value = volume;

    // Connect: osc -> gain -> analyser -> destination
    osc.connect(gain);
    gain.connect(analyser);
    analyser.connect(ctx.destination);

    // Start
    osc.start();

    oscillatorRef.current = osc;
    gainNodeRef.current = gain;
    setIsPlaying(true);

    // Start visualization
    drawWaveform();
  }, [frequency, volume, waveform, drawWaveform]);

  const stop = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = canvas.width / dpr;
        const displayHeight = canvas.height / dpr;
        ctx.fillStyle = '#0f0f1a';
        ctx.fillRect(0, 0, displayWidth, displayHeight);
      }
    }
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }, [isPlaying, play, stop]);

  // Update frequency in real-time
  useEffect(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.value = frequency;
    }
  }, [frequency]);

  // Update volume in real-time
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  // Update waveform in real-time
  useEffect(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.type = waveform;
    }
  }, [waveform]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setFrequency(f => Math.max(1, f - 10));
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setFrequency(f => Math.min(20000, f + 10));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Volume Warning */}
      <VolumeWarning
        frequency={frequency}
        volume={volume}
        isPlaying={isPlaying}
        onVolumeChange={setVolume}
      />

      {/* Waveform Visualization */}
      <div ref={canvasContainerRef} className="mb-6 rounded-xl overflow-hidden border border-[#1E1E2E] bg-[#0F0F1A]">
        <canvas
          ref={canvasRef}
          className="w-full h-[120px] block"
        />
      </div>

      {/* Frequency Display */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-[#E8ECF0] tabular-nums">
          {frequency.toLocaleString()}
        </div>
        <div className="text-[#6B7280] text-sm mt-1">Hz</div>
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

      {/* Waveform Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {(['sine', 'square', 'triangle', 'sawtooth'] as Waveform[]).map((w) => (
          <button
            key={w}
            onClick={() => setWaveform(w)}
            className={`py-2 px-4 rounded-lg text-sm font-medium transition ${
              waveform === w
                ? 'bg-[#00E5CC] text-[#08080F]'
                : 'bg-[#0F0F1A] text-[#6B7280] hover:bg-[#1E1E2E]'
            }`}
          >
            {w.charAt(0).toUpperCase() + w.slice(1)}
          </button>
        ))}
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

      {/* Play/Stop Button */}
      <button
        onClick={togglePlay}
        className={`w-full py-4 rounded-xl text-lg font-semibold transition ${
          isPlaying
            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
            : 'bg-[#00E5CC] text-[#08080F] hover:bg-[#00E5CC]/90'
        }`}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-4 text-center text-[#6B7280] text-xs">
        Space: Play/Stop • ← →: Adjust frequency
      </div>
    </div>
  );
}
