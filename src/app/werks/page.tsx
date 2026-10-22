import { getAllProjects } from '@/sanity/queries/projects';
import { WerksPageClient } from '@/components/werks/WerksPageClient';

export const metadata = {
  title: 'Werks — HAF WERKS',
  description: 'Explorative Architecture, Objects and Spatial Design Practice.',
};

export default async function WerksPage() {
  const projects = await getAllProjects();

  return <WerksPageClient key="werks-grid" projects={projects || []} initialView="grid" />;
}
