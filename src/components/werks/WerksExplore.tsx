'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';

interface Project {
  _id: string;
  title: string;
  slug: string;
  code: string;
  projectType?: string;
  year: string;
  location: string;
  coverImage?: any;
  coverImageUrl?: string;
}

interface Card {
  project: Project;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
  width: number;
}

export function WerksExplore({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<Card[]>(() =>
    projects.map((p, i) => ({
      project: p,
      x: getInitialX(i, projects.length),
      y: getInitialY(i, projects.length),
      rotation: ((i * 7) % 17) - 8,
      zIndex: i,
      width: 280 + ((i * 31) % 60),
    }))
  );
  const [maxZ, setMaxZ] = useState(projects.length);
  const dragging = useRef<{ id: string; startX: number; startY: number; cardX: number; cardY: number } | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const card = cards.find((c) => c.project._id === id);
    if (!card) return;
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setCards((prev) =>
      prev.map((c) => (c.project._id === id ? { ...c, zIndex: newZ } : c))
    );
    dragging.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      cardX: card.x,
      cardY: card.y,
    };
  }, [cards, maxZ]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragging.current.startX;
    const dy = e.clientY - dragging.current.startY;
    setCards((prev) =>
      prev.map((c) =>
        c.project._id === dragging.current!.id
          ? { ...c, x: dragging.current!.cardX + dx, y: dragging.current!.cardY + dy }
          : c
      )
    );
  }, []);

  const onMouseUp = useCallback(() => {
    dragging.current = null;
  }, []);

  if (projects.length === 0) {
    return (
      <div style={{ padding: '80px var(--padding-canvas)', textAlign: 'center' }}>
        <p className="tech-label" style={{ color: 'var(--text-tertiary)' }}>No projects to explore.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        position: 'relative',
        height: 'calc(100vh - 160px)',
        overflow: 'hidden',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {/* Instruction */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        <span
          className="tech-label"
          style={{
            fontSize: '9px',
            backgroundColor: 'rgba(248,247,244,0.8)',
            padding: '4px 12px',
            borderRadius: '20px',
            border: '1px solid var(--border-hairline)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Drag to explore — click to open project
        </span>
      </div>

      {/* Scattered project cards */}
      {cards.map((card) => {
        const imgSrc = card.project.coverImageUrl
          ? card.project.coverImageUrl
          : card.project.coverImage
          ? urlFor(card.project.coverImage).width(400).height(300).url()
          : null;

        return (
          <div
            key={card.project._id}
            onMouseDown={(e) => onMouseDown(e, card.project._id)}
            style={{
              position: 'absolute',
              left: `calc(50% + ${card.x}px)`,
              top: `calc(50% + ${card.y}px)`,
              transform: `translate(-50%, -50%) rotate(${card.rotation}deg)`,
              zIndex: card.zIndex,
              width: `${card.width}px`,
              cursor: 'grab',
              transition: 'box-shadow 0.2s',
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                boxShadow: '0 4px 32px rgba(18,18,18,0.12), 0 1px 4px rgba(18,18,18,0.06)',
                overflow: 'hidden',
                borderRadius: '1px',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: 'var(--bg-elevated)' }}>
                {imgSrc ? (
                  <Image src={imgSrc} alt={card.project.title} fill style={{ objectFit: 'cover', pointerEvents: 'none' }} />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.15 }}>
                      <rect x="1" y="1" width="18" height="18" stroke="#121212" />
                      <line x1="1" y1="1" x2="19" y2="19" stroke="#121212" strokeWidth="0.5" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Card footer */}
              <div style={{ padding: '10px 12px 12px' }}>
                <div className="tech-label" style={{ fontSize: '9px', color: 'var(--accent-terracotta)', marginBottom: '4px' }}>
                  {card.project.code} — {card.project.year}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                  {card.project.title}
                </div>
                <Link
                  href={`/werks/${card.project.slug}`}
                  onMouseDown={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '1px',
                  }}
                >
                  View Case Study
                  <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                    <path d="M0 3.5H6M4 1L6 3.5L4 6" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getInitialX(i: number, total: number): number {
  const angle = (i / total) * Math.PI * 2;
  const radius = 280;
  return Math.cos(angle) * radius + Math.sin(i * 3.5) * 50;
}

function getInitialY(i: number, total: number): number {
  const angle = (i / total) * Math.PI * 2;
  const radius = 180;
  return Math.sin(angle) * radius + Math.cos(i * 2.8) * 35;
}
