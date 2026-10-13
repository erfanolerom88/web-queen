import { cubicOut } from 'svelte/easing';
import { fly } from 'svelte/transition';
import type { TransitionConfig } from 'svelte/transition';
import { tokens } from '@web-queen/tokens';

export const motion = tokens.motion;

function transitionDuration(duration: number) {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 0
    : duration;
}

type TransitionFn<P> = (node: Element, params?: P) => TransitionConfig;

/** Wraps a Svelte transition so it shares the reduce-motion duration handling and easing. */
export function withMotion<P extends Record<string, unknown>>(
  fn: TransitionFn<P>,
  duration: number,
  extraParams?: Omit<P, 'duration'>
): TransitionFn<P> {
  return (node: Element, params?: P) =>
    fn(node, {
      ...extraParams,
      ...params,
      duration: transitionDuration(duration),
      easing: cubicOut
    } as unknown as P);
}

export const dropdownTransition = withMotion(fly, motion.duration.enter, { y: -4 });

export const tooltipTransition = withMotion(fly, motion.duration.fast, { y: 4, opacity: 0 });