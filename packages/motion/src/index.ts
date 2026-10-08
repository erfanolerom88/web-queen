import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

export type MotionConfig = {
  x?: number;
  y?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: string;
};

export type StaggerConfig = MotionConfig & {
  stagger?: number;
  selector?: string;
};

export type ParallaxConfig = {
  speed?: number;
  scrub?: boolean | number;
};

export type TimelineOptions = {
  defaults?: MotionConfig;
  scrollTrigger?: ScrollTrigger.Vars;
};

// ─── Reduced-motion ───────────────────────────────────────────────────────────

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

// ─── useGsap ──────────────────────────────────────────────────────────────────

export function useGsap(node: Element, config: MotionConfig = {}) {
  const {
    x = 0, y = 18, opacity = 0, scale = 1,
    duration = 0.5, delay = 0, ease = 'power2.out',
  } = config;

  if (prefersReducedMotion()) {
    (node as HTMLElement).style.opacity = '1';
    (node as HTMLElement).style.transform = 'none';
    return {};
  }

  const tween = gsap.fromTo(
    node,
    { opacity, x, y, scale },
    { opacity: 1, x: 0, y: 0, scale: 1, duration, delay, ease }
  );

  return { destroy() { tween.kill(); } };
}

// ─── revealIn ─────────────────────────────────────────────────────────────────

export function revealIn(node: Element, config: MotionConfig = {}) {
  const {
    x = 0, y = 24, opacity = 0, scale = 1,
    duration = 0.6, delay = 0, ease = 'power2.out',
  } = config;

  if (prefersReducedMotion()) {
    (node as HTMLElement).style.opacity = '1';
    (node as HTMLElement).style.transform = 'none';
    return {};
  }

  const tween = gsap.fromTo(
    node,
    { opacity, x, y, scale },
    {
      opacity: 1, x: 0, y: 0, scale: 1, duration, delay, ease,
      scrollTrigger: {
        trigger: node,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
    },
  };
}

// ─── staggerIn ────────────────────────────────────────────────────────────────

export function staggerIn(node: Element, config: StaggerConfig = {}) {
  const {
    x = 0, y = 18, opacity = 0, scale = 1,
    duration = 0.5, delay = 0, stagger = 0.08,
    ease = 'power2.out', selector = ':scope > *',
  } = config;

  const children = Array.from(node.querySelectorAll(selector));
  if (!children.length) return {};

  if (prefersReducedMotion()) {
    children.forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return {};
  }

  const tween = gsap.fromTo(
    children,
    { opacity, x, y, scale },
    {
      opacity: 1, x: 0, y: 0, scale: 1, duration, delay, ease, stagger,
      scrollTrigger: {
        trigger: node,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
    },
  };
}

// ─── parallax ─────────────────────────────────────────────────────────────────

export function parallax(node: Element, config: ParallaxConfig = {}) {
  const { speed = 0.4, scrub = true } = config;

  if (prefersReducedMotion()) return {};

  const tween = gsap.to(node, {
    yPercent: -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: node,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
    },
  });

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
    },
  };
}

// ─── createTimeline ───────────────────────────────────────────────────────────

export function createTimeline(options: TimelineOptions = {}) {
  if (prefersReducedMotion()) {
    const stub: any = { from: () => stub, to: () => stub, fromTo: () => stub, play: () => stub, pause: () => stub, kill: () => {}, gsap: null };
    return stub;
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out', duration: 0.5, ...options.defaults },
    scrollTrigger: options.scrollTrigger,
  });

  const api = {
    from:   (...args: Parameters<typeof tl.from>)   => { tl.from(...args);   return api; },
    to:     (...args: Parameters<typeof tl.to>)     => { tl.to(...args);     return api; },
    fromTo: (...args: Parameters<typeof tl.fromTo>) => { tl.fromTo(...args); return api; },
    play:   () => { tl.play();  return api; },
    pause:  () => { tl.pause(); return api; },
    kill:   () => tl.kill(),
    gsap:   tl,
  };

  return api;vvvvvvfg gy gyj gy gygy yygyyy yyyy         y
}
ر