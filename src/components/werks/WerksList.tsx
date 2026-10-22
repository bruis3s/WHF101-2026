'use client';

import React, { useState } from 'react';
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
  discipline?: string[];
}

export function WerksList({ projects }: { projects: Project[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (projects.length === 0) {
    return (
      <div style={{ padding: '80px var(--padding-canvas)' }}>
        <p className="tech-label" style={{ color: 'var(--text-tertiary)' }}>No projects.</p>
      </div>
    );
  }

  const hovered = projects.find((p) => p._id === hoveredId);
  const hoveredImg = hovered?.coverImageUrl
    ? hovered.coverImageUrl
    : hovered?.coverImage
    ? urlFor(hovered.coverImage).width(600).height(400).url()
    : null;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 var(--padding-canvas)' }}>
      <div style={{ display: 'flex', gap: '64px' }}>
        {/* Left — Project list */}
        <div style={{ flex: 1 }}>
          {projects.map((project, i) => (
            <Link
              key={project._id}
              href={`/werks/${project.slug}`}
              onMouseEnter={() => setHoveredId(project._id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                padding: '20px 0',
                borderBottom: '1px solid var(--border-hairline)',
                textDecoration: 'none',
                transition: 'background 0.15s',
                cursor: 'pointer',
              }}
            >
              {/* Left: index + title */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
                <span
                  className="tech-label"
                  style={{
                    fontSize: '10px',
                    color: hoveredId === project._id ? 'var(--accent-terracotta)' : 'var(--text-tertiary)',
                    transition: 'color 0.2s',
                    minWidth: '28px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(16px, 2.5vw, 22px)',
                    fontWeight: 600,
                    color: hoveredId === project._id ? 'var(--accent-terracotta)' : 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    transition: 'color 0.2s',
                  }}
                >
                  {project.title}
                </span>
              </div>

              {/* Right: metadata */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  flexShrink: 0,
                }}
              >
                <span
                  className="tech-label list-type"
                  style={{
                    fontSize: '9px',
                    display: 'none',
                  }}
                >
                  {project.projectType || '—'}
                </span>
                <span
                  className="tech-label"
                  style={{ fontSize: '9px', minWidth: '80px', textAlign: 'right' }}
                >
                  {project.location}
                </span>
                <span
                  className="tech-label"
                  style={{ fontSize: '9px', minWidth: '32px', textAlign: 'right' }}
                >
                  {project.year}
                </span>
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                  style={{
                    opacity: hoveredId === project._id ? 1 : 0,
                    transition: 'opacity 0.2s',
                    color: 'var(--accent-terracotta)',
                  }}
                >
                  <path d="M0 5H10M6 1L10 5L6 9" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Right — Preview image (desktop only) */}
        <div
          className="list-preview"
          style={{
            width: '320px',
            flexShrink: 0,
            position: 'sticky',
            top: '80px',
            alignSelf: 'flex-start',
            height: '240px',
            marginTop: '32px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--bg-elevated)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px',
              transition: 'opacity 0.3s',
              opacity: hoveredId ? 1 : 0.3,
            }}
          >
            {hoveredImg ? (
              <Image
                key={hoveredId}
                src={hoveredImg}
                alt={hovered?.title || ''}
                fill
                style={{ objectFit: 'cover', transition: 'opacity 0.3s' }}
              />
            ) : (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="tech-label" style={{ fontSize: '9px', opacity: 0.3 }}>
                  Hover to preview
                </span>
              </div>
            )}
            {hovered && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px',
                  background: 'linear-gradient(to top, rgba(18,18,18,0.7) 0%, transparent 100%)',
                }}
              >
                <div className="tech-label" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>
                  {hovered.code}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .list-preview { display: none !important; }
          .list-type { display: none !important; }
        }
      `}</style>
    </div>
  );
}
