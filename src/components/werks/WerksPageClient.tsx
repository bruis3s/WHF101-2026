'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from '@/app/werks/page.module.css';
import framerRowsData from '@/data/framerWorks.json';
import framerListWorksData from '@/data/framerListWorks.json';

interface ListItem {
  code: string;
  title: string;
  category: string;
  location: string;
  year: string;
  slug: string;
}

type SortKey = 'code' | 'title' | 'category' | 'location' | 'year';

interface WorkItem {
  title: string;
  category: string;
  year: string;
  width: string;
  aspectRatio: number;
  imgUrl: string;
  slug: string;
  code?: string;
  location?: string;
}

interface FramerRow {
  rowIndex: number;
  justify: string;
  gap: string;
  items: WorkItem[];
}

interface ProjectProp {
  _id: string;
  title: string;
  slug: string;
  code?: string;
  projectType?: string;
  year: string;
  location?: string;
  coverImage?: any;
  coverImageUrl?: string;
  discipline?: string[];
}

function WorkCard({ item }: { item: WorkItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/werks/${item.slug}`}
      className={styles.cardLink}
      style={{ width: item.width }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div
        className={styles.imageContainer}
        style={{ aspectRatio: `${item.aspectRatio}` }}
      >
        {item.imgUrl ? (
          <Image
            src={item.imgUrl}
            alt={item.title}
            fill
            sizes="(max-width: 809px) 100vw, 50vw"
            className={styles.cardImage}
          />
        ) : (
          <div className={styles.placeholderBox}>
            <span>{item.title}</span>
          </div>
        )}

        {/* Slide-in caption on hover (from left to right) */}
        <motion.div
          className={styles.captionOverlay}
          initial={false}
          animate={{ x: isHovered ? 0 : '-101%' }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
        >
          <div className={styles.captionLine}>
            <span className={styles.captionTitle}>{item.title}</span>
          </div>
          <div className={styles.captionLine}>
            <span className={styles.captionMeta}>{item.category}</span>
          </div>
          <div className={styles.captionLine}>
            <span className={styles.captionMeta}>{item.year}</span>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}

export function WerksPageClient({
  projects,
  initialView = 'grid',
}: {
  projects: ProjectProp[];
  initialView?: 'grid' | 'list';
}) {
  const pathname = usePathname();
  const view: 'grid' | 'list' =
    pathname === '/werks/list' || pathname === '/list' || initialView === 'list'
      ? 'list'
      : 'grid';

  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Use the exact editorial rows from worksgrid (framerRowsData)
  const rows: FramerRow[] = framerRowsData as unknown as FramerRow[];

  // Full editorial list from haf.framer.website-export.html
  const listItems = useMemo(() => {
    const rawList: ListItem[] = framerListWorksData as ListItem[];
    if (!sortKey) return rawList;
    return [...rawList].sort((a, b) => {
      const valA = (a[sortKey] || '').toLowerCase();
      const valB = (b[sortKey] || '').toLowerCase();
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection(key === 'year' ? 'desc' : 'asc');
    }
  };

  return (
    <main
      data-page={view === 'list' ? 'werks-list' : 'werks-grid'}
      className={view === 'list' ? styles.listPage : styles.page}
    >
      {/* Main Content Area */}
      {view === 'grid' ? (
        <div className={styles.worksContainer}>
          {rows.map((row) => (
            <div
              key={`row-${row.rowIndex}`}
              className={styles.workRow}
              style={{
                justifyContent: row.justify,
                gap: row.gap,
              }}
            >
              {row.items.map((item, colIdx) => (
                <WorkCard key={`card-${row.rowIndex}-${colIdx}`} item={item} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        /* Architectural List View (From haf.framer.website-export.html) */
        <div className={styles.listView}>
            {/* Header with Title Case & Sort Controls */}
            <div className={styles.listHeader}>
              <div className={styles.colId}>
                <button
                  type="button"
                  className={styles.headerButton}
                  onClick={() => handleSort('code')}
                >
                  <span>Id</span>
                  {sortKey === 'code' ? (
                    <div className={styles.sortIconWrapper}>
                      <svg
                        viewBox="0 0 11.16 8.58"
                        className={`${styles.sortArrow} ${styles.sortArrowActive}`}
                        style={{ transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none' }}
                      >
                        <path d="M11.158 8.583l-11.158 0 5.802-8.583 5.356 8.583z" fill="currentColor" />
                      </svg>
                    </div>
                  ) : (
                    <div className={styles.sortSpacer} />
                  )}
                </button>
              </div>

              <div className={styles.colTitle}>
                <button
                  type="button"
                  className={styles.headerButton}
                  onClick={() => handleSort('title')}
                >
                  <span>Title</span>
                  {sortKey === 'title' ? (
                    <div className={styles.sortIconWrapper}>
                      <svg
                        viewBox="0 0 11.16 8.58"
                        className={`${styles.sortArrow} ${styles.sortArrowActive}`}
                        style={{ transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none' }}
                      >
                        <path d="M11.158 8.583l-11.158 0 5.802-8.583 5.356 8.583z" fill="currentColor" />
                      </svg>
                    </div>
                  ) : (
                    <div className={styles.sortSpacer} />
                  )}
                </button>
              </div>

              <div className={styles.colType}>
                <button
                  type="button"
                  className={styles.headerButton}
                  onClick={() => handleSort('category')}
                >
                  <span>Type</span>
                  <div className={styles.sortIconWrapper}>
                    <svg
                      viewBox="0 0 11.16 8.58"
                      className={`${styles.sortArrow} ${sortKey === 'category' ? styles.sortArrowActive : ''}`}
                      style={{ transform: sortKey === 'category' && sortDirection === 'desc' ? 'rotate(180deg)' : 'none' }}
                    >
                      <path d="M11.158 8.583l-11.158 0 5.802-8.583 5.356 8.583z" fill="currentColor" />
                    </svg>
                  </div>
                </button>
              </div>

              <div className={styles.colLocation}>
                <button
                  type="button"
                  className={styles.headerButton}
                  onClick={() => handleSort('location')}
                >
                  <span>Location</span>
                  {sortKey === 'location' ? (
                    <div className={styles.sortIconWrapper}>
                      <svg
                        viewBox="0 0 11.16 8.58"
                        className={`${styles.sortArrow} ${styles.sortArrowActive}`}
                        style={{ transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none' }}
                      >
                        <path d="M11.158 8.583l-11.158 0 5.802-8.583 5.356 8.583z" fill="currentColor" />
                      </svg>
                    </div>
                  ) : (
                    <div className={styles.sortSpacer} />
                  )}
                </button>
              </div>

              <div className={styles.colYear}>
                <button
                  type="button"
                  className={styles.headerButton}
                  onClick={() => handleSort('year')}
                >
                  <span>Year</span>
                  <div className={styles.sortIconWrapper}>
                    <svg
                      viewBox="0 0 11.16 8.58"
                      className={`${styles.sortArrow} ${sortKey === 'year' ? styles.sortArrowActive : ''}`}
                      style={{ transform: sortKey === 'year' && sortDirection === 'desc' ? 'rotate(180deg)' : 'none' }}
                    >
                      <path d="M11.158 8.583l-11.158 0 5.802-8.583 5.356 8.583z" fill="currentColor" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Architectural Rows */}
            {listItems.map((item, idx) => (
              <Link
                key={`list-${item.slug}-${idx}`}
                href={`/werks/${item.slug}`}
                className={styles.listRow}
              >
                <div className={styles.colId}>
                  <div className={styles.cellBox}>
                    <span>{item.code}</span>
                  </div>
                </div>
                <div className={styles.colTitle}>
                  <div className={styles.cellBox}>
                    <span>{item.title}</span>
                  </div>
                </div>
                <div className={styles.colType}>
                  <div className={styles.cellBox}>
                    <span>{item.category}</span>
                  </div>
                </div>
                <div className={styles.colLocation}>
                  <div className={styles.cellBox}>
                    <span>{item.location}</span>
                  </div>
                </div>
                <div className={styles.colYear}>
                  <div className={styles.cellBox}>
                    <span>{item.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
      )}

      {/* Floating Bottom View Switcher (Grid | List | Explore) */}
      <nav className={styles.bottomBar} aria-label="Works view switcher">
        <Link href="/werks" className={styles.switcherButton}>
          <span
            className={`${styles.radioCircle} ${
              view === 'grid' ? styles.radioCircleActive : ''
            }`}
          />
          <span>Grid</span>
        </Link>

        <Link href="/werks/list" className={styles.switcherButton}>
          <span
            className={`${styles.radioCircle} ${
              view === 'list' ? styles.radioCircleActive : ''
            }`}
          />
          <span>List</span>
        </Link>

        <Link href="/archive" className={styles.switcherButton}>
          <span className={styles.radioCircle} />
          <span>Explore</span>
        </Link>
      </nav>
    </main>
  );
}
