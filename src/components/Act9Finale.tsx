import React from 'react';
import { RotateCcw, BookHeart, Sparkles, Compass } from 'lucide-react';
import { STORY_CONTENT } from '../data/storyContent';

interface Act9FinaleProps {
  onReplayAll: () => void;
  onJumpToAct: (act: number) => void;
}

export const Act9Finale: React.FC<Act9FinaleProps> = ({
  onReplayAll,
  onJumpToAct,
}) => {
  const { act9Finale, portraits, recipient, husband, act6Letter } = STORY_CONTENT;

  return (
    <section className="act-section act-finale" aria-labelledby="act9-title">
      <div className="act-container finale-container">
        <p className="act-eyebrow">{act9Finale.eyebrowEn}</p>

        {/* Dual Solo Portrait Keepsake Frame */}
        <div className="finale-portraits-duo">
          <div className="finale-portrait-card primary-duo">
            <img
              src={portraits.heroCandlelightRose}
              alt="Natasha Rosaline dengan mawar merah dan lilin"
              loading="lazy"
              width={400}
              height={520}
            />
          </div>
          <div className="finale-portrait-card secondary-duo">
            <img
              src={portraits.warmSmile}
              alt="Senyum hangat Natasha Rosaline"
              loading="lazy"
              width={400}
              height={430}
            />
          </div>
        </div>

        <h2 id="act9-title" className="finale-recipient-title">
          Happy 29th Birthday, {recipient.fullName}
        </h2>

        <div className="finale-dedication-lines">
          {act9Finale.closingLines.map((line, idx) => (
            <p key={idx} className={`finale-line finale-line-${idx + 1}`}>
              {line}
            </p>
          ))}
        </div>

        <div className="finale-verse-Echo">
          <p className="finale-verse-quote">{act6Letter.scripture.verseText}</p>
          <span className="finale-verse-ref">— {act6Letter.scripture.reference}</span>
        </div>

        <div className="finale-signature-seal">
          <Sparkles size={16} className="gold-text" />
          <span>{act9Finale.finalTimestamp}</span>
          <span className="finale-husband-credit">
            With all my love, {husband.fullName} ({husband.shortName})
          </span>
        </div>

        <div className="finale-replay-actions">
          <button type="button" className="btn-gold-primary" onClick={onReplayAll}>
            <RotateCcw size={17} />
            <span>Putar Ulang Dari Awal</span>
          </button>

          <button
            type="button"
            className="btn-gold-outline"
            onClick={() => onJumpToAct(6)}
          >
            <BookHeart size={17} />
            <span>Baca Kembali Surat Cinta</span>
          </button>

          <button
            type="button"
            className="btn-velvet-secondary"
            onClick={() => onJumpToAct(4)}
          >
            <Compass size={17} />
            <span>Lihat Galeri Konstelasi</span>
          </button>
        </div>
      </div>
    </section>
  );
};
