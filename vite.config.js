import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './', // funciona em https://usuario.github.io/rpg-mesa/
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        escudo: resolve(__dirname, 'escudo.html'),
        grimorio: resolve(__dirname, 'grimorio.html'),
      },
    },
  },
});
