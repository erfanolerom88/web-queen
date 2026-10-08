import { cubicOut } from 'svelte/easing';
import { fade, fly, scale } from 'svelte/transition';
import { tokens } from '@web-queen/tokens';

export const motion = tokens.motion;

function transitionDuration(duration: number) {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 0
    : duration;
}

export function modalBackdropTransition(node: Element) {
  return fade(node, {
    duration: transitionDuration(motion.duration.modal),
    easing: cubicOut
  });
}

export function modalScaleTransition(node: Element) {
  return scale(node, {
    duration: transitionDuration(motion.duration.modal),
    easing: cubicOut,
    start: 0.96
  });
}

export function dropdownTransition(node: Element) {
  return fly(node, {
    duration: transitionDuration(motion.duration.enter),
    easing: cubicOut,
    y: -4
  });
}

export function tooltipTransition(node: Element) {
  return fly(node, {
    duration: transitionDuration(motion.duration.fast),
    easing: cubicOut,
    y: 4,
    opacity: 0
  });
}