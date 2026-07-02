import { defineConfig } from 'vitest/config'

// Note: Build is handled by build.js using esbuild, not Vite's Rollup.
// Rollup 4 does not support IIFE format with multiple entry points,
// but esbuild does. See build.js for the IIFE build configuration.
export default defineConfig({
  test: {
    environment: 'node',
    passWithNoTests: true,
  },
})
