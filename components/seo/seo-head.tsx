import Head from 'next/head';
import { metadata } from '../../contants';
import { absoluteUrl, formatPageTitle, PageSeo, siteMetadata } from '../../lib/seo';

type Props = PageSeo & {
  schemas?: string[];
  keywords?: string[];
};

export function SeoHead({
  title,
  description,
  path = '',
  image = metadata.image,
  ogType = 'website',
  noindex = false,
  schemas = [],
  keywords: keywordsProp,
}: Props) {
  const pageTitle = formatPageTitle(title);
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  const robots = noindex ? 'noindex, nofollow' : 'index, follow';
  const keywords = (keywordsProp ?? metadata.keywords).join(', ');

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={metadata.author.name} />
      <meta name="robots" content={robots} />
      <meta name="google-site-verification" content={metadata.googleSiteVerification} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:site_name" content={siteMetadata.siteName} />
      <meta property="og:locale" content={siteMetadata.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={pageTitle} />

      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      ))}
    </Head>
  );
}
