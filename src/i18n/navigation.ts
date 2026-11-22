import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Link, router and pathname that know about the language prefix of the URL
export const { Link, usePathname, useRouter } = createNavigation(routing);
