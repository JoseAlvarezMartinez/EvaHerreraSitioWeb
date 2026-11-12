import { defineConfig } from 'astro/config';

// Cuando el dominio esté definido, agregar acá:  site: 'https://www.dominio.com.ar'
export default defineConfig({
  devToolbar: { enabled: false },
  build: { format: 'directory' },
});
