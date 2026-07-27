/**
 * @file WeightChart.jsx
 * @description Lightweight SVG weight trend chart (no chart library).
 */

/**
 * @param {{ weights: Array<{ date: string; lbs: number }>; className?: string }} props
 */
export function WeightChart({weights = [], className = ''}) {
  if (!weights.length) {
    return <p className="font-sans text-body-s text-text-secondary">No weight data yet.</p>;
  }

  const values = weights.map((w) => w.lbs);
  const min = Math.min(...values) - 1;
  const max = Math.max(...values) + 1;
  const w = 320;
  const h = 120;
  const pad = 12;

  const points = weights
    .map((entry, i) => {
      const x = pad + (i / Math.max(weights.length - 1, 1)) * (w - pad * 2);
      const y = h - pad - ((entry.lbs - min) / (max - min || 1)) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md text-action-primary" role="img" aria-label="Weight over time">
        <polyline fill="none" stroke="currentColor" strokeWidth="2.5" points={points} />
        {weights.map((entry, i) => {
          const x = pad + (i / Math.max(weights.length - 1, 1)) * (w - pad * 2);
          const y = h - pad - ((entry.lbs - min) / (max - min || 1)) * (h - pad * 2);
          return <circle key={entry.date} cx={x} cy={y} r="3.5" fill="currentColor" />;
        })}
      </svg>
      <div className="mt-2 flex justify-between font-mono text-mono-s text-text-secondary">
        <span>{weights[0].date}</span>
        <span>{weights[weights.length - 1].lbs} lb current</span>
        <span>{weights[weights.length - 1].date}</span>
      </div>
    </div>
  );
}
