import { useEffect, useRef, useState } from 'react';

/** True when the user prefers reduced motion OR is on a touch / small device (heavy FX off). */
export function useLiteMode() {
  const [lite, setLite] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touch = window.matchMedia('(hover: none), (max-width: 767px)');
    const update = () => setLite(mq.matches || touch.matches);
    update();
    mq.addEventListener('change', update);
    touch.addEventListener('change', update);
    return () => {
      mq.removeEventListener('change', update);
      touch.removeEventListener('change', update);
    };
  }, []);
  return lite;
}

export function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(mq.matches);
    const fn = () => setR(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return r;
}

/** Observe an element once; returns [ref, visible]. */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.2, once = true) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) setVisible(false);
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return [ref, visible] as const;
}

/** Animated count-up when `start` becomes true. */
export function useCountUp(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}
