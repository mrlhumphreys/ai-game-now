import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { defineConfig } from 'vitest/config';

// is this still needed from svelte.config.js ?
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"]
      }
    }
  },
	plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
		  adapter: adapter({
        fallback: '404.html'
      }),
      paths: {
        base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
      }
    })
  ],
  server: {
    host: true,
    port: 5173
  },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
