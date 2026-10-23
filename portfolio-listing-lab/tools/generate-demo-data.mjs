#!/usr/bin/env node
/**
 * Generates the demo archive dataset in assets/data.js.
 *
 * Shape: 3 years x 12 months x 3 case studies = 108 projects (2021 — 2023).
 * The eight real production case studies are kept (real titles, summaries,
 * stacks, slugs and links) and slotted into fixed months; the rest are
 * deterministic demo records so the lab shows a full archive density.
 *
 * Usage: node tools/generate-demo-data.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const dataPath = join(here, '..', 'assets', 'data.js');

const YEARS = [2023, 2022, 2021];
const PER_MONTH = 3;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DISCIPLINES = [
  { category: 'UI/UX Design', categoryShort: 'UI/UX', images: ['b2b-portal-ux', 'brand-identity-system'],
    tech: ['Figma', 'User Interviews', 'Prototyping', 'Design Tokens', 'Storybook', 'Maze'],
    suffixes: ['Client Portal UX', 'Design System', 'Onboarding Redesign', 'Booking Flow', 'Admin Console', 'Checkout Audit', 'Dashboard Refresh', 'Identity System'],
    summaries: [
      '{domain} product audit, information architecture, and interface design for the core workflow.',
      'Design tokens, type scale, and component foundations for {a} {domain} platform.',
      'Onboarding and task flows rebuilt around {domain} user research.',
      '{domain} admin console redesign — denser data views, clearer hierarchy, faster tasks.',
    ] },
  { category: 'Mobile App', categoryShort: 'Mobile', images: ['fitness-tracking-app', 'ecommerce-mobile-app'],
    tech: ['React Native', 'NestJS', 'PostgreSQL', 'Expo', 'Firebase', 'Razorpay'],
    suffixes: ['Field App', 'Loyalty App', 'Booking App', 'Membership App', 'Companion App', 'Wallet App', 'Service App', 'Tracking App'],
    summaries: [
      'Cross-platform {domain} app with offline sync and push notifications.',
      'iOS/Android {domain} companion app built on a shared design system.',
      'Field team app for {domain} crews with offline capture and photo sync.',
      'Membership and loyalty app for {a} {domain} brand, with in-app payments.',
    ] },
  { category: 'E-Commerce', categoryShort: 'Commerce', images: ['marketplace-redesign', 'fintech-payments-hub'],
    tech: ['Next.js', 'NestJS', 'Stripe', 'Razorpay', 'PostgreSQL', 'Algolia'],
    suffixes: ['Marketplace Redesign', 'Payments Hub', 'Subscription Storefront', 'Returns Portal', 'Storefront Rebuild', 'Payouts Console', 'Cart Optimisation', 'Ordering Platform'],
    summaries: [
      'Conversion-focused storefront rebuild for a multi-vendor {domain} marketplace.',
      'Payouts, refunds, and reconciliation console for {a} {domain} payments platform.',
      'Subscription billing and retention flows for {a} {domain} commerce product.',
      'Search, merchandising, and cart optimisation for {a} {domain} storefront.',
    ] },
  { category: 'Web Development', categoryShort: 'Web', images: ['saas-analytics-platform', 'healthtech-dashboard'],
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'ClickHouse', 'Docker'],
    suffixes: ['Analytics Platform', 'Monitoring Dashboard', 'Booking Engine', 'CMS Replatform', 'Reporting Suite', 'Inventory Dashboard', 'API Console', 'Customer Portal'],
    summaries: [
      'Real-time operations dashboard for {domain} teams, with alerting and audit trails.',
      'Business intelligence platform with custom dashboards for {domain} clients.',
      '{domain} booking engine with pricing rules, calendars, and payments.',
      'Headless CMS replatform and performance overhaul for {a} {domain} content team.',
    ] },
];

const DOMAINS = [
  'Logistics', 'Retail', 'Healthcare', 'Fintech', 'EdTech', 'Real Estate', 'AgriTech', 'Travel',
  'Fitness', 'Legal', 'Insurance', 'Manufacturing', 'Hospitality', 'Media', 'Energy', 'HR Tech',
  'Supply Chain', 'Restaurant', 'Banking', 'Pharma', 'Automotive', 'Gaming', 'Telecom', 'Nonprofit',
  'Sports', 'Fashion', 'Grocery', 'Aviation', 'Construction', 'Education',
];

/** The eight real production case studies, kept verbatim and placed in fixed months. */
const REAL_PROJECTS = [
  { slot: '2023-12', id: '01a10a2a-92fe-76ab-94be-c68dbf0db7aa', title: 'B2B Client Portal UX', slug: 'b2b-portal-ux',
    image: 'b2b-portal-ux', category: 'UI/UX Design',
    summary: 'Information architecture and UI for a client self-serve portal.', featured: false,
    technologies: ['Figma', 'User Interviews', 'Prototyping'] },
  { slot: '2023-11', id: '01a10a2a-8f00-77fc-84fd-3aca6b60a396', title: 'Fitness Tracking App', slug: 'fitness-tracking-app',
    image: 'fitness-tracking-app', category: 'Mobile App',
    summary: 'iOS/Android workout tracker with coach dashboards.', featured: false,
    technologies: ['React Native', 'NestJS', 'PostgreSQL'] },
  { slot: '2023-07', id: '01a10a2a-8af8-75d6-8932-aff9179b304e', title: 'Marketplace Redesign', slug: 'marketplace-redesign',
    image: 'marketplace-redesign', category: 'E-Commerce',
    summary: 'Conversion-focused UX overhaul for a multi-vendor storefront.', featured: false,
    technologies: ['Figma', 'Next.js', 'Analytics'] },
  { slot: '2023-03', id: '01a10a2a-879f-7376-81e2-e3567cfa075d', title: 'Brand Identity System', slug: 'brand-identity-system',
    image: 'brand-identity-system', category: 'UI/UX Design',
    summary: 'Design tokens, type, and component foundations for a B2B brand.', featured: false,
    technologies: ['Figma', 'Storybook', 'CSS Tokens'] },
  { slot: '2022-10', id: '01a10a2a-8325-70e4-a277-5c8f22a08b85', title: 'Fintech Payments Hub', slug: 'fintech-payments-hub',
    image: 'fintech-payments-hub', category: 'E-Commerce',
    summary: 'Unified payouts and reconciliation for a lending platform.', featured: true,
    technologies: ['NestJS', 'PostgreSQL', 'RabbitMQ', 'Razorpay'] },
  { slot: '2022-05', id: '01a10a2a-7ddf-71ee-a913-430ae86f708e', title: 'SaaS Analytics Platform', slug: 'saas-analytics-platform',
    image: 'saas-analytics-platform', category: 'Web Development',
    summary: 'Business intelligence platform with custom dashboards.', featured: true,
    technologies: ['Vue.js', 'FastAPI', 'PostgreSQL', 'Redis', 'ClickHouse'] },
  { slot: '2021-09', id: '01a10a2a-7971-73be-82a8-5c71683f9409', title: 'E-Commerce Mobile App', slug: 'ecommerce-mobile-app',
    image: 'ecommerce-mobile-app', category: 'Mobile App',
    summary: 'Cross-platform shopping app with Razorpay integration.', featured: true,
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Razorpay'] },
  { slot: '2021-02', id: '01a10a2a-544e-757a-8806-721a7b8591dd', title: 'HealthTech Dashboard', slug: 'healthtech-dashboard',
    image: 'healthtech-dashboard', category: 'Web Development',
    summary: 'Real-time patient monitoring dashboard for hospitals.', featured: true,
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Docker'] },
];

const shortFor = category => DISCIPLINES.find(item => item.category === category).categoryShort;
const article = word => (/^(hr|hour|honest)/i.test(word) || /^[aeiou]/i.test(word) ? 'an' : 'a');
const sentence = text => text.charAt(0).toUpperCase() + text.slice(1);

/* ---------------------------------------------------------------- slots ---- */

// Newest first: year descending, month descending, then the three slots in a month.
const slots = [];
for (const year of YEARS) {
  for (let month = 12; month >= 1; month -= 1) {
    for (let slot = 0; slot < PER_MONTH; slot += 1) {
      slots.push({ key: `${year}-${String(month).padStart(2, '0')}`, year, month, slot });
    }
  }
}
if (slots.length !== YEARS.length * 12 * PER_MONTH) throw new Error('slot grid is wrong');

/* ------------------------------------------------------------- projects ---- */

const usedTitles = new Set(REAL_PROJECTS.map(item => item.title));
const realBySlot = new Map(REAL_PROJECTS.map(item => [item.slot, item]));
const disciplineCursor = DISCIPLINES.map(() => 0);
const projects = [];
let demoCounter = 0;

for (const slot of slots) {
  const real = realBySlot.get(slot.key);
  const dateLabel = `${MONTHS[slot.month - 1]} ${slot.year}`;
  const monthLabel = MONTHS[slot.month - 1];

  if (real) {
    realBySlot.delete(slot.key); // one real project per month at most
    projects.push({
      id: real.id, title: real.title, dateLabel, year: String(slot.year), monthKey: slot.key, monthLabel,
      slug: real.slug, href: `https://app.nestlancer.com/portfolio/${real.slug}`,
      image: `assets/projects/${real.image}.jpg`, category: real.category, categoryShort: shortFor(real.category),
      summary: real.summary, featured: real.featured, technologies: real.technologies, demo: false,
    });
    continue;
  }

  // Balance the four disciplines evenly across the demo records.
  const disciplineIndex = demoCounter % DISCIPLINES.length;
  const discipline = DISCIPLINES[disciplineIndex];
  demoCounter += 1;

  let cursor = disciplineCursor[disciplineIndex];
  let domain;
  let suffix;
  let title;
  let attempts = 0;
  do {
    domain = DOMAINS[(cursor * 7 + disciplineIndex * 5) % DOMAINS.length];
    suffix = discipline.suffixes[(cursor + disciplineIndex * 3) % discipline.suffixes.length];
    title = `${domain} ${suffix}`;
    cursor += 1;
    attempts += 1;
  } while (usedTitles.has(title) && attempts < 400);
  disciplineCursor[disciplineIndex] = cursor;
  usedTitles.add(title);

  const techCount = 3 + (cursor % 3);
  const techStart = cursor % discipline.tech.length;
  const technologies = Array.from({ length: techCount }, (_, i) => discipline.tech[(techStart + i) % discipline.tech.length]);

  projects.push({
    id: `demo-${String(slots.indexOf(slot) + 1).padStart(3, '0')}`,
    title,
    dateLabel,
    year: String(slot.year),
    monthKey: slot.key,
    monthLabel,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    href: 'https://app.nestlancer.com/portfolio',
    image: `assets/projects/${discipline.images[cursor % discipline.images.length]}.jpg`,
    category: discipline.category,
    categoryShort: discipline.categoryShort,
    summary: sentence(discipline.summaries[cursor % discipline.summaries.length]
      .replace('{domain}', domain.toLowerCase())
      .replace('{a}', article(domain))),
    featured: cursor % 9 === 0,
    technologies,
    demo: true,
  });
}

if (realBySlot.size) throw new Error(`unplaced real projects: ${[...realBySlot.keys()].join(', ')}`);

/* ----------------------------------------------------------------- emit ---- */

const current = readFileSync(dataPath, 'utf8');
const designsMatch = current.match(/\/\* designs:start \*\/([\s\S]*?)\/\* designs:end \*\//);
if (!designsMatch) throw new Error('could not find the designs block in assets/data.js');

const quote = value => `'${String(value).replace(/'/g, "\\'")}'`;
const projectBlock = projects.map(project => `    {
      id: ${quote(project.id)},
      title: ${quote(project.title)},
      dateLabel: ${quote(project.dateLabel)},
      year: ${quote(project.year)},
      monthKey: ${quote(project.monthKey)},
      monthLabel: ${quote(project.monthLabel)},
      slug: ${quote(project.slug)},
      href: ${quote(project.href)},
      image: ${quote(project.image)},
      category: ${quote(project.category)},
      categoryShort: ${quote(project.categoryShort)},
      summary: ${quote(project.summary)},
      featured: ${project.featured},
      technologies: [${project.technologies.map(quote).join(', ')}],
      demo: ${project.demo}
    }`).join(',\n');

const collection = `  collection: {
    start: '${YEARS[YEARS.length - 1]}',
    end: '${YEARS[0]}',
    label: '${YEARS[YEARS.length - 1]} — ${YEARS[0]}',
    short: '${YEARS[YEARS.length - 1]}—${String(YEARS[0]).slice(2)}',
    years: ${YEARS.length},
    months: 12,
    perMonth: ${PER_MONTH},
    total: ${projects.length}
  },`;

const output = `window.NESTLANCER_DATA = {
  source: 'https://app.nestlancer.com/portfolio',
  contact: 'https://app.nestlancer.com/contact',
  register: 'https://app.nestlancer.com/register',
${collection}
  /* designs:start */${designsMatch[1]}/* designs:end */
  projects: [
${projectBlock}
  ]
};
`;

writeFileSync(dataPath, output);

/* -------------------------------------------------------------- summary ---- */

const byYear = Object.fromEntries(YEARS.map(year => [year, projects.filter(p => p.year === String(year)).length]));
const byMonth = slots.reduce((map, slot) => {
  map[slot.key] = (map[slot.key] || 0) + 1;
  return map;
}, {});
const byCategory = DISCIPLINES.reduce((map, d) => {
  map[d.category] = projects.filter(p => p.category === d.category).length;
  return map;
}, {});

console.log('projects:', projects.length);
console.log('per year:', byYear);
console.log('months:', Object.keys(byMonth).length, '| per month values:', [...new Set(Object.values(byMonth))]);
console.log('per discipline:', byCategory);
console.log('unique titles:', new Set(projects.map(p => p.title)).size);
console.log('featured:', projects.filter(p => p.featured).length, '| real:', projects.filter(p => !p.demo).length);
