/**
 * @file blog.$slug.jsx
 * @description Article detail with related products sidebar.
 */

import {Link, useLoaderData} from 'react-router';
import {PawraProductCard} from '~/components/PawraProductCard';
import {ARTICLES, getArticleBySlug} from '~/data/articles';
import {getProductsByTag} from '~/data/products';
import {absoluteUrl, buildSeoMeta, breadcrumbJsonLd} from '~/lib/seo';

export const meta = ({data}) => {
  const article = data?.article;
  if (!article) return buildSeoMeta({title: 'Article'});
  return buildSeoMeta({
    title: article.title,
    description: article.excerpt,
    url: `/blog/${article.slug}`,
    jsonLd: [
      breadcrumbJsonLd([
        {label: 'Home', to: '/'},
        {label: 'Journal', to: '/blog'},
        {label: article.title, to: `/blog/${article.slug}`},
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        datePublished: article.date,
        description: article.excerpt,
        image: article.image,
        author: {'@type': 'Organization', name: 'PAWRA'},
        mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
      },
    ],
  });
};

export async function loader({params}) {
  const article = getArticleBySlug(params.slug);
  if (!article) throw new Response('Not found', {status: 404});
  const relatedProducts = (article.topicTags || [])
    .flatMap((tag) => getProductsByTag(tag))
    .filter((p, i, arr) => arr.findIndex((x) => x.handle === p.handle) === i)
    .slice(0, 3);
  const relatedArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  return {article, relatedProducts, relatedArticles};
}

export default function BlogArticlePage() {
  const {article, relatedProducts, relatedArticles} = useLoaderData();

  return (
    <div className="bg-page-bg px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-1440 gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article>
          <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-action-primary">
            {article.category}
          </p>
          <h1 className="mt-3 font-sans text-display-s text-text-primary md:text-display-m">{article.title}</h1>
          <p className="mt-3 font-mono text-mono-s text-text-secondary">
            {article.date} · {article.readTime} read
          </p>
          <img
            src={article.image}
            alt=""
            className="mt-8 aspect-[16/9] w-full rounded-lg object-cover"
            loading="eager"
          />
          <div
            className="prose-pawra mt-10 max-w-none font-sans text-body-m text-text-primary [&_a]:text-action-primary [&_h2]:mt-8 [&_h2]:font-sans [&_h2]:text-heading-s [&_h2]:text-text-primary [&_p]:mt-4"
            dangerouslySetInnerHTML={{__html: article.body}}
          />

          <section className="mt-16">
            <h2 className="font-sans text-heading-s text-text-primary">Related articles</h2>
            <ul className="mt-4 space-y-3">
              {relatedArticles.map((item) => (
                <li key={item.slug}>
                  <Link to={`/blog/${item.slug}`} className="font-sans text-body-s font-semibold text-action-primary no-underline hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>

        <aside>
          <h2 className="font-sans text-body-m font-semibold text-text-primary">Recommended products</h2>
          <div className="mt-4 space-y-4">
            {relatedProducts.map((product) => (
              <PawraProductCard key={product.id} product={product} loading="lazy" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
