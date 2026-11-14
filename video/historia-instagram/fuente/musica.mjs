// Pista original para la historia: 120 BPM, 18 s, sintetizada desde cero (sin samples ni
// material de terceros, así que no tiene derechos de nadie). Los acentos caen en los cortes
// de la edición: 2 s, 5 s, 7 s, 9,5 s, 12 s y 14 s.
//   node musica.mjs salida.wav
import fs from 'node:fs';

const SR = 48000, DUR = 18, N = SR * DUR, BEAT = 0.5, S16 = BEAT / 4;
const L = new Float32Array(N), R = new Float32Array(N);       // mezcla seca
const mL = new Float32Array(N), mR = new Float32Array(N);     // bus musical (con bombeo)
const vL = new Float32Array(N), vR = new Float32Array(N);     // envío a reverberación
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
let semilla = 20261114;
const ruido = () => { semilla ^= semilla << 13; semilla ^= semilla >>> 17; semilla ^= semilla << 5; return ((semilla >>> 0) / 4294967295) * 2 - 1; };
const i0 = (t) => Math.max(0, Math.round(t * SR));

function poner(bl, br, t, largo, fn, gan = 1, pan = 0, envio = 0) {
  const a = i0(t), n = Math.min(Math.round(largo * SR), N - a);
  const gl = gan * Math.cos((pan + 1) * Math.PI / 4), gr = gan * Math.sin((pan + 1) * Math.PI / 4);
  for (let i = 0; i < n; i++) {
    const x = fn(i / SR, i);
    bl[a + i] += x * gl; br[a + i] += x * gr;
    if (envio) { vL[a + i] += x * gl * envio; vR[a + i] += x * gr * envio; }
  }
}
// Sierra con polyBLEP (sin aliasing audible).
function sierra(f) {
  let ph = Math.abs(ruido()) % 1; const dt = f / SR;
  return () => {
    ph += dt; if (ph >= 1) ph -= 1;
    let v = 2 * ph - 1;
    if (ph < dt) { const x = ph / dt; v -= x + x - x * x - 1; } else if (ph > 1 - dt) { const x = (ph - 1) / dt; v -= x * x + x + x + 1; }
    return v;
  };
}
const lp = (fc0) => { let y = 0; return (x, fc = fc0) => { y += (1 - Math.exp(-2 * Math.PI * fc / SR)) * (x - y); return y; }; };
function svf() { let lo = 0, bd = 0; return (x, fc, q = 0.5) => { const f = 2 * Math.sin(Math.PI * Math.min(fc, 7600) / SR); lo += f * bd; const hi = x - lo - q * bd; bd += f * hi; return { lo, bd, hi }; }; }

/* ---------- Estructura ---------- */
const ACORDES = [ // un compás (2 s) cada uno, desde el segundo 2
  { bajo: 29, notas: [53, 57, 60, 64] },   // Fmaj7
  { bajo: 31, notas: [55, 59, 62, 67] },   // G
  { bajo: 33, notas: [57, 60, 64, 67] },   // Am7
  { bajo: 36, notas: [55, 60, 64, 67] },   // C/G
];
const acordeEn = (t) => (t < 2 ? ACORDES[2] : ACORDES[Math.floor((t - 2) / 2) % 4]);
const bombos = [];
for (let t = 2; t <= 16.51; t += BEAT) if (Math.abs(t - 4.5) > 0.01 && Math.abs(t - 13.5) > 0.01) bombos.push(t);
bombos.push(17.0);

/* ---------- Bombo ---------- */
for (const t of bombos) {
  let ph = 0;
  poner(L, R, t, 0.42, (x) => {
    const f = 44 + 150 * Math.exp(-x * 34);
    ph += f / SR;
    const clic = x < 0.004 ? ruido() * (1 - x / 0.004) * 0.5 : 0;
    return Math.tanh((Math.sin(2 * Math.PI * ph) * Math.exp(-x * 7.5) + clic) * 1.7);
  }, 0.72);
}
/* Bombeo (sidechain) del bus musical. */
const bombeo = new Float32Array(N).fill(1);
for (const t of bombos) { const a = i0(t); for (let i = 0; i < SR * 0.45 && a + i < N; i++) bombeo[a + i] = Math.min(bombeo[a + i], 1 - 0.74 * Math.exp(-(i / SR) * 10.5)); }

/* ---------- Latido del gancho: suena cuando el trazo pasa por cada pico ---------- */
for (const t of [0.5, 1.0]) for (const [d, g] of [[0, 1], [0.17, 0.72]]) {
  let ph = 0;
  poner(L, R, t + d, 0.3, (x) => { ph += (52 + 60 * Math.exp(-x * 40)) / SR; return Math.sin(2 * Math.PI * ph) * Math.exp(-x * 13) * Math.min(1, x / 0.004); }, 0.8 * g, 0, 0.12);
}
for (const [t, m] of [[0.5, 81], [1.0, 88], [1.5, 84]]) {
  poner(mL, mR, t, 0.6, (x) => (Math.sin(2 * Math.PI * hz(m) * x) + 0.3 * Math.sin(4 * Math.PI * hz(m) * x)) * Math.exp(-x * 9) * Math.min(1, x / 0.003), 0.11, t === 1 ? 0.4 : -0.4, 0.9);
}

/* ---------- Colchón armónico ---------- */
for (let c = 0; c < 9; c++) {
  const t = c * 2, ac = acordeEn(t + 0.01);
  ac.notas.forEach((m, k) => {
    const f = hz(m + 12), f2 = f * 1.004;
    const g = c === 0 ? 0.075 : t >= 5 ? 0.036 : 0.05;
    poner(mL, mR, t, 2.25, (x) => {
      const env = Math.min(1, x / (c === 0 ? 1.4 : 0.12)) * Math.min(1, (2.25 - x) / 0.25);
      return (Math.sin(2 * Math.PI * f * x) + 0.6 * Math.sin(2 * Math.PI * f2 * x + k) + 0.25 * Math.sin(4 * Math.PI * f * x)) * env;
    }, g, (k - 1.5) / 2.2, 0.5);
  });
}

/* ---------- Bajo: contratiempo, clásico de house ---------- */
for (let t = 2; t < 16.99; t += BEAT) {
  const ac = acordeEn(t + 0.01);
  const tiempos = t >= 5 ? [[0.25, 1], [0.375, 0.55]] : [[0.25, 1]];
  if (Math.abs(t - 13.5) < 0.01) continue;
  for (const [d, g] of tiempos) {
    const f = hz(ac.bajo + 12), s = sierra(f), filtro = lp(400);
    poner(mL, mR, t + d, 0.21, (x) => {
      const env = Math.min(1, x / 0.004) * Math.exp(-x * 7) * Math.min(1, (0.21 - x) / 0.02);
      return (Math.sin(2 * Math.PI * (f / 2) * x) * 0.95 + filtro(s(), 240 + 1500 * Math.exp(-x * 16)) * 0.6) * env;
    }, 0.4 * g);
  }
}

/* ---------- Acordes cortos (supersierra filtrada) ---------- */
const PATRON = [0, 3, 6, 8, 11, 14];
for (let c = 0; c < 8; c++) {
  const base = 2 + c * 2, ac = ACORDES[c % 4];
  for (const paso of PATRON) {
    const t = base + paso * S16;
    if (t >= 17.05 || (t >= 13.5 && t < 14)) continue;
    const brillo = t >= 14 ? 6200 : t >= 5 ? 4600 : 2100 + (t - 2) * 500;
    ac.notas.forEach((m, k) => {
      for (const des of [-0.09, 0, 0.09]) {
        const s = sierra(hz(m + 12 + des)), f1 = lp(1000), f2 = lp(1000);
        poner(mL, mR, t, 0.34, (x) => {
          const fc = 320 + brillo * Math.exp(-x * 15);
          return f2(f1(s(), fc), fc) * Math.min(1, x / 0.003) * Math.exp(-x * 10);
        }, 0.062 * (paso === 0 ? 1.25 : 1), des * 7 + (k - 1.5) * 0.2, 0.42);
      }
    });
  }
}
// Acorde final, largo, en el segundo 17.
ACORDES[3].notas.concat([72, 76]).forEach((m, k) => {
  for (const des of [-0.1, 0.1]) {
    const s = sierra(hz(m + 12 + des)), f1 = lp(1000);
    poner(mL, mR, 17.0, 1.0, (x) => f1(s(), 500 + 5200 * Math.exp(-x * 5)) * Math.min(1, x / 0.004) * Math.exp(-x * 3.2), 0.05, des * 6, 0.8);
  }
});

/* ---------- Arpegio con eco ---------- */
const ORDEN = [0, 2, 1, 3, 2, 3, 1, 2, 0, 3, 2, 1, 3, 2, 1, 3];
const arpL = new Float32Array(N), arpR = new Float32Array(N);
for (let n = 0, t = 5; t < 16.99; t += S16, n++) {
  if (t >= 13.5 && t < 14) continue;
  const ac = acordeEn(t + 0.01), m = ac.notas[ORDEN[n % 16]] + 24 + (t >= 14 && n % 4 === 3 ? 12 : 0);
  const f = hz(m), acento = n % 4 === 0 ? 1 : n % 2 === 0 ? 0.75 : 0.55;
  poner(arpL, arpR, t, 0.22, (x) => (Math.sin(2 * Math.PI * f * x) + 0.4 * Math.sin(4 * Math.PI * f * x) + 0.15 * Math.sin(6 * Math.PI * f * x)) * Math.min(1, x / 0.002) * Math.exp(-x * 19), 0.085 * acento, n % 2 ? 0.5 : -0.5);
}
{ // eco cruzado a 3 semicorcheas
  const d = Math.round(3 * S16 * SR);
  for (let i = d; i < N; i++) { arpL[i] += arpR[i - d] * 0.36; arpR[i] += arpL[i - d] * 0.36; }
  for (let i = 0; i < N; i++) { mL[i] += arpL[i]; mR[i] += arpR[i]; vL[i] += arpL[i] * 0.35; vR[i] += arpR[i] * 0.35; }
}

/* ---------- Melodía del cierre ---------- */
for (const [t, m, largo] of [[14.0, 76, 0.6], [14.75, 81, 0.3], [15.0, 79, 0.5], [15.5, 76, 0.5], [16.0, 79, 0.5], [16.5, 76, 0.45], [17.0, 84, 0.95]]) {
  const s1 = sierra(hz(m)), s2 = sierra(hz(m + 0.12)), f1 = lp(2000);
  poner(mL, mR, t, largo, (x) => f1((s1() + s2()) * 0.5, 900 + 3600 * Math.exp(-x * 6)) * Math.min(1, x / 0.008) * Math.min(1, (largo - x) / 0.06) * (0.55 + 0.45 * Math.exp(-x * 4)), 0.105, 0.08, 0.7);
}

/* ---------- Platillos, palmas y redoble ---------- */
function charles(t, gan, abierto, pan) {
  const f = lp(7000);
  poner(L, R, t, abierto ? 0.22 : 0.05, (x) => { const r = ruido(); return (r - f(r)) * Math.exp(-x * (abierto ? 17 : 95)); }, gan, pan);
}
for (let n = 0, t = 2; t < 17; t += S16, n++) {
  if (t >= 13.5 && t < 14) continue;
  const paso = n % 4;
  if (t < 5) { if (paso === 2) charles(t, 0.13, false, 0.2); continue; }
  charles(t, paso === 2 ? 0.2 : paso === 0 ? 0.09 : 0.12, false, paso % 2 ? 0.35 : -0.25);
  if (paso === 2 && (t >= 9.5 || t >= 14)) charles(t, 0.11, true, -0.3);
}
for (let c = 5; c < 17; c += 1) {
  const t = c + 0.5;
  if (t >= 13.4 && t < 14) continue;
  const bp = svf();
  poner(L, R, t, 0.3, (x) => {
    const env = (x < 0.03 ? [1, 0.2, 0.85, 0.2, 0.9, 0.35][Math.floor(x / 0.005)] : 1) * Math.exp(-Math.max(0, x - 0.02) * 24);
    return bp(ruido(), 1750, 0.55).bd * env;
  }, 0.5, 0.05, 0.3);
}
for (let k = 0, t = 13.5; t < 13.995; k++) { // redoble que sube hacia el cierre
  const bp = svf(), g = 0.14 + 0.36 * ((t - 13.5) / 0.5);
  poner(L, R, t, 0.09, (x) => (bp(ruido(), 2100, 0.7).bd + 0.5 * Math.sin(2 * Math.PI * 190 * x)) * Math.exp(-x * 42), g, 0, 0.25);
  t += t < 13.75 ? S16 : S16 / 2;
}

/* ---------- Efectos: subidas, impactos y barridos en cada corte ---------- */
function subida(t0, t1, gan) {
  const bp = svf(), bp2 = svf();
  poner(L, R, t0, t1 - t0, (x) => { const p = x / (t1 - t0); const r = ruido(); return (bp(r, 500 + 7000 * p * p, 0.35).bd * 0.8 + bp2(r, 300 + 2500 * p, 0.2).hi * 0.12) * p * p; }, gan, 0, 0.3);
  let ph = 0;
  poner(mL, mR, t0, t1 - t0, (x) => { const p = x / (t1 - t0); ph += (180 * Math.pow(4, p)) / SR; return Math.sin(2 * Math.PI * ph) * p * p; }, gan * 0.16, 0, 0.5);
}
subida(1.0, 2.0, 0.42); subida(4.5, 5.0, 0.3); subida(13.0, 14.0, 0.42);
function impacto(t, gan) {
  let ph = 0; const f = lp(3000);
  poner(L, R, t, 1.1, (x) => { ph += (36 + 46 * Math.exp(-x * 9)) / SR; return Math.sin(2 * Math.PI * ph) * Math.exp(-x * 3.6); }, gan * 0.75);
  poner(L, R, t, 1.5, (x) => { const r = ruido(); return (r - f(r, 2600)) * Math.exp(-x * 3.4) * Math.min(1, x / 0.002); }, gan * 0.2, 0, 0.6);
}
impacto(2.0, 1); impacto(5.0, 0.9); impacto(14.0, 1); impacto(17.0, 0.8);
function barrido(t, gan, desde, hasta) {
  const bp = svf();
  const a = i0(t - 0.3), n = Math.round(0.62 * SR);
  for (let i = 0; i < n && a + i < N; i++) {
    const x = i / SR - 0.3, p = i / n;
    const v = bp(ruido(), 900 + 4200 * Math.exp(-(x * x) / 0.012), 0.4).bd * Math.exp(-(x * x) / 0.011) * gan;
    const pan = desde + (hasta - desde) * p;
    L[a + i] += v * Math.cos((pan + 1) * Math.PI / 4); R[a + i] += v * Math.sin((pan + 1) * Math.PI / 4);
    vL[a + i] += v * 0.2; vR[a + i] += v * 0.2;
  }
  const f = lp(6000);
  poner(L, R, t, 0.7, (x) => { const r = ruido(); return (r - f(r)) * Math.exp(-x * 6.5); }, gan * 0.2, 0, 0.5);
}
barrido(7.0, 0.55, 0.9, -0.9); barrido(9.5, 0.45, -0.3, 0.3); barrido(12.0, 0.55, -0.8, 0.8);

/* ---------- Mezcla: bombeo, reverberación y máster ---------- */
if (process.env.MEDIR) {
  const med = (b, a, z) => { let e = 0, pk = 0; for (let i = i0(a); i < i0(z); i++) { e += b[i] * b[i]; pk = Math.max(pk, Math.abs(b[i])); } return `${(10 * Math.log10(e / (i0(z) - i0(a)) + 1e-12)).toFixed(1)} dB rms, pico ${pk.toFixed(2)}`; };
  for (const [a, z] of [[0, 2], [2, 5], [5, 13], [14, 17]]) console.log(`${a}-${z}s  batería/fx: ${med(L, a, z)}  ·  música: ${med(mL, a, z)}  ·  envío rev: ${med(vL, a, z)}`);
}
const MUS = 1.75; // el bus musical sube para equilibrarse con la batería
for (let i = 0; i < N; i++) { L[i] += mL[i] * bombeo[i] * MUS; R[i] += mR[i] * bombeo[i] * MUS; }
function reverb(ent, corr) {
  const sal = new Float32Array(N);
  for (const ms of [29.7, 37.1, 41.1, 43.7, 47.9, 53.3]) {
    const d = Math.round((ms + corr) * SR / 1000), buf = new Float32Array(d); let p = 0, amort = 0;
    for (let i = 0; i < N; i++) { const y = buf[p]; amort += 0.38 * (y - amort); buf[p] = ent[i] + amort * 0.83; p = (p + 1) % d; sal[i] += y; }
  }
  for (const ms of [5.0, 1.7]) {
    const d = Math.round((ms + corr * 0.3) * SR / 1000), buf = new Float32Array(d); let p = 0;
    for (let i = 0; i < N; i++) { const b = buf[p], x = sal[i]; const y = -0.7 * x + b; buf[p] = x + 0.7 * y; p = (p + 1) % d; sal[i] = y; }
  }
  return sal;
}
const rL = reverb(vL, 0), rR = reverb(vR, 0.9);
let pico = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR, cola = Math.min(1, (DUR - t) / 0.3), entrada = Math.min(1, t / 0.02);
  L[i] = Math.tanh((L[i] + rL[i] * 0.05) * 1.25) * cola * entrada;
  R[i] = Math.tanh((R[i] + rR[i] * 0.05) * 1.25) * cola * entrada;
  pico = Math.max(pico, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.93 / pico;
let rms = 0;
const pcm = Buffer.alloc(44 + N * 4);
pcm.write('RIFF', 0); pcm.writeUInt32LE(36 + N * 4, 4); pcm.write('WAVEfmt ', 8); pcm.writeUInt32LE(16, 16); pcm.writeUInt16LE(1, 20); pcm.writeUInt16LE(2, 22);
pcm.writeUInt32LE(SR, 24); pcm.writeUInt32LE(SR * 4, 28); pcm.writeUInt16LE(4, 32); pcm.writeUInt16LE(16, 34); pcm.write('data', 36); pcm.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  const a = L[i] * norm, b = R[i] * norm; rms += a * a + b * b;
  pcm.writeInt16LE(Math.round(a * 32767), 44 + i * 4); pcm.writeInt16LE(Math.round(b * 32767), 46 + i * 4);
}
fs.writeFileSync(process.argv[2] || 'musica.wav', pcm);
console.log(`pico previo ${pico.toFixed(3)} · RMS ${(10 * Math.log10(rms / (2 * N))).toFixed(1)} dBFS · ${DUR} s`);
