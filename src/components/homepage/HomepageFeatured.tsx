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
  projectType: string;
  year: string;
  location: string;
  coverImage?: any;
  coverImageUrl?: string;
  discipline?: string[];
}

export function HomepageFeatured({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 4);

  if (featured.length === 0) {
    return (
      <section style={{ padding: '80px var(--padding-canvas)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div
            style={{
              borderTop: '1px solid var(--border-hairline)',
              paddingTop: '48px',
              marginBottom: '48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span className="tech-label">Selected Werks</span>
            <Link
              href="/werks"
              className="tech-label"
              style={{ color: 'var(--accent-terracotta)', textDecoration: 'none', fontSize: '10px' }}
            >
              View All →
            </Link>
          </div>
          <p className="tech-label" style={{ color: 'var(--text-tertiary)' }}>
            No projects published yet. Add projects in the{' '}
            <Link href="/studio" style={{ color: 'var(--accent-terracotta)' }}>
              Studio CMS
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '80px var(--padding-canvas)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Section header */}
        <div
          style={{
            borderTop: '1px solid var(--border-hairline)',
            paddingTop: '48px',
            marginBottom: '48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <span className="tech-label">Selected Werks</span>
          <Link
            href="/werks"
            className="tech-label"
            style={{ color: 'var(--accent-terracotta)', textDecoration: 'none', fontSize: '10px' }}
          >
            View All →
          </Link>
        </div>

        {/* Grid — 2 columns on left (large), 2 stacked on right (small) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '2px',
          }}
        >
          {featured.map((project, i) => {
            const imgSrc = project.coverImageUrl
              ? project.coverImageUrl
              : project.coverImage
              ? urlFor(project.coverImage).width(900).height(600).url()
              : null;

            return (
              <Link
                key={project._id}
                href={`/werks/${project.slug}`}
                style={{
                  display: 'block',
                  position: 'relative',
                  aspectRatio: i === 0 ? '4/3' : '4/3',
                  backgroundColor: 'var(--bg-elevated)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  gridColumn: i === 0 ? '1 / 2' : i === 1 ? '2 / 3' : 'auto',
                  gridRow: i === 0 ? '1 / 2' : i === 1 ? '1 / 2' : 'auto',
                }}
              >
                {/* Image */}
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    className="featured-img"
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
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.2 }}>
                      <rect x="2" y="2" width="28" height="28" stroke="#121212" strokeWidth="1" />
                      <line x1="2" y1="2" x2="30" y2="30" stroke="#121212" strokeWidth="0.5" />
                      <line x1="30" y1="2" x2="2" y2="30" stroke="#121212" strokeWidth="0.5" />
                    </svg>
                  </div>
                )}

                {/* Overlay on hover */}
                <div
                  className="featured-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(18,18,18,0)',
                    transition: 'background 0.4s ease',
                  }}
                />

                {/* Project info */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '20px',
                    background: 'linear-gradient(to top, rgba(18,18,18,0.7) 0%, transparent 100%)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.6)',
                      marginBottom: '4px',
                    }}
                  >
                    {project.code} — {project.year}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#fff',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .featured-img:hover, a:hover .featured-img {
          transform: scale(1.03);
        }
        a:hover .featured-overlay {
          background: rgba(18,18,18,0.15) !important;
        }
        @media (max-width: 768px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
