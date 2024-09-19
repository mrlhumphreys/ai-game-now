import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"]
      }
    }
  },
	plugins: [sveltekit()],
  server: {
    host: true,
    port: 5173
  },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
