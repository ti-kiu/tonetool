/**
 * Generate a WAV file from a sine wave using OfflineAudioContext
 * Returns a Blob that can be downloaded
 */
export async function generateWavBlob(
  frequency: number,
  duration: number = 1,
  sampleRate: number = 44100
): Promise<Blob> {
  const numSamples = Math.floor(sampleRate * duration);
  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);

  const oscillator = offlineCtx.createOscillator();
  const gain = offlineCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gain.gain.value = 0.8;

  oscillator.connect(gain);
  gain.connect(offlineCtx.destination);

  oscillator.start();
  oscillator.stop(duration);

  const audioBuffer = await offlineCtx.startRendering();
  return audioBufferToWav(audioBuffer);
}

/**
 * Convert an AudioBuffer to a WAV Blob
 */
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;

  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;

  const data = buffer.getChannelData(0);
  const dataLength = data.length * bytesPerSample;
  const bufferLength = 44 + dataLength;

  const arrayBuffer = new ArrayBuffer(bufferLength);
  const view = new DataView(arrayBuffer);

  // WAV header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, bufferLength - 8, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // chunk size
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataLength, true);

  // Write samples
  let offset = 44;
  for (let i = 0; i < data.length; i++) {
    const sample = Math.max(-1, Math.min(1, data[i]));
    const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
    view.setInt16(offset, intSample, true);
    offset += 2;
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

/**
 * Trigger a download of a WAV file
 */
export async function downloadWav(
  frequency: number,
  duration: number = 1,
  filename?: string
): Promise<void> {
  const blob = await generateWavBlob(frequency, duration);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `${frequency}hz-${duration}s.wav`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
