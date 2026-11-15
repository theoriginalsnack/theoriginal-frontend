import { useEffect } from 'react';

const SITE_NAME = 'The Original';

/** Sets the tab title as "<page> | The Original" (and the meta description when given). */
export function usePageMeta(page: string, description?: string) {
  useEffect(() => {
    document.title = `${page} | ${SITE_NAME}`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [page, description]);
}
