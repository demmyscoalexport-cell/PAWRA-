import {SectionReveal} from './SectionReveal';
import {Icon} from '~/components/ui/Icon';

const PILLARS = [
  {
    icon: 'shield',
    title: 'Quality First',
    desc: 'Every product is selected for safety, durability, and the wellbeing of your cat or dog.',
  },
  {
    icon: 'heart',
    title: 'Pet Wellness',
    desc: 'Nutrition, comfort, grooming, and wellness essentials in one trusted shop.',
  },
  {
    icon: 'truck',
    title: 'Delivered to You',
    desc: 'Fast, reliable shipping across the United States — free on orders over $75.',
  },
];

export function WhyPawra() {
  return (
    <SectionReveal>
      <section className="bg-forest-green px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3 md:gap-8">
          {PILLARS.map((item) => (
            <div key={item.title} className="text-center md:text-left">
              <Icon name={item.icon} size="lg" color="text-electric-jade" className="mx-auto !h-12 !w-12 md:mx-0" />
              <h3 className="mt-4 font-sans text-heading-s font-semibold text-cloud">{item.title}</h3>
              <p className="mt-3 font-sans text-body-m text-cloud/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
