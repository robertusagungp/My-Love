import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { STORY_CONTENT } from '../data/storyContent';

interface Act2SanctuaryProps {
  onNext: () => void;
  onChime: () => void;
}

export const Act2Sanctuary: React.FC<Act2SanctuaryProps> = ({ onNext, onChime }) => {
  const { act2Sanctuary, recipient, portraits } = STORY_CONTENT;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [blessingRevealed, setBlessingRevealed] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="act-section act-sanctuary" aria-labelledby="act2-title">
      <div className="act-container">
        <div className="sanctuary-header">
          <span className="gold-pill-badge">{act2Sanctuary.dedicationBadge}</span>
          <p className="act-eyebrow">{act2Sanctuary.eyebrowEn}</p>
          <h2 id="act2-title" className="act-headline">
            {act2Sanctuary.headlineEn}
          </h2>
          <p className="sanctuary-recipient-display">{recipient.fullName}</p>
        </div>

        <div className="sanctuary-grid">
          {/* Interactive 3D Parallax Candlelight Rose Portrait */}
          <div
            className="sanctuary-portrait-stage"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onClick={() => {
              setBlessingRevealed((prev) => !prev);
              onChime();
            }}
            role="button"
            tabIndex={0}
            aria-label="Sentuh potret Natasha untuk melihat pesan rahasia"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setBlessingRevealed((prev) => !prev);
                onChime();
              }
            }}
          >
            <div
              className="portrait-velvet-frame"
              style={{
                transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              }}
            >
              <div className="portrait-gold-corner top-left" />
              <div className="portrait-gold-corner top-right" />
              <div className="portrait-gold-corner bottom-left" />
              <div className="portrait-gold-corner bottom-right" />

              <img
                src={portraits.heroCandlelightRose}
                alt="Natasha Rosaline memegang mawar merah di dekat nyala lilin"
                className="sanctuary-hero-img"
                fetchPriority="high"
                width={600}
                height={800}
              />

              <div className="portrait-candle-overlay" />

              <div className="portrait-caption-bar">
                <Sparkles size={14} className="gold-text" />
                <span>Sentuh potret untuk membuka bisikan hati</span>
              </div>
            </div>
          </div>

          {/* Poetic & Mathematical Dedication Column */}
          <div className="sanctuary-story-column">
            <div className="math-formula-card">
              <span className="math-formula-label">THE EQUATION OF GRACE • OSN &amp; UI</span>
              <code className="math-formula-code">
                {act2Sanctuary.mathematicalPoeticNote}
              </code>
              <span className="math-formula-sub">
                “Untuk setiap waktu dalam hidupku, rasa syukurku memilikimu mendekati tak hingga.”
              </span>
            </div>

            <p className="sanctuary-lead-paragraph">{act2Sanctuary.subtitleId}</p>

            <blockquote className="sanctuary-quote-box">
              <p>{act2Sanctuary.portraitCaption}</p>
            </blockquote>

            {blessingRevealed && (
              <div className="secret-whisper-card">
                <Heart size={16} className="gold-text" />
                <p>
                  <strong>Catatan Kecil untuk Boss:</strong> Di foto ini, mawar merah di tanganmu, cahaya lilin di sampingmu, dan kalung salib di lehermu merangkum seluruh keindahan dirimu—anggun, hangat, dan selalu dekat dengan Tuhan Yesus.
                </p>
              </div>
            )}

            <div className="act-nav-Action">
              <button type="button" className="btn-gold-primary" onClick={onNext}>
                <span>Telusuri Kisah Kita (Act III)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
