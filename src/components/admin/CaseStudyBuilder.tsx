'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RightStyleBar } from './RightStyleBar';
import { ContainerCanvas } from './ContainerCanvas';
import { v4 as uuid } from 'uuid';

export interface ContainerBlock {
  id: string;
  type: 'container';
  children: (ContainerBlock | ContentBlock)[];
  // Style props
  link?: string;
  width?: string;
  widthUnit?: 'percent' | 'fill' | 'px' | 'fit-content';
  height?: string;
  heightUnit?: 'percent' | 'fill' | 'px' | 'fit-content' | 'vh';
  layoutType?: 'stack' | 'grid';
  direction?: 'horizontal' | 'vertical';
  distribute?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'left' | 'center' | 'right';
  gap?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  opacity?: number;
  fillType?: 'none' | 'solid' | 'image' | 'video';
  fillColor?: string;
  fillSrc?: string;
  overflow?: 'clip' | 'visible' | 'hidden' | 'scroll';
  radiusTop?: number;
  radiusRight?: number;
  radiusBottom?: number;
  radiusLeft?: number;
  borderColor?: string;
  borderTop?: number;
  borderRight?: number;
  borderBottom?: number;
  borderLeft?: number;
}

export interface ContentBlock {
  id: string;
  type: 'image' | 'video' | 'text';
  // image / video
  src?: string;
  alt?: string;
  // text
  textType?: 'heading' | 'paragraph';
  content?: string;
  // style
  width?: string;
  widthUnit?: 'percent' | 'fill' | 'px' | 'fit-content';
  height?: string;
  heightUnit?: 'percent' | 'fill' | 'px' | 'fit-content' | 'vh';
  link?: string;
  opacity?: number;
  overflow?: 'clip' | 'visible' | 'hidden' | 'scroll';
  radiusTop?: number;
  radiusRight?: number;
  radiusBottom?: number;
  radiusLeft?: number;
  borderColor?: string;
  borderTop?: number;
  borderRight?: number;
  borderBottom?: number;
  borderLeft?: number;
}

export type AnyBlock = ContainerBlock | ContentBlock;

function createContainer(): ContainerBlock {
  return {
    id: `c-${uuid().slice(0, 8)}`,
    type: 'container',
    children: [],
    layoutType: 'stack',
    direction: 'horizontal',
    distribute: 'start',
    align: 'left',
    gap: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    opacity: 10,
    fillType: 'none',
    overflow: 'clip',
    radiusTop: 0,
    radiusRight: 0,
    radiusBottom: 0,
    radiusLeft: 0,
    borderTop: 0,
    borderRight: 0,
    borderBottom: 0,
    borderLeft: 0,
  };
}

interface Project {
  _id: string;
  title: string;
  slug?: string;
  code?: string;
  show?: boolean;
  builderLayout?: any;
}

export function CaseStudyBuilder({ project }: { project: Project }) {
  const [blocks, setBlocks] = useState<ContainerBlock[]>(() => {
    if (!project.builderLayout) return [];
    try {
      if (typeof project.builderLayout === 'string') {
        return JSON.parse(project.builderLayout);
      }
      if (Array.isArray(project.builderLayout)) {
        return project.builderLayout;
      }
    } catch (e) {
      console.error('Failed to parse builder layout:', e);
    }
    return [];
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  // Find selected block anywhere in the tree
  const selectedBlock = selectedId ? findBlock(blocks, selectedId) : null;

  function addRootContainer() {
    const c = createContainer();
    setBlocks((prev) => [...prev, c]);
    setSelectedId(c.id);
  }

  function addContainerAfter(afterId: string) {
    const c = createContainer();
    setBlocks((prev) => addAfterBlock(prev, afterId, c));
    setSelectedId(c.id);
  }

  function addChildContainer(parentId: string) {
    const c = createContainer();
    setBlocks((prev) => addChildToBlock(prev, parentId, c));
    setSelectedId(c.id);
  }

  function addContentBlock(parentId: string, contentType: ContentBlock['type']) {
    const block: ContentBlock = {
      id: `blk-${uuid().slice(0, 8)}`,
      type: contentType,
      widthUnit: 'fill',
      opacity: 10,
      overflow: 'clip',
      textType: contentType === 'text' ? 'paragraph' : undefined,
      content: contentType === 'text' ? 'Enter text here…' : undefined,
    };
    setBlocks((prev) => addChildToBlock(prev, parentId, block));
    setSelectedId(block.id);
  }

  function updateBlock(id: string, updates: Partial<AnyBlock>) {
    setBlocks((prev) => updateBlockInTree(prev, id, updates));
  }

  function deleteBlock(id: string) {
    setBlocks((prev) => deleteBlockFromTree(prev, id));
    if (selectedId === id) setSelectedId(null);
  }

  async function handleSave() {
    setSaving(true);
    setSaveStatus('idle');
    try {
      const res = await fetch(`/api/admin/projects/${project._id}/layout`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks }),
      });
      setSaveStatus(res.ok ? 'saved' : 'error');
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus('idle'), 2500);
    }
  }

  // Keyboard shortcut: Cmd+S / Ctrl+S
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [blocks]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#0f0f0f',
        color: '#fff',
        fontFamily: 'monospace',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          height: '48px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexShrink: 0,
          backgroundColor: '#141414',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            href="/admin/projects"
            style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Projects
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
          <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>
            {project.title}
          </span>
          {project.code && (
            <span
              style={{
                fontSize: '9px',
                color: '#b86043',
                backgroundColor: 'rgba(184,96,67,0.15)',
                padding: '2px 6px',
                borderRadius: '2px',
                letterSpacing: '0.04em',
              }}
            >
              {project.code}
            </span>
          )}
          <span
            style={{
              fontSize: '9px',
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Case Study Editor
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {project.slug && (
            <Link
              href={`/werks/${project.slug}`}
              target="_blank"
              style={{
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Preview ↗
            </Link>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '7px 18px',
              backgroundColor:
                saveStatus === 'saved'
                  ? '#22c55e'
                  : saveStatus === 'error'
                  ? '#ef4444'
                  : '#b86043',
              color: '#fff',
              border: 'none',
              borderRadius: '2px',
              fontFamily: 'monospace',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: saving ? 'wait' : 'pointer',
              opacity: saving ? 0.7 : 1,
              transition: 'background-color 0.2s',
              fontWeight: 600,
            }}
          >
            {saving
              ? 'Saving…'
              : saveStatus === 'saved'
              ? '✓ Saved'
              : saveStatus === 'error'
              ? 'Error'
              : 'Save (⌘S)'}
          </button>
        </div>
      </div>

      {/* Editor body: 2-pane layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: Canvas */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#181818',
            padding: '24px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedId(null);
          }}
        >
          {/* Add root container button */}
          <div
            style={{
              marginBottom: '16px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <button
              onClick={addRootContainer}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px dashed rgba(255,255,255,0.2)',
                borderRadius: '3px',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'monospace',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.2" />
                <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              + Add Container
            </button>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
              Add a container, then nest child containers or content elements inside.
            </span>
          </div>

          {/* Canvas blocks */}
          {blocks.length === 0 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '420px',
                border: '1px dashed rgba(255,255,255,0.08)',
                borderRadius: '4px',
                flexDirection: 'column',
                gap: '12px',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.3 }}>
                <rect x="2" y="2" width="28" height="28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="16" y1="8" x2="16" y2="24" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#fff',
                }}
              >
                No containers yet
              </span>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', maxWidth: '300px', textAlign: 'center', lineHeight: 1.5 }}>
                Click &quot;+ Add Container&quot; above to create your first case study section.
              </span>
            </div>
          ) : (
            <ContainerCanvas
              blocks={blocks}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onAddAfter={addContainerAfter}
              onAddChild={addChildContainer}
              onAddContent={addContentBlock}
              onDelete={deleteBlock}
              onUpdate={updateBlock}
            />
          )}
        </div>

        {/* Right: Style Bar */}
        <div
          style={{
            width: '280px',
            flexShrink: 0,
            backgroundColor: '#141414',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            overflow: 'auto',
          }}
        >
          <RightStyleBar
            block={selectedBlock}
            onUpdate={(updates) => {
              if (selectedId) updateBlock(selectedId, updates);
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Tree utilities ────────────────────────────────────────────────────────────

function findBlock(blocks: ContainerBlock[], id: string): AnyBlock | null {
  for (const block of blocks) {
    if (block.id === id) return block;
    if ('children' in block) {
      const found = findBlock(block.children as ContainerBlock[], id);
      if (found) return found;
    }
  }
  return null;
}

function addAfterBlock(blocks: ContainerBlock[], afterId: string, newBlock: ContainerBlock): ContainerBlock[] {
  const idx = blocks.findIndex((b) => b.id === afterId);
  if (idx !== -1) {
    const result = [...blocks];
    result.splice(idx + 1, 0, newBlock);
    return result;
  }
  return blocks.map((b) => {
    if (!b.children) return b;
    const childIdx = b.children.findIndex((c) => c.id === afterId);
    if (childIdx !== -1) {
      const nextChildren = [...b.children];
      nextChildren.splice(childIdx + 1, 0, newBlock);
      return { ...b, children: nextChildren };
    }
    return {
      ...b,
      children: b.children.map((c) => (c.type === 'container' ? addAfterBlock([c], afterId, newBlock)[0] : c)),
    };
  });
}

function addChildToBlock(blocks: ContainerBlock[], parentId: string, child: AnyBlock): ContainerBlock[] {
  return blocks.map((block) => {
    if (block.id === parentId) {
      return { ...block, children: [...(block.children || []), child] };
    }
    if (block.children && block.children.length > 0) {
      return {
        ...block,
        children: block.children.map((c) =>
          c.type === 'container' ? addChildToBlock([c], parentId, child)[0] : c
        ),
      };
    }
    return block;
  });
}

function updateBlockInTree(blocks: ContainerBlock[], id: string, updates: Partial<AnyBlock>): ContainerBlock[] {
  return blocks.map((block) => {
    if (block.id === id) {
      return { ...block, ...updates } as ContainerBlock;
    }
    if (block.children && block.children.length > 0) {
      return {
        ...block,
        children: block.children.map((c) => {
          if (c.id === id) return { ...c, ...updates } as (ContainerBlock | ContentBlock);
          if (c.type === 'container') return updateBlockInTree([c], id, updates)[0];
          return c;
        }),
      };
    }
    return block;
  });
}

function deleteBlockFromTree(blocks: ContainerBlock[], id: string): ContainerBlock[] {
  return blocks
    .filter((b) => b.id !== id)
    .map((block) => {
      if (block.children && block.children.length > 0) {
        return {
          ...block,
          children: block.children
            .filter((c) => c.id !== id)
            .map((c) => (c.type === 'container' ? deleteBlockFromTree([c], id)[0] : c)),
        };
      }
      return block;
    });
}
