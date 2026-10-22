import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { getProjectBySlug, getAllProjects } from '@/sanity/queries/projects';
import { urlFor } from '@/sanity/image';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
    if (!projects || projects.length === 0) {
      return [{ slug: '_preview' }];
    }
    return projects.map((p: any) => ({ slug: p.slug }));
  } catch {
    return [{ slug: '_preview' }];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found — HAF WERKS' };
  return {
    title: `${project.title} — HAF WERKS`,
    description: project.subtitle || project.description?.[0] || '',
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return notFound();

  // Extract cover image
  const coverSrc = project.coverImageUrl
    ? project.coverImageUrl
    : project.coverImage
    ? urlFor(project.coverImage).width(1600).url()
    : null;

  return (
    <main className={styles.page}>
      {/* Back button */}
      <nav className={styles.navBar} aria-label="Breadcrumb">
        <Link href="/werks" className={styles.backButton}>
          <span className={styles.arrow}>◀</span>
          <span>Werks</span>
        </Link>
      </nav>

      {/* Project Title & Description Grid */}
      <section className={styles.projectHeader}>
        <span className={`${styles.projectTitle} ${styles.col1}`}>
          {project.title}
        </span>
        <span className={`${styles.projectCode} ${styles.col2}`}>
          {project.code || '—'}
        </span>
        <div className={`${styles.description} ${styles.col3}`}>
          {Array.isArray(project.description) ? (
            project.description.map((p: any, i: number) => (
              <p key={i} style={{ marginBottom: i < project.description.length - 1 ? '16px' : 0 }}>
                {typeof p === 'string' ? p : p.children?.map((c: any) => c.text).join('') || ''}
              </p>
            ))
          ) : (
            <p>{project.subtitle || project.description || 'Architectural project by HAF WERKS.'}</p>
          )}
        </div>
      </section>

      {/* Metadata & Specs Grid */}
      <section className={styles.metaGrid}>
        <span className={`${styles.projectTitle} ${styles.col1}`}>details</span>
        <div className={`${styles.specList} ${styles.col3}`}>
          {project.year && (
            <div className={styles.specRow}>
              <span className={styles.specKey}>Year</span>
              <span className={styles.specValue}>{project.year}</span>
            </div>
          )}
          {project.location && (
            <div className={styles.specRow}>
              <span className={styles.specKey}>Location</span>
              <span className={styles.specValue}>{project.location}</span>
            </div>
          )}
          {project.projectType && (
            <div className={styles.specRow}>
              <span className={styles.specKey}>Typology</span>
              <span className={styles.specValue}>{project.projectType}</span>
            </div>
          )}
          {project.client && (
            <div className={styles.specRow}>
              <span className={styles.specKey}>Client</span>
              <span className={styles.specValue}>{project.client}</span>
            </div>
          )}
          {project.discipline && project.discipline.length > 0 && (
            <div className={styles.specRow}>
              <span className={styles.specKey}>Discipline</span>
              <span className={styles.specValue}>{project.discipline.join(', ')}</span>
            </div>
          )}
        </div>
      </section>

      {/* Gallery / Visual Content */}
      <section className={styles.gallery}>
        {/* Hero Cover Image */}
        {coverSrc && (
          <div className={styles.imageCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={coverSrc}
                alt={project.title}
                fill
                priority
                sizes="100vw"
                className={styles.image}
              />
            </div>
            <span className={styles.caption}>{project.title} — Overview</span>
          </div>
        )}

        {/* Layout Rows from Sanity */}
        {project.layoutRows &&
          project.layoutRows.map((row: any, rIdx: number) => {
            const cols = row.columns || [];
            if (cols.length === 0) return null;

            return (
              <div key={row._key || rIdx} className={styles.imageRow}>
                {cols.map((col: any, cIdx: number) => {
                  const colSrc = col.image ? urlFor(col.image).width(1200).url() : null;
                  if (!colSrc) return null;

                  return (
                    <div key={col._key || cIdx} className={styles.imageCard}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={colSrc}
                          alt={col.caption || `${project.title} detail`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className={styles.image}
                        />
                      </div>
                      {col.caption && <span className={styles.caption}>{col.caption}</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </section>
    </main>
  );
}
