'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ContainerBlock, ContentBlock, AnyBlock } from '@/components/admin/CaseStudyBuilder';

export function CaseStudyRenderer({ blocks }: { blocks: ContainerBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="case-study-rendered" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {blocks.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function RenderBlock({ block }: { block: AnyBlock }) {
  if (block.type === 'container') {
    return <RenderContainer container={block as ContainerBlock} />;
  }
  return <RenderContent block={block as ContentBlock} />;
}

function RenderContainer({ container }: { container: ContainerBlock }) {
  const isHorizontal = container.direction !== 'vertical';
  const isGrid = container.layoutType === 'grid';

  const style: React.CSSProperties = {
    position: 'relative',
    display: isGrid ? 'grid' : 'flex',
    flexDirection: isGrid ? undefined : isHorizontal ? 'row' : 'column',
    gridTemplateColumns: isGrid ? 'repeat(auto-fit, minmax(280px, 1fr))' : undefined,
    alignItems:
      container.align === 'center'
        ? 'center'
        : container.align === 'right'
        ? 'flex-end'
        : 'flex-start',
    justifyContent:
      container.distribute === 'center'
        ? 'center'
        : container.distribute === 'end'
        ? 'flex-end'
        : container.distribute === 'space-between'
        ? 'space-between'
        : container.distribute === 'space-around'
        ? 'space-around'
        : container.distribute === 'space-evenly'
        ? 'space-evenly'
        : 'flex-start',
    gap: container.gap !== undefined ? `${container.gap}px` : '16px',
    paddingTop: container.paddingTop !== undefined ? `${container.paddingTop}px` : '0px',
    paddingRight: container.paddingRight !== undefined ? `${container.paddingRight}px` : '0px',
    paddingBottom: container.paddingBottom !== undefined ? `${container.paddingBottom}px` : '0px',
    paddingLeft: container.paddingLeft !== undefined ? `${container.paddingLeft}px` : '0px',
    opacity: container.opacity !== undefined ? container.opacity / 10 : 1,
    overflow: container.overflow || 'visible',
    borderRadius: `${container.radiusTop || 0}px ${container.radiusRight || 0}px ${container.radiusBottom || 0}px ${container.radiusLeft || 0}px`,
    borderTop: container.borderTop ? `${container.borderTop}px solid ${container.borderColor || '#000'}` : undefined,
    borderRight: container.borderRight ? `${container.borderRight}px solid ${container.borderColor || '#000'}` : undefined,
    borderBottom: container.borderBottom ? `${container.borderBottom}px solid ${container.borderColor || '#000'}` : undefined,
    borderLeft: container.borderLeft ? `${container.borderLeft}px solid ${container.borderColor || '#000'}` : undefined,
    backgroundColor: container.fillType === 'solid' ? container.fillColor : undefined,
    width:
      container.widthUnit === 'fill'
        ? '100%'
        : container.widthUnit === 'fit-content'
        ? 'fit-content'
        : container.width || '100%',
    height:
      container.heightUnit === 'fill'
        ? '100%'
        : container.heightUnit === 'fit-content'
        ? 'fit-content'
        : container.heightUnit === 'vh'
        ? `${container.height || 100}vh`
        : container.heightUnit === 'percent'
        ? `${container.height || 100}%`
        : container.heightUnit === 'px'
        ? `${container.height || 400}px`
        : container.height || 'auto',
    minHeight: container.heightUnit === 'vh' ? `${container.height || 100}vh` : undefined,
    flexWrap: isHorizontal && !isGrid ? 'wrap' : undefined,
    boxSizing: 'border-box',
  };

  const content = (
    <div style={style}>
      {/* Background Media */}
      {container.fillType === 'image' && container.fillSrc && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <img
            src={container.fillSrc}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      {container.fillType === 'video' && container.fillSrc && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <video
            src={container.fillSrc}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Children */}
      {container.children &&
        container.children.map((child) => (
          <RenderBlock key={child.id} block={child} />
        ))}
    </div>
  );

  if (container.link) {
    return (
      <Link href={container.link} style={{ display: 'contents', textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
}

function RenderContent({ block }: { block: ContentBlock }) {
  const style: React.CSSProperties = {
    position: 'relative',
    opacity: block.opacity !== undefined ? block.opacity / 10 : 1,
    borderRadius: `${block.radiusTop || 0}px ${block.radiusRight || 0}px ${block.radiusBottom || 0}px ${block.radiusLeft || 0}px`,
    overflow: block.overflow || 'visible',
    width:
      block.widthUnit === 'fill'
        ? '100%'
        : block.widthUnit === 'fit-content'
        ? 'fit-content'
        : block.width || '100%',
    height:
      block.heightUnit === 'fill'
        ? '100%'
        : block.heightUnit === 'fit-content'
        ? 'fit-content'
        : block.heightUnit === 'vh'
        ? `${block.height || 100}vh`
        : block.heightUnit === 'percent'
        ? `${block.height || 100}%`
        : block.heightUnit === 'px'
        ? `${block.height || 400}px`
        : block.height || 'auto',
    minHeight: block.heightUnit === 'vh' ? `${block.height || 100}vh` : undefined,
    borderTop: block.borderTop ? `${block.borderTop}px solid ${block.borderColor || '#000'}` : undefined,
    borderRight: block.borderRight ? `${block.borderRight}px solid ${block.borderColor || '#000'}` : undefined,
    borderBottom: block.borderBottom ? `${block.borderBottom}px solid ${block.borderColor || '#000'}` : undefined,
    borderLeft: block.borderLeft ? `${block.borderLeft}px solid ${block.borderColor || '#000'}` : undefined,
    flex: block.widthUnit === 'fill' ? 1 : undefined,
  };

  let element: React.ReactNode = null;

  if (block.type === 'text') {
    if (block.textType === 'heading') {
      element = (
        <h2
          style={{
            margin: 0,
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'inherit',
          }}
        >
          {block.content || 'Heading Text'}
        </h2>
      );
    } else {
      element = (
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'var(--text-secondary, #555)',
            letterSpacing: '-0.01em',
            maxWidth: '680px',
          }}
        >
          {block.content || 'Paragraph text content…'}
        </p>
      );
    }
  } else if (block.type === 'image') {
    element = block.src ? (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <img
          src={block.src}
          alt={block.alt || ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    ) : (
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: 'rgba(0,0,0,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-tertiary, #999)',
          fontFamily: 'monospace',
          fontSize: '11px',
        }}
      >
        Image Block
      </div>
    );
  } else if (block.type === 'video') {
    element = block.src ? (
      <video
        src={block.src}
        controls
        playsInline
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    ) : (
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: '11px',
        }}
      >
        Video Block
      </div>
    );
  }

  const wrapped = <div style={style}>{element}</div>;

  if (block.link) {
    return (
      <Link href={block.link} style={{ textDecoration: 'none', color: 'inherit' }}>
        {wrapped}
      </Link>
    );
  }

  return wrapped;
}
