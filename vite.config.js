import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // React and React DOM in separate chunk
          'react-vendor': ['react', 'react-dom'],

          // MUI Core in separate chunk
          'mui-core': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
          ],

          // MUI DataGrid in separate chunk (largest library)
          'mui-datagrid': ['@mui/x-data-grid'],

          // TanStack Query in separate chunk
          query: ['@tanstack/react-query'],
        },
      },
    },
    // Increase chunk size warning limit to 1000kb
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
