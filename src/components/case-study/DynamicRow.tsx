'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EditorialRow, MediaColumn } from '@/types/caseStudy';
import { Maximize2, X, MoveHorizontal, AlignVerticalJustifyStart } from 'lucide-react';

interface DynamicRowProps {
  row: EditorialRow;
  isSelected?: boolean;
  onSelect?: () => void;
  showInspectorGuides?: boolean;
}

export function DynamicRow({
  row,
  isSelected,
  onSelect,
  showInspectorGuides
}: DynamicRowProps) {
  const [modalImage, setModalImage] = useState<MediaColumn | null>(null);

  // Map vertical alignments to CSS flexbox values
  const getAlignItems = (align: EditorialRow['verticalAlign']) => {
    switch (align) {
      case 'top': return 'flex-start';
      case 'center': return 'center';
      case 'bottom': return 'flex-end';
      case 'stretch': return 'stretch';
      default: return 'flex-start';
    }
  };

  // Resolve gap styling
  const isSpaceBetween = row.gap === 'between';
  const gapValue = isSpaceBetween ? '0px' : row.gap;

  return (
    <section
      id={row.id}
      onClick={onSelect}
      style={{
        paddingTop: row.paddingTop || '0px',
        paddingBottom: row.paddingBottom || '80px',
        position: 'relative',
        transition: 'all 0.2s ease',
        cursor: showInspectorGuides ? 'pointer' : 'default',
        outline: isSelected ? '2px solid var(--accent-terracotta)' : (showInspectorGuides ? '1px dashed rgba(0,0,0,0.12)' : 'none'),
        outlineOffset: '8px',
      }}
    >
      <div className="page-container">
        {/* Row Title & Technical Indicator */}
        {row.title && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '1px solid var(--border-hairline)',
          }}>
            <span className="tech-label" style={{ fontWeight: 600 }}>
              {row.title}
            </span>

            {showInspectorGuides && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <span className="tech-label" style={{ color: 'var(--accent-terracotta)' }}>
                  GAP: {row.gap}
                </span>
                <span className="tech-label" style={{ color: 'var(--accent-terracotta)' }}>
                  ALIGN: {row.verticalAlign}
                </span>
                <span className="tech-label" style={{ color: 'var(--accent-terracotta)' }}>
                  COLS: {row.columns.map(c => `${c.widthPercent}%`).join(' / ')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Flex/Grid Row Container */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: gapValue,
            justifyContent: isSpaceBetween ? 'space-between' : (row.horizontalAlign === 'center' ? 'center' : 'flex-start'),
            alignItems: getAlignItems(row.verticalAlign),
            width: '100%',
          }}
        >
          {row.columns.map((col, index) => {
            // Calculate column width taking gap into account
            const colCount = row.columns.length;
            const gapAdjustment = colCount > 1 && !isSpaceBetween
              ? `calc(${col.widthPercent}% - ${parseFloat(gapValue) * (colCount - 1) / colCount}px)`
              : `${col.widthPercent}%`;

            return (
              <div
                key={col.id || index}
                style={{
                  flex: `0 0 ${gapAdjustment}`,
                  maxWidth: gapAdjustment,
                  minWidth: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  position: 'relative',
                }}
              >
                {/* Media Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    backgroundColor: '#ebe7df',
                    overflow: 'hidden',
                    borderRadius: '1px',
                    aspectRatio: col.aspectRatio === 'auto' ? undefined : (col.aspectRatio || '4/3'),
                    maxHeight: col.maxHeight || undefined,
                  }}
                >
                  <img
                    src={col.src}
                    alt={col.alt}
                    style={{
                      width: '100%',
                      height: col.aspectRatio === 'auto' ? 'auto' : '100%',
                      objectFit: col.fit === 'natural' ? 'scale-down' : (col.fit || 'cover'),
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                  />

                  {/* Zoom Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImage(col);
                    }}
                    title="Inspect High-Res Asset"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      opacity: 0.8,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <Maximize2 size={13} color="#111" />
                  </button>
                </div>

                {/* Caption & Architectural Figure Notation */}
                {col.caption && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    paddingTop: '4px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                      {col.figureNumber && (
                        <span className="tech-label" style={{
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          fontSize: '10px',
                        }}>
                          {col.figureNumber}
                        </span>
                      )}
                      {col.metadata?.scale && (
                        <span className="tech-label" style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>
                          [{col.metadata.scale}]
                        </span>
                      )}
                    </div>

                    <p style={{
                      fontSize: '12.5px',
                      lineHeight: 1.5,
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-sans)',
                    }}>
                      {col.caption}
                    </p>

                    {col.metadata?.material && (
                      <div className="tech-label" style={{
                        fontSize: '9.5px',
                        color: 'var(--text-tertiary)',
                        marginTop: '2px',
                      }}>
                        MATERIAL: {col.metadata.material}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Res Image Inspection Modal */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(15, 14, 12, 0.94)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <button
            onClick={() => setModalImage(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}
          >
            <span>CLOSE [ESC]</span>
            <X size={18} />
          </button>

          <img
            src={modalImage.src}
            alt={modalImage.alt}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          />

          {modalImage.caption && (
            <div style={{
              marginTop: '16px',
              color: '#ffffff',
              maxWidth: '700px',
              textAlign: 'center',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
            }}>
              {modalImage.caption}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
