/**
 * All Reviews page — Judge.me store-wide reviews widget.
 *
 * @param {{ widgetHtml?: string }} props
 */
export function JudgeMeAllReviews({widgetHtml = ''}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-4 md:px-0">
      {widgetHtml ? (
        <div
          id="judgeme_all_reviews"
          className="jdgm-widget jdgm-all-reviews-page"
          data-auto-install="false"
          dangerouslySetInnerHTML={{__html: widgetHtml}}
        />
      ) : (
        <div
          id="judgeme_all_reviews"
          className="jdgm-widget jdgm-all-reviews-page"
          data-auto-install="false"
        />
      )}
      {!widgetHtml && (
        <p className="mt-6 font-sans text-body-m text-ink/60">
          Customer reviews will appear here as shoppers leave feedback on products.
        </p>
      )}
    </div>
  );
}
