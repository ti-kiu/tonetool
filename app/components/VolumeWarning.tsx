'use client';

import { useState, useEffect, useCallback } from 'react';

interface VolumeWarningProps {
  frequency: number;
  volume: number;
  isPlaying: boolean;
  onVolumeChange?: (volume: number) => void;
}

const VOLUME_WARNING_KEY = 'tonegen_volume_warning_dismissed';
const HIGH_FREQ_WARNING_KEY = 'tonegen_highfreq_warning_dismissed';

export default function VolumeWarning({ 
  frequency, 
  volume, 
  isPlaying,
  onVolumeChange 
}: VolumeWarningProps) {
  const [showVolumeWarning, setShowVolumeWarning] = useState(false);
  const [showHighFreqWarning, setShowHighFreqWarning] = useState(false);
  const [volumeDismissed, setVolumeDismissed] = useState(false);
  const [highFreqDismissed, setHighFreqDismissed] = useState(false);

  useEffect(() => {
    setVolumeDismissed(localStorage.getItem(VOLUME_WARNING_KEY) === 'true');
    setHighFreqDismissed(localStorage.getItem(HIGH_FREQ_WARNING_KEY) === 'true');
  }, []);

  // Volume warning: show when volume > 70% and playing
  useEffect(() => {
    if (isPlaying && volume > 0.7 && !volumeDismissed) {
      setShowVolumeWarning(true);
    } else {
      setShowVolumeWarning(false);
    }
  }, [isPlaying, volume, volumeDismissed]);

  // High frequency warning: show when frequency > 15000Hz and playing
  useEffect(() => {
    if (isPlaying && frequency > 15000 && !highFreqDismissed) {
      setShowHighFreqWarning(true);
    } else {
      setShowHighFreqWarning(false);
    }
  }, [isPlaying, frequency, highFreqDismissed]);

  const dismissVolumeWarning = useCallback(() => {
    localStorage.setItem(VOLUME_WARNING_KEY, 'true');
    setVolumeDismissed(true);
    setShowVolumeWarning(false);
  }, []);

  const dismissHighFreqWarning = useCallback(() => {
    localStorage.setItem(HIGH_FREQ_WARNING_KEY, 'true');
    setHighFreqDismissed(true);
    setShowHighFreqWarning(false);
  }, []);

  const handleReduceVolume = useCallback(() => {
    onVolumeChange?.(0.5);
    dismissVolumeWarning();
  }, [onVolumeChange, dismissVolumeWarning]);

  return (
    <>
      {/* Volume Warning */}
      {showVolumeWarning && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3 max-w-4xl mx-auto">
            <div className="text-amber-400 mt-0.5">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-amber-400 font-semibold mb-1">High Volume Warning</h4>
              <p className="text-amber-200/80 text-sm mb-3">
                You are playing audio at high volume ({Math.round(volume * 100)}%). 
                Prolonged exposure to loud sounds can cause permanent hearing damage. 
                We recommend keeping volume below 50% for extended listening.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleReduceVolume}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black text-sm font-medium rounded-lg transition"
                >
                  Reduce to 50%
                </button>
                <button
                  onClick={dismissVolumeWarning}
                  className="px-4 py-2 text-amber-400 hover:text-amber-300 text-sm transition"
                >
                  I understand the risk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* High Frequency Warning */}
      {showHighFreqWarning && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3 max-w-4xl mx-auto">
            <div className="text-red-400 mt-0.5">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-red-400 font-semibold mb-1">High Frequency Warning</h4>
              <p className="text-red-200/80 text-sm mb-3">
                You are playing a very high frequency tone ({frequency.toLocaleString()} Hz). 
                Frequencies above 15 kHz can be uncomfortable or harmful, especially at high volumes. 
                Not all speakers/headphones can accurately reproduce these frequencies.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={dismissHighFreqWarning}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition"
                >
                  I understand the risk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Hook for default volume enforcement
export function useDefaultVolume() {
  const [volume, setVolume] = useState(0.5); // Default 50%

  const safeSetVolume = useCallback((newVolume: number) => {
    // Clamp between 0 and 1
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolume(clamped);
  }, []);

  return { volume, setVolume: safeSetVolume };
}

// Hook for frequency warnings
export function useFrequencyWarning(frequency: number, isPlaying: boolean) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (isPlaying && frequency > 15000) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [isPlaying, frequency]);

  return showWarning;
}
