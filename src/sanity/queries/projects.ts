import { groq } from 'next-sanity';
import { client } from '../client';

// ── Fetch all visible projects (for Werks page) ──────────────────────────────
export const PROJECTS_QUERY = groq`
  *[_type == "project" && show == true] | order(year desc) {
    _id,
    title,
    "slug": slug.current,
    code,
    projectType,
    year,
    location,
    coverImage,
    coverImageUrl,
    discipline,
    subtitle
  }
`;

export async function getAllProjects() {
  'use cache';
  return client.fetch(PROJECTS_QUERY);
}

// ── Fetch all projects including hidden (for admin) ───────────────────────────
export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    code,
    projectType,
    year,
    location,
    coverImage,
    coverImageUrl,
    show,
    discipline,
    subtitle,
    _createdAt,
    _updatedAt
  }
`;

export async function getAllProjectsAdmin() {
  return client.fetch(ALL_PROJECTS_QUERY, {}, { cache: 'no-store' });
}

// ── Fetch single project by slug (for Case Study page) ───────────────────────
export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    code,
    projectType,
    subtitle,
    year,
    location,
    client,
    discipline,
    description,
    specs,
    coverImage,
    coverImageUrl,
    layoutRows[] {
      _key,
      title,
      gap,
      verticalAlign,
      paddingTop,
      paddingBottom,
      columns[] {
        _key,
        image,
        widthPercent,
        fit,
        aspectRatio,
        figureNumber,
        caption,
        material
      }
    },
    modularBenchSection,
    builderLayout
  }
`;

export async function getProjectBySlug(slug: string) {
  'use cache';
  return client.fetch(PROJECT_BY_SLUG_QUERY, { slug });
}

// ── Fetch single project by ID (for admin editor) ─────────────────────────────
export const PROJECT_BY_ID_QUERY = groq`
  *[_type == "project" && _id == $id][0] {
    _id,
    title,
    "slug": slug.current,
    code,
    projectType,
    subtitle,
    year,
    location,
    client,
    discipline,
    description,
    specs,
    coverImage,
    coverImageUrl,
    show,
    layoutRows,
    builderLayout
  }
`;

export async function getProjectById(id: string) {
  return client.fetch(PROJECT_BY_ID_QUERY, { id }, { cache: 'no-store' });
}
