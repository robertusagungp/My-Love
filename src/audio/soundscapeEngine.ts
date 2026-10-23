// Web Audio API Synthesized Grand Piano & Warm Cello/Strings Soundscape Engine
// Designed specifically for "MY LOVE — Natasha Rosaline"
// Evolves dynamically across Acts I–IX and respects browser autoplay policies.

export type EmotionalActMood =
  | 'invitation'
  | 'wonder'
  | 'nostalgia'
  | 'constellation'
  | 'adoration'
  | 'letter'
  | 'wish'
  | 'celebration'
  | 'finale';

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.65;
  private currentMood: EmotionalActMood = 'invitation';
  private loopTimer: number | null = null;
  private stepIndex = 0;

  // D Major / B Minor Romantic Sacred Progression Frequencies (Hz)
  // Chord progression: Dmaj7 -> A/C# -> Bm7 -> F#m7 -> Gmaj7 -> D/F# -> Em7 -> Asus4/A
  private readonly chords: Array<{ bass: number; cello: number; notes: number[] }> = [
    { bass: 73.42, cello: 146.83, notes: [293.66, 369.99, 440.0, 554.37, 587.33] }, // Dmaj7
    { bass: 69.3, cello: 138.59, notes: [277.18, 329.63, 440.0, 554.37, 659.25] }, // A/C#
    { bass: 61.74, cello: 123.47, notes: [246.94, 293.66, 369.99, 440.0, 587.33] }, // Bm7
    { bass: 92.5, cello: 185.0, notes: [277.18, 369.99, 440.0, 554.37, 659.25] }, // F#m7
    { bass: 98.0, cello: 196.0, notes: [246.94, 293.66, 392.0, 493.88, 587.33] }, // Gmaj7
    { bass: 92.5, cello: 185.0, notes: [293.66, 369.99, 440.0, 587.33, 739.99] }, // D/F#
    { bass: 82.41, cello: 164.81, notes: [246.94, 329.63, 392.0, 493.88, 659.25] }, // Em7
    { bass: 110.0, cello: 220.0, notes: [293.66, 329.63, 440.0, 554.37, 659.25] }, // Asus4 -> A
  ];

  private readonly melodyPatterns: Record<EmotionalActMood, number[]> = {
    invitation: [0, 2, 4, 2],
    wonder: [0, 1, 2, 4, 3, 2, 1, 4],
    nostalgia: [0, 2, 1, 3, 2, 4, 3, 1],
    constellation: [4, 2, 3, 1, 4, 3, 2, 0],
    adoration: [0, 1, 3, 2, 4, 2, 3, 4],
    letter: [0, 2, 3, 1, 0, 3, 2, 4],
    wish: [0, 2, 4, 3],
    celebration: [0, 2, 3, 4, 2, 4, 3, 4],
    finale: [4, 3, 2, 1, 0, 2, 1, 0],
  };

  public async initAndPlay(): Promise<boolean> {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);

        this.reverbNode = this.createWarmConcertHallReverb(this.ctx);
        this.reverbNode.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      if (this.masterGain && this.ctx) {
        const target = this.isMuted ? 0.0001 : this.volume;
        this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.8);
      }

      if (!this.isPlaying) {
        this.isPlaying = true;
        this.startLoop();
      }
      return true;
    } catch {
      return false;
    }
  }

  private createWarmConcertHallReverb(ctx: AudioContext): ConvolverNode {
    const convolver = ctx.createConvolver();
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * 2.8);
    const impulse = ctx.createBuffer(2, length, rate);

    for (let ch = 0; ch < 2; ch++) {
      const channelData = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const decay = Math.pow(1 - i / length, 2.4);
        channelData[i] = (Math.random() * 2 - 1) * decay * 0.35;
      }
    }
    convolver.buffer = impulse;
    return convolver;
  }

  private startLoop(): void {
    if (this.loopTimer) {
      window.clearInterval(this.loopTimer);
    }

    const tick = () => {
      if (!this.isPlaying || !this.ctx || this.isMuted) return;

      const chordIdx = Math.floor(this.stepIndex / 8) % this.chords.length;
      const beatInBar = this.stepIndex % 8;
      const chord = this.chords[chordIdx];
      const pattern = this.melodyPatterns[this.currentMood] || this.melodyPatterns.wonder;

      // Play warm cello & bass pad at the start of every bar (beat 0) and gentle swell at beat 4
      if (beatInBar === 0) {
        this.playWarmCelloPad(chord.bass, chord.cello, this.currentMood === 'celebration' ? 4.2 : 3.8);
      }

      // Play Grand Piano notes based on mood pacing
      if (this.currentMood === 'invitation' || this.currentMood === 'wish') {
        if (beatInBar % 2 === 0) {
          const noteIdx = pattern[(beatInBar / 2) % pattern.length];
          this.playGrandPianoNote(chord.notes[noteIdx], 0.14, 2.4);
        }
      } else if (this.currentMood === 'letter') {
        if (beatInBar === 0 || beatInBar === 3 || beatInBar === 5) {
          const noteIdx = pattern[beatInBar % pattern.length];
          this.playGrandPianoNote(chord.notes[noteIdx], 0.16, 2.8);
        }
      } else if (this.currentMood === 'celebration') {
        const noteIdx = pattern[beatInBar % pattern.length];
        this.playGrandPianoNote(chord.notes[noteIdx], 0.2, 2.1);
        if (beatInBar % 2 === 1) {
          // Add sparkling octave overtone
          this.playGrandPianoNote(chord.notes[noteIdx] * 2, 0.08, 1.6);
        }
      } else {
        const noteIdx = pattern[beatInBar % pattern.length];
        this.playGrandPianoNote(chord.notes[noteIdx], 0.16, 2.2);
      }

      this.stepIndex++;
    };

    tick();
    this.loopTimer = window.setInterval(tick, 560);
  }

  private playGrandPianoNote(freq: number, velocity: number, duration: number): void {
    if (!this.ctx || !this.masterGain || !this.reverbNode) return;
    const now = this.ctx.currentTime;

    // Warm acoustic piano synthesis using triangle + sine + soft harmonic overtone + lowpass filter
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.5, now);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.4, now + duration);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(velocity, now + 0.025);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.35, now + 0.35);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(velocity * 0.2, now);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.5);

    osc1.connect(filter);
    osc2.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(noteGain);

    noteGain.connect(this.masterGain);
    noteGain.connect(this.reverbNode);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
  }

  private playWarmCelloPad(bassFreq: number, celloFreq: number, duration: number): void {
    if (!this.ctx || !this.masterGain || !this.reverbNode) return;
    const now = this.ctx.currentTime;

    const bassOsc = this.ctx.createOscillator();
    const celloOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const padGain = this.ctx.createGain();

    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(bassFreq, now);

    celloOsc.type = 'sawtooth';
    celloOsc.frequency.setValueAtTime(celloFreq, now);

    // Warm string body lowpass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(340, now);
    filter.Q.setValueAtTime(1.2, now);

    const peakGain = this.currentMood === 'celebration' ? 0.12 : 0.085;
    padGain.gain.setValueAtTime(0.0001, now);
    padGain.gain.linearRampToValueAtTime(peakGain, now + 0.95);
    padGain.gain.setValueAtTime(peakGain * 0.85, now + duration * 0.6);
    padGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    bassOsc.connect(filter);
    celloOsc.connect(filter);
    filter.connect(padGain);

    padGain.connect(this.masterGain);
    padGain.connect(this.reverbNode);

    bassOsc.start(now);
    celloOsc.start(now);
    bassOsc.stop(now + duration + 0.1);
    celloOsc.stop(now + duration + 0.1);
  }

  public playInteractionChime(variant: 'soft' | 'star' | 'celebration' = 'soft'): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    if (this.ctx.state === 'suspended') return;

    if (variant === 'celebration') {
      // Magical 29th Birthday Wish harp/piano arpeggio
      const celebrationNotes = [293.66, 369.99, 440.0, 554.37, 587.33, 739.99, 880.0, 1174.66];
      celebrationNotes.forEach((n, idx) => {
        window.setTimeout(() => {
          this.playGrandPianoNote(n, 0.2, 3.0);
        }, idx * 95);
      });
      return;
    }

    if (variant === 'star') {
      this.playGrandPianoNote(880.0, 0.11, 1.8);
      window.setTimeout(() => this.playGrandPianoNote(1174.66, 0.09, 2.0), 110);
      return;
    }

    this.playGrandPianoNote(587.33, 0.09, 1.4);
  }

  public setMood(mood: EmotionalActMood): void {
    this.currentMood = mood;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      const target = this.isMuted ? 0.0001 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.25);
    }
    return this.isMuted;
  }

  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.2);
    }
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      mood: this.currentMood,
    };
  }

  public dispose(): void {
    if (this.loopTimer) {
      window.clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
    this.isPlaying = false;
  }
}

export const soundscape = new SoundscapeEngine();
