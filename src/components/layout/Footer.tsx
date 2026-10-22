'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="hairline-top" style={{
      backgroundColor: '#ffffff',
      paddingTop: '60px',
      paddingBottom: '60px',
    }}>
      <div className="page-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Col 1 */}
          <div>
            <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '8px' }}>
              HAF WERKS STUDIO
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Architectural Design & Spatial Systems Investigation. Exploring the junction of industrial mechanics and material craft.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <span className="tech-label" style={{ display: 'block', marginBottom: '8px' }}>
              ARCHIVE & INDEX
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><a href="#" style={{ fontSize: '13px', color: 'var(--text-primary)' }}>WHF101 — Modular Circular System (2026)</a></li>
              <li><a href="#" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>WHF094 — Monolithic Timber Gallery (2025)</a></li>
              <li><a href="#" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>WHF082 — Perforated Steel Pavilion (2024)</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <span className="tech-label" style={{ display: 'block', marginBottom: '8px' }}>
              DEVELOPMENT & COLOPHON
            </span>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: 'var(--font-mono)' }}>
              Built for HAF Werks by Gabeln Studio.<br />
              Stack: Next.js + Sanity.io on Vercel.<br />
              Typography: Geist Sans & Geist Mono.
            </p>
          </div>

          {/* Col 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <span className="tech-label">TOKYO / GLOBAL PRACTICE</span>
            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-primary)',
              }}
            >
              <span>RETURN TO TOP</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-hairline)',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span className="tech-label" style={{ fontSize: '10px' }}>
            © 2026 HAF WERKS ARCHITECTURAL STUDIO. ALL RIGHTS RESERVED.
          </span>
          <span className="tech-label" style={{ fontSize: '10px' }}>
            PROTOTYPE v1.0 — DYNAMIC EDITORIAL GRID ENGINE
          </span>
        </div>
      </div>
    </footer>
  );
}
