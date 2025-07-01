import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Use SWC for faster transpilation (if available)
      jsxRuntime: 'automatic',
      babel: {
        // Disable babel for node_modules to speed up builds
        exclude: /node_modules/,
      },
    }),
  ],
  server: {
    port: 3000,
    // Enable file system optimization
    fs: {
      allow: ['..'],
    },
    // Enable HMR optimizations
    hmr: {
      overlay: true,
    },
  },
  build: {
    outDir: 'dist',
    // Use terser for better compression than esbuild for production
    minify: 'terser',
    // Disable source maps for smaller bundles
    sourcemap: false,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Modern target for better tree-shaking
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    rollupOptions: {
      output: {
        // Advanced manual chunk splitting for optimal caching
        manualChunks(id) {
          // React ecosystem - check node_modules path
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/')
          ) {
            return 'react-vendor';
          }

          // MUI DataGrid (largest component, separate chunk)
          if (id.includes('node_modules/@mui/x-data-grid/')) {
            return 'mui-datagrid';
          }

          // MUI Core (frequently used components)
          if (
            id.includes('node_modules/@mui/material/') ||
            id.includes('node_modules/@emotion/react/') ||
            id.includes('node_modules/@emotion/styled/') ||
            id.includes('node_modules/@mui/system/')
          ) {
            return 'mui-core';
          }

          // MUI Icons (separate for optional loading)
          if (id.includes('node_modules/@mui/icons-material/')) {
            return 'mui-icons';
          }

          // TanStack Query
          if (id.includes('node_modules/@tanstack/react-query/')) {
            return 'tanstack-query';
          }

          // React Modal and other small dependencies
          if (id.includes('node_modules/react-modal/')) {
            return 'vendor';
          }

          // Catch-all for remaining node_modules
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        },
        // Optimize file naming for caching
        chunkFileNames: chunkInfo => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk';
          return `assets/${chunkInfo.name || facadeModuleId}.[hash].js`;
        },
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    // Increase warning limit but keep it reasonable
    chunkSizeWarningLimit: 800,
    // Enable gzip size reporting
    reportCompressedSize: true,
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        // Remove unused code
        dead_code: true,
        // Aggressive optimizations
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
  },
  // Enhanced dependency optimization
  optimizeDeps: {
    // Pre-bundle these for faster dev startup
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      '@mui/material',
      '@mui/material/styles',
      '@mui/material/Button',
      '@mui/material/TextField',
      '@mui/material/Dialog',
      '@mui/material/IconButton',
      '@mui/icons-material',
      '@mui/x-data-grid',
      '@tanstack/react-query',
      '@emotion/react',
      '@emotion/styled',
    ],
    // Use esbuild for faster pre-bundling
    esbuildOptions: {
      target: 'es2020',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
    // Dedupe React to avoid multiple versions
    dedupe: ['react', 'react-dom'],
  },
  // ESBuild optimizations for dev
  esbuild: {
    target: 'es2020',
    // Drop console/debugger in production only
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Enable JSX optimization
    jsxDev: process.env.NODE_ENV !== 'production',
  },
  // CSS optimization
  css: {
    // Enable CSS modules if needed
    modules: {
      localsConvention: 'camelCase',
    },
    // PostCSS optimizations
    postcss: {},
  },
});
