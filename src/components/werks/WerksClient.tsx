'use client';

import React, { useState } from 'react';
import { WerksGrid } from './WerksGrid';
import { WerksList } from './WerksList';
import { WerksExplore } from './WerksExplore';

export type WerksView = 'grid' | 'list' | 'explore';

interface Project {
  _id: string;
  title: string;
  slug: string;
  code: string;
  projectType?: string;
  year: string;
  location: string;
  coverImage?: any;
  discipline?: string[];
  subtitle?: string;
}

export function WerksClient({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<WerksView>('grid');

  return (
    <div style={{ flex: 1 }}>
      {/* Werks Header + View Switcher */}
      <div
        className="hairline-bottom"
        style={{
          padding: '40px var(--padding-canvas) 0',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ width: '32px', height: '1px', backgroundColor: 'var(--accent-terracotta)' }} />
            <span className="tech-label" style={{ color: 'var(--accent-terracotta)', fontSize: '10px' }}>
              {projects.length} Projects
            </span>
          </div>

          <h1
            style={{
              fontWeight: 800,
              fontSize: 'clamp(36px, 6vw, 80px)',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 0.9,
              marginBottom: '32px',
            }}
          >
            Werks
          </h1>

          {/* View Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0',
              borderBottom: 'none',
            }}
          >
            {(['grid', 'list', 'explore'] as WerksView[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={v === 'explore' ? 'explore-tab' : ''}
                style={{
                  padding: '10px 20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  background: 'none',
                  border: 'none',
                  borderBottom: view === v ? '2px solid var(--text-primary)' : '2px solid transparent',
                  color: view === v ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  cursor: 'pointer',
                  transition: 'color 0.15s, border-color 0.15s',
                  paddingLeft: v === 'grid' ? '0' : '20px',
                }}
              >
                {v === 'grid' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GridIcon active={view === 'grid'} />
                    Grid
                  </span>
                )}
                {v === 'list' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ListIcon active={view === 'list'} />
                    List
                  </span>
                )}
                {v === 'explore' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ExploreIcon active={view === 'explore'} />
                    Explore
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View Content */}
      <div>
        {view === 'grid' && <WerksGrid projects={projects} />}
        {view === 'list' && <WerksList projects={projects} />}
        {view === 'explore' && <WerksExplore projects={projects} />}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .explore-tab { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="0" y="0" width="5" height="5" fill={active ? '#121212' : '#8c8a82'} />
      <rect x="7" y="0" width="5" height="5" fill={active ? '#121212' : '#8c8a82'} />
      <rect x="0" y="7" width="5" height="5" fill={active ? '#121212' : '#8c8a82'} />
      <rect x="7" y="7" width="5" height="5" fill={active ? '#121212' : '#8c8a82'} />
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <line x1="0" y1="1" x2="12" y2="1" stroke={active ? '#121212' : '#8c8a82'} strokeWidth="1.5" />
      <line x1="0" y1="5" x2="12" y2="5" stroke={active ? '#121212' : '#8c8a82'} strokeWidth="1.5" />
      <line x1="0" y1="9" x2="12" y2="9" stroke={active ? '#121212' : '#8c8a82'} strokeWidth="1.5" />
    </svg>
  );
}

function ExploreIcon({ active }: { active: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke={active ? '#121212' : '#8c8a82'} strokeWidth="1.2" />
      <circle cx="6" cy="6" r="1.5" fill={active ? '#121212' : '#8c8a82'} />
    </svg>
  );
}
