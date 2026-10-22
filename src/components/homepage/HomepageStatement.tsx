import React from 'react';

export function HomepageStatement() {
  return (
    <section
      style={{
        backgroundColor: 'var(--text-primary)',
        color: '#fff',
        padding: '80px var(--padding-canvas)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              Studio Statement
            </span>
            <div
              style={{
                width: '24px',
                height: '1px',
                backgroundColor: 'var(--accent-terracotta)',
                marginTop: '16px',
              }}
            />
          </div>
          <div>
            <p
              style={{
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                lineHeight: '1.5',
                fontWeight: 300,
                color: '#fff',
                marginBottom: '24px',
              }}
            >
              We believe architecture is not decoration — it is the
              disciplined act of making space inhabitable, of giving form
              to intention, of translating structure into experience.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                lineHeight: '1.8',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Every project begins with material research, proceeds through
              tectonic assembly, and arrives at spatial resolution. The work
              is never decorative — it is always structural, always
              atmospheric, always in service of living.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            marginTop: '80px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '48px',
          }}
        >
          {[
            { value: '8+', label: 'Years Practice' },
            { value: '40+', label: 'Projects Built' },
            { value: '12', label: 'Awards' },
            { value: '3', label: 'Countries' },
          ].map(({ value, label }, i) => (
            <div key={i} style={{ padding: '0 0 0 0' }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  letterSpacing: '-0.03em',
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          section > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
