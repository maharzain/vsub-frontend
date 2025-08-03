import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: [
      '@remotion/compositor-darwin-x64',
      '@remotion/compositor-darwin-arm64',
      '@remotion/compositor-linux-x64-musl',
      '@remotion/compositor-linux-x64-gnu',
      '@remotion/compositor-linux-arm64-musl',
      '@remotion/compositor-linux-arm64-gnu',
    ],
  },
  build: {
    rollupOptions: {
      external: [
        '@remotion/compositor-darwin-x64',
        '@remotion/compositor-darwin-arm64',
        '@remotion/compositor-linux-x64-musl',
        '@remotion/compositor-linux-x64-gnu',
        '@remotion/compositor-linux-arm64-musl',
        '@remotion/compositor-linux-arm64-gnu',
      ],
    },
  },
})
