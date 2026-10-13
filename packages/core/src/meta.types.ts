/**
 * Provisional shared contract for every `<Component>.meta.ts` file.
 * `ui_comp_lib.md:92` requires a `.meta.ts` sibling per component but does not
 * define an object shape, so this is our own internal contract.
 */

export interface PropMeta {
  /** Type as written in the component's own `*.types.ts` file. */
  type: string;
  /** Default value, if any. */
  default?: unknown;
  /** Allowed values when `type` is `'enum'`. */
  options?: readonly string[];
  /** Set when the prop is kept for backwards compatibility only. */
  deprecated?: string;
}

export interface ComponentMeta {
  /** Name as exported from `@web-queen/core`. */
  name: string;
  /** High-level grouping, e.g. `'overlay'` or `'form'`. */
  category?: string;
  description?: string;
  /** Keyed by prop name. */
  props: Record<string, PropMeta>;
  /** Svelte event callbacks, e.g. `['onOpenChange']`. */
  events?: readonly string[];
  /** Two-way bindable props, e.g. `['value']`. */
  bindings?: readonly string[];
  /** Named slots. */
  slots?: readonly string[];
}
