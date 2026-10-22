import { getAllProjectsAdmin } from '@/sanity/queries/projects';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export default async function AdminDashboardPage() {
  const projects = await getAllProjectsAdmin();
  const visible = projects.filter((p: any) => p.show !== false).length;
  const hidden = projects.length - visible;

  return (
    <AdminDashboardClient
      projects={projects}
      stats={{ total: projects.length, visible, hidden }}
    />
  );
}
