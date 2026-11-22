import { useLocale } from 'next-intl';
import TechnologiesTabs from './TechnologiesTabs';
import { getTechnologies } from '@/lib/constants/technologies';

// Reads the technologies on the server: their icons are rendered there too,
// so neither the content nor the icon components ship to the browser
export default function Technologies() {
  return <TechnologiesTabs technologies={getTechnologies(useLocale())} />;
}
