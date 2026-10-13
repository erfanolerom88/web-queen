import { gsapAnimate, type MotionConfig } from '@web-queen/motion';
import type { ActionReturn } from 'svelte/action';

/** `true` uses the default fade/slide-in; pass a config object for custom motion. */
export type AnimationProp = boolean | MotionConfig;

export function motionAction(
  node: Element,
  animation: AnimationProp | undefined
): ActionReturn<AnimationProp | undefined> | undefined {
  if (!animation) return undefined;
  const config: MotionConfig = animation === true ? { y: 12, opacity: 0, duration: 0.45 } : animation;
  return gsapAnimate(node, config);
}
