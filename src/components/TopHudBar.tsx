import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Compass, X } from 'lucide-react';

interface TopHudBarProps {
  currentAct: number;
  totalActs: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onSelectAct: (act: number) => void;
}

const ACT_LABELS = [
  { num: 1, numeral: 'I', title: 'The Invitation', sub: 'Pembuka' },
  { num: 2, numeral: 'II', title: 'Velvet Rose Sanctuary', sub: '29 Tahun Kasih Karunia' },
  { num: 3, numeral: 'III', title: 'When Our Worlds Met', sub: 'SMAN 4 • OSN • UI • Pernikahan' },
  { num: 4, numeral: 'IV', title: 'Memory Constellation', sub: 'Galeri Bintang & Potret' },
  { num: 5, numeral: 'V', title: 'About My Boss', sub: 'Hal yang Kukagumi Darimu' },
  { num: 6, numeral: 'VI', title: 'The Sacred Letter', sub: 'Surat Cinta & Amsal 3:5-6' },
  { num: 7, numeral: 'VII', title: 'Make a 29th Wish', sub: 'Lilin Doa Ulang Tahun' },
  { num: 8, numeral: 'VIII', title: 'One Last Surprise', sub: '5 Janji & Doa Suami' },
  { num: 9, numeral: 'IX', title: 'Forever, My Love', sub: 'Penutup Abadi' },
];

export const TopHudBar: React.FC<TopHudBarProps> = ({
  currentAct,
  isMuted,
  onToggleMute,
  onSelectAct,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentMeta = ACT_LABELS.find((a) => a.num === currentAct) || ACT_LABELS[0];

  return (
    <>
      <header className="hud-header" aria-label="Navigasi Pengalaman Sinematik">
        <div className="hud-brand">
          <Sparkles className="hud-icon-gold" size={15} />
          <span className="hud-brand-text">MY LOVE • NATASHA ROSALINE</span>
        </div>

        <div className="hud-center-indicator">
          <span className="hud-act-pill">
            ACT {currentMeta.numeral} / IX — {currentMeta.title}
          </span>
        </div>

        <div className="hud-controls">
          <button
            type="button"
            className="hud-btn"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Nyalakan Musik Piano & Cello' : 'Bisukan Musik'}
            title={isMuted ? 'Nyalakan Musik' : 'Bisukan Musik'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span className="hud-btn-label">{isMuted ? 'Muted' : 'Piano & Cello'}</span>
          </button>

          {currentAct > 1 && (
            <button
              type="button"
              className="hud-btn hud-btn-chapters"
              onClick={() => setDrawerOpen(true)}
              aria-label="Pilih Babak Cerita"
            >
              <Compass size={16} />
              <span className="hud-btn-label">Babak</span>
            </button>
          )}
        </div>
      </header>

      {drawerOpen && (
        <div
          className="chapter-drawer-backdrop"
          onClick={() => setDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Daftar Babak Cerita"
        >
          <div className="chapter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="chapter-drawer-header">
              <div>
                <p className="chapter-drawer-eyebrow">CHAPTER SELECTION</p>
                <h3 className="chapter-drawer-title">Perjalanan Cinta Kita</h3>
              </div>
              <button
                type="button"
                className="hud-btn-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Tutup daftar babak"
              >
                <X size={18} />
              </button>
            </div>

            <div className="chapter-list">
              {ACT_LABELS.map((item) => {
                const active = item.num === currentAct;
                return (
                  <button
                    key={item.num}
                    type="button"
                    className={`chapter-list-item ${active ? 'is-active' : ''}`}
                    onClick={() => {
                      onSelectAct(item.num);
                      setDrawerOpen(false);
                    }}
                  >
                    <span className="chapter-numeral">ACT {item.numeral}</span>
                    <div className="chapter-info">
                      <span className="chapter-name">{item.title}</span>
                      <span className="chapter-sub">{item.sub}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
