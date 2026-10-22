'use client';

import React from 'react';
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

export function WerksGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div style={{ padding: '80px var(--padding-canvas)', textAlign: 'center' }}>
        <p className="tech-label" style={{ color: 'var(--text-tertiary)' }}>
          No projects published yet.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '32px var(--padding-canvas)',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2px',
        }}
      >
        {projects.map((project, i) => {
          const imgSrc = project.coverImageUrl
            ? project.coverImageUrl
            : project.coverImage
            ? urlFor(project.coverImage).width(700).height(500).url()
            : null;

          // Vary aspect ratios for visual rhythm
          const ratios = ['4/3', '3/4', '4/3', '4/3', '3/4', '16/9'];
          const ratio = ratios[i % ratios.length];

          return (
            <Link
              key={project._id}
              href={`/werks/${project.slug}`}
              style={{
                display: 'block',
                position: 'relative',
                aspectRatio: ratio,
                backgroundColor: 'var(--bg-elevated)',
                overflow: 'hidden',
                textDecoration: 'none',
              }}
            >
              {imgSrc ? (
                <Image
                  src={imgSrc}
                  alt={project.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0, 0.25, 1)',
                  }}
                  className="grid-img"
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.15 }}>
                    <rect x="1" y="1" width="22" height="22" stroke="#121212" />
                    <line x1="1" y1="1" x2="23" y2="23" stroke="#121212" strokeWidth="0.5" />
                    <line x1="23" y1="1" x2="1" y2="23" stroke="#121212" strokeWidth="0.5" />
                  </svg>
                  <span className="tech-label" style={{ fontSize: '9px', opacity: 0.3 }}>
                    No Image
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div
                className="grid-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(18,18,18,0)',
                  transition: 'background 0.4s ease',
                  pointerEvents: 'none',
                }}
              />

              {/* Info card */}
              <div
                className="grid-info"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: 'linear-gradient(to top, rgba(18,18,18,0.8) 0%, transparent 100%)',
                  transform: 'translateY(4px)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '4px',
                  }}
                >
                  {project.projectType || 'Architecture'} — {project.year}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {project.title}
                </div>
                {project.location && (
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'rgba(255,255,255,0.4)',
                      marginTop: '4px',
                    }}
                  >
                    {project.location}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        a:hover .grid-img { transform: scale(1.04); }
        a:hover .grid-overlay { background: rgba(18,18,18,0.1) !important; }
        a:hover .grid-info { transform: translateY(0) !important; }
        @media (max-width: 640px) {
          div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
