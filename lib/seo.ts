import { metadata } from '../contants';

export type PageSeo = {
  title: string;
  description: string;
  /** Path without domain, e.g. `/about` or `/project/clout-art` */
  path?: string;
  /** Path under public, e.g. `/assets/header.jpg` */
  image?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
};

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, '');

export const siteUrl = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_DOMAIN || metadata.url
);

export const siteMetadata = {
  ...metadata,
  url: siteUrl,
  siteName: metadata.siteName ?? 'Miha Žnidar',
  locale: metadata.locale ?? 'en_US',
};

export function absoluteUrl(path = ''): string {
  if (!path) return siteUrl;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

export function projectImagePath(imageFileName: string): string {
  return `/assets/projects/${imageFileName}`;
}

export function formatPageTitle(title: string): string {
  const suffix = siteMetadata.siteName;
  if (title.includes(suffix)) return title;
  return `${title} | ${suffix}`;
}
