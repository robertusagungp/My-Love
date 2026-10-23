import React, { useState } from 'react';
import { Sparkles, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { STORY_CONTENT, ConstellationNode } from '../data/storyContent';

interface Act4ConstellationProps {
  onNext: () => void;
  onPrev: () => void;
  onStarChime: () => void;
}

export const Act4Constellation: React.FC<Act4ConstellationProps> = ({
  onNext,
  onPrev,
  onStarChime,
}) => {
  const { act4Constellation } = STORY_CONTENT;
  const [selectedNode, setSelectedNode] = useState<ConstellationNode>(
    act4Constellation.nodes[0]
  );
  const [visitedIds, setVisitedIds] = useState<string[]>([
    act4Constellation.nodes[0].id,
  ]);

  const handleSelectStar = (node: ConstellationNode) => {
    setSelectedNode(node);
    if (!visitedIds.includes(node.id)) {
      setVisitedIds((prev) => [...prev, node.id]);
    }
    onStarChime();
  };

  return (
    <section className="act-section act-constellation" aria-labelledby="act4-title">
      <div className="act-container">
        <div className="act-header-center">
          <p className="act-eyebrow">{act4Constellation.eyebrowEn}</p>
          <h2 id="act4-title" className="act-headline">
            {act4Constellation.headlineEn}
          </h2>
          <p className="act-subtitle">{act4Constellation.instructionId}</p>
        </div>

        {/* Interactive Star Map Navigation */}
        <div className="constellation-star-map" role="tablist" aria-label="Bintang Kenangan Natasha">
          <svg
            className="constellation-connecting-svg"
            viewBox="0 0 600 90"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 90 45 Q 300 10 510 45"
              fill="none"
              stroke="rgba(229, 195, 132, 0.35)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
          </svg>

          {act4Constellation.nodes.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            const isVisited = visitedIds.includes(node.id);
            return (
              <button
                key={node.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`star-orb-button ${isSelected ? 'is-active' : ''} ${
                  isVisited ? 'is-visited' : ''
                }`}
                onClick={() => handleSelectStar(node)}
              >
                <span className="star-orb-glow" />
                <span className="star-orb-core">
                  <Star size={16} fill={isSelected ? '#1A050B' : '#E5C384'} />
                </span>
                <span className="star-orb-name">{node.starName}</span>
                <span className="star-orb-index">Potret 0{index + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Focused Memory & Portrait Display */}
        <div key={selectedNode.id} className="constellation-detail-stage">
          {selectedNode.image && (
            <div className="constellation-portrait-box">
              <div className="constellation-img-wrapper">
                <img
                  src={selectedNode.image}
                  alt={selectedNode.imageAlt || selectedNode.title}
                  className="constellation-portrait-img"
                  loading="lazy"
                  width={520}
                  height={640}
                />
              </div>
              <span className="constellation-coord-badge">{selectedNode.coordinates}</span>
            </div>
          )}

          <div className="constellation-text-box">
            <div className="constellation-star-header">
              <Sparkles size={16} className="gold-text" />
              <span>{selectedNode.starName}</span>
            </div>

            <h3 className="constellation-node-title">{selectedNode.title}</h3>
            <p className="constellation-node-subtitle">{selectedNode.subtitle}</p>

            <p className="constellation-node-reflection">{selectedNode.reflection}</p>

            <div className="constellation-note-plaque">
              <p>“{selectedNode.scriptureOrNote}”</p>
            </div>

            <div className="constellation-footer-actions">
              <button type="button" className="btn-velvet-secondary" onClick={onPrev}>
                <ArrowLeft size={16} />
                <span>Act III</span>
              </button>

              <button type="button" className="btn-gold-primary" onClick={onNext}>
                <span>Hal yang Kukagumi Darimu (Act V)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
