import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'NexGen Tech Academy',
    url: 'https://nexgentechacademy.com',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    description: 'Premier IT training academy offering professional courses in Generative AI, Full Stack Development, Cyber Security, UI/UX, Cloud DevOps, and Data Analytics.',
    telephone: '+91-800-999-8800',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Building 4B, Cybercity Tech Park, Hitec Phase 2',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500081',
      addressCountry: 'IN',
    },
  };
}

export function getCourseSchema(course: {
  title: string;
  description: string;
  categoryName: string;
  fees: number;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'NexGen Tech Academy',
      sameAs: 'https://nexgentechacademy.com',
    },
    offers: {
      '@type': 'Offer',
      price: course.fees,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}
