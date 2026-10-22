import React from 'react';
import { CaseStudyData } from '@/types/caseStudy';

interface CaseStudyHeaderProps {
  data: CaseStudyData;
}

export function CaseStudyHeader({ data }: CaseStudyHeaderProps) {
  return (
    <section className="hairline-bottom" style={{
      backgroundColor: 'var(--bg-surface)',
      paddingTop: '60px',
      paddingBottom: '60px',
    }}>
      <div className="page-container">
        {/* Top Datum Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-hairline)',
          marginBottom: '36px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="tech-label" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              + DATUM 00.00
            </span>
            <span className="tech-label">INDEX: 06 / PORTFOLIO</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span className="tech-label">DISCIPLINES:</span>
            {data.discipline.map((d, i) => (
              <span key={i} className="tech-label" style={{
                color: 'var(--text-primary)',
                padding: '2px 6px',
                backgroundColor: 'var(--bg-elevated)',
                borderRadius: '2px',
              }}>
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Title & Core Statement */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '48px',
          alignItems: 'start',
          marginBottom: '48px',
        }}>
          <div>
            <div className="tech-label" style={{ color: 'var(--accent-terracotta)', marginBottom: '8px' }}>
              PROJECT CODE — {data.code}
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 4.2vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}>
              {data.title}
            </h1>
            <p style={{
              fontSize: '18px',
              lineHeight: 1.5,
              color: 'var(--text-secondary)',
              maxWidth: '680px',
            }}>
              {data.subtitle}
            </p>
          </div>

          {/* Description & Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.description.map((paragraph, idx) => (
              <p key={idx} style={{
                fontSize: '14.5px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Technical Specification Grid Table */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1px',
          backgroundColor: 'var(--border-hairline)',
          border: '1px solid var(--border-hairline)',
        }}>
          {data.specs.map((spec, i) => (
            <div key={i} style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              <span className="tech-label" style={{ fontSize: '10px' }}>{spec.label}</span>
              <span className="tech-value" style={{ fontWeight: 600 }}>{spec.value}</span>
            </div>
          ))}

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            <span className="tech-label" style={{ fontSize: '10px' }}>LOCATION</span>
            <span className="tech-value" style={{ fontWeight: 600 }}>{data.location}</span>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            <span className="tech-label" style={{ fontSize: '10px' }}>STATUS</span>
            <span className="tech-value" style={{ fontWeight: 600, color: '#059669' }}>● {data.status}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
