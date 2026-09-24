import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Public media are optional. Missing files never become broken requests in the page.
const exists = path => existsSync(fileURLToPath(new URL(`./public/${path}`, import.meta.url)));
const demo = name => ({
  video: ['mp4', 'webm'].map(ext => `videos/${name}.${ext}`).find(exists) || null,
  poster: ['webp', 'png', 'jpg'].map(ext => `videos/${name}.${ext}`).find(exists) || null,
});

export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
  define: {
    'import.meta.env.PORTFOLIO_MEDIA': JSON.stringify({
      playwright: demo('ai-playwright-demo'),
      algorithms: demo('algo-visualizer-demo'),
    }),
  },
});
