import React, { useState } from 'react';
import { Sparkles, LockOpen, ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import { STORY_CONTENT } from '../data/storyContent';

interface Act8SurpriseProps {
  onNext: () => void;
  onPrev: () => void;
  onChime: () => void;
}

export const Act8Surprise: React.FC<Act8SurpriseProps> = ({
  onNext,
  onPrev,
  onChime,
}) => {
  const { act8Surprise } = STORY_CONTENT;
  const [unsealed, setUnsealed] = useState(false);

  const handleUnseal = () => {
    setUnsealed(true);
    onChime();
  };

  return (
    <section className="act-section act-surprise" aria-labelledby="act8-title">
      <div className="act-container">
        <div className="act-header-center">
          <p className="act-eyebrow">{act8Surprise.eyebrowEn}</p>
          <h2 id="act8-title" className="act-headline">
            {act8Surprise.headlineEn}
          </h2>
          <p className="act-subtitle">{act8Surprise.introText}</p>
        </div>

        {!unsealed ? (
          <div className="wax-envelope-stage">
            <div className="velvet-sealed-envelope">
              <span className="envelope-top-tag">{act8Surprise.envelopeLabel}</span>
              <h3 className="envelope-recipient">
                Untuk Istriku Tercinta, Natasha Rosaline
              </h3>
              <p className="envelope-desc">
                Sentuh segel emas di bawah ini untuk membuka 5 Janji Suami &amp; Doa Pernikahan di usia ke-29.
              </p>

              <button
                type="button"
                className="wax-seal-btn"
                onClick={handleUnseal}
                aria-label="Buka Segel Kapsul Janji dan Doa"
              >
                <span className="wax-seal-monogram">R ♥ N</span>
                <span className="wax-seal-sub">BUKA SEGEL</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="covenant-capsule-revealed">
            <div className="promises-list-grid">
              {act8Surprise.promises.map((item) => (
                <article key={item.id} className="promise-velvet-item">
                  <div className="promise-roman-badge">{item.numberRoman}</div>
                  <div className="promise-content">
                    <h3 className="promise-title">{item.title}</h3>
                    <p className="promise-text">{item.promise}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="husband-prayer-card">
              <div className="prayer-card-header">
                <LockOpen size={16} className="gold-text" />
                <span>DOA SUAMI UNTUK USIA KE-29 NATASHA</span>
              </div>
              <p className="prayer-body-text">{act8Surprise.specialPrayer}</p>
              <div className="prayer-footer">
                <Heart size={14} className="gold-text" />
                <span>10 Agustus 2024 — Selamanya Dalam Kasih Tuhan Yesus</span>
              </div>
            </div>

            <div className="act-bottom-cta">
              <button type="button" className="btn-velvet-secondary" onClick={onPrev}>
                <ArrowLeft size={16} />
                <span>Act VII</span>
              </button>

              <button type="button" className="btn-gold-primary" onClick={onNext}>
                <Sparkles size={18} />
                <span>Menuju Penutup Abadi (Act IX)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
