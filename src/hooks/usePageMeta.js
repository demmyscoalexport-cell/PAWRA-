import { useEffect } from 'react';

const DEFAULT_TITLE = 'PAWRA - Premium Pet Lifestyle';
const DEFAULT_DESCRIPTION = 'Premium lifestyle commerce for modern pet parents.';

export const usePageMeta = ({ title, description }) => {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || DEFAULT_DESCRIPTION);
    }
  }, [title, description]);
};
