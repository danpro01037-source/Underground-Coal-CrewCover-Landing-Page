import { useCallback, useEffect, useState } from 'react';
import IntroLoader from './crew/IntroLoader';
import { ScrollProgress, MouseSpotlight, Grain } from './crew/Overlays';
import Navbar, { scrollToId } from './crew/Navbar';
import Hero from './crew/Hero';
import Ticker from './crew/Ticker';
import Problem from './crew/Problem';
import HowItWorks from './crew/HowItWorks';
import PinnedPhone from './crew/PinnedPhone';
import Features from './crew/Features';
import Stats from './crew/Stats';
import Pricing from './crew/Pricing';
import FAQ from './crew/FAQ';
import FinalCTA from './crew/FinalCTA';
import Contact from './crew/Contact';
import Footer from './crew/Footer';
import { LightDivider } from './crew/primitives';
import { SHOW_PRICING, type Plan } from '@/data/crewcover';

export default function AppLayout() {
  const [ready, setReady] = useState(false);
  const [prefill, setPrefill] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const onDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    document.body.classList.add('cc-body');
    document.documentElement.classList.remove('light');
    return () => document.body.classList.remove('cc-body');
  }, []);

  const selectPlan = (p: Plan) => {
    setSelectedPlan(p.name);
    setPrefill(`Hi CrewCover team, I'm interested in the ${p.name} plan. Please get in touch to help us get set up.`);
    scrollToId('contact');
  };

  return (
    <div className="relative min-h-screen bg-cc-black font-sans text-white antialiased">
      <IntroLoader onDone={onDone} />
      <ScrollProgress />
      <MouseSpotlight />
      <Grain />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Ticker />
        <Problem />
        <LightDivider />
        <HowItWorks />
        <PinnedPhone />
        <LightDivider />
        <Features />
        <Stats />
        {SHOW_PRICING && <Pricing onSelectPlan={selectPlan} />}
        <LightDivider />
        <FAQ />
        <Ticker reverse tilt={2} />
        <FinalCTA />
        <Contact prefill={prefill} plan={selectedPlan} />
      </main>
      <Footer />
    </div>
  );
}
