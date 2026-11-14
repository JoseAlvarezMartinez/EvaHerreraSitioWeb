// Render cuadro por cuadro de comp.html. El sitio corre de verdad dentro del teléfono,
// con su reloj controlado desde acá para que las animaciones salgan exactas a 30 fps.
//
//   node render.mjs --out frames                 → video completo
//   node render.mjs --out prev --solo 30,75,120  → solo esos cuadros (vista previa)
//   opciones: --dsf 2 (supermuestreo), --desde 0 --hasta 540, --jpg
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const flag = (n) => process.argv.includes(`--${n}`);
const FPS = 30, DUR = 18, TOTAL = FPS * DUR, W = 1080, H = 1920;
const DSF = Number(arg('dsf', 2));
const OUT = path.resolve(arg('out', 'frames'));
const DESDE = Number(arg('desde', 0)), HASTA = Number(arg('hasta', TOTAL));
const SOLO = arg('solo') ? new Set(arg('solo').split(',').map(Number)) : null;
const JPG = flag('jpg');
const SIN_BLUR = flag('sin-blur');
const OBTURADOR = 0.75; // fracción del cuadro que queda "expuesta"
fs.mkdirSync(OUT, { recursive: true });

/* Reloj virtual dentro de cada página del sitio: las animaciones y transiciones CSS
   quedan en pausa y avanzan solo cuando el render lo indica. */
const RELOJ = () => {
  if (location.port !== '4321' || window.top === window) return;
  const rST = window.setTimeout.bind(window), rCT = window.clearTimeout.bind(window);
  const vt = { now: 0, timers: [], vistos: new WeakMap(), fin: new WeakSet(), seq: -1 };
  window.setTimeout = (fn, ms, ...a) => {
    if (typeof fn === 'function' && ms >= 400) { const id = vt.seq--; vt.timers.push({ id, at: vt.now * 1000 + ms, fn, a }); return id; }
    return rST(fn, ms, ...a);
  };
  window.clearTimeout = (id) => { if (id < 0) vt.timers = vt.timers.filter((x) => x.id !== id); else rCT(id); };
  const anims = () => document.getAnimations().filter((a) => a.timeline === document.timeline);
  vt.congelar = () => {
    for (const a of anims()) if (!vt.vistos.has(a)) { try { a.pause(); a.currentTime = 0; } catch (e) {} vt.vistos.set(a, 0); }
  };
  vt.paso = (now, y) => {
    const dt = Math.max(0, (now - vt.now) * 1000);
    vt.now = now;
    const vence = vt.timers.filter((x) => x.at <= now * 1000);
    vt.timers = vt.timers.filter((x) => x.at > now * 1000);
    vence.forEach((x) => { try { x.fn(...x.a); } catch (e) {} });
    for (const a of anims()) {
      if (vt.fin.has(a)) continue;
      let c = vt.vistos.get(a);
      if (c === undefined) { try { a.pause(); } catch (e) {} c = 0; } else c += dt;
      vt.vistos.set(a, c);
      try {
        const fin = a.effect ? a.effect.getComputedTiming().endTime : Infinity;
        if (Number.isFinite(fin) && c >= fin) { a.finish(); vt.fin.add(a); } else a.currentTime = c;
      } catch (e) {}
    }
    if (y != null && Math.abs(window.scrollY - y) > 0.2) window.scrollTo(0, y);
  };
  // Toda animación nueva se congela en el cuadro en que nace.
  const vigilar = () => { vt.congelar(); requestAnimationFrame(vigilar); };
  requestAnimationFrame(vigilar);
  document.addEventListener('DOMContentLoaded', () => {
    const st = document.createElement('style');
    st.textContent = 'html{scroll-behavior:auto!important}';
    document.head.append(st);
  });
  window.__vt = vt;
};

const navegador = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--hide-scrollbars', '--force-color-profile=srgb', '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows', '--font-render-hinting=none', `--window-size=${W},${H}`],
  protocolTimeout: 600000,
});
const pag = await navegador.newPage();
pag.on('pageerror', (e) => console.error('[error de página]', e.message));
await pag.setViewport({ width: W, height: H, deviceScaleFactor: DSF });
await pag.evaluateOnNewDocument(RELOJ);
await pag.goto(pathToFileURL(path.join(aqui, 'comp.html')).href);
await pag.evaluate(() => window.loadSites());

const ids = ['inicio', 'formacion', 'final'];
const marcos = {};
for (const id of ids) marcos[id] = await (await pag.$(`#sitio-${id}`)).contentFrame();
for (const id of ids) await marcos[id].evaluate(() => document.fonts.ready.then(() => true));

const tope = (sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : null; };
const anclas = {
  inicio: await marcos.inicio.evaluate((fn) => { const t = new Function(`return (${fn})`)(); return { sobre: t('#sobre'), areas: t('#areas'), atencion: t('#atencion'), alto: document.documentElement.scrollHeight, intro: document.documentElement.classList.contains('intro') }; }, tope.toString()),
  formacion: await marcos.formacion.evaluate((fn) => { const t = new Function(`return (${fn})`)(); return { tiempo: t('[data-tiempo]'), alto: document.documentElement.scrollHeight, intro: document.documentElement.classList.contains('intro') }; }, tope.toString()),
};
console.log('anclas', JSON.stringify(anclas));
console.log('ventana del sitio', JSON.stringify(await marcos.inicio.evaluate(() => [innerWidth, innerHeight, devicePixelRatio])));
if (!anclas.inicio.intro) console.warn('¡Atención! El sitio de inicio no cargó con la apertura.');
await pag.evaluate((a) => window.setAnchors(a), anclas);

const cuadros2 = () => pag.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r)))));

async function avanzar(t) {
  const st = await pag.evaluate((tt) => window.seek(tt), t);
  await Promise.all(ids.map((id) => marcos[id].evaluate((vt, y) => window.__vt.paso(vt, y), st.sitios[id].vt, st.sitios[id].y)));
  await cuadros2();
}

async function captura() {
  const png = await pag.screenshot({ type: 'png', optimizeForSpeed: true, captureBeyondViewport: false });
  return sharp(png).resize(W, H, { kernel: 'lanczos3' }).removeAlpha().raw().toBuffer();
}

const t0 = Date.now();
let hechos = 0;
for (let f = 0; f < HASTA; f++) {
  const t = f / FPS;
  const guardar = f >= DESDE && (!SOLO || SOLO.has(f));
  const n = guardar && !SIN_BLUR ? await pag.evaluate((tt) => window.muestras(tt), t) : 1;
  let crudo;
  if (n === 1) {
    await avanzar(t);
    if (guardar) crudo = await captura();
  } else {
    const suma = new Uint32Array(W * H * 3);
    for (let k = 0; k < n; k++) {
      await avanzar(t + (k / n) * (OBTURADOR / FPS));
      const b = await captura();
      for (let i = 0; i < suma.length; i++) suma[i] += b[i];
    }
    crudo = Buffer.alloc(W * H * 3);
    for (let i = 0; i < suma.length; i++) crudo[i] = Math.round(suma[i] / n);
  }
  if (guardar) {
    const nombre = path.join(OUT, `${String(f).padStart(5, '0')}.${JPG ? 'jpg' : 'png'}`);
    const img = sharp(crudo, { raw: { width: W, height: H, channels: 3 } });
    await (JPG ? img.jpeg({ quality: 88 }) : img.png({ compressionLevel: 2 })).toFile(nombre);
    hechos++;
    if (hechos % 30 === 0 || SOLO) console.log(`cuadro ${f}/${TOTAL}  (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  }
  if (SOLO && f >= Math.max(...SOLO)) break;
}
await navegador.close();
console.log(`listo: ${hechos} cuadros en ${((Date.now() - t0) / 1000).toFixed(0)} s`);
