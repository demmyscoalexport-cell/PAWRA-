/**
 * @file care.quiz.jsx
 * @description 60-second new-pet care quiz → curated kit + products.
 */

import {useMemo, useState} from 'react';
import {Link} from 'react-router';
import {Button} from '~/components/ui/Button';
import {PawraProductCard} from '~/components/PawraProductCard';
import {QUIZ_STEPS, resolveQuizResult, PET_GUARANTEE} from '~/data/starterKits';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Care Quiz',
    description:
      'Answer a few questions and get a curated PAWRA starter kit for your dog or cat — with a 30-day Pet Guarantee.',
    url: '/care/quiz',
  });

export default function CareQuizPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(/** @type {Record<string, string>} */ ({}));
  const [done, setDone] = useState(false);

  const step = QUIZ_STEPS[stepIndex];
  const options = useMemo(() => {
    if (!step) return [];
    if (step.optionsBySpecies) {
      const species = answers.species === 'cat' ? 'cat' : 'dog';
      return step.optionsBySpecies[species] || [];
    }
    return step.options || [];
  }, [step, answers.species]);

  const result = done ? resolveQuizResult(answers) : null;
  const progress = done ? 100 : Math.round(((stepIndex + 1) / QUIZ_STEPS.length) * 100);

  function selectOption(value) {
    if (!step) return;
    const nextAnswers = {...answers, [step.id]: value};
    setAnswers(nextAnswers);

    if (stepIndex >= QUIZ_STEPS.length - 1) {
      setDone(true);
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setDone(false);
  }

  return (
    <div className="bg-page-bg px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-body-xs font-semibold uppercase tracking-widest text-action-primary">
          PAWRA Care Quiz
        </p>
        <h1 className="mt-3 font-serif text-display-s text-action-primary md:text-display-m">
          Find the right first kit
        </h1>
        <p className="mt-3 font-sans text-body-m text-text-secondary">
          Three quick questions. We’ll recommend a starter kit and essentials — backed by our{' '}
          {PET_GUARANTEE.title}.
        </p>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-action-secondary" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-action-primary transition-all" style={{width: `${progress}%`}} />
        </div>

        {!done && step ? (
          <div className="mt-10">
            <p className="font-sans text-body-xs text-text-secondary">
              Step {stepIndex + 1} of {QUIZ_STEPS.length}
            </p>
            <h2 className="mt-2 font-sans text-heading-m text-text-primary">{step.prompt}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectOption(option.value)}
                  className="reset rounded-lg border border-border-subtle bg-surface px-5 py-5 text-left transition-colors hover:border-action-primary hover:bg-action-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <span className="block font-sans text-body-m font-semibold text-text-primary">
                    {option.label}
                  </span>
                  {option.hint ? (
                    <span className="mt-1 block font-sans text-body-s text-text-secondary">{option.hint}</span>
                  ) : null}
                </button>
              ))}
            </div>
            {stepIndex > 0 ? (
              <button
                type="button"
                className="reset mt-6 font-sans text-body-s text-text-secondary underline"
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              >
                Back
              </button>
            ) : null}
          </div>
        ) : null}

        {done && result ? (
          <div className="mt-10 space-y-10">
            <div className="rounded-lg border border-border-subtle bg-surface p-6 md:p-8">
              <p className="font-sans text-body-xs uppercase tracking-wide text-text-secondary">
                Your match
              </p>
              <h2 className="mt-2 font-serif text-heading-l text-action-primary">
                {result.kit?.title || 'Your curated essentials'}
              </h2>
              <p className="mt-3 font-sans text-body-m text-text-secondary">
                {result.kit?.description || 'A calm set of essentials based on your answers.'}
              </p>
              {result.kit ? (
                <div className="mt-4 flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-mono-l font-semibold text-action-primary">
                    ${result.kit.bundlePrice}
                  </span>
                  <span className="font-mono text-mono-s text-text-secondary line-through">
                    ${result.kit.compareAtPrice}
                  </span>
                  <span className="font-sans text-body-xs text-sale">{result.kit.savingsLabel}</span>
                </div>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3">
                {result.kit ? (
                  <Button variant="primary" size="lg" href={`/bundles/${result.kit.handle}`}>
                    View starter kit
                  </Button>
                ) : null}
                <Button variant="secondary" size="lg" href={result.species === 'cat' ? '/collections/cats' : '/collections/dogs'}>
                  Browse {result.species === 'cat' ? 'cats' : 'dogs'}
                </Button>
                <button type="button" className="reset font-sans text-body-s text-text-secondary underline" onClick={restart}>
                  Retake quiz
                </button>
              </div>
              <p className="mt-4 font-sans text-body-s text-text-secondary">{PET_GUARANTEE.short}</p>
            </div>

            {result.recommended.length ? (
              <section>
                <h3 className="font-sans text-heading-m text-text-primary">Recommended for you</h3>
                <p className="mt-2 font-sans text-body-s text-text-secondary">
                  Based on {result.species}, {result.lifeStage}, and {result.priority}.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {result.recommended.map((product, index) => (
                    <PawraProductCard
                      key={product.id}
                      product={product}
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            <p className="font-sans text-body-s text-text-secondary">
              Prefer to explore?{' '}
              <Link to="/bundles/new-dog-starter" className="font-medium text-action-primary no-underline hover:underline">
                Dog starter kit
              </Link>{' '}
              ·{' '}
              <Link to="/bundles/new-cat-starter" className="font-medium text-action-primary no-underline hover:underline">
                Cat starter kit
              </Link>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
