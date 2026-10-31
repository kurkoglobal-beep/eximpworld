'use client';

import { useEffect, useRef, useState } from 'react';

const source = '/products/logistics-hero.mp4';
const poster = '/products/logistics-hero-poster.webp';

export function ProductsHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setMotionAllowed(!preference.matches);
      if (preference.matches) setHasFrame(false);
    };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!motionAllowed || !video) return;
    let visible = false;
    let disposed = false;
    let failed = false;
    const shouldPlay = () => !disposed && !failed && visible && !document.hidden;
    const sync = () => {
      if (!shouldPlay()) { video.pause(); return; }
      if (!video.getAttribute('src')) video.src = source;
      video.muted = true;
      void video.play().then(() => {
        if (!shouldPlay()) video.pause();
      }).catch(() => {
        // Autoplay may be blocked by power-saving or browser settings.
        if (!disposed) setHasFrame(false);
      });
    };
    const playing = () => {
      if (shouldPlay()) setHasFrame(true);
      else video.pause();
    };
    const error = () => { failed = true; video.pause(); setHasFrame(false); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0 });
    observer.observe(video);
    video.addEventListener('playing', playing);
    video.addEventListener('error', error);
    document.addEventListener('visibilitychange', sync);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      video.removeEventListener('playing', playing);
      video.removeEventListener('error', error);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [motionAllowed]);

  return <div className="relative aspect-[4/3] w-full sm:aspect-[16/7]" data-products-video>
    <img src={poster} alt="EximpWorld chemical logistics promotional video still" className="absolute inset-0 h-full w-full object-contain" />
    {motionAllowed && <video ref={videoRef} autoPlay muted loop playsInline preload="none" poster={poster} aria-hidden="true" tabIndex={-1} disablePictureInPicture disableRemotePlayback className={`pointer-events-none absolute inset-0 h-full w-full object-contain ${hasFrame ? 'opacity-100' : 'opacity-0'}`} />}
  </div>;
}
