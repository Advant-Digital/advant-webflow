import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        global: resolve(__dirname, 'src/global/index.ts'),
        case: resolve(__dirname, 'src/pages/case.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        format: 'es',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'node',
  },
})
