// ==========================================
// SYNTHESIZED WEB AUDIO & HAPTICS SERVICE
// ==========================================

class AudioHapticsService {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private hapticsEnabled: boolean = true;

  constructor() {
    // Lazy initialize AudioContext on user gesture
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setHapticsEnabled(enabled: boolean) {
    this.hapticsEnabled = enabled;
  }

  private getAudioContext(): AudioContext | null {
    if (!this.soundEnabled) return null;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    } catch {
      return null;
    }
  }

  // 1. Tick Beep for 3-2-1 countdown (880Hz short beep)
  public playCountdownBeep() {
    if (this.hapticsEnabled && navigator.vibrate) {
      navigator.vibrate(50);
    }
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch tick

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 2. Rest Timer Finished Chime / Boxing Bell
  public playTimerCompleteChime() {
    if (this.hapticsEnabled && navigator.vibrate) {
      navigator.vibrate([150, 100, 250]);
    }
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      // Play 2-tone pleasant gym gong
      const notes = [587.33, 880]; // D5, A5
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1);

        const startTime = ctx.currentTime + index * 0.1;
        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.2);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 3. PR Fanfare sound
  public playPRSound() {
    if (this.hapticsEnabled && navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 300]);
    }
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const melody = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      melody.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);

        const startTime = ctx.currentTime + index * 0.12;
        const duration = index === melody.length - 1 ? 0.8 : 0.18;
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 4. Click / Stepper Haptic feedback
  public triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'success' = 'light') {
    if (!this.hapticsEnabled || !navigator.vibrate) return;
    try {
      if (type === 'light') navigator.vibrate(15);
      else if (type === 'medium') navigator.vibrate(30);
      else if (type === 'heavy') navigator.vibrate(60);
      else if (type === 'success') navigator.vibrate([30, 40, 60]);
    } catch {
      // Ignore vibration errors
    }
  }
}

export const audioService = new AudioHapticsService();
