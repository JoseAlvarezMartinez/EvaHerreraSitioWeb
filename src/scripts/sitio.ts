/* Comportamiento del sitio. Se vuelve a ejecutar en cada cambio de página. */

let observadorApariciones: IntersectionObserver | undefined;
let observadorTiempo: IntersectionObserver | undefined;
let fijarMenu: ((abierto: boolean) => void) | undefined;
let menuAbierto = false;
let ultimoScroll = 0;

/* ---------- Cabecera: línea al bajar, se esconde al bajar y vuelve al subir ---------- */
function cabecera() {
  const cab = document.querySelector<HTMLElement>('[data-cab]');
  if (!cab) return;
  const y = window.scrollY;
  cab.classList.toggle('con-linea', y > 8);
  if (menuAbierto || y < 240) cab.classList.remove('oculta');
  else if (y > ultimoScroll + 6) cab.classList.add('oculta');
  else if (y < ultimoScroll - 6) cab.classList.remove('oculta');
  ultimoScroll = y;
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
    if (abierto) document.querySelector('[data-cab]')?.classList.remove('oculta');
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
  const elementos = document.querySelectorAll<HTMLElement>('[data-aparece], [data-linea], [data-palabras]');
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

/* ---------- Línea de tiempo: marca el hito que cruza el centro de la pantalla ---------- */
function lineaDeTiempo() {
  observadorTiempo?.disconnect();
  const items = document.querySelectorAll<HTMLElement>('[data-hito]');
  if (!items.length || !('IntersectionObserver' in window)) return;
  observadorTiempo = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) entrada.target.classList.toggle('activo', entrada.isIntersecting);
      // Los hitos que ya quedaron arriba del centro se marcan como recorridos.
      const centro = window.innerHeight / 2;
      items.forEach((el) => el.classList.toggle('recorrido', el.getBoundingClientRect().top < centro));
    },
    { rootMargin: '-49.5% 0px -49.5% 0px', threshold: 0 },
  );
  items.forEach((el) => observadorTiempo!.observe(el));
}

/* ---------- Índice de la portada: el panel sigue al ítem señalado ---------- */
function indice() {
  const raiz = document.querySelector<HTMLElement>('[data-indice]');
  if (!raiz) return;
  const items = raiz.querySelectorAll<HTMLElement>('[data-indice-item]');
  const resumenes = raiz.querySelectorAll<HTMLElement>('[data-indice-resumen]');

  const activar = (i: number) => {
    raiz.style.setProperty('--activo', String(i));
    items.forEach((el, n) => el.classList.toggle('activo', n === i));
    resumenes.forEach((el, n) => el.classList.toggle('activo', n === i));
  };

  items.forEach((el, i) => {
    el.addEventListener('pointerenter', () => activar(i));
    el.addEventListener('focus', () => activar(i));
  });
  activar(0);
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

/* ---------- Telón de entrada: se retira la marca cuando termina ---------- */
function telon() {
  const raiz = document.documentElement;
  if (!raiz.classList.contains('intro')) return;
  window.setTimeout(() => raiz.classList.remove('intro'), 2600);
}

let escuchaGlobal = false;

document.addEventListener('astro:page-load', () => {
  ultimoScroll = window.scrollY;
  cabecera();
  menu();
  partirEnPalabras();
  apariciones();
  lineaDeTiempo();
  indice();
  formulario();
  telon();

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
