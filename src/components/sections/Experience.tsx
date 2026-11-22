import { useLocale } from 'next-intl';
import ExperienceCards from './ExperienceCards';
import { getExperiences } from '@/lib/constants/experience';

// Reads the jobs on the server, so the browser gets one language and not the whole content
export default function Experience() {
  return <ExperienceCards experiences={getExperiences(useLocale())} />;
}
