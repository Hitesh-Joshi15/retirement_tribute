import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Must match the GitHub repo name exactly (case-sensitive). Change to '/' for a custom domain.
  base: '/zoukhra-retirement-tribute/',
  plugins: [react()],
})
