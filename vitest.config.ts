import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  // Removed resolve.alias to rely solely on vite-tsconfig-paths plugin for alias resolution
  // resolve: {
  //   alias: {
  //     '@lib':      '/src/lib',
  //     '@db':       '/src/db',
  //     '@modules':  './src/modules',
  //     '@':         './src'
  //   }
  // },
  test: {
    globals: true,
    environment: 'node',
    setupFiles: [],
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
