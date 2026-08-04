import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAME, seoForPath } from './seo';

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

export default function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const seo = seoForPath(location.pathname);
    document.title = seo.title;

    setMeta('meta[name="description"]', { name: 'description', content: seo.description });
    setMeta('meta[name="robots"]', { name: 'robots', content: seo.robots });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: seo.type });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: seo.canonical });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: seo.image });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seo.image });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = seo.canonical;

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((script) => script.remove());
    seo.schema.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = '';
      script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
      document.head.appendChild(script);
    });
  }, [location.pathname]);

  return null;
}
