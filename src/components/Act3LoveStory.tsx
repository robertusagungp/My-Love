import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Laugh, HeartHandshake } from 'lucide-react';
import { STORY_CONTENT } from '../data/storyContent';

interface Act3LoveStoryProps {
  onNext: () => void;
  onPrev: () => void;
  onChime: () => void;
}

export const Act3LoveStory: React.FC<Act3LoveStoryProps> = ({
  onNext,
  onPrev,
  onChime,
}) => {
  const { act3LoveStory } = STORY_CONTENT;
  const [activeIndex, setActiveIndex] = useState(0);
  const milestones = act3LoveStory.milestones;
  const activeMilestone = milestones[activeIndex];

  const handleSelectMilestone = (idx: number) => {
    setActiveIndex(idx);
    onChime();
  };

  return (
    <section className="act-section act-lovestory" aria-labelledby="act3-title">
      <div className="act-container">
        <div className="act-header-center">
          <p className="act-eyebrow">{act3LoveStory.eyebrowEn}</p>
          <h2 id="act3-title" className="act-headline">
            {act3LoveStory.headlineEn}
          </h2>
          <p className="act-subtitle">{act3LoveStory.introId}</p>
        </div>

        {/* Interactive Constellation Timeline Selector */}
        <div className="milestone-Equation-ribbon" role="tablist" aria-label="Babak Perjalanan Cinta">
          {milestones.map((m, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`milestone-node-btn ${isSelected ? 'is-selected' : ''} ${
                  m.isPlayful ? 'is-playful-node' : ''
                }`}
                onClick={() => handleSelectMilestone(idx)}
              >
                <span className="milestone-math-symbol">{m.mathSymbol}</span>
                <span className="milestone-node-era">{m.era}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Active Chapter Cinema Card */}
        <article
          key={activeMilestone.id}
          className={`milestone-cinema-card ${
            activeMilestone.isPlayful ? 'milestone-card-playful' : ''
          }`}
        >
          <div className="milestone-card-top">
            <span className="milestone-chapter-code">{activeMilestone.chapterCode}</span>
            <span className="milestone-equation-tag">
              {activeMilestone.mathSymbol} • {activeMilestone.equationLabel}
            </span>
          </div>

          <h3 className="milestone-title-id">{activeMilestone.titleId}</h3>
          <p className="milestone-title-en">{activeMilestone.titleEn}</p>

          <p className="milestone-narrative">{activeMilestone.narrative}</p>

          <div className="milestone-highlight-box">
            {activeMilestone.isPlayful ? (
              <Laugh size={20} className="gold-text shrink-0" />
            ) : (
              <HeartHandshake size={20} className="gold-text shrink-0" />
            )}
            <p>{activeMilestone.highlightQuote}</p>
          </div>

          <div className="milestone-step-controls">
            <button
              type="button"
              className="btn-velvet-secondary"
              disabled={activeIndex === 0}
              onClick={() => handleSelectMilestone(Math.max(0, activeIndex - 1))}
            >
              <ArrowLeft size={16} />
              <span>Bab Sebelumnya</span>
            </button>

            <span className="milestone-counter">
              {activeIndex + 1} / {milestones.length}
            </span>

            {activeIndex < milestones.length - 1 ? (
              <button
                type="button"
                className="btn-gold-outline"
                onClick={() => handleSelectMilestone(activeIndex + 1)}
              >
                <span>Bab Selanjutnya</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button type="button" className="btn-gold-primary" onClick={onNext}>
                <Sparkles size={16} />
                <span>Buka Konstelasi Kenangan (Act IV)</span>
              </button>
            )}
          </div>
        </article>

        <div className="act-bottom-bar">
          <button type="button" className="btn-text-subtle" onClick={onPrev}>
            ← Kembali ke Act II
          </button>
          <button type="button" className="btn-text-gold" onClick={onNext}>
            Lanjut ke Act IV →
          </button>
        </div>
      </div>
    </section>
  );
};
