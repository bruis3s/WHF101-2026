'use client';

import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.page}>
      {/* Spacer — pushes content to bottom */}
      <div className={styles.spacer} />

      {/* Bottom info section */}
      <section className={styles.info}>
        {/* Group 1 (Left - 45% width, space-between) */}
        <div className={styles.group1}>
          <span className={styles.label}>introduction</span>
          <div className={styles.groupContent}>
            {/* a: section */}
            <div className={styles.entryRow}>
              <span className={styles.prefix}>a:</span>
              <span className={styles.entryValue}>
                an Explorative Architecture, Objects and Spatial Design Practice.
              </span>
            </div>

            {/* Contact section */}
            <div className={styles.contactSection}>
              <div className={styles.entryRow}>
                <span className={styles.prefix}>e:</span>
                <a href="mailto:hafwerks@gmail.com" className={styles.entryValue}>
                  hafwerks@gmail.com
                </a>
              </div>
              <div className={styles.entryRow}>
                <span className={styles.prefix}>p:</span>
                <a href="tel:+627880480035" className={styles.entryValue}>
                  +62 7880480035
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Group 2 (Right - 45% width, space-between) */}
        <div className={styles.group2}>
          <span className={styles.label}>studio</span>
          <div className={styles.groupContent}>
            <span>Cirendeu, Tangerang Selatan</span>
          </div>
        </div>
      </section>
    </main>
  );
}
