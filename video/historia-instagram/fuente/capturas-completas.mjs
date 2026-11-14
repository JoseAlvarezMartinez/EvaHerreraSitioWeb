// Capturas de página completa, armadas por tramos para que no se repita la cabecera fija
// ni se corte la imagen en páginas muy largas.
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import path from 'node:path';

const BASE = 'http://localhost:4321';
const SALIDA = process.argv[2];
const paginas = [['inicio', '/'], ['sobre-mi', '/sobre-mi/'], ['formacion', '/formacion/'], ['experiencia', '/experiencia/'], ['equipo', '/equipo/'], ['donde-atiende', '/donde-atiende/'], ['contacto', '/contacto/']];
const vistas = [
  { nombre: 'mobile-390', width: 390, height: 844, deviceScaleFactor: 3 },
  { nombre: 'desktop-1440', width: 1440, height: 900, deviceScaleFactor: 2 },
];
const navegador = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--hide-scrollbars', '--force-color-profile=srgb'] });
for (const vista of vistas) {
  const pag = await navegador.newPage();
  await pag.setViewport(vista);
  await pag.evaluateOnNewDocument(() => { try { sessionStorage.setItem('apertura', '1'); } catch {} });
  for (const [nombre, ruta] of paginas) {
    await pag.goto(BASE + ruta, { waitUntil: 'networkidle0' });
    await pag.evaluate(() => document.fonts.ready);
    const alto = await pag.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < alto; y += Math.round(vista.height * 0.6)) { await pag.evaluate((yy) => window.scrollTo(0, yy), y); await new Promise((r) => setTimeout(r, 200)); }
    await pag.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 900));
    // La cabecera fija pasa a ser parte del flujo: queda una sola vez, arriba.
    await pag.addStyleTag({ content: '.cab,.miga{position:relative!important;top:auto!important}*{animation-play-state:paused!important}' });
    const k = vista.deviceScaleFactor, tramo = 2000, partes = [];
    for (let y = 0; y < alto; y += tramo) {
      const h = Math.min(tramo, alto - y);
      const buf = await pag.screenshot({ clip: { x: 0, y, width: vista.width, height: h }, captureBeyondViewport: true });
      partes.push({ input: buf, left: 0, top: Math.round(y * k) });
    }
    await sharp({ create: { width: vista.width * k, height: Math.round(alto * k), channels: 3, background: '#f3eee4' }, limitInputPixels: false })
      .composite(partes).png({ compressionLevel: 8 }).toFile(path.join(SALIDA, vista.nombre, `${nombre}-completa.png`));
    console.log(vista.nombre, nombre, alto);
  }
  await pag.close();
}
await navegador.close();
