import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600, // Tăng do sử dụng antd và recharts
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router'],
          antd: ['antd', '@ant-design/icons'],
          charts: ['recharts'],
          vendor: ['axios', 'date-fns', 'slugify']
        }
      }
    }
  },
  server: {
    historyApiFallback: true
  }
})