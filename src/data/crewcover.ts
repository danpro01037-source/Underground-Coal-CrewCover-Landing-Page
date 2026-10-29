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
// FormSubmit relays contact form submissions to SUPPORT_EMAIL (needs a one-time activation from that inbox)
export const CONTACT_EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${SUPPORT_EMAIL}`;
// Pricing is hidden during the pilot phase; flip to true to show the section, nav link and plan picker again
export const SHOW_PRICING = false;
export const TAGLINE_A = 'Shift happens.';
export const TAGLINE_B = "We've got you covered.";

export const NAV_LINKS = [
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How it Works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'contact', label: 'Contact' },
].filter((l) => SHOW_PRICING || l.id !== 'pricing');

export const HERO_NOTIFICATIONS = [
  { title: 'New shift: Deputy', body: 'Night shift · Hunter Valley, NSW · 6:00pm', tone: 'info' },
  { title: 'Urgent: Underground Electrician needed', body: 'Boosted · Bowen Basin, QLD · Starts 6:00am', tone: 'urgent' },
  { title: 'Shift confirmed', body: 'Longwall Operator · Tue 28 Oct · Day shift', tone: 'success' },
] as const;

export const TICKER_WORDS = ['POST A SHIFT', 'GET COVERED', 'SHIFT HAPPENS'];

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

export type FaqGroup = { id: string; label: string; items: { q: string; a: string }[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'workers',
    label: 'Workers',
    items: [
      { q: 'Is it free for workers?', a: 'Yes. CrewCover is completely free for underground coal mining workers. Download the app, build your profile, add your tickets and start receiving shift alerts at no cost.' },
      { q: 'Do workers have to join?', a: 'No, it is not compulsory for workers to sign up to CrewCover. However if they do not, they will not receive notifications of any shift vacancies.' },
      { q: 'What is CrewCover?', a: 'CrewCover is an Australian workforce platform designed for the underground coal mining industry. It connects suitably qualified workers with mining contractors and employers who need to fill vacant shifts quickly.' },
      { q: 'Do I need to leave my current job to use CrewCover?', a: 'No. CrewCover is designed to help workers find additional shift opportunities around their existing commitments, subject to their employment contract, fatigue management requirements and site rules.' },
      { q: 'How do workers find available shifts?', a: 'Once registered, workers can browse advertised shifts, filter opportunities by work area and role, and view relevant shift details before expressing interest.' },
      { q: 'Can workers choose when they’re available to work?', a: 'Yes. CrewCover is designed to let workers manage their availability so employers can identify suitable workers for vacant shifts.' },
      { q: 'Can workers choose not to receive notifications about shifts?', a: 'Yes, workers have the ability to turn off notifications within the app.' },
      { q: 'What underground mining roles are available?', a: 'CrewCover is designed for numerous roles including Underground Fitters, Underground Electricians, Shearer Operators, Continuous Miner Drivers, Control Room Operators and Deputies, across Longwall, Development, Outbye process areas. Additional roles can be added as required by each mine site.' },
      { q: 'Can I work shifts at different mine sites?', a: "Potentially, yes. Workers (such as Contract workers) must meet the relevant mine site's induction, competency, authorisation, medical and other entry requirements before commencing work." },
      { q: "How will I know if I've been selected for a shift?", a: 'CrewCover is planned to provide shift updates and messaging within the app. The exact notification and confirmation process should be finalised before launch.' },
      { q: 'Who pays me for the shifts I work?', a: 'The employer or contracting company engaging you would be responsible for payment under the applicable employment agreement. CrewCover merely provides the platform for the employer to advertise the vacancy and the ability for the worker to accept the vacancy.' },
      { q: 'How do I get started?', a: 'Register your interest, create your worker profile, add your qualifications and competencies, and set your availability. Once the platform launches, you can explore suitable shift opportunities.' },
    ],
  },
  {
    id: 'employers',
    label: 'Employers & Supervisors',
    items: [
      { q: 'Who can see our shifts?', a: "Only workers who have linked to your mine site and been approved by your supervisor can see your shifts. Your shifts are never publicly listed, and personal mobile numbers stay private through CrewCover's secure messaging." },
      { q: 'How do workers join our site?', a: 'Workers sign up in the app and request to link to your mine site. The authorised site person reviews their profile, tickets and medicals, then approves them with one tap. From then on, they receive shift alerts.' },
      { q: 'How does CrewCover help us fill vacant shifts?', a: 'CrewCover allows employers and authorised supervisors to advertise vacant shifts, identify available workers and manage responses from one central platform. Instead of relying on multiple phone calls and messages, you can coordinate shift coverage in just a few clicks.' },
      { q: 'How quickly can we find a replacement worker?', a: 'CrewCover is designed to speed up the process of finding suitable available workers. Actual filling times depend on worker availability, required competencies, site eligibility and employer approval but generally, can be undertaken in a number of minutes.' },
      { q: 'Can we find workers for specific underground mining roles?', a: 'Yes. CrewCover is designed to support roles including Underground Fitters, Underground Electricians, Shearer Operators, Continuous Miner Drivers, Control Room Operators and Deputies, across Longwall, Development, Outbye and Surface operations. Other roles can be added as required by an authorised person of the organisation.' },
      { q: 'Can we advertise multiple vacant shifts at once?', a: 'CrewCover is intended to make it easy to manage multiple shift vacancies from one dashboard, reducing the administrative burden on supervisors and workforce coordinators.' },
      { q: 'Can we book workers for last-minute absences or emergency shift coverage?', a: 'CrewCover is designed for both planned workforce requirements and unexpected vacancies, including sick leave, unplanned absences and short-notice roster gaps. All bookings remain subject to worker availability and site requirements.' },
      { q: 'How do we know workers have the right qualifications?', a: 'CrewCover is designed to help employers review relevant worker profiles, qualifications and competencies. Employers remain responsible for verifying that each worker meets the requirements of the position and mine site.' },
      { q: 'Can we see whether a worker is inducted at our mine site?', a: 'Site induction and eligibility information could form part of the worker profile, subject to verification and appropriate permissions. This feature should be confirmed before launch.' },
      { q: 'Does CrewCover manage fatigue compliance?', a: "CrewCover supports workforce planning without replacing an employer's fatigue management systems. Employers and workers remain responsible for complying with applicable fatigue, fitness-for-work and site safety requirements." },
      { q: 'Who is responsible for safety, supervision and site compliance?', a: 'The relevant mine operator, employer and other duty holders retain their legal responsibilities under applicable work health and safety and mining legislation. CrewCover does not replace site-specific safety and authorisation processes.' },
      { q: 'Can supervisors manage their crews through CrewCover?', a: 'CrewCover is designed to provide a central place for managing vacant shifts, reviewing worker availability, communicating with workers and tracking shift coverage.' },
      { q: 'Can multiple supervisors or managers access the same company account?', a: "CrewCover's subscription model is intended to support business accounts. The final number of users and permission levels will depend on the selected subscription and platform configuration." },
      { q: 'What real-time data and management reports will CrewCover provide?', a: 'CrewCover is planned to provide visibility into shift vacancies, coverage status, worker availability and workforce activity. Reporting could include shifts advertised, shifts filled, response times, unfilled vacancies and trends by site or work area.' },
      { q: 'Can we manage multiple mine sites?', a: 'CrewCover is designed for mining contractors operating across different locations. Multi-site access and reporting should be defined within the relevant subscription package.' },
      { q: 'Can CrewCover reduce time spent making phone calls and sending messages?', a: 'Yes. By centralising shift advertisements, worker responses and communications, CrewCover aims to reduce the manual coordination involved in finding staff to cover vacant shifts.' },
      { q: 'How much does CrewCover cost for employers?', a: 'CrewCover offers casual shift advertising, monthly subscription options and annual subscription options allowing employers to choose a model that suits their workforce requirements.' },
      { q: 'Do we have to commit to a monthly subscription?', a: "No. CrewCover's proposed Casual option allows employers to advertise individual shifts without committing to a monthly subscription. Additionally, Annual Packages are available at a cheaper overall rate than monthly subscriptions." },
      { q: 'Who employs and pays workers booked through CrewCover?', a: 'CrewCover is designed as a workforce marketplace rather than the employer of every worker using the platform. Employment, payroll and contractual responsibilities must be clearly established between the relevant parties before a shift is confirmed.' },
      { q: 'Can we use CrewCover with our existing employees?', a: 'Yes. CrewCover is intended to support workforce coordination and shift coverage by providing their own employees or approved worker pools the ability to work additional shifts.' },
      { q: 'Is our company and workforce information kept confidential?', a: 'CrewCover uses appropriate account permissions and data security measures to protect company and worker information. CrewCover privacy policy explains what information is collected, stored and shared and how this information is treated.' },
    ],
  },
];

export const SITE_OPTIONS = ['1 site', '2 to 3 sites', '4 to 10 sites', '10+ sites'];
