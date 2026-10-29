// Single source of truth for CrewCover landing page content
export const IMAGES = {
  hero: 'https://d64gsuwffb70l.cloudfront.net/6ae2e84ffc5940719ee6940c_1793255584610_0ee27757.jpg',
  helmet: 'https://d64gsuwffb70l.cloudfront.net/6ae2e84ffc5940719ee6940c_1793255599329_16d6e2ce.jpg',
  miner: 'https://d64gsuwffb70l.cloudfront.net/6ae2e84ffc5940719ee6940c_1793255615731_8c9d3a6a.jpg',
  tunnel: 'https://d64gsuwffb70l.cloudfront.net/6ae2e84ffc5940719ee6940c_1793255630443_dbec9285.jpg',
  supervisor: 'https://d64gsuwffb70l.cloudfront.net/6ae2e84ffc5940719ee6940c_1793255663664_2829e98c.jpg',
  avatars: [
    'https://d64gsuwffb70l.cloudfront.net/6ae2e84ffc5940719ee6940c_1793255645412_24b11bde.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6ae2e84ffc5940719ee6940c_1793255647003_7aeec056.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6ae2e84ffc5940719ee6940c_1793255648859_e0c0ae3b.jpg',
  ],
};

export const BOOKING_URL =
  'https://famous.ai/api/crm/6ae2e84ffc5940719ee6940c/calendar/public?calendarId=3d10b4f1-ee95-4b7d-b510-264ffc610329&view=booking';
export const CRM_SUBSCRIBE_URL = 'https://famous.ai/api/crm/6ae2e84ffc5940719ee6940c/subscribe';
export const APP_STORE_URL = 'https://apps.apple.com/';
export const PLAY_STORE_URL = 'https://play.google.com/store';
export const SUPPORT_EMAIL = 'support@crewcover.com.au';
export const TAGLINE_A = 'Shift happens.';
export const TAGLINE_B = "We've got you covered.";

export const NAV_LINKS = [
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How it Works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'contact', label: 'Contact' },
];

export const HERO_NOTIFICATIONS = [
  { title: 'New shift: Deputy', body: 'Night shift · Hunter Valley, NSW · 6:00pm', tone: 'info' },
  { title: 'Urgent: Underground Electrician needed', body: 'Boosted · Bowen Basin, QLD · Starts 6:00am', tone: 'urgent' },
  { title: 'Shift confirmed', body: 'Longwall Operator · Tue 28 Oct · Day shift', tone: 'success' },
] as const;

export const TICKER_WORDS = ['POST A SHIFT', 'ALERT YOUR CREW', 'GET COVERED', 'SHIFT HAPPENS'];

export const OLD_WAY = [
  { title: 'Endless phone calls', desc: 'Ringing down the list at 4am hoping someone picks up.' },
  { title: 'Messy group texts', desc: 'Replies lost in a thread of 40 people. Who actually said yes?' },
  { title: 'Empty shifts', desc: 'Crews short-handed and safety stretched thin.' },
  { title: 'Lost production', desc: 'Every unfilled position costs tonnes and dollars.' },
];
export const NEW_WAY = [
  { title: 'One tap', desc: 'Post a shift in under 30 seconds from your phone.' },
  { title: 'Instant alerts', desc: 'Approved workers on your site are notified straight away.' },
  { title: 'Accepted in seconds', desc: 'Workers accept with a single tap. No back and forth.' },
  { title: 'Shift covered', desc: 'Crew confirmed, production protected, everyone home safe.' },
];

export const STEPS = {
  employers: [
    { title: 'Post a shift', desc: 'Pick the role, site, date and urgency. Add notes like tickets required.' },
    { title: 'Your workers get notified', desc: 'Every approved worker at your site gets an instant push and SMS alert.' },
    { title: 'Confirm your crew', desc: 'Review who accepted, confirm in one tap and the shift is covered.' },
  ],
  workers: [
    { title: 'Sign up and link to your mine site', desc: 'Create a free profile, add your tickets and request access to your site.' },
    { title: 'Get instant shift alerts', desc: 'Once your supervisor approves you, see every available shift as it drops.' },
    { title: 'Accept shifts in one tap', desc: 'Grab the shifts that suit your roster. Simple as that.' },
  ],
};

export const PINNED_STAGES = [
  { key: 'post', label: 'Post a Shift', desc: 'Supervisor posts a Deputy night shift at Hunter Valley in under 30 seconds.' },
  { key: 'alert', label: 'Alert Sent', desc: '42 approved workers on site get an instant push and SMS alert.' },
  { key: 'accept', label: 'Shift Accepted', desc: 'Liam T. accepts in one tap. 98% match on tickets and availability.' },
  { key: 'covered', label: 'Shift Covered', desc: 'Crew confirmed in 4 minutes. Production keeps moving.' },
] as const;

export const STATS = [
  { value: 4, suffix: ' min', label: 'Average time to cover a shift' },
  { value: 92, suffix: '%', label: 'Fill rate for posted shifts' },
  { value: 1200, suffix: '+', label: 'Underground workers on CrewCover' },
  { value: 80, suffix: '%', label: 'Fewer phone calls for supervisors' },
];

export const REPORT_BARS = [
  { role: 'Miner Driver', value: 48 },
  { role: 'UG Electrician', value: 32 },
  { role: 'UG Fitter', value: 28 },
  { role: 'Deputy', value: 20 },
  { role: 'Longwall Op', value: 18 },
  { role: 'Control Room', value: 16 },
];

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  annual: number | null;
  unit: string;
  popular?: boolean;
  cta: string;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    id: 'casual', name: 'CrewCover Casual', tagline: 'No subscription required', monthly: 69.99, annual: null, unit: 'per shift advertisement', cta: 'Post a Shift',
    features: ['One shift ad, live up to 14 days or until filled', 'Applications and messaging for that shift', 'Basic candidate filtering', '30-day applicant history', 'No ongoing commitment'],
  },
  {
    id: 'starter', name: 'Crew Starter', tagline: 'For smaller mining contractors', monthly: 599, annual: 5990, unit: 'per month', cta: 'Get Started',
    features: ['10 active shift advertisements', 'Unlimited applications', '2 employer user accounts', 'Basic worker search', 'Licence and competency filters', 'Messaging and application tracking', 'Email notifications'],
  },
  {
    id: 'pro', name: 'Crew Pro', tagline: 'For businesses regularly sourcing underground workers', monthly: 999, annual: 9990, unit: 'per month', popular: true, cta: 'Get Started',
    features: ['15 active shift advertisements', '5 employer user accounts', 'Advanced competency and availability matching', 'Favourite workers and private crew shortlist', '5 Urgent Shift Boosts monthly', 'Multiple sites under one organisation', 'Document status and expiry indicators', 'Automated SMS shift alerts', 'Reporting on applications and outcomes'],
  },
  {
    id: 'enterprise', name: 'Crew Enterprise', tagline: 'For larger contractors and multi-site operations', monthly: 1499, annual: 14990, unit: 'per month', cta: 'Talk to Us',
    features: ['Unlimited active ads (fair use)', '20 employer user accounts', 'Multi-site access and permissions', 'Custom worker pools', 'Unlimited Urgent Shift Boosts', 'Detailed workforce reporting', 'Account onboarding', 'Priority support', 'Integration options quoted separately'],
  },
];

export const FAQS = [
  { q: 'Is it free for workers?', a: 'Yes. CrewCover is completely free for underground coal mining workers. Download the app, build your profile, add your tickets and start receiving shift alerts at no cost.' },
  { q: 'Who can see our shifts?', a: "Only workers who have linked to your mine site and been approved by your supervisor can see your shifts. Your shifts are never publicly listed, and personal mobile numbers stay private through CrewCover's secure messaging." },
  { q: 'How do workers join our site?', a: 'Workers sign up in the app and request to link to your mine site. Your supervisor reviews their profile, tickets and medicals, then approves them with one tap. From then on, they receive your shift alerts.' },
  { q: 'Can we manage more than one site?', a: 'Absolutely. Crew Pro and Crew Enterprise support multiple sites under one organisation, with separate worker pools, supervisors and permissions for each site, plus consolidated reporting.' },
  { q: 'Is our data secure?', a: 'Yes. All data is encrypted in transit and at rest, hosted in Australia, and access is role-based. Workers and employers communicate through secure in-app messaging, so personal phone numbers are never exposed.' },
];

export const SITE_OPTIONS = ['1 site', '2 to 3 sites', '4 to 10 sites', '10+ sites'];
