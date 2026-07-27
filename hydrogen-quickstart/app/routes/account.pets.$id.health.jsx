/**
 * @file account.pets.$id.health.jsx
 * @description Pet health records — vaccines, weight chart, medications.
 */

import {useState} from 'react';
import {Link, useParams} from 'react-router';
import {Button} from '~/components/ui/Button';
import {WeightChart} from '~/components/account/WeightChart';
import {getMockPetById, MOCK_HEALTH_RECORDS} from '~/data/platform';
import {buildSeoMeta} from '~/lib/seo';

export const meta = ({params}) =>
  buildSeoMeta({
    title: 'Pet Health Records',
    url: `/account/pets/${params.id}/health`,
    robots: {noIndex: true, noFollow: true},
  });

export default function PetHealthPage() {
  const {id} = useParams();
  const pet = getMockPetById(id);
  const initial = MOCK_HEALTH_RECORDS[id] || {vaccines: [], weights: [], medications: []};
  const [records, setRecords] = useState(initial);
  const [tab, setTab] = useState('vaccines');

  if (!pet) {
    return (
      <div>
        <p className="font-sans text-body-m text-text-secondary">Pet not found.</p>
        <Link to="/account/pets" className="mt-4 inline-block text-action-primary">
          Back to pets
        </Link>
      </div>
    );
  }

  function addVaccine(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setRecords((prev) => ({
      ...prev,
      vaccines: [
        ...prev.vaccines,
        {
          id: `v-${Date.now()}`,
          name: String(data.get('name')),
          date: String(data.get('date')),
          nextDue: String(data.get('nextDue')),
        },
      ],
    }));
    event.currentTarget.reset();
  }

  function addMedication(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setRecords((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        {
          id: `m-${Date.now()}`,
          name: String(data.get('name')),
          schedule: String(data.get('schedule') || 'As needed'),
          nextDose: String(data.get('nextDose') || '—'),
          reminder: data.get('reminder') === 'on',
        },
      ],
    }));
    event.currentTarget.reset();
  }

  const tabs = [
    {id: 'vaccines', label: 'Vaccinations'},
    {id: 'weight', label: 'Weight'},
    {id: 'meds', label: 'Medications'},
  ];

  return (
    <div className="space-y-8">
      <div>
        <Link to="/account/pets" className="font-sans text-body-s text-action-primary no-underline hover:underline">
          ← My Pets
        </Link>
        <h2 className="mt-3 font-sans text-heading-m text-text-primary">{pet.name}&apos;s health records</h2>
        <p className="mt-1 font-sans text-body-s text-text-secondary">
          {pet.breed} · {pet.weight} lb · demo data stored in session only
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Health record sections">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`reset rounded-full px-4 py-2 font-sans text-body-s font-medium ${
              tab === item.id
                ? 'bg-action-primary text-action-primary-label'
                : 'bg-action-secondary text-text-primary'
            }`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'vaccines' ? (
        <div className="space-y-6">
          <ul className="space-y-3">
            {records.vaccines.map((v) => (
              <li key={v.id} className="rounded-lg border border-border-subtle bg-page-bg px-4 py-3">
                <p className="font-sans text-body-s font-semibold text-text-primary">{v.name}</p>
                <p className="font-mono text-mono-s text-text-secondary">
                  Given {v.date} · Next due {v.nextDue}
                </p>
              </li>
            ))}
          </ul>
          <form onSubmit={addVaccine} className="grid gap-3 rounded-lg border border-border-subtle p-4 md:grid-cols-4">
            <input name="name" required placeholder="Vaccine" className="rounded-md border border-border-subtle bg-surface px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
            <input name="date" type="date" required className="rounded-md border border-border-subtle bg-surface px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
            <input name="nextDue" type="date" required className="rounded-md border border-border-subtle bg-surface px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
            <Button type="submit" variant="secondary" size="md">Add vaccine</Button>
          </form>
        </div>
      ) : null}

      {tab === 'weight' ? <WeightChart weights={records.weights} /> : null}

      {tab === 'meds' ? (
        <div className="space-y-6">
          <ul className="space-y-3">
            {records.medications.map((m) => (
              <li key={m.id} className="rounded-lg border border-border-subtle bg-page-bg px-4 py-3">
                <p className="font-sans text-body-s font-semibold text-text-primary">{m.name}</p>
                <p className="font-mono text-mono-s text-text-secondary">
                  {m.schedule} · Next {m.nextDose} · Reminder {m.reminder ? 'on' : 'off'}
                </p>
              </li>
            ))}
          </ul>
          <form onSubmit={addMedication} className="grid gap-3 rounded-lg border border-border-subtle p-4 md:grid-cols-4">
            <input name="name" required placeholder="Medication" className="rounded-md border border-border-subtle bg-surface px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
            <input name="schedule" placeholder="Schedule" className="rounded-md border border-border-subtle bg-surface px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
            <input name="nextDose" type="date" className="rounded-md border border-border-subtle bg-surface px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
            <label className="flex items-center gap-2 font-sans text-body-s text-text-primary">
              <input name="reminder" type="checkbox" className="accent-[rgb(var(--color-action-primary))]" />
              Reminder
            </label>
            <div className="md:col-span-4">
              <Button type="submit" variant="secondary" size="md">Add medication</Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
