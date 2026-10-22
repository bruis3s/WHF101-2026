'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './HeaderNav.module.css';

const navItems = [
  { href: '/werks', label: 'Werks' },
  { href: '/archive', label: 'Archive' },
  { href: '/information', label: 'Information' },
];

const springTransition = {
  type: 'spring' as const,
  duration: 0.5,
  bounce: 0.2,
};

const itemVariants = {
  closed: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none' as const,
    zIndex: 1,
    transition: springTransition,
  },
  open: {
    position: 'relative' as const,
    top: 0,
    left: 0,
    opacity: 1,
    pointerEvents: 'auto' as const,
    zIndex: 2,
    transition: springTransition,
  },
};

export function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Fixed Top-Left Logo (T:0, L:0) ── */}
      <div className={styles.logoFixed}>
        <Link href="/" className={`${styles.navButton} ${styles.logoButton}`} aria-label="HAF WERKS Home">
          <span>H A F WERKS</span>
          <span className={styles.logoDot}>·</span>
        </Link>
      </div>

      {/* ── Fixed Top-Right Menu (T:0, R:0) ── */}
      <div className={styles.menuFixed}>
        <motion.nav
          layout
          className={styles.menuContainer}
          transition={springTransition}
          aria-label="Main Navigation"
        >
          <motion.button
            layout
            className={styles.navButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{ zIndex: 10 }}
            transition={springTransition}
          >
            <span className={styles.menuArrow}>{menuOpen ? '▶' : '◀'}</span>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </motion.button>

          {navItems.map((item) => (
            <motion.div
              key={item.href}
              layout
              initial={false}
              animate={menuOpen ? 'open' : 'closed'}
              variants={itemVariants}
              transition={springTransition}
              className={styles.navItemWrapper}
            >
              <Link
                href={item.href}
                className={styles.navButton}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </div>
    </>
  );
}

// Re-export as HeaderMenu for backward compatibility
export { HeaderNav as HeaderMenu };
