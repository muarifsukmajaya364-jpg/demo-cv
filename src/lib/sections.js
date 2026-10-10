import { site } from '../data/site.js';
import { profile } from '../data/profile.js';
import { services } from '../data/services.js';
import { stats } from '../data/stats.js';
import { projects } from '../data/projects.js';
import { highlights } from '../data/highlights.js';
import { testimonials } from '../data/testimonials.js';
import { skills } from '../data/skills.js';

export const sectionKeys = [
  'hero',
  'services',
  'stats',
  'projects',
  'highlights',
  'testimonials',
  'skills',
  'contact',
];

export const sectionAnchors = {
  hero: 'home',
  services: 'services',
  stats: 'stats',
  projects: 'projects',
  highlights: 'about',
  testimonials: 'testimonials',
  skills: 'skills',
  contact: 'contact',
};

export function hasContent(key) {
  switch (key) {
    case 'hero':
      return Boolean(profile?.name && typeof profile.name === 'string' && profile.name.trim() !== '');
    case 'services':
      return Array.isArray(services) && services.length > 0;
    case 'stats':
      return Array.isArray(stats) && stats.length > 0;
    case 'projects':
      return Array.isArray(projects) && projects.length > 0;
    case 'highlights':
      return Array.isArray(highlights?.items) && highlights.items.length > 0;
    case 'testimonials':
      return Array.isArray(testimonials) && testimonials.length > 0;
    case 'skills':
      return Array.isArray(skills) && skills.length > 0;
    case 'contact':
      return true;
    default:
      return false;
  }
}

export function activeSections() {
  const orderList = Array.isArray(site.order) ? site.order : sectionKeys;
  return orderList.filter((key) => {
    return site.sections?.[key] === true && hasContent(key);
  });
}
