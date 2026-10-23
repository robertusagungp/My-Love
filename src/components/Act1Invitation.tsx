import React from 'react';
import { Sparkles, Volume2 } from 'lucide-react';
import { STORY_CONTENT } from '../data/storyContent';

interface Act1InvitationProps {
  onBegin: () => void;
}

export const Act1Invitation: React.FC<Act1InvitationProps> = ({ onBegin }) => {
  const { act1Invitation, recipient, husband } = STORY_CONTENT;

  return (
    <section className="act-section act-invitation" aria-labelledby="act1-title">
      <div className="invitation-card">
        {/* Flickering Sacred Candlelight Emblem */}
        <div className="candle-emblem-wrapper" aria-hidden="true">
          <div className="candle-halo-outer" />
          <div className="candle-halo-inner" />
          <div className="candle-flame" />
          <div className="candle-wick" />
        </div>

        <p className="act-eyebrow">{act1Invitation.eyebrowEn}</p>

        <h1 id="act1-title" className="invitation-recipient-name">
          {recipient.fullName}
        </h1>

        <div className="invitation-greetings">
          {act1Invitation.greetingLines.map((line, idx) => (
            <p
              key={idx}
              className={`invitation-line invitation-line-${idx + 1}`}
            >
              {line}
            </p>
          ))}
        </div>

        <p className="invitation-subtext">{act1Invitation.subtext}</p>

        <div className="invitation-cta-group">
          <button
            type="button"
            className="btn-gold-primary btn-begin-story"
            onClick={onBegin}
          >
            <Sparkles size={18} />
            <span>{act1Invitation.ctaButtonLabel}</span>
          </button>

          <p className="invitation-audio-note">
            <Volume2 size={14} />
            <span>{act1Invitation.audioHint}</span>
          </p>
        </div>

        <div className="invitation-footer-signature">
          <span>A Handcrafted Digital Film by Your Husband, {husband.shortName}</span>
        </div>
      </div>
    </section>
  );
};
