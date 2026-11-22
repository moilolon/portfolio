import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// False while rendering on the server and during hydration, true in the browser afterwards.
// For what only exists there, like a portal into document.body.
export function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
