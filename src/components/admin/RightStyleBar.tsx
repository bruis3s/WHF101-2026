'use client';

import React, { useState } from 'react';
import type { AnyBlock, ContainerBlock, ContentBlock } from './CaseStudyBuilder';
import { MediaUploader } from './MediaUploader';

interface Props {
  block: AnyBlock | null;
  onUpdate: (updates: Partial<AnyBlock>) => void;
}

type Section = 'link' | 'size' | 'layout' | 'style' | 'media';

export function RightStyleBar({ block, onUpdate }: Props) {
  const [openSections, setOpenSections] = useState<Section[]>([
    'media',
    'link',
    'size',
    'layout',
    'style',
  ]);

  function toggle(section: Section) {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  }

  const isOpen = (s: Section) => openSections.includes(s);
  const isContainer = block?.type === 'container';
  const cb = block as ContainerBlock;
  const content = block as ContentBlock;

  // Determine if fit-content is available (images and video)
  const allowFitContent = block?.type === 'image' || block?.type === 'video';

  if (!block) {
    return (
      <div
        style={{
          padding: '20px 16px',
          color: 'rgba(255,255,255,0.2)',
          fontFamily: 'monospace',
          fontSize: '10px',
          textAlign: 'center',
          paddingTop: '40px',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '12px', opacity: 0.2 }}>
          <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
        <div>Select a block to edit its properties</div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#fff' }}>
      {/* Block identity */}
      <div
        style={{
          padding: '12px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            padding: '2px 8px',
            backgroundColor: 'rgba(184,96,67,0.15)',
            border: '1px solid rgba(184,96,67,0.3)',
            borderRadius: '2px',
            fontSize: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#b86043',
          }}
        >
          {block.type}
        </span>
        <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)' }}>{block.id}</span>
      </div>

      {/* ── MEDIA CONTENT (Images and Videos) ───────────────────── */}
      {(block.type === 'image' || block.type === 'video') && (
        <>
          <SectionHeader label="Media File (Local)" open={isOpen('media')} onToggle={() => toggle('media')} />
          {isOpen('media') && (
            <div style={sectionBody}>
              <MediaUploader
                value={(block as ContentBlock).src}
                onChange={(url) => onUpdate({ src: url })}
                type={block.type === 'image' ? 'image' : 'video'}
                label={block.type === 'image' ? 'Image File (Saved to /public/uploads)' : 'Video File (Saved to /public/uploads)'}
              />
              {block.type === 'image' && (
                <div style={{ marginTop: '12px' }}>
                  <BarLabel>Alt / Caption Description</BarLabel>
                  <input
                    type="text"
                    value={(block as ContentBlock).alt || ''}
                    onChange={(e) => onUpdate({ alt: e.target.value })}
                    placeholder="e.g. West Wing Elevation Detail"
                    style={inputStyle}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ── 1. LINK ─────────────────────────────────────────────── */}
      <SectionHeader label="Link" open={isOpen('link')} onToggle={() => toggle('link')} />
      {isOpen('link') && (
        <div style={sectionBody}>
          <BarLabel>URL (optional)</BarLabel>
          <input
            type="url"
            value={block.link || ''}
            onChange={(e) => onUpdate({ link: e.target.value })}
            placeholder="https:// or /internal-path"
            style={inputStyle}
          />
        </div>
      )}

      {/* ── 2. SIZE ─────────────────────────────────────────────── */}
      <SectionHeader label="Size" open={isOpen('size')} onToggle={() => toggle('size')} />
      {isOpen('size') && (
        <div style={sectionBody}>
          <DimensionControl
            label="Width"
            value={block.width || ''}
            unit={(block as any).widthUnit || 'fill'}
            onChange={(v, u) => onUpdate({ width: v, widthUnit: u } as any)}
            allowFitContent={allowFitContent}
          />
          <DimensionControl
            label="Height"
            value={block.height || ''}
            unit={(block as any).heightUnit || 'fit-content'}
            onChange={(v, u) => onUpdate({ height: v, heightUnit: u } as any)}
            allowFitContent={allowFitContent}
            allowVh={true}
          />
        </div>
      )}

      {/* ── 3. LAYOUT (containers only) ─────────────────────────── */}
      {isContainer && (
        <>
          <SectionHeader label="Layout" open={isOpen('layout')} onToggle={() => toggle('layout')} />
          {isOpen('layout') && (
            <div style={sectionBody}>
              {/* Type: Stack / Grid */}
              <div style={{ marginBottom: '14px' }}>
                <BarLabel>Type</BarLabel>
                <ToggleGroup
                  options={['stack', 'grid']}
                  value={cb.layoutType || 'stack'}
                  onChange={(v) => onUpdate({ layoutType: v as any })}
                />
              </div>

              {/* Direction */}
              <div style={{ marginBottom: '14px' }}>
                <BarLabel>Direction</BarLabel>
                <ToggleGroup
                  options={['horizontal', 'vertical']}
                  value={cb.direction || 'horizontal'}
                  onChange={(v) => onUpdate({ direction: v as any })}
                />
              </div>

              {/* Distribute */}
              <div style={{ marginBottom: '14px' }}>
                <BarLabel>Distribute</BarLabel>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {([
                    { value: 'start', icon: '⊢' },
                    { value: 'center', icon: '⊣⊢' },
                    { value: 'end', icon: '⊣' },
                    { value: 'space-between', icon: '⊢⊣' },
                    { value: 'space-around', icon: '◈' },
                    { value: 'space-evenly', icon: '⊞' },
                  ] as const).map(({ value, icon }) => (
                    <button
                      key={value}
                      title={value.replace(/-/g, ' ')}
                      onClick={() => onUpdate({ distribute: value })}
                      style={{
                        padding: '4px 8px',
                        fontFamily: 'monospace',
                        fontSize: '9px',
                        border: '1px solid',
                        borderColor:
                          cb.distribute === value
                            ? '#b86043'
                            : 'rgba(255,255,255,0.1)',
                        backgroundColor:
                          cb.distribute === value
                            ? 'rgba(184,96,67,0.15)'
                            : 'transparent',
                        color:
                          cb.distribute === value
                            ? '#b86043'
                            : 'rgba(255,255,255,0.4)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.1s',
                      }}
                    >
                      {value === 'start' ? 'Start' :
                       value === 'center' ? 'Center' :
                       value === 'end' ? 'End' :
                       value === 'space-between' ? 'S. Btwn' :
                       value === 'space-around' ? 'S. Arnd' :
                       'S. Even'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Align */}
              <div style={{ marginBottom: '14px' }}>
                <BarLabel>Align</BarLabel>
                <ToggleGroup
                  options={['left', 'center', 'right']}
                  value={cb.align || 'left'}
                  onChange={(v) => onUpdate({ align: v as any })}
                />
              </div>

              {/* Gap */}
              <div style={{ marginBottom: '14px' }}>
                <BarLabel>Gap (px)</BarLabel>
                <NumberInput
                  value={cb.gap ?? 0}
                  onChange={(v) => onUpdate({ gap: v })}
                  min={0}
                  unit="px"
                />
              </div>

              {/* Padding */}
              <div style={{ marginBottom: '4px' }}>
                <BarLabel>Padding (px)</BarLabel>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  <NumberInput
                    label="T"
                    value={cb.paddingTop ?? 0}
                    onChange={(v) => onUpdate({ paddingTop: v })}
                    min={0}
                    unit="px"
                  />
                  <NumberInput
                    label="R"
                    value={cb.paddingRight ?? 0}
                    onChange={(v) => onUpdate({ paddingRight: v })}
                    min={0}
                    unit="px"
                  />
                  <NumberInput
                    label="B"
                    value={cb.paddingBottom ?? 0}
                    onChange={(v) => onUpdate({ paddingBottom: v })}
                    min={0}
                    unit="px"
                  />
                  <NumberInput
                    label="L"
                    value={cb.paddingLeft ?? 0}
                    onChange={(v) => onUpdate({ paddingLeft: v })}
                    min={0}
                    unit="px"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── 4. STYLE ────────────────────────────────────────────── */}
      <SectionHeader label="Style" open={isOpen('style')} onToggle={() => toggle('style')} />
      {isOpen('style') && (
        <div style={sectionBody}>
          {/* Opacity */}
          <div style={{ marginBottom: '14px' }}>
            <BarLabel>Opacity (0–10)</BarLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="range"
                min={0}
                max={10}
                step={0.1}
                value={(block as any).opacity ?? 10}
                onChange={(e) => onUpdate({ opacity: parseFloat(e.target.value) } as any)}
                style={{ flex: 1, accentColor: '#b86043' }}
              />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', minWidth: '24px', textAlign: 'right' }}>
                {((block as any).opacity ?? 10).toFixed(1)}
              </span>
            </div>
          </div>

          {/* Fill */}
          <div style={{ marginBottom: '14px' }}>
            <BarLabel>Fill</BarLabel>
            <ToggleGroup
              options={['none', 'solid', 'image', 'video']}
              value={(block as any).fillType || 'none'}
              onChange={(v) => onUpdate({ fillType: v } as any)}
              small
            />
            {(block as any).fillType === 'solid' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <input
                  type="color"
                  value={(block as any).fillColor || '#ffffff'}
                  onChange={(e) => onUpdate({ fillColor: e.target.value } as any)}
                  style={{
                    width: '28px',
                    height: '28px',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    padding: 0,
                    backgroundColor: 'transparent',
                  }}
                />
                <input
                  type="text"
                  value={(block as any).fillColor || ''}
                  onChange={(e) => onUpdate({ fillColor: e.target.value } as any)}
                  placeholder="#000000"
                  style={{ ...inputStyle, flex: 1 }}
                />
              </div>
            )}
            {((block as any).fillType === 'image' || (block as any).fillType === 'video') && (
              <div style={{ marginTop: '8px' }}>
                <MediaUploader
                  value={(block as any).fillSrc}
                  onChange={(url) => onUpdate({ fillSrc: url } as any)}
                  type={(block as any).fillType}
                  label={(block as any).fillType === 'image' ? 'Background Image' : 'Background Video'}
                  compact
                />
              </div>
            )}
          </div>

          {/* Overflow */}
          <div style={{ marginBottom: '14px' }}>
            <BarLabel>Overflow</BarLabel>
            <ToggleGroup
              options={['clip', 'visible', 'hidden', 'scroll']}
              value={(block as any).overflow || 'clip'}
              onChange={(v) => onUpdate({ overflow: v } as any)}
              small
            />
          </div>

          {/* Radius */}
          <div style={{ marginBottom: '14px' }}>
            <BarLabel>Radius (px)</BarLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <NumberInput label="TL" value={(block as any).radiusTop ?? 0} onChange={(v) => onUpdate({ radiusTop: v } as any)} min={0} unit="px" />
              <NumberInput label="TR" value={(block as any).radiusRight ?? 0} onChange={(v) => onUpdate({ radiusRight: v } as any)} min={0} unit="px" />
              <NumberInput label="BL" value={(block as any).radiusBottom ?? 0} onChange={(v) => onUpdate({ radiusBottom: v } as any)} min={0} unit="px" />
              <NumberInput label="BR" value={(block as any).radiusLeft ?? 0} onChange={(v) => onUpdate({ radiusLeft: v } as any)} min={0} unit="px" />
            </div>
          </div>

          {/* Border */}
          <div style={{ marginBottom: '4px' }}>
            <BarLabel>Border Color</BarLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <input
                type="color"
                value={(block as any).borderColor || '#000000'}
                onChange={(e) => onUpdate({ borderColor: e.target.value } as any)}
                style={{
                  width: '28px',
                  height: '28px',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  padding: 0,
                  backgroundColor: 'transparent',
                }}
              />
              <input
                type="text"
                value={(block as any).borderColor || ''}
                onChange={(e) => onUpdate({ borderColor: e.target.value } as any)}
                placeholder="#000000"
                style={{ ...inputStyle, flex: 1 }}
              />
            </div>
            <BarLabel>Border Width (px)</BarLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <NumberInput label="T" value={(block as any).borderTop ?? 0} onChange={(v) => onUpdate({ borderTop: v } as any)} min={0} unit="px" />
              <NumberInput label="R" value={(block as any).borderRight ?? 0} onChange={(v) => onUpdate({ borderRight: v } as any)} min={0} unit="px" />
              <NumberInput label="B" value={(block as any).borderBottom ?? 0} onChange={(v) => onUpdate({ borderBottom: v } as any)} min={0} unit="px" />
              <NumberInput label="L" value={(block as any).borderLeft ?? 0} onChange={(v) => onUpdate({ borderLeft: v } as any)} min={0} unit="px" />
            </div>
          </div>

          {/* Text type (for text blocks) */}
          {block.type === 'text' && (
            <div style={{ marginTop: '14px' }}>
              <BarLabel>Text Type</BarLabel>
              <ToggleGroup
                options={['heading', 'paragraph']}
                value={(block as ContentBlock).textType || 'paragraph'}
                onChange={(v) => onUpdate({ textType: v as any })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({
  label,
  open,
  onToggle,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 14px',
        backgroundColor: 'rgba(255,255,255,0.02)',
        border: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: '9px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.4)',
      }}
    >
      {label}
      <svg
        width="8"
        height="6"
        viewBox="0 0 8 6"
        fill="none"
        style={{ transform: open ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.15s' }}
      >
        <path d="M0 1L4 5L8 1" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </button>
  );
}

function BarLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: '8px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.25)',
        marginBottom: '6px',
      }}
    >
      {children}
    </div>
  );
}

function ToggleGroup({
  options,
  value,
  onChange,
  small = false,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  small?: boolean;
}) {
  return (
    <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            padding: small ? '3px 8px' : '5px 10px',
            fontFamily: 'monospace',
            fontSize: '9px',
            textTransform: 'capitalize' as const,
            border: '1px solid',
            borderColor: value === opt ? '#b86043' : 'rgba(255,255,255,0.1)',
            backgroundColor: value === opt ? 'rgba(184,96,67,0.15)' : 'transparent',
            color: value === opt ? '#b86043' : 'rgba(255,255,255,0.4)',
            borderRadius: '2px',
            cursor: 'pointer',
            transition: 'all 0.1s',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

type DimensionUnit = 'percent' | 'fill' | 'px' | 'fit-content' | 'vh';

function DimensionControl({
  label,
  value,
  unit,
  onChange,
  allowFitContent = false,
  allowVh = false,
}: {
  label: string;
  value: string;
  unit: DimensionUnit;
  onChange: (value: string, unit: DimensionUnit) => void;
  allowFitContent?: boolean;
  allowVh?: boolean;
}) {
  const units: { label: string; value: DimensionUnit }[] = [
    { label: '%', value: 'percent' },
    { label: 'Fill', value: 'fill' },
    { label: 'PX', value: 'px' },
    ...(allowVh ? [{ label: 'VH', value: 'vh' as DimensionUnit }] : []),
    ...(allowFitContent ? [{ label: 'Fit', value: 'fit-content' as DimensionUnit }] : []),
  ];

  return (
    <div style={{ marginBottom: '10px' }}>
      <BarLabel>{label}</BarLabel>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Unit selector */}
        <div style={{ display: 'flex', gap: '2px' }}>
          {units.map((u) => (
            <button
              key={u.value}
              onClick={() => {
                const initialVal = u.value === 'vh' ? (value || '100') : value;
                onChange(initialVal, u.value);
              }}
              style={{
                padding: '3px 6px',
                fontFamily: 'monospace',
                fontSize: '8px',
                border: '1px solid',
                borderColor: unit === u.value ? '#b86043' : 'rgba(255,255,255,0.1)',
                backgroundColor: unit === u.value ? 'rgba(184,96,67,0.15)' : 'transparent',
                color: unit === u.value ? '#b86043' : 'rgba(255,255,255,0.3)',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              {u.label}
            </button>
          ))}
        </div>

        {/* Value input — shown for %, px, and vh */}
        {(unit === 'percent' || unit === 'px' || unit === 'vh') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <input
                type="number"
                value={value || (unit === 'vh' ? '100' : '')}
                onChange={(e) => onChange(e.target.value, unit)}
                min={0}
                max={unit === 'percent' ? 100 : undefined}
                style={{
                  width: '56px',
                  ...inputStyle,
                  padding: '4px 6px',
                }}
              />
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                {unit === 'vh' ? 'vh' : unit === 'percent' ? '%' : 'px'}
              </span>
            </div>
            {unit === 'vh' && (
              <div style={{ display: 'flex', gap: '2px' }}>
                {['50', '80', '100'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => onChange(preset, 'vh')}
                    style={{
                      padding: '2px 5px',
                      fontSize: '8px',
                      fontFamily: 'monospace',
                      backgroundColor: (value || '100') === preset ? 'rgba(184,96,67,0.3)' : 'rgba(255,255,255,0.06)',
                      color: (value || '100') === preset ? '#b86043' : 'rgba(255,255,255,0.4)',
                      border: '1px solid',
                      borderColor: (value || '100') === preset ? '#b86043' : 'rgba(255,255,255,0.08)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    {preset}vh
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max,
  unit,
}: {
  label?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}) {
  return (
    <div>
      {label && (
        <div
          style={{
            fontSize: '8px',
            color: 'rgba(255,255,255,0.2)',
            marginBottom: '3px',
            textAlign: 'center',
          }}
        >
          {label}
        </div>
      )}
      <div style={{ position: 'relative' }}>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          style={{
            ...inputStyle,
            width: '100%',
            paddingRight: unit ? '20px' : '8px',
            textAlign: 'center',
          }}
        />
        {unit && (
          <span
            style={{
              position: 'absolute',
              right: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '7px',
              color: 'rgba(255,255,255,0.2)',
              pointerEvents: 'none',
            }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

const sectionBody: React.CSSProperties = {
  padding: '14px',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 8px',
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '2px',
  color: '#fff',
  fontFamily: 'monospace',
  fontSize: '10px',
  outline: 'none',
};
