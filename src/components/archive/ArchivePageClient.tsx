'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/archive/page.module.css';
import { urlFor } from '@/sanity/image';

interface ArchiveItem {
  _id: string;
  title: string;
  image?: any;
  caption?: string;
  material?: string;
  year?: string;
  tags?: string[];
  linkedProject?: {
    _id: string;
    title: string;
    slug: string;
    code: string;
  };
}

export function ArchivePageClient({ items }: { items: ArchiveItem[] }) {
  const [filter, setFilter] = useState<string>('All');

  const allTags = ['All', ...Array.from(new Set(items.flatMap((i) => i.tags || [])))];
  const filtered = filter === 'All' ? items : items.filter((i) => i.tags?.includes(filter));

  return (
    <main className={styles.page}>
      {/* Title */}
      <div className={styles.titleBar}>
        <span className={styles.sectionLabel}>
          archive ({filtered.length})
        </span>
      </div>

      {/* Tag Filter Bar */}
      {allTags.length > 1 && (
        <nav className={styles.filterBar} aria-label="Tag filters">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`${styles.filterButton} ${filter === tag ? styles.filterButtonActive : ''}`}
            >
              {tag}
            </button>
          ))}
        </nav>
      )}

      {/* Items Grid */}
      {filtered.length === 0 ? (
        <div>
          <span className={styles.emptyState}>No archive items found.</span>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((item) => {
            const imgSrc = item.image
              ? urlFor(item.image).width(700).height(700).url()
              : null;

            const cardContent = (
              <>
                <div className={styles.imageWrapper}>
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={item.caption || item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.image}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>{item.title}</span>
                    </div>
                  )}
                </div>

                <div className={styles.itemInfo}>
                  <div className={styles.itemTitleRow}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    {item.year && <span className={styles.itemYear}>{item.year}</span>}
                  </div>
                  <div className={styles.itemMetaRow}>
                    <span className={styles.itemMaterial}>
                      {item.material || item.tags?.[0] || 'Object'}
                    </span>
                    {item.linkedProject && (
                      <span className={styles.itemProject}>{item.linkedProject.title}</span>
                    )}
                  </div>
                </div>
              </>
            );

            if (item.linkedProject?.slug) {
              return (
                <Link
                  key={item._id}
                  href={`/werks/${item.linkedProject.slug}`}
                  className={styles.itemCard}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={item._id} className={styles.itemCard}>
                {cardContent}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
