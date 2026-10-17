/**
 * Generates packages/tokens/src/tokens.css from packages/tokens/src/index.ts.
 *
 *   pnpm gen:tokens           -> write tokens.css
 *   pnpm gen:tokens --check   -> exit 1 if tokens.css is stale (CI guard)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as T from '../packages/tokens/src/index.js';

const here = dirname(fileURLToPath(import.meta.url));
const outFile = resolve(here, '../packages/tokens/src/tokens.css');

/** camelCase TS key -> CSS custom property name (no leading --). */
const colorMap = [
  ['bg', 'color-bg'],
  ['surface', 'color-surface'],
  ['surfaceRaised', 'color-surface-raised'],
  ['border', 'color-border'],
  ['textMuted', 'color-text-muted'],
  ['text', 'color-text'],
  ['accent', 'color-accent'],
  ['accentHover', 'color-accent-hover'],
  ['accentFg', 'color-accent-fg'],
  ['success', 'color-success'],
  ['warning', 'color-warning'],
  ['danger', 'color-danger'],
  ['dangerHover', 'color-danger-hover'],
  ['dangerFg', 'color-danger-fg']
] as const;

/** Focus rings are derived in CSS from the resolved theme colour. */
const focusRings = [
  ['focus-ring', 'color-accent'],
  ['focus-ring-danger', 'color-danger'],
  ['focus-ring-success', 'color-success']
] as const;

const spaceSteps = [1, 2, 3, 4, 5, 6, 8, 12] as const;

const radiusMap = [
  ['sm', 'radius-sm'],
  ['md', 'radius-md'],
  ['lg', 'radius-lg']
] as const;

const sizeMap = [
  ['controlSm', 'control-h-sm'],
  ['controlMd', 'control-h-md'],
  ['controlLg', 'control-h-lg'],
  ['minTarget', 'target-min'],
  ['fieldMax', 'field-max']
] as const;

const dialogMap = [
  ['sm', 'dialog-sm'],
  ['md', 'dialog-md'],
  ['lg', 'dialog-lg'],
  ['full', 'dialog-full'],
  ['sheet', 'dialog-sheet']
] as const;

const iconMap = [
  ['sm', 'icon-sm'],
  ['md', 'icon-md'],
  ['lg', 'icon-lg']
] as const;

const typeMap = [
  ['fontSans', 'font-sans'],
  ['textSm', 'text-sm'],
  ['textBase', 'text-base'],
  ['textLg', 'text-lg'],
  ['textXl', 'text-xl'],
  ['text2xl', 'text-2xl'],
  ['text4xl', 'text-4xl'],
  ['leadingTight', 'leading-tight'],
  ['leadingNormal', 'leading-normal'],
  ['weightNormal', 'weight-normal'],
  ['weightMedium', 'weight-medium'],
  ['weightSemibold', 'weight-semibold']
] as const;

const v = (name: string, value: string | number) => `  --${name}: ${value};`;

type ThemeShape = { [K in keyof typeof T.colorThemes.dark]: string };

function themeBlock(theme: ThemeShape): string[] {
  const out: string[] = [];
  for (const [key, name] of colorMap) out.push(v(name, theme[key]));
  for (const [name, ref] of focusRings) out.push(v(name, `oklch(from var(--${ref}) l c h / 0.45)`));
  out.push(v('shadow-sm', theme.shadowSm));
  out.push(v('shadow-md', theme.shadowMd));
  return out;
}

function buildCss(): string {
  const L: string[] = [];

  L.push('/* Generated CSS custom properties for @web-queen/tokens.');
  L.push('   Override at runtime via `data-theme="light"` / `data-theme="dark"` — no rebuild. */');
  L.push('');

  L.push(':root,');
  L.push(":root[data-theme='dark'] {");
  L.push('  color-scheme: dark;');
  L.push(...themeBlock(T.colorThemes.dark));
  for (const k of ['fast', 'enter', 'modal'] as const) {
    L.push(v(`motion-duration-${k}`, `${T.motion.duration[k]}ms`));
  }
  for (const k of ['standard', 'emphasized'] as const) {
    L.push(v(`motion-easing-${k}`, T.motion.easing[k]));
  }
  L.push('}');
  L.push('');

  L.push(":root[data-theme='light'] {");
  L.push('  color-scheme: light;');
  L.push(...themeBlock(T.colorThemes.light));
  L.push('}');
  L.push('');

  const groups: string[][] = [
    spaceSteps.map((s) => v(`space-${s}`, T.spacing[s])),
    radiusMap.map(([k, n]) => v(n, T.radii[k])),
    [
      ...sizeMap.map(([k, n]) => v(n, T.sizes[k])),
      v('opacity-disabled', T.opacities.disabled),
      v('opacity-pressed', T.opacities.pressed)
    ],
    [v('border-width', T.borders.width), v('focus-ring-width', T.borders.focusRingWidth)],
    dialogMap.map(([k, n]) => v(n, T.dialogSizes[k])),
    iconMap.map(([k, n]) => v(n, T.icons[k])),
    typeMap.map(([k, n]) => v(n, T.type[k]))
  ];

  L.push(':root {');
  L.push(...groups.map((g) => g.join('\n')).join('\n\n').split('\n'));
  L.push('}');
  L.push('');

  L.push('html,');
  L.push('body {');
  L.push('  background: var(--color-bg);');
  L.push('  color: var(--color-text);');
  L.push('}');
  L.push('');

  return L.join('\n');
}

const next = buildCss();
const isCheck = process.argv.includes('--check');

if (isCheck) {
  let current = '';
  try {
    current = readFileSync(outFile, 'utf8');
  } catch {
    current = '';
  }
  if (current !== next) {
    console.error('tokens.css is out of date. Run: pnpm gen:tokens');
    process.exit(1);
  }
  console.log('tokens.css is up to date.');
} else {
  writeFileSync(outFile, next, 'utf8');
  console.log(`Wrote ${outFile}`);
}
