import type { DetailedHTMLProps, HTMLAttributes } from 'react';

// <moilolon-nav> is the site switcher shared by every moilolon.com site. It is a custom
// element defined by https://moilolon.com/nav.js (repo moilolon/home), loaded in layout.tsx.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'moilolon-nav': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        // The id of this site in the list of nav.js
        current: 'home' | 'portfolio' | 'dashboard';
      };
    }
  }
}
