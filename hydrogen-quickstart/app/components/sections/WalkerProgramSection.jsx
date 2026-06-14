import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {PulseRing} from '~/components/ui/PulseRing';

export function WalkerProgramSection() {
  return (
    <SectionReveal>
      <section className="bg-forest-green px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-display-s text-cloud">
            Trusted by New York&apos;s professional dog walkers.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-body-l text-cloud/80">
            Every dog on a PAWRA walk is tracked in real time. Every owner watches from their
            phone.
          </p>
          <article className="mx-auto mt-12 max-w-lg rounded-xl border border-electric-jade/20 bg-forest-night/50 p-8">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cloud/10">
              <div className="absolute inset-0 rounded-full ring-2 ring-electric-jade ring-offset-2 ring-offset-forest-green" />
              <span className="font-serif text-heading-xs text-cloud/40">Photo</span>
              <div className="absolute -bottom-1 -right-1">
                <PulseRing size="sm" />
              </div>
            </div>
            <blockquote className="mt-6 font-serif text-heading-xs italic text-cloud">
              &ldquo;PAWRA gives my clients peace of mind on every walk. The GPS map is
              professional-grade.&rdquo;
            </blockquote>
            <p className="mt-4 font-sans text-body-m font-semibold text-cloud">Jordan M.</p>
            <p className="font-sans text-body-s text-cloud/70">Professional Walker, Brooklyn</p>
            <div className="mt-4 flex justify-center">
              <Badge type="walker-approved" />
            </div>
          </article>
          <p className="mt-10 font-sans text-body-m text-cloud">Are you a professional dog walker?</p>
          <Button variant="accent" size="lg" href="/pages/walker-program" className="mt-4">
            Join the PAWRA Walker Program
          </Button>
        </div>
      </section>
    </SectionReveal>
  );
}
