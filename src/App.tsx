import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SanctuaryCanvas } from './components/SanctuaryCanvas';
import { TopHudBar } from './components/TopHudBar';
import { Act1Invitation } from './components/Act1Invitation';
import { Act2Sanctuary } from './components/Act2Sanctuary';
import { Act3LoveStory } from './components/Act3LoveStory';
import { Act4Constellation } from './components/Act4Constellation';
import { Act5Adoration } from './components/Act5Adoration';
import { Act6Letter } from './components/Act6Letter';
import { Act7MakeAWish } from './components/Act7MakeAWish';
import { Act8Surprise } from './components/Act8Surprise';
import { Act9Finale } from './components/Act9Finale';
import { soundscape, EmotionalActMood } from './audio/soundscapeEngine';

const ACT_MOOD_MAP: Record<number, EmotionalActMood> = {
  1: 'invitation',
  2: 'wonder',
  3: 'nostalgia',
  4: 'constellation',
  5: 'adoration',
  6: 'letter',
  7: 'wish',
  8: 'finale',
  9: 'finale',
};

export const App: React.FC = () => {
  const [currentAct, setCurrentAct] = useState<number>(1);
  const [wishGranted, setWishGranted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const stageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const transitionToAct = (nextAct: number) => {
    const clamped = Math.max(1, Math.min(9, nextAct));
    soundscape.playInteractionChime('soft');
    soundscape.setMood(
      clamped === 7 && wishGranted ? 'celebration' : ACT_MOOD_MAP[clamped] || 'wonder'
    );

    if (reducedMotion || !stageWrapperRef.current) {
      setCurrentAct(clamped);
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    gsap.to(stageWrapperRef.current, {
      opacity: 0,
      y: -14,
      duration: 0.38,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentAct(clamped);
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        if (stageWrapperRef.current) {
          gsap.fromTo(
            stageWrapperRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
          );
        }
      },
    });
  };

  const handleBeginExperience = async () => {
    await soundscape.initAndPlay();
    soundscape.playInteractionChime('star');
    transitionToAct(2);
  };

  const handleToggleMute = async () => {
    const state = soundscape.getState();
    if (!state.isPlaying) {
      await soundscape.initAndPlay();
      setIsMuted(false);
      return;
    }
    const muted = soundscape.toggleMute();
    setIsMuted(muted);
  };

  const handleGrantWish = () => {
    setWishGranted(true);
    soundscape.setMood('celebration');
    soundscape.playInteractionChime('celebration');
  };

  const handleReplayAll = () => {
    setWishGranted(false);
    transitionToAct(1);
  };

  return (
    <div className="sanctuary-app-root">
      {/* Three.js Velvet Rose & Sacred Constellation WebGL Background */}
      <SanctuaryCanvas
        currentAct={currentAct}
        wishGranted={wishGranted}
        reducedMotion={reducedMotion}
      />

      {/* Ambient Maroon & Candlelight Vignette Overlay */}
      <div className="sanctuary-vignette-overlay" aria-hidden="true" />

      {/* Top Cinematic Navigation & Sound Bar */}
      <TopHudBar
        currentAct={currentAct}
        totalActs={9}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onSelectAct={transitionToAct}
      />

      {/* Active Scene Container */}
      <main ref={stageWrapperRef} className="sanctuary-stage-main">
        {currentAct === 1 && <Act1Invitation onBegin={handleBeginExperience} />}

        {currentAct === 2 && (
          <Act2Sanctuary
            onNext={() => transitionToAct(3)}
            onChime={() => soundscape.playInteractionChime('star')}
          />
        )}

        {currentAct === 3 && (
          <Act3LoveStory
            onNext={() => transitionToAct(4)}
            onPrev={() => transitionToAct(2)}
            onChime={() => soundscape.playInteractionChime('soft')}
          />
        )}

        {currentAct === 4 && (
          <Act4Constellation
            onNext={() => transitionToAct(5)}
            onPrev={() => transitionToAct(3)}
            onStarChime={() => soundscape.playInteractionChime('star')}
          />
        )}

        {currentAct === 5 && (
          <Act5Adoration
            onNext={() => transitionToAct(6)}
            onPrev={() => transitionToAct(4)}
            onChime={() => soundscape.playInteractionChime('soft')}
          />
        )}

        {currentAct === 6 && (
          <Act6Letter
            onNext={() => transitionToAct(7)}
            onPrev={() => transitionToAct(5)}
            onChime={() => soundscape.playInteractionChime('soft')}
          />
        )}

        {currentAct === 7 && (
          <Act7MakeAWish
            wishGranted={wishGranted}
            onGrantWish={handleGrantWish}
            onNext={() => transitionToAct(8)}
            onPrev={() => transitionToAct(6)}
          />
        )}

        {currentAct === 8 && (
          <Act8Surprise
            onNext={() => transitionToAct(9)}
            onPrev={() => transitionToAct(7)}
            onChime={() => soundscape.playInteractionChime('star')}
          />
        )}

        {currentAct === 9 && (
          <Act9Finale
            onReplayAll={handleReplayAll}
            onJumpToAct={transitionToAct}
          />
        )}
      </main>

      {/* Subtle Bottom Act Progress Dots */}
      <footer className="sanctuary-progress-footer" aria-label="Progres Babak">
        <div className="progress-dots-row">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((actNum) => (
            <button
              key={actNum}
              type="button"
              className={`progress-dot ${currentAct === actNum ? 'is-current' : ''} ${
                currentAct > actNum ? 'is-passed' : ''
              }`}
              onClick={() => transitionToAct(actNum)}
              aria-label={`Buka Babak ${actNum}`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;
