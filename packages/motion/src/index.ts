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

export type TimelineApi = {
  from: (...args: Parameters<gsap.core.Timeline['from']>) => TimelineApi;
  to: (...args: Parameters<gsap.core.Timeline['to']>) => TimelineApi;
  fromTo: (...args: Parameters<gsap.core.Timeline['fromTo']>) => TimelineApi;
  play: () => TimelineApi;
  pause: () => TimelineApi;
  kill: () => void;
  gsap: gsap.core.Timeline | null;
};

/** Svelte action alias from the pipeline brief: `use:gsapAnimate={config}` */
export type GsapAnimateConfig = MotionConfig;

// ─── Reduced-motion ───────────────────────────────────────────────────────────

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function identityTimeline(): TimelineApi {
  const stub: TimelineApi = {
    from: () => stub,
    to: () => stub,
    fromTo: () => stub,
    play: () => stub,
    pause: () => stub,
    kill: () => {},
    gsap: null
  };
  return stub;
}

// ─── use:gsapAnimate / useGsap ────────────────────────────────────────────────

export function gsapAnimate(node: Element, config: MotionConfig = {}) {
  return useGsap(node, config);
}

export function useGsap(node: Element, config: MotionConfig = {}) {
  const {
    x = 0,
    y = 18,
    opacity = 0,
    scale = 1,
    duration = 0.5,
    delay = 0,
    ease = 'power2.out'
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

  return {
    destroy() {
      tween.kill();
    }
  };
}

// ─── ScrollTrigger presets ────────────────────────────────────────────────────

type ScrollRevealOptions = MotionConfig & {
  /** Element(s) the tween applies to. */
  targets: Element | Element[];
  /** Stagger between targets; `undefined` disables staggering. */
  stagger?: number;
};

/**
 * Shared ScrollTrigger reveal used by `revealIn` and `staggerIn`: applies the
 * same reduced-motion fallback and `top 88%` trigger, differing only in the
 * targets and optional stagger.
 */
function runScrollReveal(
  node: Element,
  targets: Element | Element[],
  config: Omit<ScrollRevealOptions, 'targets'> = {}
) {
  const {
    x = 0,
    y = 24,
    opacity = 0,
    scale = 1,
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    stagger
  } = config;

  const elements = Array.isArray(targets) ? targets : [targets];
  if (!elements.length) return {};

  if (prefersReducedMotion()) {
    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return {};
  }

  const tween = gsap.fromTo(
    elements,
    { opacity, x, y, scale },
    {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease,
      ...(stagger === undefined ? {} : { stagger }),
      scrollTrigger: {
        trigger: node,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    }
  );

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
    }
  };
}

export function revealIn(node: Element, config: MotionConfig = {}) {
  const { y = 24, duration = 0.6, ...rest } = config;
  return runScrollReveal(node, node, { ...rest, y, duration });
}

export function staggerIn(node: Element, config: StaggerConfig = {}) {
  const { y = 18, duration = 0.5, stagger = 0.08, selector = ':scope > *', ...rest } = config;
  const children = Array.from(node.querySelectorAll(selector));
  if (!children.length) return {};
  return runScrollReveal(node, children, { ...rest, y, duration, stagger });
}

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
      scrub
    }
  });

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
    }
  };
}

export const scrollTriggerPresets = {
  'fade-in': revealIn,
  'stagger-in': staggerIn,
  parallax
} as const;

// ─── createTimeline ───────────────────────────────────────────────────────────

export function createTimeline(options: TimelineOptions = {}): TimelineApi {
  if (prefersReducedMotion()) {
    return identityTimeline();
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out', duration: 0.5, ...options.defaults },
    scrollTrigger: options.scrollTrigger
  });

  const api: TimelineApi = {
    from: (...args) => {
      tl.from(...args);
      return api;
    },
    to: (...args) => {
      tl.to(...args);
      return api;
    },
    fromTo: (...args) => {
      tl.fromTo(...args);
      return api;
    },
    play: () => {
      tl.play();
      return api;
    },
    pause: () => {
      tl.pause();
      return api;
    },
    kill: () => {
      tl.kill();
    },
    gsap: tl
  };

  return api;
}
