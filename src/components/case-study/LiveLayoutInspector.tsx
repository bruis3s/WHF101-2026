'use client';

import React, { useState } from 'react';
import { EditorialRow, RowGapSize, VerticalAlignment, ImageFitMode } from '@/types/caseStudy';
import {
  Sliders,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  Maximize,
  Minimize,
  Copy,
  Check,
  ChevronDown,
  Layers,
  Code
} from 'lucide-react';

interface LiveLayoutInspectorProps {
  rows: EditorialRow[];
  selectedRowId: string;
  onSelectRow: (id: string) => void;
  onUpdateRow: (updatedRow: EditorialRow) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function LiveLayoutInspector({
  rows,
  selectedRowId,
  onSelectRow,
  onUpdateRow,
  isOpen,
  onClose
}: LiveLayoutInspectorProps) {
  const [activeTab, setActiveTab] = useState<'visual' | 'sanity'>('visual');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentRow = rows.find(r => r.id === selectedRowId) || rows[1] || rows[0];

  const handleWidthChange = (colIndex: number, newPercent: number) => {
    if (!currentRow) return;
    const newColumns = [...currentRow.columns];
    if (newColumns.length === 2) {
      newColumns[0] = { ...newColumns[0], widthPercent: newPercent };
      newColumns[1] = { ...newColumns[1], widthPercent: 100 - newPercent };
    } else {
      newColumns[colIndex] = { ...newColumns[colIndex], widthPercent: newPercent };
    }
    onUpdateRow({ ...currentRow, columns: newColumns });
  };

  const handleGapChange = (gap: RowGapSize) => {
    if (!currentRow) return;
    onUpdateRow({ ...currentRow, gap });
  };

  const handleAlignChange = (verticalAlign: VerticalAlignment) => {
    if (!currentRow) return;
    onUpdateRow({ ...currentRow, verticalAlign });
  };

  const handleFitChange = (fit: ImageFitMode) => {
    if (!currentRow) return;
    const newColumns = currentRow.columns.map(c => ({ ...c, fit }));
    onUpdateRow({ ...currentRow, columns: newColumns });
  };

  const copySanityJson = () => {
    const payload = {
      _type: 'editorialRow',
      rowId: currentRow.id,
      title: currentRow.title,
      gap: currentRow.gap,
      verticalAlign: currentRow.verticalAlign,
      columns: currentRow.columns.map(c => ({
        widthPercent: c.widthPercent,
        fit: c.fit || 'cover',
        aspectRatio: c.aspectRatio,
        caption: c.caption,
      }))
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '420px',
      maxWidth: 'calc(100vw - 48px)',
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-strong)',
      borderRadius: '4px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
      zIndex: 90,
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
    }}>
      {/* Panel Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: '#121212',
        color: '#ffffff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={14} color="#b86043" />
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em' }}>
            CLIENT CMS LAYOUT ENGINE
          </span>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('visual')}
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              padding: '3px 8px',
              backgroundColor: activeTab === 'visual' ? '#2c2c2c' : 'transparent',
              color: activeTab === 'visual' ? '#fff' : '#888',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
            }}
          >
            Visual
          </button>
          <button
            onClick={() => setActiveTab('sanity')}
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              padding: '3px 8px',
              backgroundColor: activeTab === 'sanity' ? '#2c2c2c' : 'transparent',
              color: activeTab === 'sanity' ? '#fff' : '#888',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
            }}
          >
            Sanity JSON
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '14px',
              marginLeft: '6px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Row Selector Dropdown */}
      <div style={{
        padding: '10px 16px',
        backgroundColor: 'var(--bg-canvas)',
        borderBottom: '1px solid var(--border-hairline)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span className="tech-label" style={{ fontSize: '10px' }}>TARGET ROW:</span>
        <select
          value={currentRow.id}
          onChange={(e) => onSelectRow(e.target.value)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            padding: '4px 8px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '2px',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            maxWidth: '240px',
          }}
        >
          {rows.map(r => (
            <option key={r.id} value={r.id}>
              {r.title || r.id}
            </option>
          ))}
        </select>
      </div>

      {activeTab === 'visual' ? (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 1. Width Ratio Slider for 2-column rows */}
          {currentRow.columns.length === 2 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="tech-label">COLUMN WIDTH RATIO</span>
                <span className="tech-value" style={{ fontWeight: 700, color: 'var(--accent-terracotta)' }}>
                  {currentRow.columns[0].widthPercent}% / {currentRow.columns[1].widthPercent}%
                </span>
              </div>

              <input
                type="range"
                min="20"
                max="80"
                step="1"
                value={currentRow.columns[0].widthPercent}
                onChange={(e) => handleWidthChange(0, parseInt(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--accent-terracotta)',
                  cursor: 'ew-resize',
                }}
              />

              {/* Ratio Presets */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                {[
                  { label: '30/70', val: 30 },
                  { label: '38/62', val: 38 },
                  { label: '50/50', val: 50 },
                  { label: '62/38', val: 62 },
                  { label: '70/30', val: 70 },
                ].map(p => (
                  <button
                    key={p.label}
                    onClick={() => handleWidthChange(0, p.val)}
                    style={{
                      flex: 1,
                      padding: '4px 0',
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: currentRow.columns[0].widthPercent === p.val ? '#111' : 'var(--bg-canvas)',
                      color: currentRow.columns[0].widthPercent === p.val ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Gap / Spacing Selector */}
          <div>
            <span className="tech-label" style={{ display: 'block', marginBottom: '8px' }}>
              ROW GAP / SPACING
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
              {(['0px', '8px', '16px', '24px', '32px', 'between'] as RowGapSize[]).map((g) => (
                <button
                  key={g}
                  onClick={() => handleGapChange(g)}
                  style={{
                    padding: '6px 0',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: currentRow.gap === g ? '#111' : 'var(--bg-canvas)',
                    color: currentRow.gap === g ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {g === 'between' ? 'Space' : g}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Vertical Alignment */}
          <div>
            <span className="tech-label" style={{ display: 'block', marginBottom: '8px' }}>
              VERTICAL ALIGNMENT
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
              {[
                { label: 'Top', val: 'top', icon: <AlignVerticalJustifyStart size={12} /> },
                { label: 'Center', val: 'center', icon: <AlignVerticalJustifyCenter size={12} /> },
                { label: 'Bottom', val: 'bottom', icon: <AlignVerticalJustifyEnd size={12} /> },
                { label: 'Stretch', val: 'stretch', icon: <Maximize size={12} /> },
              ].map((a) => (
                <button
                  key={a.val}
                  onClick={() => handleAlignChange(a.val as VerticalAlignment)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    padding: '6px 0',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: currentRow.verticalAlign === a.val ? '#111' : 'var(--bg-canvas)',
                    color: currentRow.verticalAlign === a.val ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  {a.icon}
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Image Sizing & Fit */}
          <div>
            <span className="tech-label" style={{ display: 'block', marginBottom: '8px' }}>
              IMAGE FIT MODE
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
              {[
                { label: 'Cover (Fill)', val: 'cover' },
                { label: 'Contain', val: 'contain' },
                { label: 'Natural', val: 'natural' },
              ].map((f) => (
                <button
                  key={f.val}
                  onClick={() => handleFitChange(f.val as ImageFitMode)}
                  style={{
                    padding: '6px 0',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: (currentRow.columns[0]?.fit || 'cover') === f.val ? '#111' : 'var(--bg-canvas)',
                    color: (currentRow.columns[0]?.fit || 'cover') === f.val ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Sanity CMS JSON Mapping Tab */
        <div style={{ padding: '14px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}>
            <span className="tech-label" style={{ color: '#059669' }}>
              ● LIVE SANITY GROQ DOCUMENT
            </span>
            <button
              onClick={copySanityJson}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              {copied ? <Check size={11} color="#059669" /> : <Copy size={11} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre style={{
            backgroundColor: '#191816',
            color: '#ded8cf',
            padding: '10px',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            borderRadius: '2px',
            maxHeight: '220px',
            overflowY: 'auto',
            lineHeight: 1.45,
          }}>
            {JSON.stringify({
              _type: 'editorialRow',
              rowId: currentRow.id,
              gap: currentRow.gap,
              verticalAlign: currentRow.verticalAlign,
              splitRatio: currentRow.columns.map(c => c.widthPercent),
              columns: currentRow.columns.map(c => ({
                _key: c.id,
                fit: c.fit || 'cover',
                aspectRatio: c.aspectRatio,
                caption: c.caption?.slice(0, 45) + '...',
              }))
            }, null, 2)}
          </pre>

          <p style={{
            marginTop: '10px',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
          }}>
            In Sanity Studio, your client edits these exact fields through visual inputs. Next.js reads this data instantly without rebuilding!
          </p>
        </div>
      )}
    </div>
  );
}
