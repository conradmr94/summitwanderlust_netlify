import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from '../.prerender/entry-server.js';
import { PRERENDER_ROUTES, SITE_NAME, seoForPath } from '../src/seo.js';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const template = await readFile(join(dist, 'index.html'), 'utf8');

const escapeAttribute = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const safeJson = (value) => JSON.stringify(value)
  .replaceAll('<', '\\u003c')
  .replaceAll('>', '\\u003e')
  .replaceAll('&', '\\u0026')
  .replaceAll('\u2028', '\\u2028')
  .replaceAll('\u2029', '\\u2029');

function headFor(seo) {
  const jsonLd = seo.schema.map((schema) => (
    `<script type="application/ld+json" data-seo-jsonld>${safeJson(schema)}</script>`
  )).join('\n    ');

  return [
    `<meta name="description" content="${escapeAttribute(seo.description)}">`,
    `<meta name="robots" content="${escapeAttribute(seo.robots)}">`,
    `<link rel="canonical" href="${escapeAttribute(seo.canonical)}">`,
    `<meta property="og:title" content="${escapeAttribute(seo.title)}">`,
    `<meta property="og:description" content="${escapeAttribute(seo.description)}">`,
    `<meta property="og:type" content="${escapeAttribute(seo.type)}">`,
    `<meta property="og:url" content="${escapeAttribute(seo.canonical)}">`,
    `<meta property="og:image" content="${escapeAttribute(seo.image)}">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeAttribute(seo.title)}">`,
    `<meta name="twitter:description" content="${escapeAttribute(seo.description)}">`,
    `<meta name="twitter:image" content="${escapeAttribute(seo.image)}">`,
    jsonLd,
  ].filter(Boolean).join('\n    ');
}

async function writeRoute(routePath, outputPath = null) {
  const seo = seoForPath(routePath);
  const appHtml = render(routePath);
  const title = `<title>${escapeAttribute(seo.title)}</title>`;
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `${headFor(seo)}\n    ${title}`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const target = outputPath || (routePath === '/'
    ? join(dist, 'index.html')
    : join(dist, routePath.slice(1), 'index.html'));
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

for (const routePath of PRERENDER_ROUTES) {
  await writeRoute(routePath);
}

await writeRoute('/404', join(dist, '404.html'));
await rm(join(root, '.prerender'), { recursive: true, force: true });

console.log(`Prerendered ${PRERENDER_ROUTES.length} routes plus 404.html.`);
