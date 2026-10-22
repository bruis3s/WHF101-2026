'use client';

import React, { useState } from 'react';
import type { ContainerBlock, ContentBlock, AnyBlock } from './CaseStudyBuilder';
import { MediaUploader } from './MediaUploader';

interface Props {
  blocks: ContainerBlock[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddAfter: (afterId: string) => void;
  onAddChild: (parentId: string) => void;
  onAddContent: (parentId: string, type: ContentBlock['type']) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<AnyBlock>) => void;
  depth?: number;
}

export function ContainerCanvas({
  blocks,
  selectedId,
  onSelect,
  onAddAfter,
  onAddChild,
  onAddContent,
  onDelete,
  onUpdate,
  depth = 0,
}: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {blocks.map((block) => (
        <BlockItem
          key={block.id}
          block={block}
          selectedId={selectedId}
          onSelect={onSelect}
          onAddAfter={onAddAfter}
          onAddChild={onAddChild}
          onAddContent={onAddContent}
          onDelete={onDelete}
          onUpdate={onUpdate}
          depth={depth}
        />
      ))}
    </div>
  );
}

function BlockItem({
  block,
  selectedId,
  onSelect,
  onAddAfter,
  onAddChild,
  onAddContent,
  onDelete,
  onUpdate,
  depth,
}: {
  block: AnyBlock;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddAfter: (afterId: string) => void;
  onAddChild: (parentId: string) => void;
  onAddContent: (parentId: string, type: ContentBlock['type']) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<AnyBlock>) => void;
  depth: number;
}) {
  const isSelected = selectedId === block.id;
  const isContainer = block.type === 'container';
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Build inline style from block props
  const blockStyle: React.CSSProperties = {
    position: 'relative',
    border: `2px solid ${isSelected ? '#b86043' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '3px',
    backgroundColor: isContainer
      ? depth % 2 === 0
        ? 'rgba(255,255,255,0.03)'
        : 'rgba(255,255,255,0.02)'
      : 'rgba(255,255,255,0.06)',
    transition: 'border-color 0.15s',
    cursor: 'pointer',
    marginLeft: depth > 0 ? '16px' : '0',
  };

  // If the block has fill style
  if (isContainer && (block as ContainerBlock).fillType === 'solid' && (block as ContainerBlock).fillColor) {
    blockStyle.backgroundColor = (block as ContainerBlock).fillColor;
  }

  const cb = block as ContainerBlock;

  return (
    <div>
      <div
        style={blockStyle}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(block.id);
        }}
      >
        {/* Block header bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '7px 10px',
            borderBottom: isContainer && cb.children?.length > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BlockTypeIcon type={block.type} />
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: isSelected ? '#b86043' : 'rgba(255,255,255,0.4)',
              }}
            >
              {block.type === 'container'
                ? `Container ${cb.layoutType === 'grid' ? '(Grid)' : ''}`
                : block.type === 'text'
                ? `Text — ${(block as ContentBlock).textType || 'paragraph'}`
                : block.type.toUpperCase()}
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '8px',
                color: 'rgba(255,255,255,0.15)',
              }}
            >
              {block.id}
            </span>
          </div>

          {/* Actions */}
          <div
            style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            {isContainer && (
              <button
                title="Add child"
                onClick={() => setShowAddMenu(!showAddMenu)}
                style={actionBtnStyle}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
            )}
            <button
              title="Add after"
              onClick={() => onAddAfter(block.id)}
              style={actionBtnStyle}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="1" y1="8" x2="9" y2="8" stroke="currentColor" strokeWidth="1.3" />
                <line x1="5" y1="1" x2="5" y2="7" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2 1" />
              </svg>
            </button>
            <button
              title="Delete"
              onClick={() => onDelete(block.id)}
              style={{ ...actionBtnStyle, color: 'rgba(239,68,68,0.5)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="2" y1="2" x2="8" y2="8" stroke="currentColor" strokeWidth="1.3" />
                <line x1="8" y1="2" x2="2" y2="8" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Add child menu */}
        {isContainer && showAddMenu && (
          <div
            style={{
              padding: '8px 10px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {[
              { label: '+ Container', action: () => { onAddChild(block.id); setShowAddMenu(false); } },
              { label: '+ Image', action: () => { onAddContent(block.id, 'image'); setShowAddMenu(false); } },
              { label: '+ Video', action: () => { onAddContent(block.id, 'video'); setShowAddMenu(false); } },
              { label: '+ Text', action: () => { onAddContent(block.id, 'text'); setShowAddMenu(false); } },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  padding: '4px 10px',
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Content blocks */}
        {block.type === 'text' && (
          <div style={{ padding: '8px 10px' }}>
            <textarea
              value={(block as ContentBlock).content || ''}
              onChange={(e) => onUpdate(block.id, { content: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontFamily: (block as ContentBlock).textType === 'heading' ? 'inherit' : 'monospace',
                fontSize: (block as ContentBlock).textType === 'heading' ? '18px' : '12px',
                fontWeight: (block as ContentBlock).textType === 'heading' ? 700 : 400,
                lineHeight: 1.5,
                resize: 'none',
                minHeight: '40px',
              }}
              rows={2}
            />
          </div>
        )}

        {block.type === 'image' && (
          <div style={{ padding: '8px 10px' }} onClick={(e) => e.stopPropagation()}>
            <MediaUploader
              value={(block as ContentBlock).src || ''}
              onChange={(url) => onUpdate(block.id, { src: url })}
              type="image"
              compact={true}
              label="Image Asset (Upload or URL)"
            />
          </div>
        )}

        {block.type === 'video' && (
          <div style={{ padding: '8px 10px' }} onClick={(e) => e.stopPropagation()}>
            <MediaUploader
              value={(block as ContentBlock).src || ''}
              onChange={(url) => onUpdate(block.id, { src: url })}
              type="video"
              compact={true}
              label="Video Asset (Upload or URL)"
            />
          </div>
        )}

        {/* Nested children (for containers) */}
        {isContainer && cb.children && cb.children.length > 0 && (
          <div style={{ padding: '8px 10px', paddingBottom: '10px' }}>
            <ContainerCanvas
              blocks={cb.children as ContainerBlock[]}
              selectedId={selectedId}
              onSelect={onSelect}
              onAddAfter={onAddAfter}
              onAddChild={onAddChild}
              onAddContent={onAddContent}
              onDelete={onDelete}
              onUpdate={onUpdate}
              depth={depth + 1}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const actionBtnStyle: React.CSSProperties = {
  width: '22px',
  height: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '2px',
  color: 'rgba(255,255,255,0.4)',
  cursor: 'pointer',
  transition: 'all 0.15s',
  padding: 0,
};

function BlockTypeIcon({ type }: { type: string }) {
  if (type === 'container') {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <rect x="1" y="1" width="8" height="8" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'image') {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <rect x="1" y="1" width="8" height="8" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <circle cx="3.5" cy="3.5" r="1" fill="rgba(255,255,255,0.3)" />
        <path d="M1 7L4 5L6 7L8 4L9 7" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      </svg>
    );
  }
  if (type === 'video') {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <rect x="1" y="2" width="6" height="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <path d="M7 4L9 5L7 6V4Z" fill="rgba(255,255,255,0.3)" />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <line x1="1" y1="3" x2="9" y2="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="1" y1="6" x2="7" y2="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    </svg>
  );
}
