import { getAllProjects } from '@/sanity/queries/projects';
import { WerksPageClient } from '@/components/werks/WerksPageClient';

export const metadata = {
  title: 'Werks List — HAF WERKS',
  description: 'Explorative Architecture, Objects and Spatial Design Practice.',
};

export default async function WerksListPage() {
  const projects = await getAllProjects();

  return <WerksPageClient key="werks-list" projects={projects || []} initialView="list" />;
}
