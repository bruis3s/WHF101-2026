'use client';

import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, ShieldAlert, Sparkles } from 'lucide-react';

interface SanityIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SanityIntegrationModal({ isOpen, onClose }: SanityIntegrationModalProps) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const schemaCode = `// sanity/schemaTypes/editorialRow.ts
import { defineField, defineType } from 'sanity';

export const editorialRow = defineType({
  name: 'editorialRow',
  title: 'Editorial Layout Row',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Row Title / Notation',
      type: 'string',
    }),
    defineField({
      name: 'gap',
      title: 'Row Spacing / Gap',
      type: 'string',
      options: {
        list: [
          { title: 'Flush (0px)', value: '0px' },
          { title: 'Tight (8px)', value: '8px' },
          { title: 'Editorial (16px)', value: '16px' },
          { title: 'Wide (32px)', value: '32px' },
          { title: 'Spacious (64px)', value: '64px' },
          { title: 'Space Between', value: 'between' },
        ],
        layout: 'radio',
      },
      initialValue: '16px',
    }),
    defineField({
      name: 'verticalAlign',
      title: 'Vertical Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'bottom' },
          { title: 'Stretch', value: 'stretch' },
        ],
        layout: 'radio',
      },
      initialValue: 'top',
    }),
    defineField({
      name: 'columns',
      title: 'Columns & Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image', title: 'Asset', options: { hotspot: true } },
            { name: 'widthPercent', type: 'number', title: 'Width Percentage (20-100%)' },
            { name: 'fit', type: 'string', options: { list: ['cover', 'contain', 'natural'] } },
            { name: 'aspectRatio', type: 'string', options: { list: ['16/9', '4/3', '3/4', '1/1', 'auto'] } },
            { name: 'figureNumber', type: 'string', title: 'Figure No (e.g. FIG 01.1)' },
            { name: 'caption', type: 'text', title: 'Architectural Caption' },
          ],
        },
      ],
    }),
  ],
});`;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        backgroundColor: 'rgba(18, 17, 15, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '760px',
          maxWidth: '100%',
          maxHeight: '90vh',
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          border: '1px solid var(--border-strong)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          backgroundColor: '#161514',
          color: '#ffffff',
        }}>
          <div>
            <div className="tech-label" style={{ color: 'var(--accent-terracotta)', fontSize: '10px' }}>
              SANITY.IO + VERCEL INTEGRATION ARCHITECTURE
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '2px 0 0 0' }}>
              How HAF Werks Edits This Page In Sanity
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {/* 3 Step Flow */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}>
            <div style={{
              padding: '14px',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '2px',
            }}>
              <span className="tech-label" style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}>STEP 01</span>
              <h4 style={{ fontSize: '13px', margin: '6px 0 4px' }}>Client Studio</h4>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Client logs into Sanity Studio at their dedicated URL to add projects.
              </p>
            </div>

            <div style={{
              padding: '14px',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '2px',
            }}>
              <span className="tech-label" style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}>STEP 02</span>
              <h4 style={{ fontSize: '13px', margin: '6px 0 4px' }}>Dynamic Row Builder</h4>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                They choose 1-col or 2-col, pick width % and vertical alignment, and upload photos.
              </p>
            </div>

            <div style={{
              padding: '14px',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '2px',
            }}>
              <span className="tech-label" style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}>STEP 03</span>
              <h4 style={{ fontSize: '13px', margin: '6px 0 4px' }}>Instant Vercel Sync</h4>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Vercel fetches the updated schema and serves optimized images at $0/month.
              </p>
            </div>
          </div>

          {/* Schema Code Preview */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}>
              <span className="tech-label" style={{ fontWeight: 600 }}>
                SANITY SCHEMA CODE: editorialRow.ts
              </span>
              <button
                onClick={() => handleCopy(schemaCode, 'schema')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
              >
                {copied === 'schema' ? <Check size={11} color="#059669" /> : <Copy size={11} />}
                <span>{copied === 'schema' ? 'Copied' : 'Copy Schema'}</span>
              </button>
            </div>

            <pre style={{
              backgroundColor: '#181716',
              color: '#d6cfc5',
              padding: '14px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              borderRadius: '2px',
              maxHeight: '260px',
              overflowY: 'auto',
              lineHeight: 1.5,
            }}>
              {schemaCode}
            </pre>
          </div>

          {/* Hostinger DNS Note */}
          <div style={{
            padding: '14px 18px',
            backgroundColor: 'var(--accent-terracotta-soft)',
            border: '1px solid rgba(184, 96, 67, 0.25)',
            borderRadius: '2px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            <span className="tech-label" style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}>
              REMINDER: HOSTINGER DOMAIN CONNECTION ($0 EXTRA)
            </span>
            <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              In your Hostinger DNS panel, keep your domain and point the <strong>A record</strong> to Vercel (<code>76.76.21.21</code>). You can cancel Hostinger&apos;s web hosting plan while keeping your domain active.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px',
          backgroundColor: 'var(--bg-canvas)',
          borderTop: '1px solid var(--border-hairline)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              backgroundColor: '#121212',
              color: '#ffffff',
              border: 'none',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
