'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './logistics-animation.module.css';

type Phase = 'static' | 'idle' | 'running' | 'complete';

export function LogisticsAnimation({ en }: { en: boolean }) {
  const section = useRef<HTMLElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const started = useRef(false);
  const [phase, setPhase] = useState<Phase>('static');
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(preference.matches || !('IntersectionObserver' in window));
    const updateVisibility = () => setVisible(document.visibilityState === 'visible');
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    if (image.current?.complete && image.current.naturalWidth) setReady(true);

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25), { threshold: [0, 0.25] })
      : null;
    if (section.current) observer?.observe(section.current);
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase('static');
    } else if (!started.current) {
      if (inView && visible && ready) {
        started.current = true;
        setPhase('running');
      } else {
        setPhase('idle');
      }
    }
  }, [inView, visible, ready, reduced]);

  return (
    <section ref={section} className={styles.section} id="international-logistics" aria-labelledby="logistics-heading" data-phase={phase} data-paused={!inView || !visible}>
      <img className={styles.network} src="/logistics/europe-network.svg" alt="" aria-hidden="true" width="900" height="550" loading="lazy" />
      <div className={styles.heading}>
        <span className={styles.rule} aria-hidden="true" />
        <h2 id="logistics-heading">{en ? 'International Logistics – From Sourcing to Delivery.' : 'Nemzetközi logisztika – a beszerzéstől a kiszállításig.'}</h2>
      </div>
      <div className={styles.stage}>
        <div className={styles.road} aria-hidden="true" />
        <div className={styles.track} onAnimationEnd={event => {
          if (event.target === event.currentTarget) setPhase('complete');
        }}>
          <img ref={image} className={styles.truck} src="/logistics/eximpworld-truck.webp" width="1400" height="691" loading="lazy" decoding="async" onLoad={() => setReady(true)} alt={en ? 'White Eximpworld truck with the original blue globe logo' : 'Fehér Eximpworld kamion az eredeti kék földgömbös logóval'} />
        </div>
      </div>
    </section>
  );
}
