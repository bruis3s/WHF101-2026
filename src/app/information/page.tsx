import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Information — HAF WERKS',
  description:
    'H A F WERKS is an Explorative Architecture, Objects and Spatial Design Practice, established in 2020 in Cirendeu, Tangerang Selatan.',
};

export default function InformationPage() {
  return (
    <main data-page="information" className={styles.page}>
      <div className={styles.topSection}>
        {/* Row 1: about studio + paragraph */}
        <div className={styles.gridRow}>
          <div className={styles.col1}>
            <span className={styles.whiteBlock}>about studio</span>
          </div>
          <div className={styles.col3}>
            <div className={styles.paragraphBlock}>
              <p className={styles.paragraphText}>
                H A F WERKS is an Explorative Architecture, Objects and Spatial Design
                Practice, established in 2020. H A F WERKS&apos;s believe in the freedom of playing
                around with different styles, tweaking geometrical forms, narrating fun
                spatial sequences, and trying out non-building materials. With their playful
                approach in design, H A F WERKS built many Architectures, Interior &amp;
                Product Design.
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: services label + services list */}
        <div className={`${styles.gridRow} ${styles.servicesRow}`}>
          <div className={styles.col2}>
            <span className={styles.whiteBlock}>services</span>
          </div>
          <div className={styles.col3}>
            <div className={styles.servicesList}>
              <span className={styles.whiteBlock}>Residential</span>
              <span className={styles.whiteBlock}>Commercial</span>
              <span className={styles.whiteBlock}>Installation</span>
              <span className={styles.whiteBlock}>Object</span>
            </div>
          </div>
        </div>

        {/* Row 3: people */}
        <div className={`${styles.gridRow} ${styles.sectionRow}`}>
          <div className={styles.col1}>
            <span className={styles.whiteBlock}>people</span>
          </div>
          <div className={styles.col3}>
            <div className={styles.peopleBlock}>
              <p className={styles.peopleText}>
                Hanandy Andrianto, Oriana Eidelweiss, Savira Hutami Nusi, Marsha Naufal, Sara Setiadi, Galih Mardhotilah
              </p>
            </div>
          </div>
        </div>

        {/* Row 4: studio */}
        <div className={`${styles.gridRow} ${styles.sectionRow}`}>
          <div className={styles.col1}>
            <span className={styles.whiteBlock}>studio</span>
          </div>
          <div className={styles.col3}>
            <span className={styles.whiteBlock}>Cirendeu, Tangerang Selatan</span>
          </div>
        </div>
      </div>

      {/* Spacer to push contact section to bottom of viewport */}
      <div className={styles.spacer} />

      {/* Bottom Section: contact */}
      <div className={styles.bottomSection}>
        <div className={styles.gridRow}>
          <div className={styles.col2}>
            <span className={styles.whiteBlock}>contact</span>
          </div>
          <div className={styles.col3}>
            <div className={styles.contactList}>
              <div className={styles.contactEntry}>
                <span className={styles.prefix}>e:</span>
                <a href="mailto:hafwerks@gmail.com" className={styles.link}>
                  hafwerks@gmail.com
                </a>
              </div>
              <div className={styles.contactEntry}>
                <span className={styles.prefix}>p:</span>
                <a href="tel:+627880480035" className={styles.link}>
                  +62 7880480035
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
