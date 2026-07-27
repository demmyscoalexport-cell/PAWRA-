/**
 * @file account.pets.jsx
 * @description My Pets profiles + recommendations shelf.
 */

import {useMemo, useState} from 'react';
import {Form, Link} from 'react-router';
import {Button} from '~/components/ui/Button';
import {PawraProductCard} from '~/components/PawraProductCard';
import {MOCK_PETS} from '~/data/platform';
import {getProductsByTag, MOCK_PRODUCTS} from '~/data/products';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'My Pets',
    url: '/account/pets',
    robots: {noIndex: true, noFollow: true},
  });

export default function AccountPetsPage() {
  const [pets, setPets] = useState(MOCK_PETS);
  const [selectedId, setSelectedId] = useState(MOCK_PETS[0]?.id);
  const [showForm, setShowForm] = useState(false);
  const selected = pets.find((p) => p.id === selectedId) || pets[0];

  const recommended = useMemo(() => {
    if (!selected) return [];
    const dietTag =
      selected.dietary.toLowerCase().includes('grain')
        ? 'grain-free-dry-dog-food'
        : selected.species === 'Cat'
          ? 'indoor-dry-cat-food'
          : 'dog-food';
    const tagged = getProductsByTag(dietTag);
    return (tagged.length ? tagged : MOCK_PRODUCTS).slice(0, 4);
  }, [selected]);

  function handleAdd(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const pet = {
      id: String(Date.now()),
      name: String(data.get('name') || 'New pet'),
      species: String(data.get('species') || 'Dog'),
      breed: String(data.get('breed') || ''),
      age: Number(data.get('age') || 1),
      weight: Number(data.get('weight') || 10),
      dietary: String(data.get('dietary') || ''),
      allergies: String(data.get('allergies') || 'None'),
      lifeStage: 'adult',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop',
    };
    setPets((prev) => [...prev, pet]);
    setSelectedId(pet.id);
    setShowForm(false);
    event.currentTarget.reset();
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-sans text-heading-m text-text-primary">My Pets</h2>
          <p className="mt-1 font-sans text-body-s text-text-secondary">
            Profiles power health reminders and product recommendations.
          </p>
        </div>
        <Button type="button" variant="secondary" size="md" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Close form' : 'Add pet'}
        </Button>
      </div>

      {showForm ? (
        <Form onSubmit={handleAdd} className="grid gap-4 rounded-lg border border-border-subtle bg-page-bg p-5 md:grid-cols-2">
          {[
            ['name', 'Name', 'text'],
            ['species', 'Species', 'text'],
            ['breed', 'Breed', 'text'],
            ['age', 'Age (years)', 'number'],
            ['weight', 'Weight (lb)', 'number'],
            ['dietary', 'Dietary preferences', 'text'],
            ['allergies', 'Allergies', 'text'],
          ].map(([name, label, type]) => (
            <label key={name} className="block font-sans text-body-s text-text-primary">
              {label}
              <input
                name={name}
                type={type}
                required={name === 'name'}
                className="mt-1 w-full rounded-md border border-border-subtle bg-surface px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
            </label>
          ))}
          <label className="block font-sans text-body-s text-text-primary md:col-span-2">
            Photo upload (demo)
            <input type="file" accept="image/*" className="mt-1 block w-full font-sans text-body-s text-text-secondary" />
          </label>
          <div className="md:col-span-2">
            <Button type="submit" variant="primary" size="md">
              Save pet
            </Button>
          </div>
        </Form>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {pets.map((pet) => (
          <button
            key={pet.id}
            type="button"
            onClick={() => setSelectedId(pet.id)}
            className={`reset flex gap-4 rounded-lg border p-4 text-left transition-colors ${
              selected?.id === pet.id
                ? 'border-action-primary bg-action-primary/5'
                : 'border-border-subtle bg-surface hover:border-action-primary/40'
            }`}
          >
            <img src={pet.image} alt="" className="h-20 w-20 rounded-md object-cover" loading="lazy" />
            <div>
              <p className="font-sans text-body-m font-semibold text-text-primary">{pet.name}</p>
              <p className="mt-1 font-sans text-body-s text-text-secondary">
                {pet.species} · {pet.breed} · {pet.age} yrs · {pet.weight} lb
              </p>
              <p className="mt-1 font-mono text-mono-s text-text-secondary">{pet.dietary}</p>
              <Link
                to={`/account/pets/${pet.id}/health`}
                className="mt-2 inline-block font-sans text-body-xs font-semibold text-action-primary no-underline hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Health records →
              </Link>
            </div>
          </button>
        ))}
      </div>

      {selected ? (
        <section>
          <h3 className="font-sans text-heading-s text-text-primary">Recommended for {selected.name}</h3>
          <p className="mt-1 font-sans text-body-s text-text-secondary">
            Matched to {selected.dietary || 'diet'} preferences and species.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((product, i) => (
              <PawraProductCard key={product.id} product={product} loading={i < 2 ? 'eager' : 'lazy'} showCompare />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
