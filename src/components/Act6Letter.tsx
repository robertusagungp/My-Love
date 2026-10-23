import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, ArrowLeft, Eye } from 'lucide-react';
import { STORY_CONTENT } from '../data/storyContent';

interface Act6LetterProps {
  onNext: () => void;
  onPrev: () => void;
  onChime: () => void;
}

export const Act6Letter: React.FC<Act6LetterProps> = ({
  onNext,
  onPrev,
  onChime,
}) => {
  const { act6Letter } = STORY_CONTENT;
  const totalParagraphs = act6Letter.paragraphs.length;
  const [visibleCount, setVisibleCount] = useState<number>(2);

  const allRevealed = visibleCount >= totalParagraphs;

  const handleRevealNext = () => {
    setVisibleCount((prev) => Math.min(totalParagraphs, prev + 1));
    onChime();
  };

  const handleRevealAll = () => {
    setVisibleCount(totalParagraphs);
    onChime();
  };

  return (
    <section className="act-section act-letter" aria-labelledby="act6-title">
      <div className="act-container letter-narrow-container">
        <div className="act-header-center">
          <p className="act-eyebrow">{act6Letter.eyebrowEn}</p>
          <h2 id="act6-title" className="act-headline">
            {act6Letter.headlineEn}
          </h2>
        </div>

        <article className="sacred-letter-parchment">
          <div className="letter-wax-crest" aria-hidden="true">
            <span>R &amp; N</span>
          </div>

          <div className="letter-top-meta">
            <span>23 OKTOBER 2026 • ULANG TAHUN KE-29</span>
            {!allRevealed && (
              <button
                type="button"
                className="btn-reveal-all-inline"
                onClick={handleRevealAll}
              >
                <Eye size={13} />
                <span>Tampilkan Seluruh Surat</span>
              </button>
            )}
          </div>

          <h3 className="letter-salutation">{act6Letter.salutation}</h3>

          <div className="letter-body-paragraphs">
            {act6Letter.paragraphs.slice(0, visibleCount).map((para, index) => (
              <p key={index} className="letter-paragraph">
                {para}
              </p>
            ))}
          </div>

          {!allRevealed ? (
            <div className="letter-progressive-control">
              <button
                type="button"
                className="btn-gold-outline"
                onClick={handleRevealNext}
              >
                <Sparkles size={16} />
                <span>
                  Lanjutkan Membaca ({visibleCount}/{totalParagraphs})
                </span>
              </button>
            </div>
          ) : (
            <div className="letter-climax-reveal">
              {/* Sacred Scripture Plaque — Amsal 3:5–6 */}
              <div className="scripture-gold-plaque">
                <div className="scripture-header">
                  <BookOpen size={17} className="gold-text" />
                  <span>FIRMAN PEGANGAN PERNIKAHAN KITA • {act6Letter.scripture.reference}</span>
                </div>
                <blockquote className="scripture-verse-text">
                  {act6Letter.scripture.verseText}
                </blockquote>
                <p className="scripture-reflection-note">
                  {act6Letter.scripture.reflectionNote}
                </p>
              </div>

              <div className="letter-signature-block">
                <p className="letter-closing-greeting">{act6Letter.closingGreeting}</p>
                <p className="letter-signature-handwritten">{act6Letter.signatureName}</p>
                <p className="letter-signature-role">{act6Letter.signatureRole}</p>
              </div>
            </div>
          )}
        </article>

        <div className="act-bottom-cta">
          <button type="button" className="btn-velvet-secondary" onClick={onPrev}>
            <ArrowLeft size={16} />
            <span>Act V</span>
          </button>

          <button type="button" className="btn-gold-primary" onClick={onNext}>
            <Sparkles size={18} />
            <span>Saatnya Make a Wish Ke-29 (Act VII)</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
