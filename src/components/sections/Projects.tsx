import { useLocale } from 'next-intl';
import ProjectsGrid from './ProjectsGrid';
import { getProjects } from '@/lib/constants/projects';
import { getTechnologies } from '@/lib/constants/technologies';

// Reads the projects on the server, so the browser gets one language and not the whole content
export default function Projects() {
  const locale = useLocale();
  const dailyTechnologies = getTechnologies(locale)
    .flatMap((category) => category.items)
    .filter((technology) => technology.usage === 'daily')
    .map((technology) => technology.name);

  return <ProjectsGrid projects={getProjects(locale)} dailyTechnologies={dailyTechnologies} />;
}
