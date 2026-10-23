import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Mic, ArrowRight, ArrowLeft, Flame } from 'lucide-react';
import { STORY_CONTENT } from '../data/storyContent';

interface Act7MakeAWishProps {
  wishGranted: boolean;
  onGrantWish: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Act7MakeAWish: React.FC<Act7MakeAWishProps> = ({
  wishGranted,
  onGrantWish,
  onNext,
  onPrev,
}) => {
  const { act7Wish } = STORY_CONTENT;
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const stopMicListener = () => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((t) => t.stop());
      audioStreamRef.current = null;
    }
    setMicActive(false);
  };

  useEffect(() => {
    return () => {
      stopMicListener();
    };
  }, []);

  const handleEnableMicBlow = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      setMicActive(true);

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);

      const checkBlow = () => {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < 25; i++) {
          sum += data[i];
        }
        const avgLowFreq = sum / 25;
        if (avgLowFreq > 95) {
          stopMicListener();
          ctx.close().catch(() => {});
          onGrantWish();
          return;
        }
        rafRef.current = window.requestAnimationFrame(checkBlow);
      };

      rafRef.current = window.requestAnimationFrame(checkBlow);
    } catch {
      setMicError('Mikrofon tidak diizinkan—silakan sentuh langsung nyala lilin di atas.');
      setMicActive(false);
    }
  };

  return (
    <section className="act-section act-wish" aria-labelledby="act7-title">
      <div className="act-container wish-container">
        <div className="act-header-center">
          <p className="act-eyebrow">{act7Wish.eyebrowEn}</p>
          <h2 id="act7-title" className="act-headline">
            {wishGranted ? act7Wish.afterWishHeadline : act7Wish.headlineEn}
          </h2>
        </div>

        <div className={`wish-sanctuary-stage ${wishGranted ? 'is-celebrating' : ''}`}>
          {/* 29th Birthday Sacred Candle & Starburst */}
          <div className="birthday-candle-sculpture">
            <div className="twenty-nine-ring" aria-hidden="true">
              <span className="ring-number">29</span>
            </div>

            <button
              type="button"
              className={`interactive-candle-btn ${wishGranted ? 'is-blown' : ''}`}
              onClick={() => {
                if (!wishGranted) {
                  stopMicListener();
                  onGrantWish();
                }
              }}
              aria-label="Sentuh lilin ulang tahun ke-29 untuk Make a Wish"
            >
              {!wishGranted ? (
                <div className="wish-flame-assembly">
                  <div className="wish-flame-aura" />
                  <div className="wish-flame-core" />
                  <span className="wish-tap-hint">SENTUH CAHAYA LILIN</span>
                </div>
              ) : (
                <div className="wish-starburst-emblem">
                  <Sparkles size={38} className="gold-text" />
                  <span className="wish-granted-badge">AMEN • DOA TERLANGITKAN</span>
                </div>
              )}

              <div className="candle-pillar-body">
                <span className="candle-pillar-engraving">NATASHA • XXIX</span>
              </div>
            </button>
          </div>

          {!wishGranted ? (
            <div className="wish-guidance-box">
              {act7Wish.guidanceSteps.map((step, idx) => (
                <p key={idx} className="wish-step-line">
                  {step}
                </p>
              ))}

              <div className="wish-action-buttons">
                <button
                  type="button"
                  className="btn-gold-primary"
                  onClick={() => {
                    stopMicListener();
                    onGrantWish();
                  }}
                >
                  <Flame size={18} />
                  <span>{act7Wish.buttonPrompt}</span>
                </button>

                {!micActive ? (
                  <button
                    type="button"
                    className="btn-velvet-secondary"
                    onClick={handleEnableMicBlow}
                  >
                    <Mic size={16} />
                    <span>{act7Wish.micPromptOptional}</span>
                  </button>
                ) : (
                  <p className="mic-listening-pill">
                    🎙️ Silakan tiup lembut ke arah layar HP sekarang...
                  </p>
                )}

                {micError && <p className="mic-error-note">{micError}</p>}
              </div>
            </div>
          ) : (
            <div className="wish-celebration-message">
              <p className="wish-blessing-paragraph">{act7Wish.afterWishBlessing}</p>

              <div className="scripture-mini-blessing">
                <p>
                  “TUHAN memberkati engkau dan melindungi engkau; TUHAN menyinari engkau dengan wajah-Nya dan memberi engkau kasih karunia; TUHAN menghadapkan wajah-Nya kepadamu dan memberi engkau damai sejahtera.”
                </p>
                <span>— Bilangan 6 : 24–26</span>
              </div>

              <button type="button" className="btn-gold-primary" onClick={onNext}>
                <Sparkles size={18} />
                <span>Buka Kejutan Terakhir (Act VIII)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="act-bottom-bar">
          <button type="button" className="btn-text-subtle" onClick={onPrev}>
            <ArrowLeft size={14} /> Kembali ke Surat (Act VI)
          </button>
          {wishGranted && (
            <button type="button" className="btn-text-gold" onClick={onNext}>
              Lanjut ke Act VIII →
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
