import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Match the GitHub Pages URL path — update if the repo is renamed or you move to a custom domain.
  base: '/retirement-tribute/',
  plugins: [react()],
})
