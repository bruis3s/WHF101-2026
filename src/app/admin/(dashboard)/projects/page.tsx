import { getAllProjectsAdmin } from '@/sanity/queries/projects';
import { AdminProjectsClient } from '@/components/admin/AdminProjectsClient';

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();
  return <AdminProjectsClient projects={projects} />;
}
