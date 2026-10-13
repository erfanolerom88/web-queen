import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib',
      '$lib/utils': '../../packages/core/src/utils.ts',
      '$lib/components': '../../packages/core/src',
      '$lib/components/ui': '../../packages/core/src/ui'
    }
  }
};

export default config;
