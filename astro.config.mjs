import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/* Dominio definitivo del sitio, con https:// y sin barra final.
   Ejemplo: 'https://www.draevaherrerabravo.com.ar'
   Mientras esté vacío no se generan URL canónicas, imagen para compartir ni
   sitemap: completarlo es lo primero que hay que hacer al publicar. */
const DOMINIO = '';

export default defineConfig({
  site: DOMINIO || undefined,
  integrations: DOMINIO ? [sitemap()] : [],
  devToolbar: { enabled: false },
  build: { format: 'directory' },
});
