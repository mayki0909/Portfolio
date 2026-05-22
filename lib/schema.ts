import { IProject } from '../interfaces';
import { metadata, projects } from '../contants';
import { absoluteUrl, projectImagePath, siteUrl } from './seo';

const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;

type SchemaNode = Record<string, unknown>;

function personNode(): SchemaNode {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: metadata.author.name,
    url: siteUrl,
    email: metadata.author.email,
    jobTitle: metadata.author.jobTitle,
    description: metadata.description,
    image: absoluteUrl(metadata.image),
    sameAs: [metadata.social.linkedin, metadata.social.github],
    knowsAbout: metadata.knowsAbout,
    nationality: {
      '@type': 'Country',
      name: metadata.author.country,
    },
  };
}

function websiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteUrl,
    name: metadata.siteName,
    description: metadata.description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  };
}

function webPageNode({
  path,
  title,
  description,
  pageId,
}: {
  path: string;
  title: string;
  description: string;
  pageId: string;
}): SchemaNode {
  return {
    '@type': 'WebPage',
    '@id': pageId,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    inLanguage: 'en',
  };
}

function breadcrumbNode(
  items: { name: string; path: string }[],
  pageId: string
): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageId}/breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function graph(nodes: SchemaNode[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  });
}

export function homePageSchema(): string {
  const pageId = `${siteUrl}/#webpage`;
  const itemList: SchemaNode = {
    '@type': 'ItemList',
    '@id': `${pageId}/projects`,
    name: 'Portfolio projects',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/project/${project.slug}`),
      name: project.name,
    })),
  };

  return graph([
    personNode(),
    websiteNode(),
    webPageNode({
      path: '/',
      title: metadata.title,
      description: metadata.description,
      pageId,
    }),
    itemList,
  ]);
}

export function aboutPageSchema(): string {
  const pageId = `${siteUrl}/about#webpage`;
  const title = `About ${metadata.author.name}`;
  const description =
    'Learn more about Miha Žnidar — full-stack web developer from Slovenia, skills, hobbies, and background.';

  return graph([
    personNode(),
    websiteNode(),
    {
      '@type': 'ProfilePage',
      '@id': pageId,
      url: absoluteUrl('/about'),
      name: title,
      description,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': PERSON_ID },
      inLanguage: 'en',
    },
    breadcrumbNode(
      [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ],
      pageId
    ),
  ]);
}

export function projectPageSchema(project: IProject): string {
  const path = `/project/${project.slug}`;
  const pageId = absoluteUrl(path);
  const title = `${project.name} — ${project.shortDescription}`;

  return graph([
    personNode(),
    websiteNode(),
    webPageNode({
      path,
      title,
      description: project.description,
      pageId: `${pageId}#webpage`,
    }),
    {
      '@type': 'CreativeWork',
      '@id': `${pageId}#project`,
      name: project.name,
      description: project.description,
      url: project.url,
      image: absoluteUrl(projectImagePath(project.image)),
      dateCreated: project.createdAt,
      author: { '@id': PERSON_ID },
      creator: { '@id': PERSON_ID },
      keywords: project.technologies.join(', '),
    },
    breadcrumbNode(
      [
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/#work' },
        { name: project.name, path },
      ],
      pageId
    ),
  ]);
}
