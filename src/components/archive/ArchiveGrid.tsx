'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';

interface ArchiveItem {
  _id: string;
  title: string;
  image?: any;
  caption?: string;
  material?: string;
  year?: string;
  tags?: string[];
  linkedProject?: {
    _id: string;
    title: string;
    slug: string;
    code: string;
  };
}

export function ArchiveGrid({ items }: { items: ArchiveItem[] }) {
  const [filter, setFilter] = useState<string>('All');

  if (items.length === 0) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <p className="tech-label" style={{ color: 'var(--text-tertiary)' }}>
          No archive items yet. Add them in the{' '}
          <Link href="/studio" style={{ color: 'var(--accent-terracotta)' }}>
            Studio CMS
          </Link>
          .
        </p>
      </div>
    );
  }

  // Collect all unique tags
  const allTags = ['All', ...Array.from(new Set(items.flatMap((i) => i.tags || [])))];
  const filtered = filter === 'All' ? items : items.filter((i) => i.tags?.includes(filter));

  return (
    <div>
      {/* Tag filter */}
      {allTags.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '32px',
          }}
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              style={{
                padding: '5px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                border: '1px solid',
                borderColor: filter === tag ? 'var(--text-primary)' : 'var(--border-subtle)',
                backgroundColor: filter === tag ? 'var(--text-primary)' : 'transparent',
                color: filter === tag ? '#fff' : 'var(--text-secondary)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '2px',
        }}
      >
        {filtered.map((item) => {
          const imgSrc = item.image
            ? urlFor(item.image).width(600).height(800).url()
            : null;

          return (
            <div
              key={item._id}
              style={{
                position: 'relative',
                backgroundColor: 'var(--bg-elevated)',
                overflow: 'hidden',
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: '3/4', position: 'relative', backgroundColor: 'var(--bg-elevated)' }}>
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="archive-img"
                  />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.15 }}>
                      <rect x="1" y="1" width="18" height="18" stroke="#121212" />
                      <line x1="1" y1="1" x2="19" y2="19" stroke="#121212" strokeWidth="0.5" />
                    </svg>
                  </div>
                )}

                {/* Linked project badge */}
                {item.linkedProject && (
                  <Link
                    href={`/werks/${item.linkedProject.slug}`}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(248,247,244,0.9)',
                      backdropFilter: 'blur(8px)',
                      padding: '3px 8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--accent-terracotta)',
                      textDecoration: 'none',
                      borderRadius: '1px',
                      transition: 'background 0.15s',
                    }}
                  >
                    ↗ {item.linkedProject.code}
                  </Link>
                )}
              </div>

              {/* Item info */}
              <div style={{ padding: '12px 14px 16px' }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    marginBottom: '4px',
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {item.material && (
                    <span
                      className="tech-label"
                      style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}
                    >
                      {item.material}
                    </span>
                  )}
                  {item.year && (
                    <span
                      className="tech-label"
                      style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}
                    >
                      {item.year}
                    </span>
                  )}
                </div>
                {item.caption && (
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--text-secondary)',
                      marginTop: '8px',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        div:hover > div > .archive-img { transform: scale(1.04); }
        @media (max-width: 640px) {
          div > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
