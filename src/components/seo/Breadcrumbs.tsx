import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXTAUTH_URL || 'https://vela-travels-kkos-seven.vercel.app';

  const fullItems = [
    { name: 'Home', url: '/' },
    ...items,
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-4 px-2 text-sm text-slate-500 dark:text-slate-400">
        <ol className="flex items-center flex-wrap gap-2">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-2">
                {index === 0 ? (
                  <Link
                    href="/"
                    className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
                    aria-label="Home"
                  >
                    <Home className="w-4 h-4 text-primary" />
                    <span className="font-semibold">Home</span>
                  </Link>
                ) : isLast ? (
                  <span className="font-bold text-slate-900 dark:text-slate-100 px-1" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
