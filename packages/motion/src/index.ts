import { gsap } from 'gsap';

export type MotionConfig = {
  x?: number;
  y?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: string;
};

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

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    const element = node as HTMLElement;
    element.style.opacity = '1';
    element.style.transform = 'none';
    return {};
  }

  const tween = gsap.fromTo(
    node,
    {
      opacity,
      x,
      y,
      scale
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease
    }
  );

  return {
    destroy() {
      tween.kill();
    }
  };
}

export function revealIn(node: Element, config: MotionConfig = {}) {
  return useGsap(node, {
    y: 18,
    opacity: 0,
    duration: 0.7,
    ...config
  });
}

export function staggerIn(nodes: Element[], config: MotionConfig = {}) {
  if (!nodes.length) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    nodes.forEach((node) => {
      const element = node as HTMLElement;
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
    return;
  }

  gsap.fromTo(
    nodes,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.1,
      stagger: 0.12,
      ease: 'power2.out',
      ...config
    }
  );
}
