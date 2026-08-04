export const SITE_URL = 'https://summitwanderlust.com';
export const SITE_NAME = 'Summit Wanderlust';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-summit-wanderlust.jpg`;

export const products = [
  {
    name: 'BreatheMindful',
    path: '/breathe-mindful',
    description: 'A mindful wellness app with guided breathing, focus sessions, walking and sleep tracking, and calming background sounds.',
    category: 'HealthApplication',
    downloadUrl: 'https://apps.apple.com/us/app/breathemindful/id6757343368',
  },
  {
    name: 'Yammoing',
    path: '/yammoing',
    description: 'An AI nutrition companion for food analysis, calorie tracking, recipes, restaurants, shopping lists, and air-quality awareness.',
    category: 'HealthApplication',
    downloadUrl: 'https://apps.apple.com/us/app/yammoing/id6757343455',
  },
  {
    name: 'Secret Student Society',
    path: '/secret-student-society',
    description: 'A verified university community for professor reviews, roommates, campus events, groups, jobs, and student marketplace listings.',
    category: 'SocialNetworkingApplication',
  },
  {
    name: 'Deva',
    path: '/deva',
    description: 'A security-first development environment with vulnerability scanning, AI-assisted fixes, and compliance evidence.',
    category: 'DeveloperApplication',
  },
  {
    name: 'Angel With You',
    path: '/angel-with-you',
    description: 'A personal safety companion with voice triggers, back-tap actions, fake calls, recording, and emergency alerts.',
    category: 'LifestyleApplication',
  },
  {
    name: 'Lovocado',
    path: '/lovocado',
    description: 'A private couples app for shared moments, schedules, date ideas, relationship goals, and memories.',
    category: 'LifestyleApplication',
    downloadUrl: 'https://apps.apple.com/app/id6757644902',
  },
  {
    name: 'motive.',
    path: '/motive',
    description: 'A daily motivation app with curated morning and evening quotes, ambient soundscapes, reminders, and day-and-night themes.',
    category: 'LifestyleApplication',
    downloadUrl: 'https://apps.apple.com/us/app/motive/id6761436873',
  },
];

const route = (title, description, options = {}) => ({
  title,
  description,
  canonical: `${SITE_URL}${options.canonicalPath || options.path || '/'}`,
  image: options.image || DEFAULT_OG_IMAGE,
  robots: options.robots || 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  type: options.type || 'website',
  schema: options.schema || [],
});

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Summit Wanderlust, LLC',
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: 'Summit Wanderlust creates mindful lifestyle apps, nature soundscapes, and restorative spaces for intentional living.',
  email: 'admin@summitwanderlust.com',
  sameAs: [
    'https://apps.apple.com/us/developer/summit-wanderlust-llc/id1866231388',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'en-US',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#app-portfolio`,
  name: 'Apps and digital products by Summit Wanderlust',
  itemListElement: products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_URL}${product.path}`,
    name: product.name,
  })),
};

const appSchema = (name) => {
  const product = products.find((item) => item.name === name);
  if (!product) return [];
  return [{
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    '@id': `${SITE_URL}${product.path}#app`,
    name: product.name,
    url: `${SITE_URL}${product.path}`,
    description: product.description,
    applicationCategory: product.category,
    operatingSystem: 'iOS',
    publisher: { '@id': `${SITE_URL}/#organization` },
    ...(product.downloadUrl ? { downloadUrl: product.downloadUrl } : {}),
  }];
};

const noindex = 'noindex,follow';

export const SEO_ROUTES = {
  '/': route(
    'Summit Wanderlust | Mindful Lifestyle Apps & Lake Tahoe Retreat',
    'Explore mindful lifestyle apps from Summit Wanderlust, LLC, including BreatheMindful, Lovocado, and motive., plus nature soundscapes and a Lake Tahoe retreat.',
    { path: '/', schema: [organizationSchema, websiteSchema, portfolioSchema] },
  ),
  '/breathe-mindful': route(
    'BreatheMindful | Guided Breathing, Focus & Sleep App',
    'Practice guided breathing, run Pomodoro focus sessions, track walking and sleep, and create calming soundscapes with BreatheMindful for iOS.',
    { path: '/breathe-mindful', schema: appSchema('BreatheMindful') },
  ),
  '/lovocado': route(
    'Lovocado | A Private Couples App for Moments & Goals',
    'Share moments, plan dates, sync schedules, and grow together with private memories and shared goals in Lovocado for iOS.',
    { path: '/lovocado', schema: appSchema('Lovocado') },
  ),
  '/motive': route(
    'motive. | Daily Motivation, Quotes & Ambient Soundscapes',
    'Start and end the day with curated quotes, gentle reminders, and ambient soundscapes in motive. from Summit Wanderlust.',
    { path: '/motive', schema: appSchema('motive.') },
  ),
  '/angel-with-you': route(
    'Angel With You | Personal Safety Companion App',
    'Explore voice-triggered alerts, back-tap actions, fake calls, stealth recording, and other personal safety tools in Angel With You.',
    { path: '/angel-with-you', schema: appSchema('Angel With You') },
  ),
  '/breathe-mindful/privacy-policy': route(
    'BreatheMindful Privacy Policy | Summit Wanderlust',
    'Read the BreatheMindful privacy policy, including HealthKit, microphone, notification, storage, and data-deletion practices.',
    { path: '/breathe-mindful/privacy-policy', robots: noindex },
  ),
  '/lovocado/privacy-policy': route(
    'Lovocado Privacy Policy | Summit Wanderlust',
    'Read the Lovocado privacy policy and learn how account, health, location, photo, notification, and user-generated data are handled.',
    { path: '/lovocado/privacy-policy', robots: noindex },
  ),
  '/motive/privacy-policy': route(
    'motive. Privacy Policy | Summit Wanderlust',
    'Read the motive. privacy policy and learn how the app handles locally stored data, subscriptions, notifications, and privacy rights.',
    { path: '/motive/privacy-policy', robots: noindex },
  ),
  '/angel-with-you/privacy': route(
    'Angel With You Privacy Policy | Summit Wanderlust',
    'Read the Angel With You privacy policy and learn how personal safety features and related data are handled.',
    { path: '/angel-with-you/privacy', robots: noindex },
  ),
  '/angel-with-you/terms': route(
    'Angel With You Terms of Service | Summit Wanderlust',
    'Read the terms of service for the Angel With You personal safety companion.',
    { path: '/angel-with-you/terms', robots: noindex },
  ),
};

export const PRERENDER_ROUTES = Object.keys(SEO_ROUTES);

export function seoForPath(pathname) {
  const normalized = pathname !== '/' ? pathname.replace(/\/$/, '') : '/';
  return SEO_ROUTES[normalized] || {
    title: `Page Not Found | ${SITE_NAME}`,
    description: 'The requested page could not be found.',
    canonical: `${SITE_URL}${normalized}`,
    image: DEFAULT_OG_IMAGE,
    robots: 'noindex,follow',
    type: 'website',
    schema: [],
  };
}
