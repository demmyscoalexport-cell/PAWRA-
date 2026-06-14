/** @type {Record<string, {title: string; description: string; body: string}>} */
export const STATIC_PAGES = {
  about: {
    title: 'About PAWRA',
    description: 'Premium smart pet technology for urban dog owners in New York.',
    body: `
      <p>PAWRA was founded in New York City with one mission: give every pet owner peace of mind — wherever their dog roams.</p>
      <p>We design smart collars, feeders, and hydration systems that keep dogs safer, healthier, and more connected to the people who love them.</p>
      <p>From the Upper West Side to Brooklyn Heights, PAWRA is trusted by professional walkers, busy professionals, and families who refuse to compromise on their pet's safety.</p>
      <p><strong>Every moment. Every pet. Every life.</strong></p>
    `,
  },
  'walker-program': {
    title: 'PAWRA Walker Program',
    description: 'Professional GPS tracking tools for NYC dog walkers.',
    body: `
      <p>The PAWRA Walker Program gives professional dog walkers enterprise-grade GPS tracking, client dashboards, and verified credentials.</p>
      <h3>What walkers get</h3>
      <ul>
        <li>Real-time GPS maps for every walk</li>
        <li>Client sharing links — owners watch live</li>
        <li>Walker Approved badge on your profile</li>
        <li>Priority support and onboarding</li>
      </ul>
      <h3>How to join</h3>
      <p>Apply with your walker credentials and service area. Our team reviews applications within 5 business days.</p>
      <p>Email <a href="mailto:walkers@shoppawra.com">walkers@shoppawra.com</a> to get started.</p>
    `,
  },
  'how-it-works': {
    title: 'How It Works',
    description: 'Set up PAWRA in minutes and start tracking in real time.',
    body: `
      <h3>1. Choose your PAWRA device</h3>
      <p>Select a GPS collar, smart fountain, or automatic feeder built for urban pet life.</p>
      <h3>2. Download the PAWRA app</h3>
      <p>Pair your device in under five minutes. Set geofences, health alerts, and sharing permissions.</p>
      <h3>3. Track in real time</h3>
      <p>Watch live location updates during walks, monitor hydration and feeding, and share access with walkers or family.</p>
      <h3>4. Stay connected</h3>
      <p>Receive instant alerts for safety events, low battery, and health anomalies — wherever you are in the city.</p>
    `,
  },
};

export function getStaticPage(handle) {
  return STATIC_PAGES[handle] ?? null;
}
