/* Efectos que siguen al cursor: luz en las tarjetas, botones con imán, retrato
   que se inclina y foto del equipo que acompaña al puntero.
   Solo se activan con mouse o trackpad y si la persona no pidió menos movimiento. */

let activo = false;
let cuadro = 0;
let ultimo: PointerEvent | undefined;
let iman: HTMLElement | undefined;
let imanX = 0;
let imanY = 0;

const entre = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

function soltarIman() {
  if (!iman) return;
  iman.style.removeProperty('--ix');
  iman.style.removeProperty('--iy');
  iman = undefined;
  imanX = 0;
  imanY = 0;
}

function aplicar() {
  cuadro = 0;
  const e = ultimo;
  if (!e) return;
  const destino = e.target instanceof Element ? e.target : null;

  // Luz: un resplandor sigue al cursor dentro de la tarjeta.
  const luz = destino?.closest<HTMLElement>('.tarjeta, .pie__llamado');
  if (luz) {
    const caja = luz.getBoundingClientRect();
    luz.style.setProperty('--mx', `${Math.round(e.clientX - caja.left)}px`);
    luz.style.setProperty('--my', `${Math.round(e.clientY - caja.top)}px`);
  }

  // Imán: el botón se acerca un poco al cursor.
  const boton = destino?.closest<HTMLElement>('.cta, .cab__turno') ?? undefined;
  if (boton !== iman) soltarIman();
  if (boton) {
    const caja = boton.getBoundingClientRect();
    // Se descuenta el desplazamiento ya aplicado para medir contra la posición de reposo.
    const dx = e.clientX - (caja.left - imanX + caja.width / 2);
    const dy = e.clientY - (caja.top - imanY + caja.height / 2);
    imanX = entre(dx * 0.22, -10, 10);
    imanY = entre(dy * 0.3, -6, 6);
    boton.style.setProperty('--ix', `${imanX.toFixed(1)}px`);
    boton.style.setProperty('--iy', `${imanY.toFixed(1)}px`);
    iman = boton;
  }

  // Retrato de la portada: se inclina hacia donde está el cursor.
  const retrato = document.querySelector<HTMLElement>('[data-inclina]');
  if (retrato) {
    const caja = retrato.getBoundingClientRect();
    if (caja.bottom > 0 && caja.top < window.innerHeight) {
      const nx = entre((e.clientX - (caja.left + caja.width / 2)) / (window.innerWidth / 2), -1, 1);
      const ny = entre((e.clientY - (caja.top + caja.height / 2)) / (window.innerHeight / 2), -1, 1);
      retrato.style.setProperty('--ry', `${(nx * 7).toFixed(2)}deg`);
      retrato.style.setProperty('--rx', `${(ny * -5).toFixed(2)}deg`);
    }
  }

  // Equipo: la foto acompaña al cursor a lo largo de la fila.
  const fila = destino?.closest<HTMLElement>('[data-sigue]');
  if (fila) {
    const caja = fila.getBoundingClientRect();
    fila.style.setProperty('--fx', entre((e.clientX - caja.left) / caja.width, 0.36, 0.9).toFixed(3));
  }
}

export function movimiento() {
  // Al cambiar de página el botón anterior ya no existe.
  iman = undefined;
  imanX = 0;
  imanY = 0;

  if (activo) return;
  const fino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fino || quieto) return;
  activo = true;

  window.addEventListener(
    'pointermove',
    (e) => {
      ultimo = e;
      if (!cuadro) cuadro = requestAnimationFrame(aplicar);
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', soltarIman);
  window.addEventListener('blur', soltarIman);
}
