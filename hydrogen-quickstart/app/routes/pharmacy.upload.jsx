/**
 * @file pharmacy.upload.jsx
 * @description Prescription upload + vet info form (mock).
 */

import {useState} from 'react';
import {Button} from '~/components/ui/Button';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Upload Prescription',
    description: 'Upload a pet prescription to PAWRA Pharmacy.',
    url: '/pharmacy/upload',
  });

export default function PharmacyUploadPage() {
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-page-bg px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-sans text-display-s text-text-primary">Upload a prescription</h1>
        <p className="mt-3 font-sans text-body-m text-text-secondary">
          Drag a PDF or photo of your Rx, then add your vet&apos;s contact details.
        </p>

        {submitted ? (
          <div className="mt-10 rounded-lg border border-success/30 bg-success/10 p-6" role="status">
            <p className="font-sans text-body-m font-semibold text-text-primary">Prescription received</p>
            <p className="mt-2 font-sans text-body-s text-text-secondary">
              Demo only — we&apos;ll show status on the Pharmacy page. No file was uploaded to a server.
            </p>
            <Button variant="primary" size="md" href="/pharmacy" className="mt-6">
              Back to Pharmacy
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 space-y-6">
            <div
              className={`rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors ${
                dragging ? 'border-action-primary bg-action-primary/5' : 'border-border-strong bg-surface'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) setFileName(file.name);
              }}
            >
              <p className="font-sans text-body-m text-text-primary">Drag & drop prescription file</p>
              <p className="mt-2 font-sans text-body-s text-text-secondary">PDF, JPG, or PNG</p>
              <label className="mt-4 inline-flex cursor-pointer rounded-md bg-action-secondary px-4 py-2 font-sans text-body-s font-medium text-text-primary">
                Browse files
                <input
                  type="file"
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                />
              </label>
              {fileName ? <p className="mt-3 font-mono text-mono-s text-action-primary">{fileName}</p> : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="font-sans text-body-s text-text-primary">
                Pet name
                <input required name="pet" className="mt-1 w-full rounded-md border border-border-subtle bg-surface px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
              </label>
              <label className="font-sans text-body-s text-text-primary">
                Vet clinic
                <input required name="clinic" className="mt-1 w-full rounded-md border border-border-subtle bg-surface px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
              </label>
              <label className="font-sans text-body-s text-text-primary">
                Veterinarian name
                <input required name="vet" className="mt-1 w-full rounded-md border border-border-subtle bg-surface px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
              </label>
              <label className="font-sans text-body-s text-text-primary">
                Clinic phone
                <input required name="phone" type="tel" className="mt-1 w-full rounded-md border border-border-subtle bg-surface px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
              </label>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
              Submit prescription
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
