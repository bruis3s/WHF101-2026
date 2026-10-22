import { getAllArchiveItems } from '@/sanity/queries/archive';
import { ArchivePageClient } from '@/components/archive/ArchivePageClient';

export const metadata = {
  title: 'Archive — HAF WERKS',
  description: 'An archive of objects, materials, and artifacts featured across HAF WERKS projects.',
};

export default async function ArchivePage() {
  const items = await getAllArchiveItems();

  return <ArchivePageClient items={items || []} />;
}
