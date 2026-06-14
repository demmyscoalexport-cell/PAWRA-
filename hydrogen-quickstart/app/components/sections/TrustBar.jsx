import {SectionReveal} from './SectionReveal';
import {Icon} from '~/components/ui/Icon';

const ITEMS = [
  {icon: 'gps', label: 'Real-Time GPS', desc: 'Live location updated every 30 seconds'},
  {icon: 'shield', label: 'Safety Alerts', desc: 'Instant geofence exit notifications to your phone'},
  {icon: 'heart', label: 'Health Tracking', desc: 'Activity and wellness data at a glance'},
  {icon: 'truck', label: 'Free US Shipping', desc: 'On all orders over $75'},
];

export function TrustBar() {
  return (
    <SectionReveal>
      <section className="bg-midnight px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {ITEMS.map((item) => (
            <div key={item.label} className="text-center md:text-left">
              <Icon name={item.icon} size="lg" color="text-electric-jade" className="mx-auto !h-12 !w-12 md:mx-0" />
              <p className="mt-4 font-sans text-body-m font-semibold text-cloud">{item.label}</p>
              <p className="mt-2 font-sans text-body-s text-cloud/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
