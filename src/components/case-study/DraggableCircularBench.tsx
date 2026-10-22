'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ModularBenchItem } from '@/types/caseStudy';
import { RotateCcw, Shuffle, Compass, HelpCircle } from 'lucide-react';

interface DraggableCircularBenchProps {
  heading: string;
  subheading: string;
  description: string;
  items: ModularBenchItem[];
}

export function DraggableCircularBench({
  heading,
  subheading,
  description,
  items
}: DraggableCircularBenchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{ [id: string]: { x: number; y: number; rot: number } }>(() => {
    const init: { [id: string]: { x: number; y: number; rot: number } } = {};
    items.forEach(item => {
      init[item.id] = { x: item.initialX, y: item.initialY, rot: item.initialRotation };
    });
    return init;
  });

  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showGuides, setShowGuides] = useState(true);

  // Reset to original circular bench arrangement
  const handleReset = () => {
    const resetState: { [id: string]: { x: number; y: number; rot: number } } = {};
    items.forEach(item => {
      resetState[item.id] = { x: item.initialX, y: item.initialY, rot: item.initialRotation };
    });
    setPositions(resetState);
  };

  // Explode outwards for parts inspection
  const handleExplode = () => {
    const explodedState: { [id: string]: { x: number; y: number; rot: number } } = {};
    items.forEach(item => {
      const angle = Math.atan2(item.initialY, item.initialX || 0.1);
      const dist = 280;
      explodedState[item.id] = {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        rot: 0
      };
    });
    setPositions(explodedState);
  };

  return (
    <section className="hairline-top hairline-bottom" style={{
      backgroundColor: '#f4f2ec',
      paddingTop: '80px',
      paddingBottom: '80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="page-container">
        {/* Header Block */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <div>
            <div className="tech-label" style={{ color: 'var(--accent-terracotta)', marginBottom: '6px' }}>
              {heading} — {subheading}
            </div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}>
              Modular Radial Assembly Workbench
            </h2>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              lineHeight: 1.6,
            }}>
              {description}
            </p>
          </div>

          {/* Canvas Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowGuides(!showGuides)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                backgroundColor: showGuides ? 'var(--bg-surface)' : 'transparent',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
              }}
            >
              <Compass size={13} />
              <span>{showGuides ? 'Guides: Visible' : 'Guides: Hidden'}</span>
            </button>

            <button
              onClick={handleExplode}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                backgroundColor: 'transparent',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
              }}
            >
              <Shuffle size={13} />
              <span>Explode Assembly</span>
            </button>

            <button
              onClick={handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                backgroundColor: 'var(--text-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={13} />
              <span>Reset Ring</span>
            </button>
          </div>
        </div>

        {/* Tactile Workbench Area */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '620px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '2px',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.03)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Subtle Circular Radial & Datum Axis Guides */}
          {showGuides && (
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              {/* Center Crosshairs */}
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#d8d4cb" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#d8d4cb" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Radial Circles representing the circular bench footprint */}
              <circle cx="50%" cy="50%" r="90" fill="none" stroke="#e0dbd0" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50%" cy="50%" r="180" fill="none" stroke="#c9c3b6" strokeWidth="1.2" strokeDasharray="4 4" />
              <circle cx="50%" cy="50%" r="240" fill="none" stroke="#e0dbd0" strokeWidth="1" strokeDasharray="3 3" />

              {/* Angle radial lines */}
              <line x1="50%" y1="50%" x2="70%" y2="25%" stroke="#ece8e0" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="30%" y2="25%" stroke="#ece8e0" strokeWidth="1" />

              {/* Coordinate Markings */}
              <text x="51%" y="53%" fontFamily="monospace" fontSize="9" fill="#999">DATUM 00.00 / CENTER CORE</text>
              <text x="51%" y="36%" fontFamily="monospace" fontSize="8" fill="#aaa">R_INNER: 4,000 MM</text>
              <text x="51%" y="22%" fontFamily="monospace" fontSize="8" fill="#aaa">R_OUTER: 5,400 MM</text>
            </svg>
          )}

          {/* Interactive Drag Hint */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'none',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-terracotta)',
            }} />
            <span className="tech-label" style={{ fontSize: '10px' }}>
              CLICK & DRAG ANY COMPONENT TO EXPLORE MODULARITY
            </span>
          </div>

          {/* Active HUD Coordinates */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '4px 10px',
            border: '1px solid var(--border-hairline)',
            borderRadius: '2px',
            pointerEvents: 'none',
          }}>
            {activeItem
              ? `ACTIVE: ${activeItem}`
              : 'STATUS: MODULAR BENCH RING CALIBRATED'}
          </div>

          {/* Draggable Components */}
          {items.map((item) => {
            const currentPos = positions[item.id] || { x: item.initialX, y: item.initialY, rot: item.initialRotation };
            const isActive = activeItem === item.id;

            return (
              <motion.div
                key={item.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.12}
                dragMomentum={true}
                animate={{
                  x: currentPos.x,
                  y: currentPos.y,
                  rotate: currentPos.rot,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                }}
                onDragStart={() => setActiveItem(item.code)}
                onDragEnd={(_, info) => {
                  setPositions(prev => ({
                    ...prev,
                    [item.id]: {
                      x: currentPos.x + info.offset.x,
                      y: currentPos.y + info.offset.y,
                      rot: currentPos.rot,
                    }
                  }));
                  setActiveItem(null);
                }}
                whileHover={{
                  scale: 1.03,
                  cursor: 'grab',
                }}
                whileDrag={{
                  scale: 1.08,
                  cursor: 'grabbing',
                  zIndex: 40,
                }}
                style={{
                  position: 'absolute',
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  zIndex: isActive ? 40 : item.elevation,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  userSelect: 'none',
                  filter: isActive
                    ? 'drop-shadow(0 20px 30px rgba(0,0,0,0.22))'
                    : 'drop-shadow(0 8px 16px rgba(0,0,0,0.08))',
                  transition: 'filter 0.2s ease',
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                  }}
                />

                {/* Micro Technical Tag on Hover/Drag */}
                <div style={{
                  position: 'absolute',
                  bottom: '-18px',
                  backgroundColor: 'rgba(17, 17, 17, 0.85)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8.5px',
                  padding: '2px 6px',
                  borderRadius: '1px',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  opacity: isActive ? 1 : 0.6,
                  transition: 'opacity 0.2s',
                }}>
                  {item.code}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
