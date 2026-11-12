# Dra. Eva Herrera Bravo — sitio web

Sitio de varias páginas hecho con [Astro](https://astro.build). Genera HTML estático: se puede publicar en cualquier hosting.

## Cómo verlo

```bash
npm install
```

```bash
npm run dev
```

Se abre en `http://localhost:4321`. Los cambios en los archivos se ven al instante.

Para generar la versión final (queda en la carpeta `dist/`):

```bash
npm run build
```

## Dónde se edita el contenido

Todo el texto vive en `src/data/`. No hace falta tocar el diseño.

| Archivo          | Qué contiene                                                             |
| ---------------- | ------------------------------------------------------------------------ |
| `sitio.ts`       | Nombre, especialidad, matrículas, bajada de la portada, menú y títulos   |
| `sobre.ts`       | Presentación, biografía, filosofía de atención, cita, ficha              |
| `formacion.ts`   | Línea de tiempo, cursos, certificaciones, sociedades científicas         |
| `experiencia.ts` | Trayectoria, instituciones, áreas de práctica, procedimientos, docencia  |
| `equipo.ts`      | Integrantes del equipo (los cinco actuales son ficticios)                |
| `lugares.ts`     | Consultorios (dirección, días, horarios, coberturas, mapa) y teleconsulta |
| `contacto.ts`    | WhatsApp, email, redes y configuración del formulario                    |

### Datos pendientes

Todo dato de ejemplo está marcado con `[COMPLETAR]`. Para ver la lista completa:

```bash
npm run pendientes
```

Antes de publicar, ese comando tiene que responder «No quedan datos por completar».
Ojo: los años de la línea de tiempo y de la trayectoria, los procedimientos y las
coordenadas de los mapas también son de ejemplo, aunque no lleven la marca en el
mismo renglón. Cada archivo lo aclara arriba.

## Fotos

Van en `src/assets/imagenes/`. Los nombres de archivo esperados y los tamaños
sugeridos están en `src/assets/imagenes/LEEME.md`. Mientras una foto no exista,
el sitio muestra un bloque de color con las iniciales. Las fotos se pasan a
blanco y negro solas.

## Formulario de contacto

Sin configuración, al enviar se abre el programa de correo de la persona con el
mensaje ya escrito. Para que el mensaje se envíe desde la página, creá un
formulario en un servicio como Formspree y pegá su dirección en
`src/data/contacto.ts`, campo `formulario.destino`.

## Mapas

Usan OpenStreetMap, sin clave ni cuenta. Solo hay que cargar `lat` y `lng` de
cada lugar en `src/data/lugares.ts`.

## Diseño

- Colores, tipografías y espaciados: `src/styles/global.css`, al principio.
  El acento es una sola variable: `--acento`.
- Tipografía: Inter en pesos livianos, servida desde el propio sitio.
- El punto que late en la cabecera es la clase `latido`; se puede reutilizar en
  cualquier otro lugar.
- Páginas: `src/pages/`. Piezas compartidas: `src/components/`.
- Las animaciones se desactivan solas si la persona tiene activada la opción
  «reducir movimiento» en su sistema.

### Animaciones

- **Entre páginas:** la página nueva sube como una hoja sobre la anterior.
- **Al hacer scroll:** los textos grandes entran palabra por palabra, las líneas
  se dibujan, las fotos y los mapas se descubren con una cortina, y la cabecera
  se esconde al bajar y vuelve al subir, con una barra fina de progreso.
- **Ligadas al scroll** (trazo de la línea de tiempo, barra de progreso): funcionan en Chrome, Edge y Safari recientes. En
  navegadores que no las soportan, esos elementos quedan quietos y se ven bien.
- Para usarlas en contenido nuevo alcanza con un atributo en la etiqueta:
  `data-aparece`, `data-aparece="cortina"`, `data-palabras` o `data-linea`.

## Antes de publicar

1. Completar todos los `[COMPLETAR]`.
2. Cargar las fotos.
3. Cuando el dominio esté definido, agregarlo en `astro.config.mjs` (`site`).
4. `npm run build` y subir la carpeta `dist/`.
