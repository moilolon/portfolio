import { notFound } from 'next/navigation';

// Any path under a language that is not a page: shows not-found.tsx inside the layout,
// so the 404 comes in that language and with the theme
export default function UnknownPage() {
  notFound();
}
