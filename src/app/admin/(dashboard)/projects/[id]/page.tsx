import { getProjectById } from '@/sanity/queries/projects';
import { ProjectEditClient } from '@/components/admin/ProjectEditClient';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminProjectEditPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) return notFound();

  return <ProjectEditClient project={project} />;
}
