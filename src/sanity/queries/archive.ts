import { groq } from 'next-sanity';
import { client } from '../client';

export const ARCHIVE_QUERY = groq`
  *[_type == "archive"] | order(_createdAt desc) {
    _id,
    title,
    image,
    caption,
    material,
    year,
    tags,
    "linkedProject": linkedProject->{
      _id,
      title,
      "slug": slug.current,
      code
    }
  }
`;

export async function getAllArchiveItems() {
  'use cache';
  return client.fetch(ARCHIVE_QUERY);
}
