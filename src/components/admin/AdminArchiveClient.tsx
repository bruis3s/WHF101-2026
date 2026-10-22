'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';

interface ArchiveItem {
  _id: string;
  title: string;
  image?: any;
  material?: string;
  year?: string;
  linkedProject?: {
    _id: string;
    title: string;
    slug: string;
    code: string;
  };
}

export function AdminArchiveClient({ items }: { items: ArchiveItem[] }) {
  return (
    <div style={{ padding: '32px 40px', color: '#fff' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '32px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#b86043',
              marginBottom: '8px',
            }}
          >
            {items.length} Items
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '28px', letterSpacing: '-0.02em', color: '#fff' }}>
            Archive
          </h1>
        </div>
        <a
          href="/studio"
          target="_blank"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            backgroundColor: '#b86043',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'monospace',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            borderRadius: '3px',
          }}
        >
          Add in Sanity Studio ↗
        </a>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: '80px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: '12px' }}>
          No archive items yet. Add them in Sanity Studio under &quot;Archive&quot;.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          {items.map((item) => {
            const imgSrc = item.image ? urlFor(item.image).width(400).height(500).url() : null;
            return (
              <div
                key={item._id}
                style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Image */}
                <div style={{ aspectRatio: '3/4', position: 'relative', backgroundColor: '#222' }}>
                  {imgSrc && (
                    <Image src={imgSrc} alt={item.title} fill style={{ objectFit: 'cover' }} />
                  )}
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: '12px', color: '#fff', fontWeight: 500, marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>
                    {item.material || '—'}
                  </div>
                  {item.linkedProject && (
                    <Link
                      href={`/werks/${item.linkedProject.slug}`}
                      target="_blank"
                      style={{
                        display: 'inline-block',
                        marginTop: '6px',
                        fontFamily: 'monospace',
                        fontSize: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#b86043',
                        textDecoration: 'none',
                      }}
                    >
                      ↗ {item.linkedProject.code}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
