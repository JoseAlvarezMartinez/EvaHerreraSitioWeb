#!/bin/bash
# Genera las dos versiones del video. Requiere el sitio corriendo en http://localhost:4321 (npm run dev).
set -euo pipefail
cd "$(dirname "$0")"
DESTINO="${1:-..}"

compilar() { # usa el SDK por defecto y, si no coincide con el compilador, prueba con los demás instalados
  [ -x "$1" ] && [ "$1" -nt "$1.swift" ] && return 0
  swiftc -O "$1.swift" -o "$1" 2>/dev/null && return 0
  for sdk in $(ls -d /Library/Developer/CommandLineTools/SDKs/MacOSX*.sdk | sort -r); do
    swiftc -O -sdk "$sdk" "$1.swift" -o "$1" 2>/dev/null && return 0
  done
  echo "No se pudo compilar $1.swift" >&2; exit 1
}
compilar codificar
compilar mezclar

rm -rf frames
node render.mjs --out frames --dsf 2
node musica.mjs musica.wav
afconvert -f m4af -d aac -b 256000 -q 127 musica.wav musica.m4a
./codificar frames "$DESTINO/historia-dra-eva-sin-musica.mp4" 30 16000000
./mezclar "$DESTINO/historia-dra-eva-sin-musica.mp4" musica.m4a "$DESTINO/historia-dra-eva-con-musica.mp4"
cp musica.wav "$DESTINO/musica-historia.wav"
./mezclar "$DESTINO/historia-dra-eva-sin-musica.mp4"
