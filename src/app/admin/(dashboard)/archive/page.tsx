import { getAllArchiveItems } from '@/sanity/queries/archive';
import { AdminArchiveClient } from '@/components/admin/AdminArchiveClient';

export default async function AdminArchivePage() {
  const items = await getAllArchiveItems();
  return <AdminArchiveClient items={items} />;
}
