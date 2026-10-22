'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export function HomepageHero() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle floating particles animation
    const container = canvasRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position: absolute;
        width: ${Math.random() * 2 + 1}px;
        height: ${Math.random() * 2 + 1}px;
        border-radius: 50%;
        background: rgba(184, 96, 67, ${Math.random() * 0.3 + 0.1});
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 8 + 6}s ease-in-out infinite alternate;
        animation-delay: ${Math.random() * 4}s;
      `;
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach((p) => p.remove());
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        padding: 'var(--padding-canvas)',
        paddingBottom: '60px',
      }}
    >
      {/* Ambient background lines */}
      <div
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Diagonal structural lines */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}
          aria-hidden="true"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1={`${i * 6}%`}
              y1="0"
              x2={`${i * 6 + 30}%`}
              y2="100%"
              stroke="#121212"
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {/* Corner registration marks */}
        {[
          { top: 24, left: 24 },
          { top: 24, right: 24 },
          { bottom: 24, left: 24 },
          { bottom: 24, right: 24 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...pos,
              width: '16px',
              height: '16px',
              borderTop: i < 2 ? '1px solid rgba(18,18,18,0.2)' : 'none',
              borderBottom: i >= 2 ? '1px solid rgba(18,18,18,0.2)' : 'none',
              borderLeft: i % 2 === 0 ? '1px solid rgba(18,18,18,0.2)' : 'none',
              borderRight: i % 2 !== 0 ? '1px solid rgba(18,18,18,0.2)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        {/* Overline label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              width: '32px',
              height: '1px',
              backgroundColor: 'var(--accent-terracotta)',
            }}
          />
          <span
            className="tech-label"
            style={{ color: 'var(--accent-terracotta)', fontSize: '10px' }}
          >
            Architectural Practice — Est. 2018
          </span>
        </div>

        {/* Hero headline */}
        <h1
          style={{
            fontWeight: 800,
            fontSize: 'clamp(52px, 9vw, 128px)',
            lineHeight: '0.9',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '40px',
            maxWidth: '900px',
          }}
        >
          Space as
          <br />
          <em
            style={{
              fontStyle: 'normal',
              color: 'var(--accent-terracotta)',
            }}
          >
            Instrument.
          </em>
        </h1>

        {/* Sub copy + CTA row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '1.8',
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              letterSpacing: '0.02em',
            }}
          >
            HAF WERKS investigates the tectonic potential of space — through
            modular systems, material honesty, and precision joinery — to
            produce architectures that are both structurally rigorous and
            atmospherically resonant.
          </p>

          <Link
            href="/werks"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 28px',
              backgroundColor: 'var(--text-primary)',
              color: '#fff',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'background-color 0.2s, transform 0.2s',
              flexShrink: 0,
            }}
          >
            View Werks
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M0 5H12M8 1L12 5L8 9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </Link>
        </div>

        {/* Ticker bar */}
        <div
          className="hairline-top"
          style={{
            marginTop: '60px',
            paddingTop: '16px',
            display: 'flex',
            gap: '32px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {[
            'Architecture',
            'Joinery',
            'Interior Systems',
            'Material Research',
            'Spatial Design',
            'Tectonic Assemblies',
          ].map((tag, i) => (
            <span
              key={i}
              className="tech-label"
              style={{ whiteSpace: 'nowrap', fontSize: '10px' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatParticle {
          from { transform: translate(0, 0); }
          to { transform: translate(14px, -12px); }
        }
      `}</style>
    </section>
  );
}
