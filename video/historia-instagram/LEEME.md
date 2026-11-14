# Historia de Instagram — presentación del sitio

Video vertical de 18 segundos que muestra el sitio de la Dra. Eva Herrera Bravo antes del lanzamiento.

## Archivos

| Archivo | Para qué |
| --- | --- |
| `historia-dra-eva-con-musica.mp4` | Versión lista para subir, con la pista instrumental. |
| `historia-dra-eva-sin-musica.mp4` | Misma edición sin audio, para ponerle un audio en tendencia desde Instagram. |
| `musica-historia.wav` | La pista sola (120 BPM), por si hace falta en otra edición. |
| `capturas/` | Capturas del sitio en 390 px (mobile) y 1440 px (desktop): pantalla inicial y página completa de las siete páginas. |
| `fuente/` | Todo lo necesario para volver a generar el video si cambia el sitio. |

## Datos técnicos

- 1080 × 1920 px (9:16), 30 fps, 18 s, MP4 con video H.264 (perfil High) y audio AAC estéreo a 48 kHz.
- Zonas seguras: no hay texto ni elementos clave en los 250 px de arriba ni en los 340 px de abajo.
- Se entiende sin sonido: todos los mensajes están en pantalla.

## Guion

| Tiempo | Qué pasa | Texto en pantalla |
| --- | --- | --- |
| 0 – 2 s | Gancho: un electrocardiograma se traza sobre fondo tinta y la pantalla se abre desde el pulso. | «Algo nuevo está por llegar.» |
| 2 – 5 s | Presentación: el teléfono entra con escala y desenfoque; adentro corre la apertura real del sitio. | «Nueva web.» |
| 5 – 7 s | Portada y «Sobre mí», con zoom de golpe. | «Palabras claras, sin vueltas.» |
| 7 – 9,5 s | Línea de tiempo de Formación, con el pulso que baja al hacer scroll. | «Formación que da confianza.» |
| 9,5 – 12 s | Áreas de práctica. | «Respuestas a lo que sentís.» |
| 12 – 14 s | Dónde atiende y teleconsulta. | «Atención donde estés.» |
| 14 – 18 s | Cierre: vuelve el teléfono completo, marca, llamado a la acción y flecha. | «Conocé la nueva web» · «Tocá el link» |

Los cortes caen en los segundos 2, 5, 7, 9,5, 12 y 14, que son tiempos exactos de la música (120 BPM).

## Dónde va el sticker de link

La flecha del cierre apunta a un espacio libre en el centro, a unos 1500 px desde arriba (justo encima de la zona
que tapa la barra de respuesta). Ahí va el sticker de link, o el de cuenta regresiva si el sitio todavía no está publicado.

## Sobre la música

La pista se generó por código para este video (`fuente/musica.mjs`): no usa samples ni grabaciones de terceros, así que
no tiene derechos de nadie y se puede publicar sin restricciones.

## Volver a generar el video

El sitio no se filma con capturas fijas: corre de verdad dentro del teléfono, cuadro por cuadro, así que el video
muestra siempre el estado actual del sitio. Con `npm run dev` andando en el puerto 4321:

```bash
cd video/historia-instagram/fuente
npm install
./generar.sh
```

Necesita macOS con Google Chrome y las herramientas de línea de comandos de Xcode (el H.264 se codifica con AVFoundation).
Los textos, tiempos y movimientos de cámara están en `comp.html`.
