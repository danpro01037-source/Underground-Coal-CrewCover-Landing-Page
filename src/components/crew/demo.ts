export const DEMO_REQUEST_EVENT = 'cc:demo-request';

/** "Book a Demo": jump to the contact form and prefill a demo request. */
export function requestDemo() {
  window.dispatchEvent(new Event(DEMO_REQUEST_EVENT));
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
