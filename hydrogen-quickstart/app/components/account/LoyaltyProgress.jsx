/**
 * @file LoyaltyProgress.jsx
 * @description Bronze → Silver → Gold progress visualization.
 */

const TIERS = ['Bronze', 'Silver', 'Gold'];

/**
 * @param {{ points: number; tier: string; thresholds?: Record<string, number> }} props
 */
export function LoyaltyProgress({points, tier, thresholds = {Bronze: 0, Silver: 500, Gold: 1000}}) {
  const gold = thresholds.Gold || 1000;
  const pct = Math.min(100, Math.round((points / gold) * 100));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-sans text-body-s font-semibold text-text-primary">
          {tier} · {points.toLocaleString()} points
        </p>
        <p className="font-mono text-mono-s text-text-secondary">{pct}% to max tier</p>
      </div>
      <div className="h-2 overflow-hidden rounded-pill bg-action-secondary" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-pill bg-action-primary transition-all" style={{width: `${pct}%`}} />
      </div>
      <div className="mt-3 flex justify-between">
        {TIERS.map((t) => (
          <span
            key={t}
            className={`font-sans text-body-xs ${t === tier ? 'font-semibold text-action-primary' : 'text-text-secondary'}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
