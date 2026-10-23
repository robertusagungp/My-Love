import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Crown, Heart } from 'lucide-react';
import { STORY_CONTENT } from '../data/storyContent';

interface Act5AdorationProps {
  onNext: () => void;
  onPrev: () => void;
  onChime: () => void;
}

export const Act5Adoration: React.FC<Act5AdorationProps> = ({
  onNext,
  onPrev,
  onChime,
}) => {
  const { act5Adoration } = STORY_CONTENT;
  const [expandedId, setExpandedId] = useState<string>(act5Adoration.qualities[0].id);

  return (
    <section className="act-section act-adoration" aria-labelledby="act5-title">
      <div className="act-container">
        <div className="act-header-center">
          <p className="act-eyebrow">{act5Adoration.eyebrowEn}</p>
          <h2 id="act5-title" className="act-headline">
            {act5Adoration.headlineEn}
          </h2>
          <p className="act-subtitle">{act5Adoration.subtitleId}</p>

          <div className="nickname-meter-pill">
            <span className="nickname-chip is-boss">
              <Crown size={14} /> 60% “Boss”
            </span>
            <span className="nickname-divider">•</span>
            <span className="nickname-chip is-sayang">
              <Heart size={14} /> 40% “Sayang”
            </span>
          </div>
        </div>

        <div className="adoration-cards-grid">
          {act5Adoration.qualities.map((q) => {
            const isExpanded = expandedId === q.id;
            return (
              <article
                key={q.id}
                className={`adoration-velvet-card ${isExpanded ? 'is-focused' : ''}`}
                onClick={() => {
                  setExpandedId(q.id);
                  onChime();
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setExpandedId(q.id);
                    onChime();
                  }
                }}
              >
                <div className="adoration-card-header">
                  <span className="adoration-badge">{q.badge}</span>
                  <span className={`adoration-tag tag-${q.nicknameTag.toLowerCase()}`}>
                    My {q.nicknameTag}
                  </span>
                </div>

                <h3 className="adoration-card-title">{q.title}</h3>
                <p className="adoration-card-desc">{q.description}</p>

                <div className="adoration-card-footer">
                  <Sparkles size={14} className="gold-text shrink-0" />
                  <span>{q.detailNote}</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="act-bottom-cta">
          <button type="button" className="btn-velvet-secondary" onClick={onPrev}>
            <ArrowLeft size={16} />
            <span>Kembali ke Act IV</span>
          </button>

          <button type="button" className="btn-gold-primary" onClick={onNext}>
            <span>Baca Surat Dari Hatiku (Act VI)</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
