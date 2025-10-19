import { useEffect } from 'react';

/**
 * SEO Component - Manages meta tags and structured data
 * Usage: <SEO title="Page Title" description="Page description" />
 */
const SEO = ({
  title = 'Irfan Ansari — Full Stack Developer',
  description = 'Full Stack Developer & Computer Science Student. I build scalable, intelligent, and visually appealing web applications.',
  keywords = 'Full Stack Developer, Web Developer, React, Node.js, Python, Portfolio',
  author = 'Irfan Ansari',
  ogImage = 'https://irfanansari.com/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  structuredData,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', ogType, true);
    if (canonicalUrl) {
      updateMetaTag('og:url', canonicalUrl, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    // Structured data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]#dynamic-structured-data');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'dynamic-structured-data';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, author, ogImage, ogType, twitterCard, canonicalUrl, structuredData]);

  return null; // This component doesn't render anything
};

/**
 * Generate structured data for different content types
 */
export const generateStructuredData = {
  person: (data) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle,
    url: data.url,
    email: data.email,
    image: data.image,
    sameAs: data.socialLinks,
    knowsAbout: data.skills,
    alumniOf: data.education && {
      '@type': 'EducationalOrganization',
      name: data.education,
    },
  }),

  article: (data) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
  }),

  project: (data) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.name,
    description: data.description,
    image: data.image,
    url: data.url,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    keywords: data.technologies,
  }),

  breadcrumb: (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
};

export default SEO;
