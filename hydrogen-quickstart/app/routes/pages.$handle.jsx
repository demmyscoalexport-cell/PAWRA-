/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file pages.$handle.jsx
 * @description Route module: pages.$handle — Pawra Pet Shop page or API handler.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {useLoaderData, useParams} from 'react-router';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {getStaticPage} from '~/lib/staticPages';
import {StaticPageLayout} from '~/components/StaticPageLayout';
import {SocialLinks} from '~/components/SocialLinks';
import {WalkerProgramPage} from '~/components/WalkerProgramPage';
import {WALKER_PROGRAM} from '~/lib/walkerProgram';

export const meta = ({data, params}) => {
  if (params?.handle === 'walker-program') {
    return [{title: `PAWRA | ${WALKER_PROGRAM.title}`}];
  }
  return [{title: `PAWRA | ${data?.page.title ?? 'Page'}`}];
};

export async function loader({context, request, params}) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  if (params.handle === 'walker-program') {
    return {
      page: {
        title: WALKER_PROGRAM.title,
        description: WALKER_PROGRAM.description,
        isWalkerProgram: true,
      },
    };
  }

  const staticPage = getStaticPage(params.handle);
  if (staticPage) {
    return {
      page: {
        title: staticPage.title,
        description: staticPage.description,
        bodyHtml: staticPage.body,
        isStatic: true,
      },
    };
  }

  const [{page}] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {handle: params.handle},
    }),
  ]);

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle: params.handle, data: page});

  return {
    page: {
      title: page.title,
      description: page.seo?.description,
      bodyHtml: page.body,
      isStatic: false,
    },
  };
}

export default function Page() {
  const {page} = useLoaderData();
  const params = useParams();
  const showSocial = params.handle === 'contact';

  if (page.isWalkerProgram) {
    return <WalkerProgramPage />;
  }

  return (
    <StaticPageLayout title={page.title} description={page.description}>
      <div dangerouslySetInnerHTML={{__html: page.bodyHtml}} />
      {showSocial && (
        <div className="mt-10 border-t border-forest-green/10 pt-8">
          <p className="font-sans text-body-s font-semibold text-ink">Follow PAWRA</p>
          <SocialLinks variant="light" className="mt-4" />
        </div>
      )}
    </StaticPageLayout>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;

/** @typedef {import('./+types/pages.$handle').Route} Route */
