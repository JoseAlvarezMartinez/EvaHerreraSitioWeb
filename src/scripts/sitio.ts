/* Comportamiento del sitio. Se vuelve a ejecutar en cada cambio de página. */

import { movimiento } from './movimiento';

let observadorApariciones: IntersectionObserver | undefined;
let escuchaTiempo: (() => void) | undefined;
let fijarMenu: ((abierto: boolean) => void) | undefined;
let menuAbierto = false;

/* ---------- Cabecera: gana sombra apenas se empieza a bajar ---------- */
function cabecera() {
  document.querySelector<HTMLElement>('[data-cab]')?.classList.toggle('con-linea', window.scrollY > 8);
}

/* ---------- Menú a pantalla completa ---------- */
function menu() {
  const boton = document.querySelector<HTMLButtonElement>('[data-menu-boton]');
  const panel = document.querySelector<HTMLElement>('[data-menu]');
  if (!boton || !panel) return;

  fijarMenu = (abierto: boolean) => {
    menuAbierto = abierto;
    panel.classList.toggle('abierto', abierto);
    panel.toggleAttribute('inert', !abierto);
    boton.setAttribute('aria-expanded', String(abierto));
    boton.textContent = abierto ? 'Cerrar' : 'Menú';
    document.documentElement.classList.toggle('sin-scroll', abierto);
  };

  fijarMenu(false);
  boton.addEventListener('click', () => fijarMenu?.(!menuAbierto));
  panel.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) fijarMenu?.(false);
  });
}

/* ---------- Texto que entra palabra por palabra ---------- */
function partirEnPalabras() {
  const bloques = document.querySelectorAll<HTMLElement>('[data-palabras]:not([data-partido])');
  bloques.forEach((bloque) => {
    bloque.setAttribute('data-partido', '');
    let n = 0;
    const nodos: Text[] = [];
    const paseo = document.createTreeWalker(bloque, NodeFilter.SHOW_TEXT);
    while (paseo.nextNode()) nodos.push(paseo.currentNode as Text);

    for (const nodo of nodos) {
      const partes = (nodo.textContent ?? '').split(/(\s+)/);
      const fragmento = document.createDocumentFragment();
      for (const parte of partes) {
        if (!parte) continue;
        if (/^\s+$/.test(parte)) {
          fragmento.append(' ');
          continue;
        }
        const caja = document.createElement('span');
        caja.className = 'palabra';
        const interior = document.createElement('span');
        interior.textContent = parte;
        interior.style.setProperty('--p', String(n++));
        caja.append(interior);
        fragmento.append(caja);
      }
      nodo.replaceWith(fragmento);
    }
  });
}

/* ---------- Apariciones al hacer scroll ---------- */
function apariciones() {
  observadorApariciones?.disconnect();
  const elementos = document.querySelectorAll<HTMLElement>('[data-aparece], [data-linea], [data-palabras], [data-pulso]');
  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('visible'));
    return;
  }
  observadorApariciones = new IntersectionObserver(
    (entradas, obs) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('visible');
        obs.unobserve(entrada.target);
      }
    },
    { rootMargin: '0px 0px -7% 0px', threshold: 0.01 },
  );
  // Lo que ya está en pantalla al cargar aparece sin esperar al scroll.
  const alto = window.innerHeight;
  elementos.forEach((el) => {
    const caja = el.getBoundingClientRect();
    if (caja.top < alto && caja.bottom > 0) el.classList.add('visible');
    else observadorApariciones!.observe(el);
  });
}

/* ---------- Línea de tiempo: el pulso baja con el scroll y enciende cada hito ----------
   El hito activo es el último cuyo nodo ya cruzó el centro de la pantalla (el primero,
   mientras no se haya empezado a bajar). Los anteriores quedan como recorridos. */
function lineaDeTiempo() {
  if (escuchaTiempo) {
    window.removeEventListener('scroll', escuchaTiempo);
    window.removeEventListener('resize', escuchaTiempo);
    escuchaTiempo = undefined;
  }
  const lista = document.querySelector<HTMLElement>('[data-tiempo]');
  const items = [...document.querySelectorAll<HTMLElement>('[data-hito]')];
  if (!lista || !items.length) return;
  const nodos = items.map((el) => el.querySelector<HTMLElement>('[data-nodo]') ?? el);

  let pendiente = false;
  const medir = () => {
    pendiente = false;
    const centro = window.innerHeight / 2;
    let ultimo = 0;
    nodos.forEach((nodo, i) => {
      const caja = nodo.getBoundingClientRect();
      const pasado = caja.top + caja.height / 2 <= centro;
      items[i].classList.toggle('recorrido', pasado);
      if (pasado) ultimo = i;
    });
    const enCurso = lista.getBoundingClientRect().bottom > centro;
    items.forEach((el, i) => el.classList.toggle('activo', enCurso && i === ultimo));
    lista.classList.toggle('completa', !enCurso);
  };

  escuchaTiempo = () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(medir);
  };
  window.addEventListener('scroll', escuchaTiempo, { passive: true });
  window.addEventListener('resize', escuchaTiempo);
  medir();
}

/* ---------- Formulario de contacto ---------- */
function formulario() {
  const form = document.querySelector<HTMLFormElement>('[data-formulario]');
  if (!form) return;
  const estado = form.querySelector<HTMLElement>('[data-estado]');
  const destino = form.dataset.destino ?? '';
  const correo = form.dataset.correo ?? '';

  const decir = (texto: string) => {
    if (estado) estado.textContent = texto;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const datos = new FormData(form);
    // Campo trampa para robots: si viene completo, no se envía nada.
    if (datos.get('sitio_web')) return;
    datos.delete('sitio_web');

    if (!destino) {
      const asunto = `Consulta desde el sitio — ${datos.get('motivo') ?? ''}`;
      const cuerpo = [
        `Nombre: ${datos.get('nombre') ?? ''}`,
        `Email: ${datos.get('email') ?? ''}`,
        `Teléfono: ${datos.get('telefono') ?? ''}`,
        `Motivo: ${datos.get('motivo') ?? ''}`,
        '',
        String(datos.get('mensaje') ?? ''),
      ].join('\n');
      window.location.href = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      decir('Se abrió tu programa de correo con el mensaje listo para enviar.');
      return;
    }

    const boton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    boton?.setAttribute('disabled', '');
    decir('Enviando…');
    try {
      const respuesta = await fetch(destino, {
        method: 'POST',
        body: datos,
        headers: { Accept: 'application/json' },
      });
      if (!respuesta.ok) throw new Error(String(respuesta.status));
      form.reset();
      decir('Mensaje enviado. Te respondemos a la brevedad.');
    } catch {
      decir('No se pudo enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.');
    } finally {
      boton?.removeAttribute('disabled');
    }
  });
}

/* ---------- Apertura: se retira sola al terminar, o antes si la persona interactúa ---------- */
function apertura() {
  const raiz = document.documentElement;
  if (!raiz.classList.contains('intro')) return;
  const gestos = ['pointerdown', 'keydown', 'wheel', 'touchmove'] as const;
  let hecho = false;
  const cerrar = (rapido: boolean) => {
    if (hecho) return;
    hecho = true;
    window.clearTimeout(fin);
    gestos.forEach((g) => window.removeEventListener(g, saltar));
    if (!rapido) {
      raiz.classList.remove('intro');
      return;
    }
    raiz.classList.add('intro-salta');
    window.setTimeout(() => raiz.classList.remove('intro', 'intro-salta'), 450);
  };
  const saltar = () => cerrar(true);
  // Termina cuando las hojas acaban de abrirse; el reloj es solo una red de seguridad.
  const fin = window.setTimeout(() => cerrar(false), 6000);
  document.querySelector('.apertura')?.addEventListener('animationend', (e) => {
    if ((e as AnimationEvent).animationName === 'apertura-abre') cerrar(false);
  });
  gestos.forEach((g) => window.addEventListener(g, saltar, { passive: true }));
}

let escuchaGlobal = false;

document.addEventListener('astro:page-load', () => {
  cabecera();
  menu();
  partirEnPalabras();
  apariciones();
  lineaDeTiempo();
  formulario();
  apertura();
  movimiento();

  if (!escuchaGlobal) {
    window.addEventListener('scroll', cabecera, { passive: true });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || !menuAbierto) return;
      fijarMenu?.(false);
      document.querySelector<HTMLButtonElement>('[data-menu-boton]')?.focus();
    });
    window.matchMedia('(min-width: 1100px)').addEventListener('change', (e) => {
      if (e.matches) fijarMenu?.(false);
    });
    escuchaGlobal = true;
  }
});
