// Capturas del sitio en vista mobile (390) y desktop (1440): pantalla inicial y página completa.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:4321';
const SALIDA = process.argv[2];
const paginas = [
  ['inicio', '/'],
  ['sobre-mi', '/sobre-mi/'],
  ['formacion', '/formacion/'],
  ['experiencia', '/experiencia/'],
  ['equipo', '/equipo/'],
  ['donde-atiende', '/donde-atiende/'],
  ['contacto', '/contacto/'],
];
const vistas = [
  { nombre: 'mobile-390', width: 390, height: 844, deviceScaleFactor: 3 },
  { nombre: 'desktop-1440', width: 1440, height: 900, deviceScaleFactor: 2 },
];

const navegador = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--hide-scrollbars', '--force-color-profile=srgb'],
});

for (const vista of vistas) {
  const dir = path.join(SALIDA, vista.nombre);
  fs.mkdirSync(dir, { recursive: true });
  const pag = await navegador.newPage();
  await pag.setViewport(vista);
  // Sin la apertura: las capturas muestran el sitio ya abierto.
  await pag.evaluateOnNewDocument(() => {
    try { sessionStorage.setItem('apertura', '1'); } catch {}
  });
  for (const [nombre, ruta] of paginas) {
    await pag.goto(BASE + ruta, { waitUntil: 'networkidle0' });
    await pag.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 1800));
    await pag.screenshot({ path: path.join(dir, `${nombre}.png`) });
    // Recorre la página para disparar las apariciones antes de la captura completa.
    const alto = await pag.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < alto; y += Math.round(vista.height * 0.6)) {
      await pag.evaluate((yy) => window.scrollTo(0, yy), y);
      await new Promise((r) => setTimeout(r, 220));
    }
    await pag.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 900));
    await pag.screenshot({ path: path.join(dir, `${nombre}-completa.png`), fullPage: true });
    console.log(vista.nombre, nombre, alto);
  }
  await pag.close();
}
await navegador.close();
