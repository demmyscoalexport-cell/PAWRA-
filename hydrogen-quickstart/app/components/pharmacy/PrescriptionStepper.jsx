/**
 * @file PrescriptionStepper.jsx
 * @description Rx status stepper UI.
 */

/**
 * @param {{ steps: string[]; currentStep: number }} props
 */
export function PrescriptionStepper({steps, currentStep}) {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => {
        const done = index < currentStep;
        const active = index === currentStep;
        return (
          <li key={step} className="flex items-start gap-3">
            <span
              className={[
                'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-mono-s font-semibold',
                done || active
                  ? 'bg-action-primary text-action-primary-label'
                  : 'bg-action-secondary text-text-secondary',
              ].join(' ')}
              aria-current={active ? 'step' : undefined}
            >
              {done ? '✓' : index + 1}
            </span>
            <div>
              <p className={`font-sans text-body-m ${active ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                {step}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
