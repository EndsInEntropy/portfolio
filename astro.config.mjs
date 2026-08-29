import { defineConfig } from 'astro/config';

// Deployed as a GitHub Pages project site at
// https://endsinentropy.github.io/portfolio/
export default defineConfig({
  site: 'https://endsinentropy.github.io',
  base: '/portfolio',
  output: 'static',
  trailingSlash: 'always',
});
