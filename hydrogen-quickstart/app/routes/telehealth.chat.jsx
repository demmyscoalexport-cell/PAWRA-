/**
 * @file telehealth.chat.jsx
 * @description Mock vet chat messaging UI.
 */

import {useEffect, useState} from 'react';
import {Button} from '~/components/ui/Button';
import {MOCK_VET_CHAT} from '~/data/platform';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Vet Chat',
    description: 'Free PAWRA vet chat (demo).',
    url: '/telehealth/chat',
  });

const QUICK = ['Diet question', 'Allergy concern', 'Itching after meals', 'Joint stiffness'];

export default function TelehealthChatPage() {
  const [messages, setMessages] = useState(MOCK_VET_CHAT);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);

  function send(text) {
    const content = text.trim();
    if (!content) return;
    setMessages((prev) => [
      ...prev,
      {id: `u-${Date.now()}`, from: 'user', name: 'You', text: content, time: 'Now'},
    ]);
    setDraft('');
    setTyping(true);
  }

  useEffect(() => {
    if (!typing) return;
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `v-${Date.now()}`,
          from: 'vet',
          name: 'Dr. Priya Patel, DVM',
          text: 'Thanks for sharing that. Based on what you described, I’d watch for vomiting or lethargy. I can also point you to grain-free options and a pharmacy consult if needed.',
          time: 'Now',
        },
      ]);
      setTyping(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [typing]);

  return (
    <div className="bg-page-bg px-5 py-10 md:px-10 md:py-14">
      <div className="mx-auto flex max-w-3xl flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-sm" style={{minHeight: '70vh'}}>
        <header className="border-b border-border-subtle px-5 py-4">
          <h1 className="font-sans text-heading-s text-text-primary">Free Vet Chat</h1>
          <p className="font-sans text-body-s text-text-secondary">Demo conversation — not a medical diagnosis.</p>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 ${
                  msg.from === 'user'
                    ? 'bg-action-primary text-action-primary-label'
                    : 'bg-page-bg text-text-primary'
                }`}
              >
                <p className="font-sans text-body-xs opacity-80">{msg.name}</p>
                <p className="mt-1 font-sans text-body-s">{msg.text}</p>
                <p className="mt-2 font-mono text-[10px] opacity-70">{msg.time}</p>
              </div>
            </div>
          ))}
          {typing ? (
            <p className="font-sans text-body-s text-text-secondary" aria-live="polite">
              Dr. Patel is typing…
            </p>
          ) : null}
        </div>

        <div className="border-t border-border-subtle px-5 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {QUICK.map((label) => (
              <button
                key={label}
                type="button"
                className="reset rounded-pill border border-border-subtle bg-page-bg px-3 py-1.5 font-sans text-body-xs text-text-primary hover:border-action-primary"
                onClick={() => send(label)}
              >
                {label}
              </button>
            ))}
          </div>
          <form
            className="flex flex-wrap items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <label className="sr-only" htmlFor="chat-input">Message</label>
            <input
              id="chat-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="min-w-0 flex-1 rounded-md border border-border-subtle bg-page-bg px-3 py-2 font-sans text-body-s outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              placeholder="Type a message…"
            />
            <label className="reset cursor-pointer rounded-md border border-border-subtle px-3 py-2 font-sans text-body-xs text-text-secondary">
              Attach
              <input type="file" className="hidden" />
            </label>
            <Button type="submit" variant="primary" size="md">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
