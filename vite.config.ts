import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // same as '0.0.0.0'
    port: 5555,
    strictPort: true,    // exit if 5173 is taken (optional)
    // Optional – helps HMR work when you use a different hostname:
    // hmr: { host: 'localhost', port: 5173 },
  },
})
