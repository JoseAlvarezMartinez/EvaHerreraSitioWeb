import type { APIRoute } from 'astro';

/* robots.txt: permite todo y, si el dominio está configurado, anuncia el sitemap. */
export const GET: APIRoute = ({ site }) => {
  const lineas = ['User-agent: *', 'Allow: /'];
  if (site) lineas.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`);
  return new Response(lineas.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
