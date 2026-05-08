import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 5173,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: 'http://127.0.0.1:4000',
            changeOrigin: true,
            secure: false,
          }
        }
      },
      plugins: [react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.ico', 'mylogo.png'],
          manifest: {
            name: 'CimessInvest',
            short_name: 'CimessInvest',
            description: 'Professional Asset Management Platform',
            theme_color: '#000000',
            background_color: '#000000',
            display: 'standalone',
            orientation: 'portrait',
            icons: [
              { 
                src: 'mylogo.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
              },
              {
                src: 'mylogo.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
              },
              {
                src: 'mylogo.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
              }
            ]
          }
        })
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
