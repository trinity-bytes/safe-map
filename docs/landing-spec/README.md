# SafeMap — Referencia aprobada de implementación

Exportación del diseño cerrado en Figma, realizada el 2026-11-14. **El copy de las tablas es literal**; los saltos explícitos de Figma se muestran como `<br>`. Los textos contenidos en las pantallas PNG también están inventariados, no se deben reconstruir como UI interactiva.

## Cómo usar esta referencia

1. Elegir la sección de esta página y consultar sus capturas de `ref/` (desktop 1440 px, mobile 390 px).
2. Consultar `context/<viewport>-<section>.json` para la geometría completa de cada nodo y `context/<viewport>-<section>.reference.txt` para el contexto de diseño de alta fidelidad (adaptar a Astro, no copiar React).
3. Usar los originales PNG existentes y los SVG de `src/assets/landing/svg/`. **Las capturas no son assets de la página.**

Fuente: [SafeMap — Landing Redesign](https://www.figma.com/design/Nqg2FTMTqhVNziGwIF8Oki?node-id=50-314), página `04 · Landing · Mockups`: desktop `50:314`, mobile `54:329`, menú `183:59`. Las dos páginas completas miden 1440 × 12374 y 390 × 14200,27 px; los cuatro estados de narrativa son storyboard de una sola sección sticky.

## Tokens y tipografía

| Token | Valor |
|---|---|
| bg/night | #071426 |
| bg/surface | #0D1F36 |
| bg/raised | #142B47 |
| line/subtle | #22395A |
| text/primary | #EAF1FA |
| text/secondary | #9FB3CC |
| accent/trust | #5AA9FF |
| accent/glow | #8FD3FF |
| state/validated | #6FD6A8 |
| alert/amber | #F4B740 |
| risk/coral | #F2705B |

Schibsted Grotesk para titulares y cuerpo; Geist Mono para glifos, números de FAQ y stepper. Tokens y colores exactos usados en cada sección se conservan en su `.reference.txt` (variables `--color-*`). Radios de sistema: 8/16/24/32/full. El encabezado mide 98 px en desktop y 83 px en el estado sticky; mobile usa 63,2 px. No trasladar alturas fijas del storyboard a contenido de texto adaptable.

## Recursos locales

- `src/assets/landing/svg/logo-lockup.svg`: marca y nombre exportados juntos de `50:325`.
- `mark.svg`: marca de cabecera de `91:34`; `mark-small.svg`: símbolo simplificado de `91:48` (11,67 × 14 px, uso menor a 20 px); `mark-large.svg`: marca del footer de `53:374`.
- `google-play.svg`: ícono exportado de `60:370`, no implica que la app esté publicada.
- Los otros SVG conservan el nombre de viewport/sección y la variable del contexto (`desktop-instituciones-MapDistrito.svg`, íconos del manifiesto, contornos, etc.). `asset-manifest.json` relaciona archivo, contexto, variable y SHA-256. Se exportaron también los duplicados de mobile para mantener trazabilidad exacta.
- Fotos PNG originales: `src/assets/landing/photos/narrativa-01-reporta.png` a `narrativa-04-llegas.png` (1122 × 1402); `instituciones-ciudad-noche.png` (1536 × 1024). La foto 04 se usa otra vez en Descarga.
- Retratos PNG: `src/assets/landing/team/{piero-espada,mariana-morocho,fabrizio-santi,mauricio-teran,jahat-trinidad}.png` (686 × 686). Orden: Piero, Mariana, Fabrizio, Mauricio, Jahat.
- Pantallas PNG: `src/assets/landing/screens/{01-mapa,02-reportar,03-validar,04-alerta,05-ruta}.png` (592 × 1272). Marco del teléfono en CSS; no editar PNG originales. En desktop, narrativa usa marco 320 × 660 y pantalla 296 × 636; mobile, marco 230 × 475.

## Diferencias y datos ausentes verificados

- **FAQ:** Figma tiene las seis preguntas y únicamente la respuesta 01. Las respuestas 02–06 no existen como nodos ocultos en los dos mockups. El JSON anterior del repositorio no es copy aprobado del nuevo diseño y contiene referencias antiguas a beta. No se inventaron respuestas en esta exportación; su resolución corresponde a implementación según la autorización del usuario.
- **Google Play:** el diseño contiene `DISPONIBLE EN`, pero el plan exige el estado público `Próximamente en Google Play`, sin `href` y con `aria-disabled="true"`. La nota `PLACEHOLDER — no publicar` está documentada para trazabilidad y **no se publica**.
- **Legales y perfiles:** omitir enlaces sin destino; no inventar enlaces de equipo. No hay enlace de contacto aprobado para el botón `Conversemos` ni para `Escríbenos`; evitar destinos inventados.
- **Planes:** el mockup final tiene Free **800 × 572** y Premium **504 × 572**, no los 780/524 anteriores que quedaron en la descripción de T7. Mandan el mockup final y estas capturas.
- **Metadatos:** Figma no define título SEO, descripción SEO ni imagen Open Graph específicos; no confundir el copy visible con un campo SEO aprobado.
- **Textos alternativos:** Figma no contiene cadenas de alt independientes. Los nombres de retratos están inventariados; los adornos son decorativos. Las descripciones accesibles necesarias no son copy extraído del diseño.


## 01. Hero

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `50:315` | `54:330` |
| Tamaño (px) | 1440 × 900 | 390 × 880 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 |
| Gap (px) | 0 | 0 |
| Captura | [Desktop](ref/desktop-01-hero.png) | [Mobile](ref/mobile-01-hero.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| SafeMap | Schibsted Grotesk SemiBold / 24 / 101 | Schibsted Grotesk SemiBold / 24 / 101 |
| Cómo funciona | Schibsted Grotesk Regular / 16 / 113 | — |
| Privacidad | Schibsted Grotesk Regular / 16 / 78 | — |
| Planes | Schibsted Grotesk Regular / 16 / 50 | — |
| Equipo | Schibsted Grotesk Regular / 16 / 52 | — |
| Descargar la app | Schibsted Grotesk Bold / 15 / 125 | Schibsted Grotesk Bold / 16 / 133 |
| Llega a tu destino<br>con más tranquilidad. | Schibsted Grotesk SemiBold / 62 / 860 | — |
| SafeMap es una app de reportes anónimos que tus vecinos validan: mira qué pasa en tu zona, recibe alertas cerca de ti y elige por dónde ir. | Schibsted Grotesk Regular / 18 / 560 | — |
| Ver cómo funciona ↓ | Schibsted Grotesk Bold / 15 / 150 | — |
| 9:41 | Schibsted Grotesk Medium / 13 / 24 | Schibsted Grotesk Medium / 10.14 / 19 |
| ●●● ▮ | Schibsted Grotesk Medium / 13 / 51 | Schibsted Grotesk Medium / 10.14 / 40 |
| ¿A dónde vas? | Schibsted Grotesk Regular / 14 / 95 | Schibsted Grotesk Regular / 10.92 / 75 |
| Zona en observación | Schibsted Grotesk SemiBold / 11.05 / 111 | Schibsted Grotesk SemiBold / 8.62 / 87 |
| 5 reportes esta semana | Schibsted Grotesk Regular / 10.2 / 112 | Schibsted Grotesk Regular / 7.96 / 87 |
| Todo | Schibsted Grotesk Medium / 12 / 29 | Schibsted Grotesk Medium / 9.36 / 23 |
| Robos | Schibsted Grotesk Medium / 12 / 36 | Schibsted Grotesk Medium / 9.36 / 28 |
| Acoso | Schibsted Grotesk Medium / 12 / 36 | Schibsted Grotesk Medium / 9.36 / 28 |
| Sin luz | Schibsted Grotesk Medium / 12 / 38 | Schibsted Grotesk Medium / 9.36 / 29 |
| Tu zona ahora | Schibsted Grotesk Medium / 12 / 110 | Schibsted Grotesk Medium / 9.36 / 86 |
| Mayormente tranquila | Schibsted Grotesk SemiBold / 20 / 209 | Schibsted Grotesk SemiBold / 15.6 / 163 |
| 1 zona en observación a 600 m | Schibsted Grotesk Regular / 14 / 200 | Schibsted Grotesk Regular / 10.92 / 156 |
| Mapa | Schibsted Grotesk Medium / 11 / 29 | Schibsted Grotesk Medium / 8.58 / 23 |
| Alertas | Schibsted Grotesk Medium / 11 / 38 | Schibsted Grotesk Medium / 8.58 / 30 |
| Perfil | Schibsted Grotesk Medium / 11 / 28 | Schibsted Grotesk Medium / 8.58 / 22 |
| Menú | — | Schibsted Grotesk Bold / 16 / 45 |
| Llega a tu destino con más tranquilidad. | — | Schibsted Grotesk SemiBold / 31 / 350 |
| Una app de reportes anónimos que tus vecinos validan: mira qué pasa en tu zona y elige por dónde ir. | — | Schibsted Grotesk Regular / 16 / 290 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `50:315` Section / Hero | 0 / 0 | 1440 × 900 | 0 |
| D | `50:324` Header | 0 / 0 | 1440 × 98 | 0 |
| D | `50:332` Nav / pill | 478.5 / 22 | 447 × 54 | 999 |
| D | `50:338` Hero copy | 290 / 252 | 860 × 285 | 0 |
| D | `50:344` Phone / 01 undefined | 560 / 589 | 320 × 660 | 52 |
| M | `54:330` Section / Hero | 0 / 0 | 390 × 880 | 0 |
| M | `54:337` Header | 0 / 0 | 390 × 63.2 | 0 |
| M | `54:346` Hero copy | 20 / 150 | 350 × 215 | 0 |
| M | `54:351` Phone / 01 undefined | 70.2 / 405 | 249.6 × 514.8 | 40.56 |

## 02. Problema

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `50:411` | `54:418` |
| Tamaño (px) | 1440 × 587 | 390 × 660 |
| Padding T/R/B/L (px) | 160 / 64 / 160 / 64 | 96 / 20 / 96 / 20 |
| Gap (px) | 96 | 24 |
| Captura | [Desktop](ref/desktop-02-problema.png) | [Mobile](ref/mobile-02-problema.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| Los datos existen. Lo que falta es saber qué pasa hoy en tu barrio. | Schibsted Grotesk SemiBold / 52 / 836 | Schibsted Grotesk SemiBold / 32 / 350 |
| Las cifras oficiales de criminalidad se publican, pero no te dicen por dónde conviene ir esta noche. | Schibsted Grotesk Regular / 20 / 620 | Schibsted Grotesk Regular / 16 / 350 |
| +14,9 % | Schibsted Grotesk SemiBold / 104 / 342 | Schibsted Grotesk SemiBold / 72 / 245 |
| más denuncias por delitos en Lima Metropolitana entre julio y setiembre de 2024 que en el mismo trimestre de 2023: 55 358 en solo tres meses. | Schibsted Grotesk Regular / 16 / 380 | — |
| Fuente: INEI, Estadísticas de Criminalidad, Seguridad Ciudadana y Violencia, julio–setiembre 2024 (informe técnico N.º 04, diciembre 2024). | Schibsted Grotesk Regular / 14 / 380 | — |
| más denuncias por delitos en Lima Metropolitana (jul.–set. 2024 vs. 2023): 55 358 en tres meses. Fuente: INEI, Estadísticas de Criminalidad, Seguridad Ciudadana y Violencia, julio–setiembre 2024 (informe técnico N.º 04, diciembre 2024). | — | Schibsted Grotesk Regular / 16 / 350 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `50:411` Section / Problema | 0 / 900 | 1440 × 587 | 0 |
| D | `50:412` Frame | 64 / 229 | 836 × 198 | 0 |
| D | `50:415` Frame | 996 / 160 | 380 × 267 | 0 |
| M | `54:418` Section / Problema | 0 / 880 | 390 × 660 | 0 |

## 03. Manifiesto

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `154:42` | `174:47` |
| Tamaño (px) | 1440 × 600 | 390 × 620 |
| Padding T/R/B/L (px) | 0 / 64 / 0 / 64 | 0 / 0 / 0 / 0 |
| Gap (px) | 28 | 0 |
| Captura | [Desktop](ref/desktop-03-manifiesto.png) | [Mobile](ref/mobile-03-manifiesto.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| Nadie conoce tu calle mejor<br>que quienes la caminan. | Schibsted Grotesk SemiBold / 60 / 769 | — |
| SafeMap reúne lo que ven tus vecinos, espera a que varios lo confirmen y te avisa a tiempo. | Schibsted Grotesk Regular / 20 / 600 | Schibsted Grotesk Regular / 16 / 310 |
| Nadie conoce tu calle mejor que quienes la caminan. | — | Schibsted Grotesk SemiBold / 34 / 350 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `154:42` Section / Manifiesto | 0 / 1487 | 1440 × 600 | 0 |
| D | `159:49` Float / reporte | 149.15 / 121.79 | 96 × 96 | 29 |
| D | `159:53` Float / anonimo | 268.8 / 331.62 | 56 × 56 | 17 |
| D | `159:59` Float / cifrado | 97.09 / 403.17 | 68 × 68 | 20 |
| D | `159:63` Float / validado | 1188.56 / 114.25 | 84 × 84 | 25 |
| D | `159:68` Float / alerta | 1251.5 / 317.05 | 100 × 100 | 30 |
| D | `159:72` Float / ruta | 1119.23 / 445.08 | 56 × 56 | 17 |
| M | `174:47` Section / Manifiesto | 0 / 1540 | 390 × 620 | 0 |
| M | `174:48` Float / reporte | 36 / 72 | 72 × 72 | 21.75 |
| M | `174:54` Float / validado | 286 / 100 | 60.48 × 60.48 | 18 |
| M | `174:61` Float / anonimo | 172 / 48 | 44.8 × 44.8 | 13.6 |
| M | `174:69` Float / cifrado | 44 / 476 | 51.68 × 51.68 | 15.2 |
| M | `174:75` Float / alerta | 262 / 448 | 80 × 80 | 24 |
| M | `174:81` Float / ruta | 160 / 528 | 44.8 × 44.8 | 13.6 |
| M | `174:88` Copy | 20 / 204 | 350 × 203 | 0 |

## 04. Narrativa · Reporta

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `50:419` | `54:423` |
| Tamaño (px) | 1440 × 860 | 390 × 972 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 |
| Gap (px) | 0 | 0 |
| Captura | [Desktop](ref/desktop-04-narrativa-reporta.png) | [Mobile](ref/mobile-04-narrativa-reporta.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| 9:41 | Schibsted Grotesk Medium / 13 / 24 | Schibsted Grotesk Medium / 9.36 / 17 |
| ●●● ▮ | Schibsted Grotesk Medium / 13 / 51 | Schibsted Grotesk Medium / 9.36 / 37 |
| Nuevo reporte | Schibsted Grotesk SemiBold / 20 / 137 | Schibsted Grotesk SemiBold / 14.4 / 99 |
| Reporte anónimo | Schibsted Grotesk Medium / 13 / 106 | Schibsted Grotesk Medium / 9.36 / 76 |
| Nadie verá tu nombre | Schibsted Grotesk Regular / 12 / 120 | Schibsted Grotesk Regular / 8.64 / 87 |
| ¿Qué pasó? | Schibsted Grotesk Medium / 13 / 71 | Schibsted Grotesk Medium / 9.36 / 52 |
| Robo | Schibsted Grotesk Medium / 13 / 32 | Schibsted Grotesk Medium / 9.36 / 23 |
| Intento de robo | Schibsted Grotesk Medium / 13 / 95 | Schibsted Grotesk Medium / 9.36 / 68 |
| Acoso | Schibsted Grotesk Medium / 13 / 39 | Schibsted Grotesk Medium / 9.36 / 28 |
| Zona sin luz | Schibsted Grotesk Medium / 13 / 73 | Schibsted Grotesk Medium / 9.36 / 52 |
| Pelea | Schibsted Grotesk Medium / 13 / 34 | Schibsted Grotesk Medium / 9.36 / 25 |
| Otro | Schibsted Grotesk Medium / 13 / 28 | Schibsted Grotesk Medium / 9.36 / 20 |
| ¿Dónde? | Schibsted Grotesk Medium / 13 / 54 | Schibsted Grotesk Medium / 9.36 / 39 |
| Usando tu ubicación actual | Schibsted Grotesk Regular / 12 / 151 | Schibsted Grotesk Regular / 8.64 / 109 |
| Hace un momento | Schibsted Grotesk Regular / 12 / 102 | Schibsted Grotesk Regular / 8.64 / 74 |
| Enviar reporte anónimo | Schibsted Grotesk Bold / 15 / 173 | Schibsted Grotesk Bold / 10.8 / 125 |
| Entérate de lo que pasa en tu camino antes de salir. | Schibsted Grotesk SemiBold / 52 / 416 | Schibsted Grotesk SemiBold / 32 / 350 |
| 01 | Schibsted Grotesk Bold / 14 / 15 | Schibsted Grotesk Bold / 14 / 15 |
| Reporta | Schibsted Grotesk Bold / 14 / 56 | Schibsted Grotesk Bold / 14 / 56 |
| 02 | Schibsted Grotesk Medium / 14 / 17 | Schibsted Grotesk Medium / 14 / 17 |
| 03 | Schibsted Grotesk Medium / 14 / 17 | Schibsted Grotesk Medium / 14 / 17 |
| 04 | Schibsted Grotesk Medium / 14 / 18 | Schibsted Grotesk Medium / 14 / 18 |
| Primero, alguien reporta lo que vio. | Schibsted Grotesk SemiBold / 36 / 416 | Schibsted Grotesk SemiBold / 26 / 350 |
| Elige qué pasó y la app toma la ubicación. Nadie ve su nombre, ni otros usuarios ni las instituciones. | Schibsted Grotesk Regular / 20 / 416 | — |
| SafeMap | Schibsted Grotesk SemiBold / 24 / 101 | — |
| Cómo funciona | Schibsted Grotesk Medium / 16 / 114 | — |
| Privacidad | Schibsted Grotesk Regular / 16 / 78 | — |
| Planes | Schibsted Grotesk Regular / 16 / 50 | — |
| Equipo | Schibsted Grotesk Regular / 16 / 52 | — |
| Descargar la app | Schibsted Grotesk Bold / 15 / 125 | — |
| Elige qué pasó y la app toma la ubicación. Nadie ve su nombre. | — | Schibsted Grotesk Regular / 16 / 350 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `50:419` Section / Narrativa / Reporta | 0 / 2087 | 1440 × 860 | 0 |
| D | `129:34` Photo backdrop | 700 / 0 | 740 × 860 | 0 |
| D | `50:422` Phone / 02 undefined | 536 / 100 | 320 × 660 | 52 |
| D | `50:477` Copy | 64 / 164 | 416 × 532 | 0 |
| D | `155:42` Stepper | 0 / 256 | 269 × 44 | 0 |
| D | `155:155` Header / sticky (scrolled, Cómo funciona activo) | 0 / 0 | 1440 × 83 | 0 |
| D | `155:165` Nav / pill | 471 / 14 | 462 × 54 | 999 |
| M | `54:423` Section / Narrativa / 1 | 0 / 2160 | 390 × 972 | 0 |
| M | `175:63` Photo backdrop | 0 / 0 | 390 × 972 | 0 |
| M | `54:433` Phone / 02 undefined | 80 / 425 | 230.4 × 475.2 | 37.44 |
| M | `175:51` Copy | 20 / 64 | 350 × 317 | 0 |
| M | `175:52` Stepper | 0 / 125 | 269 × 44 | 0 |

## 05. Narrativa · Validan

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `50:490` | `54:488` |
| Tamaño (px) | 1440 × 860 | 390 × 843 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 |
| Gap (px) | 0 | 0 |
| Captura | [Desktop](ref/desktop-05-narrativa-validan.png) | [Mobile](ref/mobile-05-narrativa-validan.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| 9:41 | Schibsted Grotesk Medium / 13 / 24 | Schibsted Grotesk Medium / 9.36 / 17 |
| ●●● ▮ | Schibsted Grotesk Medium / 13 / 51 | Schibsted Grotesk Medium / 9.36 / 37 |
| ¿Viste esto cerca? | Schibsted Grotesk Medium / 12 / 140 | Schibsted Grotesk Medium / 8.64 / 101 |
| Robo reportado | Schibsted Grotesk SemiBold / 24 / 177 | Schibsted Grotesk SemiBold / 17.28 / 128 |
| Hace 8 min · a 200 m de ti | Schibsted Grotesk Regular / 14 / 168 | Schibsted Grotesk Regular / 10.08 / 121 |
| 3 de 5 vecinos | Schibsted Grotesk Medium / 13 / 88 | Schibsted Grotesk Medium / 9.36 / 64 |
| lo confirmaron | Schibsted Grotesk Regular / 12 / 82 | Schibsted Grotesk Regular / 8.64 / 59 |
| Sí, lo confirmo | Schibsted Grotesk Bold / 15 / 105 | Schibsted Grotesk Bold / 10.8 / 76 |
| No lo vi | Schibsted Grotesk Bold / 15 / 54 | Schibsted Grotesk Bold / 10.8 / 39 |
| Tu respuesta también es anónima. | Schibsted Grotesk Regular / 12 / 190 | Schibsted Grotesk Regular / 8.64 / 137 |
| 01 | Schibsted Grotesk Medium / 14 / 14 | Schibsted Grotesk Medium / 14 / 14 |
| 02 | Schibsted Grotesk Bold / 14 / 18 | Schibsted Grotesk Bold / 14 / 18 |
| Validan | Schibsted Grotesk Bold / 14 / 52 | Schibsted Grotesk Bold / 14 / 52 |
| 03 | Schibsted Grotesk Medium / 14 / 17 | Schibsted Grotesk Medium / 14 / 17 |
| 04 | Schibsted Grotesk Medium / 14 / 18 | Schibsted Grotesk Medium / 14 / 18 |
| Luego, los vecinos de la zona lo confirman. | Schibsted Grotesk SemiBold / 36 / 416 | — |
| Quienes están cerca responden si lo vieron. Con cinco confirmaciones, el reporte queda validado y pinta el mapa. | Schibsted Grotesk Regular / 20 / 416 | — |
| Luego, los vecinos lo confirman. | — | Schibsted Grotesk SemiBold / 26 / 350 |
| Con cinco confirmaciones, el reporte queda validado y pinta el mapa. | — | Schibsted Grotesk Regular / 16 / 350 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `50:490` Section / Narrativa / Validan | 0 / 2947 | 1440 × 860 | 0 |
| D | `129:38` Photo backdrop | 700 / 0 | 740 × 860 | 0 |
| D | `50:493` Phone / 03 undefined | 536 / 100 | 320 × 660 | 52 |
| D | `50:549` Copy | 64 / 292 | 416 × 276 | 0 |
| D | `155:52` Stepper | 0 / 0 | 268 × 44 | 0 |
| M | `54:488` Section / Narrativa / 2 | 0 / 3132 | 390 × 843 | 0 |
| M | `175:78` Photo backdrop | 0 / 0 | 390 × 843 | 0 |
| M | `79:83` Phone / 03 undefined | 80 / 296 | 230.4 × 475.2 | 37.44 |
| M | `175:66` Copy | 20 / 64 | 350 × 188 | 0 |
| M | `175:67` Stepper | 0 / 0 | 268 × 44 | 0 |

## 06. Narrativa · Alerta

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `50:561` | `54:553` |
| Tamaño (px) | 1440 × 860 | 390 × 812 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 |
| Gap (px) | 0 | 0 |
| Captura | [Desktop](ref/desktop-06-narrativa-alerta.png) | [Mobile](ref/mobile-06-narrativa-alerta.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
|  | Schibsted Grotesk Medium / 13 / 0 | Schibsted Grotesk Medium / 9.36 / 0 |
| ●●● ▮ | Schibsted Grotesk Medium / 13 / 51 | Schibsted Grotesk Medium / 9.36 / 37 |
| 21:47 | Schibsted Grotesk SemiBold / 72 / 163 | Schibsted Grotesk SemiBold / 51.84 / 118 |
| Jueves, 12 de noviembre | Schibsted Grotesk Regular / 14 / 159 | Schibsted Grotesk Regular / 10.08 / 115 |
| SAFEMAP | Schibsted Grotesk Medium / 12 / 174 | Schibsted Grotesk Medium / 8.64 / 125.88 |
| ahora | Schibsted Grotesk Regular / 11 / 30 | Schibsted Grotesk Regular / 7.92 / 21 |
| Alerta cercana | Schibsted Grotesk Bold / 15 / 110 | Schibsted Grotesk Bold / 10.8 / 79 |
| Robo validado por 5 vecinos a 300 m de ti. | Schibsted Grotesk Regular / 13 / 244 | Schibsted Grotesk Regular / 9.36 / 175.68 |
| Ver en el mapa | Schibsted Grotesk Bold / 12 / 87 | Schibsted Grotesk Bold / 8.64 / 63 |
| Ruta alternativa | Schibsted Grotesk Bold / 12 / 94 | Schibsted Grotesk Bold / 8.64 / 68 |
| Tu ruta de siempre pasa cerca | Schibsted Grotesk Bold / 15 / 221 | Schibsted Grotesk Bold / 10.8 / 159 |
| ¿Quieres ver una alternativa más tranquila? | Schibsted Grotesk Regular / 13 / 244 | Schibsted Grotesk Regular / 9.36 / 175.68 |
| 01 | Schibsted Grotesk Medium / 14 / 14 | Schibsted Grotesk Medium / 14 / 14 |
| 02 | Schibsted Grotesk Medium / 14 / 17 | Schibsted Grotesk Medium / 14 / 17 |
| 03 | Schibsted Grotesk Bold / 14 / 18 | Schibsted Grotesk Bold / 14 / 18 |
| Alerta | Schibsted Grotesk Bold / 14 / 43 | Schibsted Grotesk Bold / 14 / 43 |
| 04 | Schibsted Grotesk Medium / 14 / 18 | Schibsted Grotesk Medium / 14 / 18 |
| Entonces te llega la alerta, si estás cerca. | Schibsted Grotesk SemiBold / 36 / 416 | — |
| Solo recibes lo que pasa en tu zona o en tu ruta, a tiempo para decidir por dónde ir. | Schibsted Grotesk Regular / 20 / 416 | — |
| Entonces te llega la alerta. | — | Schibsted Grotesk SemiBold / 26 / 350 |
| Solo recibes lo que pasa en tu zona o en tu ruta, a tiempo para decidir. | — | Schibsted Grotesk Regular / 16 / 350 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `50:561` Section / Narrativa / Alerta | 0 / 3807 | 1440 × 860 | 0 |
| D | `129:42` Photo backdrop | 700 / 0 | 740 × 860 | 0 |
| D | `50:564` Phone / 04 undefined | 536 / 100 | 320 × 660 | 52 |
| D | `50:606` Copy | 64 / 307 | 416 × 246 | 0 |
| D | `155:62` Stepper | 0 / 0 | 259 × 44 | 0 |
| M | `54:553` Section / Narrativa / 3 | 0 / 3975 | 390 × 812 | 0 |
| M | `175:93` Photo backdrop | 0 / 0 | 390 × 812 | 0 |
| M | `77:50` Phone / 04 undefined | 80 / 265 | 230.4 × 475.2 | 37.44 |
| M | `175:81` Copy | 20 / 64 | 350 × 157 | 0 |
| M | `175:82` Stepper | 0 / 0 | 259 × 44 | 0 |

## 07. Narrativa · Llegas

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `50:618` | `54:604` |
| Tamaño (px) | 1440 × 860 | 390 × 843 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 |
| Gap (px) | 0 | 0 |
| Captura | [Desktop](ref/desktop-07-narrativa-llegas.png) | [Mobile](ref/mobile-07-narrativa-llegas.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| 9:41 | Schibsted Grotesk Medium / 13 / 24 | Schibsted Grotesk Medium / 9.36 / 17 |
| ●●● ▮ | Schibsted Grotesk Medium / 13 / 51 | Schibsted Grotesk Medium / 9.36 / 37 |
| Zona en observación | Schibsted Grotesk SemiBold / 11.05 / 111 | Schibsted Grotesk SemiBold / 7.96 / 80 |
| 5 reportes esta semana | Schibsted Grotesk Regular / 10.2 / 112 | Schibsted Grotesk Regular / 7.34 / 81 |
| Compartiendo con 2 contactos | Schibsted Grotesk Medium / 12 / 174 | Schibsted Grotesk Medium / 8.64 / 125 |
| Ruta sugerida | Schibsted Grotesk Medium / 12 / 107 | Schibsted Grotesk Medium / 8.64 / 77 |
| 18 min | Schibsted Grotesk SemiBold / 26 / 76 | Schibsted Grotesk SemiBold / 18.72 / 55 |
| +3 min | Schibsted Grotesk Medium / 13 / 41 | Schibsted Grotesk Medium / 9.36 / 30 |
| Evita 2 zonas con reportes | Schibsted Grotesk Regular / 14 / 171 | Schibsted Grotesk Regular / 10.08 / 124 |
| Iniciar y compartir | Schibsted Grotesk Bold / 15 / 138 | Schibsted Grotesk Bold / 10.8 / 100 |
| 01 | Schibsted Grotesk Medium / 14 / 14 | Schibsted Grotesk Medium / 14 / 14 |
| 02 | Schibsted Grotesk Medium / 14 / 17 | Schibsted Grotesk Medium / 14 / 17 |
| 03 | Schibsted Grotesk Medium / 14 / 17 | Schibsted Grotesk Medium / 14 / 17 |
| 04 | Schibsted Grotesk Bold / 14 / 18 | Schibsted Grotesk Bold / 14 / 18 |
| Llegas | Schibsted Grotesk Bold / 14 / 45 | Schibsted Grotesk Bold / 14 / 45 |
| Y quien tú elijas ve que llegaste bien. | Schibsted Grotesk SemiBold / 36 / 416 | Schibsted Grotesk SemiBold / 26 / 350 |
| La app te propone el camino con menos reportes y puedes compartir tu recorrido en vivo mientras caminas. | Schibsted Grotesk Regular / 20 / 416 | — |
| Te propone el camino con menos reportes y puedes compartir tu recorrido en vivo. | — | Schibsted Grotesk Regular / 16 / 350 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `50:618` Section / Narrativa / Llegas | 0 / 4667 | 1440 × 860 | 0 |
| D | `129:46` Photo backdrop | 700 / 0 | 740 × 860 | 0 |
| D | `50:621` Phone / 05 undefined | 536 / 100 | 320 × 660 | 52 |
| D | `50:668` Copy | 64 / 292 | 416 × 276 | 0 |
| D | `155:72` Stepper | 0 / 0 | 261 × 44 | 0 |
| M | `54:604` Section / Narrativa / 4 | 0 / 4787 | 390 × 843 | 0 |
| M | `175:108` Photo backdrop | 0 / 0 | 390 × 843 | 0 |
| M | `79:35` Phone / 05 undefined | 80 / 296 | 230.4 × 475.2 | 37.44 |
| M | `175:96` Copy | 20 / 64 | 350 × 188 | 0 |
| M | `175:97` Stepper | 0 / 0 | 261 × 44 | 0 |

## 08. Privacidad

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `51:328` | `54:660` |
| Tamaño (px) | 1440 × 906 | 390 × 1373 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 96 / 20 / 96 / 20 |
| Gap (px) | 0 | 24 |
| Captura | [Desktop](ref/desktop-08-privacidad.png) | [Mobile](ref/mobile-08-privacidad.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| Tú cuentas lo que viste.<br>Nadie sabe que fuiste tú. | Schibsted Grotesk SemiBold / 44 / 620 | Schibsted Grotesk SemiBold / 28 / 350 |
| SafeMap solo funciona si la gente se anima a contar lo que ve. Por eso el anonimato no es algo que activas: así está hecha la app. | Schibsted Grotesk Regular / 18 / 520 | Schibsted Grotesk Regular / 16 / 350 |
| Anónimo siempre | Schibsted Grotesk SemiBold / 20 / 166 | Schibsted Grotesk SemiBold / 20 / 314 |
| Nadie ve quién reportó: ni otros usuarios ni las instituciones. | Schibsted Grotesk Regular / 16 / 584 | Schibsted Grotesk Regular / 16 / 314 |
| Nada se publica sin cinco confirmaciones | Schibsted Grotesk SemiBold / 20 / 389 | Schibsted Grotesk SemiBold / 20 / 314 |
| Un reporte suelto no alarma a nadie: aparece en el mapa cuando cinco vecinos lo confirman. | Schibsted Grotesk Regular / 16 / 584 | Schibsted Grotesk Regular / 16 / 314 |
| Cifrado | Schibsted Grotesk SemiBold / 20 / 70 | Schibsted Grotesk SemiBold / 20 / 70 |
| Tus datos viajan y se guardan cifrados. | Schibsted Grotesk Regular / 16 / 584 | Schibsted Grotesk Regular / 16 / 314 |
| Sin perfiles públicos | Schibsted Grotesk SemiBold / 20 / 192 | Schibsted Grotesk SemiBold / 20 / 314 |
| No hay foto, seguidores ni historial que otros puedan ver. | Schibsted Grotesk Regular / 16 / 584 | Schibsted Grotesk Regular / 16 / 314 |
| Tú decides quién te ve | Schibsted Grotesk SemiBold / 20 / 209 | Schibsted Grotesk SemiBold / 20 / 314 |
| Compartes tu ruta solo con quien eliges, y solo mientras quieras. | Schibsted Grotesk Regular / 16 / 584 | Schibsted Grotesk Regular / 16 / 314 |
| Robo reportado | Schibsted Grotesk SemiBold / 20 / 149 | Schibsted Grotesk SemiBold / 20 / 149 |
| Hace 8 min · a 200 m de ti | Schibsted Grotesk Regular / 14 / 168 | Schibsted Grotesk Regular / 14 / 302 |
| Reportado por un vecino anónimo | Schibsted Grotesk Medium / 13 / 208 | Schibsted Grotesk Medium / 13 / 208 |
| 3 de 5 vecinos lo confirmaron | Schibsted Grotesk Bold / 15 / 214 | Schibsted Grotesk Bold / 15 / 214 |
| Con 2 más, pinta el mapa | Schibsted Grotesk Regular / 14 / 163 | Schibsted Grotesk Regular / 14 / 214 |
| Ubicación aproximada · datos cifrados | Schibsted Grotesk Regular / 14 / 247 | Schibsted Grotesk Regular / 14 / 247 |
| AM | Schibsted Grotesk Medium / 13 / 21 | Schibsted Grotesk Medium / 13 / 21 |
| LR | Schibsted Grotesk Medium / 13 / 16 | Schibsted Grotesk Medium / 13 / 16 |
| Ruta compartida con 2 contactos | Schibsted Grotesk Bold / 15 / 242 | Schibsted Grotesk Bold / 15 / 232 |
| Se apaga sola cuando llegas | Schibsted Grotesk Regular / 14 / 184 | Schibsted Grotesk Regular / 14 / 232 |
| Vista previa · demo simulada | Schibsted Grotesk Medium / 13 / 175 | Schibsted Grotesk Medium / 13 / 175 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `51:328` Section / Privacidad | 0 / 5527 | 1440 × 906 | 0 |
| D | `65:341` Copy | 64 / 133 | 620 × 665 | 0 |
| D | `65:381` Report preview | 828 / 242 | 440 × 423 | 0 |
| D | `65:382` Card / Reporte | 0 / 0 | 440 × 286 | 24 |
| D | `65:407` Card / Ruta compartida | 0 / 302 | 440 × 75 | 999 |
| D | `91:184` Badge / Demo | 119.5 / 393 | 201 × 30 | 999 |
| M | `54:660` Section / Privacidad | 0 / 5630 | 390 × 1373 | 0 |
| M | `73:56` Promises | 20 / 278 | 350 × 538 | 0 |
| M | `73:87` Report preview | 20 / 840 | 350 × 437 | 0 |
| M | `73:88` Card / Reporte | 0 / 0 | 350 × 284 | 24 |
| M | `73:113` Card / Ruta compartida | 0 / 300 | 350 × 91 | 999 |
| M | `183:89` Badge / Demo | 74.5 / 407 | 201 × 30 | 999 |

## 09. Instituciones

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `51:375` | `54:690` |
| Tamaño (px) | 1440 × 937 | 390 × 1261 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 96 / 20 / 96 / 20 |
| Gap (px) | 0 | 24 |
| Captura | [Desktop](ref/desktop-09-instituciones.png) | [Mobile](ref/mobile-09-instituciones.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| Qué pasa en cada zona y a qué hora. | Schibsted Grotesk SemiBold / 48 / 400 | Schibsted Grotesk SemiBold / 30 / 350 |
| Para municipalidades | Schibsted Grotesk SemiBold / 24 / 243 | Schibsted Grotesk SemiBold / 20 / 350 |
| Reportes validados y agregados por zona y por hora, para decidir dónde poner luz, serenazgo o una patrulla. Nunca con datos personales. | Schibsted Grotesk Regular / 18 / 380 | Schibsted Grotesk Regular / 16 / 350 |
| Para empresas | Schibsted Grotesk SemiBold / 24 / 170 | Schibsted Grotesk SemiBold / 20 / 350 |
| Un mapa de la zona de tu local o de las rutas de tu equipo, para planificar turnos y traslados con información del día. | Schibsted Grotesk Regular / 18 / 380 | Schibsted Grotesk Regular / 16 / 350 |
| Conversemos | Schibsted Grotesk Bold / 15 / 102 | Schibsted Grotesk Bold / 15 / 102 |
| Zona en observación | Schibsted Grotesk SemiBold / 13 / 130 | Schibsted Grotesk SemiBold / 13 / 130 |
| 42 reportes validados | Schibsted Grotesk Regular / 12 / 121 | Schibsted Grotesk Regular / 12 / 121 |
| Reportes recientes | Schibsted Grotesk SemiBold / 13 / 119<br>Schibsted Grotesk Regular / 14 / 123 | Schibsted Grotesk SemiBold / 13 / 119<br>Schibsted Grotesk Regular / 14 / 123 |
| 17 en los últimos 7 días | Schibsted Grotesk Regular / 12 / 126 | Schibsted Grotesk Regular / 12 / 126 |
| Panel de zona | Schibsted Grotesk SemiBold / 20 / 131 | Schibsted Grotesk SemiBold / 18 / 120 |
| Distrito de ejemplo · últimos 7 días | Schibsted Grotesk Regular / 14 / 222 | Schibsted Grotesk Regular / 13 / 206 |
| Vista previa · cifras de ejemplo | Schibsted Grotesk Medium / 13 / 187 | Schibsted Grotesk Medium / 13 / 187 |
| Actividad baja | Schibsted Grotesk Regular / 14 / 92 | Schibsted Grotesk Regular / 14 / 92 |
| Riesgo alto | Schibsted Grotesk Regular / 14 / 72 | Schibsted Grotesk Regular / 14 / 72 |
| Reportes validados | Schibsted Grotesk Regular / 14 / 125 | Schibsted Grotesk Regular / 12 / 94.67 |
| 128 | Schibsted Grotesk SemiBold / 30 / 47 | Schibsted Grotesk SemiBold / 26 / 41 |
| Zonas en observación | Schibsted Grotesk Regular / 14 / 143 | Schibsted Grotesk Regular / 12 / 94.67 |
| 6 | Schibsted Grotesk SemiBold / 30 / 19 | Schibsted Grotesk SemiBold / 26 / 16 |
| Hora con más reportes | Schibsted Grotesk Regular / 14 / 149 | Schibsted Grotesk Regular / 12 / 94.67 |
| 17:00 | Schibsted Grotesk SemiBold / 30 / 72 | Schibsted Grotesk SemiBold / 26 / 63 |
| Reportes por hora | Schibsted Grotesk Bold / 15 / 134 | Schibsted Grotesk Bold / 15 / 134 |
| 6 h | Schibsted Grotesk Regular / 14 / 20 | Schibsted Grotesk Regular / 14 / 20 |
| 9 h | Schibsted Grotesk Regular / 14 / 20 | Schibsted Grotesk Regular / 14 / 20 |
| 12 h | Schibsted Grotesk Regular / 14 / 25 | Schibsted Grotesk Regular / 14 / 25 |
| 15 h | Schibsted Grotesk Regular / 14 / 25 | Schibsted Grotesk Regular / 14 / 25 |
| 18 h | Schibsted Grotesk Regular / 14 / 25 | Schibsted Grotesk Regular / 14 / 25 |
| 21 h | Schibsted Grotesk Regular / 14 / 25 | Schibsted Grotesk Regular / 14 / 25 |
| Datos agregados por zona y hora. Nunca muestra quién reportó. | Schibsted Grotesk Regular / 14 / 415 | Schibsted Grotesk Regular / 13 / 308 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `51:375` Section / Instituciones | 0 / 6433 | 1440 × 937 | 0 |
| D | `139:34` Photo backdrop | 0 / 0 | 1440 × 937 | 0 |
| D | `51:376` Panel | 64 / 60 | 1312 × 817 | 32 |
| D | `66:341` Dashboard / Vista previa | 568 / 64 | 744 × 691 | 24 |
| D | `148:78` Card / Cifras | 20 / 413 | 704 × 258 | 18 |
| M | `54:690` Section / Instituciones | 0 / 7003 | 390 × 1261 | 0 |
| M | `176:51` Photo backdrop | 0 / 0 | 390 × 640 | 0 |
| M | `54:691` Frame | 20 / 96 | 350 × 1069 | 0 |
| M | `176:54` Dashboard / Vista previa | 0 / 412 | 350 × 657 | 24 |
| M | `176:90` Header | 20 / 18 | 206 × 43 | 0 |
| M | `176:105` Card / Cifras | 1 / 305 | 348 × 351 | 0 |

## 10. Planes

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `52:329` | `54:702` |
| Tamaño (px) | 1440 × 1048 | 390 × 1589 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 96 / 20 / 96 / 20 |
| Gap (px) | 0 | 24 |
| Captura | [Desktop](ref/desktop-10-planes.png) | [Mobile](ref/mobile-10-planes.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| Lo que usas todos los días es gratis. | Schibsted Grotesk SemiBold / 56 / 700 | Schibsted Grotesk SemiBold / 32 / 350 |
| Ver el mapa, recibir alertas y reportar no cuesta nada. Premium llega más adelante, con funciones para quien sale todos los días. | Schibsted Grotesk Regular / 20 / 520 | — |
| Free | Schibsted Grotesk SemiBold / 28 / 59 | Schibsted Grotesk SemiBold / 22 / 47 |
| S/ 0 | Schibsted Grotesk SemiBold / 56 / 103 | Schibsted Grotesk SemiBold / 40 / 73 |
| Mapa de tu zona | Schibsted Grotesk Medium / 18 / 140 | Schibsted Grotesk Medium / 16 / 124 |
| Dónde hay reportes validados hoy. | Schibsted Grotesk Regular / 15 / 241 | Schibsted Grotesk Regular / 14 / 270 |
| Alertas cerca de ti | Schibsted Grotesk Medium / 18 / 155 | Schibsted Grotesk Medium / 16 / 138 |
| Solo lo que pasa en tu zona o en tu ruta. | Schibsted Grotesk Regular / 15 / 279 | Schibsted Grotesk Regular / 14 / 270 |
| Reportar y validar | Schibsted Grotesk Medium / 18 / 153 | Schibsted Grotesk Medium / 16 / 136 |
| Siempre sin tu nombre. | Schibsted Grotesk Regular / 15 / 161 | Schibsted Grotesk Regular / 14 / 270 |
| Rutas sugeridas | Schibsted Grotesk Medium / 18 / 136 | Schibsted Grotesk Medium / 16 / 121 |
| El camino con menos reportes. | Schibsted Grotesk Regular / 15 / 216 | Schibsted Grotesk Regular / 14 / 270 |
| 9:41 | Schibsted Grotesk Medium / 13 / 24 | Schibsted Grotesk Medium / 9.36 / 17 |
| ●●● ▮ | Schibsted Grotesk Medium / 13 / 51 | Schibsted Grotesk Medium / 9.36 / 37 |
| ¿A dónde vas? | Schibsted Grotesk Regular / 14 / 95 | Schibsted Grotesk Regular / 10.08 / 69 |
| Zona en observación | Schibsted Grotesk SemiBold / 11.05 / 111 | Schibsted Grotesk SemiBold / 7.96 / 80 |
| 5 reportes esta semana | Schibsted Grotesk Regular / 10.2 / 112 | Schibsted Grotesk Regular / 7.34 / 81 |
| Todo | Schibsted Grotesk Medium / 12 / 29 | Schibsted Grotesk Medium / 8.64 / 21 |
| Robos | Schibsted Grotesk Medium / 12 / 36 | Schibsted Grotesk Medium / 8.64 / 26 |
| Acoso | Schibsted Grotesk Medium / 12 / 36 | Schibsted Grotesk Medium / 8.64 / 26 |
| Sin luz | Schibsted Grotesk Medium / 12 / 38 | Schibsted Grotesk Medium / 8.64 / 27 |
| Tu zona ahora | Schibsted Grotesk Medium / 12 / 110 | Schibsted Grotesk Medium / 8.64 / 80 |
| Mayormente tranquila | Schibsted Grotesk SemiBold / 20 / 209 | Schibsted Grotesk SemiBold / 14.4 / 150 |
| 1 zona en observación a 600 m | Schibsted Grotesk Regular / 14 / 200 | Schibsted Grotesk Regular / 10.08 / 144 |
| Mapa | Schibsted Grotesk Medium / 11 / 29 | Schibsted Grotesk Medium / 7.92 / 21 |
| Alertas | Schibsted Grotesk Medium / 11 / 38 | Schibsted Grotesk Medium / 7.92 / 27 |
| Perfil | Schibsted Grotesk Medium / 11 / 28 | Schibsted Grotesk Medium / 7.92 / 20 |
| Vista previa · demo simulada | Schibsted Grotesk Medium / 13 / 175 | Schibsted Grotesk Medium / 13 / 175 |
| Descargar la app | Schibsted Grotesk Bold / 18 / 150 | Schibsted Grotesk Bold / 16 / 133 |
| → | Schibsted Grotesk SemiBold / 22 / 17 | Schibsted Grotesk Bold / 18 / 14 |
| Premium | Schibsted Grotesk SemiBold / 28 / 119 | Schibsted Grotesk SemiBold / 22 / 94 |
| Próximamente | Schibsted Grotesk SemiBold / 32 / 213 | Schibsted Grotesk SemiBold / 24 / 160 |
| Todo lo de Free | Schibsted Grotesk Medium / 18 / 131 | Schibsted Grotesk Medium / 16 / 116 |
| Mapa, alertas, reportes y rutas. | Schibsted Grotesk Regular / 15 / 217 | Schibsted Grotesk Regular / 14 / 270 |
| Mapas sin conexión | Schibsted Grotesk Medium / 18 / 168 | Schibsted Grotesk Medium / 16 / 149 |
| Tu zona, aunque te quedes sin señal. | Schibsted Grotesk Regular / 15 / 256 | Schibsted Grotesk Regular / 14 / 270 |
| Alertas por voz | Schibsted Grotesk Medium / 18 / 130 | Schibsted Grotesk Medium / 16 / 115 |
| Escucha el aviso sin mirar el celular. | Schibsted Grotesk Regular / 15 / 250 | Schibsted Grotesk Regular / 14 / 270 |
| Estadísticas de tu zona | Schibsted Grotesk Medium / 18 / 193 | Schibsted Grotesk Medium / 16 / 172 |
| Cómo cambia tu barrio con el tiempo. | Schibsted Grotesk Regular / 15 / 261 | Schibsted Grotesk Regular / 14 / 270 |
| Reportes prioritarios | Schibsted Grotesk Medium / 18 / 176 | Schibsted Grotesk Medium / 16 / 156 |
| Tus reportes se revisan primero. | Schibsted Grotesk Regular / 15 / 225 | Schibsted Grotesk Regular / 14 / 270 |
| Llega en una próxima versión | Schibsted Grotesk Bold / 18 / 256 | Schibsted Grotesk Bold / 16 / 228 |
| Ver el mapa, recibir alertas y reportar no cuesta nada. Premium llega más adelante. | — | Schibsted Grotesk Regular / 16 / 350 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `52:329` Section / Planes | 0 / 7370 | 1440 × 1048 | 0 |
| D | `52:332` Plan / Free | 64 / 336 | 800 × 572 | 24 |
| D | `155:82` Phone / Plan Free (Mapa) | 440 / 44 | 320 × 660 | 52 |
| D | `155:149` Badge / Demo | 32 / 454 | 201 × 30 | 999 |
| D | `52:352` Plan / Premium | 872 / 336 | 504 × 572 | 24 |
| M | `54:702` Section / Planes | 0 / 8264 | 390 × 1589 | 0 |
| M | `54:705` Frame | 20 / 262 | 350 × 725 | 20 |
| M | `174:173` Badge / Demo | 24 / 343 | 201 × 30 | 999 |
| M | `174:175` Phone window | 0 / 417 | 350 × 250 | 0 |
| M | `174:176` Phone / Plan Free (Mapa) | 60 / 20 | 230.4 × 475.2 | 37.44 |
| M | `54:724` Frame | 20 / 1011 | 350 × 482 | 20 |

## 11. Equipo

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `52:375` | `54:746` |
| Tamaño (px) | 1440 × 932 | 390 × 1242.27 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 96 / 20 / 64 / 20 |
| Gap (px) | 0 | 24 |
| Captura | [Desktop](ref/desktop-11-equipo.png) | [Mobile](ref/mobile-11-equipo.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| Cinco estudiantes que caminan las mismas calles que tú. | Schibsted Grotesk SemiBold / 56 / 1000 | Schibsted Grotesk SemiBold / 32 / 350 |
| Somos Vigilantix, un equipo de Ingeniería de Software de la UPC, en Lima. Hicimos SafeMap pensando en nuestros propios trayectos de todos los días. | Schibsted Grotesk Regular / 20 / 560 | — |
| Mariana Morocho | Schibsted Grotesk SemiBold / 22 / 184 | Schibsted Grotesk Bold / 16 / 140 |
| Calidad y riesgos | Schibsted Grotesk Regular / 16 / 127 | Schibsted Grotesk Regular / 14 / 168 |
| Fabrizio Santi | Schibsted Grotesk SemiBold / 22 / 141 | Schibsted Grotesk Bold / 16 / 107 |
| Coordinación y documentación | Schibsted Grotesk Regular / 16 / 232 | Schibsted Grotesk Regular / 14 / 168 |
| Mauricio Terán | Schibsted Grotesk SemiBold / 22 / 156 | Schibsted Grotesk Bold / 16 / 119 |
| Análisis y modelado | Schibsted Grotesk Regular / 16 / 149 | Schibsted Grotesk Regular / 14 / 168 |
| Jahat Trinidad | Schibsted Grotesk SemiBold / 22 / 149 | Schibsted Grotesk Bold / 16 / 113 |
| Producto y experiencia | Schibsted Grotesk Regular / 16 / 172 | Schibsted Grotesk Regular / 14 / 168 |
| Piero Espada | Schibsted Grotesk SemiBold / 22 / 136 | Schibsted Grotesk Bold / 16 / 103 |
| Arquitectura y pruebas | Schibsted Grotesk Regular / 16 / 171 | Schibsted Grotesk Regular / 14 / 168 |
| Somos Vigilantix, un equipo de Ingeniería de Software de la UPC, en Lima. Hicimos SafeMap pensando en nuestros propios trayectos. | — | Schibsted Grotesk Regular / 16 / 350 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `52:375` Section / Equipo | 0 / 8418 | 1440 × 932 | 0 |
| D | `56:377` Portrait / Mariana Morocho | 329.5 / 422 | 250 × 300 | 0 |
| D | `56:384` Portrait / Fabrizio Santi | 595 / 422 | 250 × 300 | 0 |
| D | `56:391` Portrait / Mauricio Terán | 860.5 / 422 | 250 × 300 | 0 |
| D | `56:398` Portrait / Jahat Trinidad | 1126 / 422 | 250 × 300 | 0 |
| D | `60:379` Portrait / Piero Espada | 64 / 422 | 250 × 300 | 0 |
| M | `54:746` Section / Equipo | 0 / 9853 | 390 × 1242.27 | 0 |
| M | `54:749` Frame | 20 / 321 | 350 × 857.27 | 0 |

## 12. Metas

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `154:65` | `174:91` |
| Tamaño (px) | 1440 × 691 | 390 × 788 |
| Padding T/R/B/L (px) | 0 / 64 / 140 / 64 | 0 / 20 / 96 / 20 |
| Gap (px) | 0 | 0 |
| Captura | [Desktop](ref/desktop-12-metas.png) | [Mobile](ref/mobile-12-metas.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| Todavía somos un proyecto. | Schibsted Grotesk SemiBold / 56 / 760 | Schibsted Grotesk SemiBold / 30 / 350 |
| SafeMap nació en un curso de Ingeniería de Software de la UPC. Aún no tenemos usuarios ni convenios que mostrarte, y no vamos a inventarlos. Esto es lo que nos proponemos para el primer año. | Schibsted Grotesk Regular / 20 / 520 | Schibsted Grotesk Regular / 16 / 350 |
| Meta | Schibsted Grotesk Medium / 12 / 36 | Schibsted Grotesk Medium / 12 / 36 |
| < 5 min | Schibsted Grotesk SemiBold / 72 / 241 | Schibsted Grotesk SemiBold / 44 / 153 |
| entre que un reporte queda validado y te llega la alerta. | Schibsted Grotesk Regular / 16 / 270 | Schibsted Grotesk Regular / 14 / 167 |
| 40 % | Schibsted Grotesk SemiBold / 72 / 166 | Schibsted Grotesk SemiBold / 44 / 104 |
| de quienes usan la app cada mes, con al menos un reporte validado. | Schibsted Grotesk Regular / 16 / 270 | Schibsted Grotesk Regular / 14 / 167 |
| 3 | Schibsted Grotesk SemiBold / 72 / 43 | Schibsted Grotesk SemiBold / 44 / 27 |
| convenios con municipalidades. | Schibsted Grotesk Regular / 16 / 270 | Schibsted Grotesk Regular / 14 / 167 |
| 0 | Schibsted Grotesk SemiBold / 72 / 45 | Schibsted Grotesk SemiBold / 44 / 28 |
| brechas de seguridad en tus datos. | Schibsted Grotesk Regular / 16 / 270 | Schibsted Grotesk Regular / 14 / 167 |
| Metas del informe del proyecto (UPC, 2025). No son resultados: los publicaremos cuando existan. | Schibsted Grotesk Regular / 14 / 631 | Schibsted Grotesk Regular / 13 / 350 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `154:65` Section / Metas | 0 / 9350 | 1440 × 691 | 0 |
| D | `154:66` Content | 64 / 0 | 1312 × 551 | 0 |
| D | `154:67` Heading | 0 / 97 | 1312 × 120 | 0 |
| M | `174:91` Section / Metas | 0 / 11095.27 | 390 × 788 | 0 |
| M | `174:92` Content | 20 / 0 | 350 × 692 | 0 |
| M | `174:93` Heading | 0 / 65 | 350 × 202 | 0 |

## 13. Preguntas

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `53:329` | `54:784` |
| Tamaño (px) | 1440 × 877 | 390 × 973 |
| Padding T/R/B/L (px) | 140 / 64 / 140 / 64 | 96 / 20 / 96 / 20 |
| Gap (px) | 8 | 32 |
| Captura | [Desktop](ref/desktop-13-preguntas.png) | [Mobile](ref/mobile-13-preguntas.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| Lo que quizá te estás preguntando. | Schibsted Grotesk SemiBold / 48 / 408 | Schibsted Grotesk SemiBold / 32 / 350 |
| ¿Te queda otra duda? Escríbenos y te respondemos. | Schibsted Grotesk Regular / 18 / 392 | — |
| En una emergencia, llama al 105 (Policía Nacional del Perú). SafeMap no reemplaza a los servicios de emergencia. | Schibsted Grotesk Bold / 17 / 334 | Schibsted Grotesk Bold / 15 / 308 |
| 01 | Geist Mono Regular / 14 / 28 | Geist Mono Regular / 13 / 16 |
| ¿Qué muestra la vista previa de SafeMap? | Schibsted Grotesk SemiBold / 24 / 788 | Schibsted Grotesk SemiBold / 18 / 294 |
| Una simulación de cómo funcionará la app. Los reportes, el mapa y las rutas que ves en esta página son de ejemplo. | Schibsted Grotesk Regular / 18 / 640 | Schibsted Grotesk Regular / 16 / 294 |
| 02 | Geist Mono Regular / 14 / 28 | Geist Mono Regular / 13 / 16 |
| ¿SafeMap ya tiene datos en vivo o convenios con autoridades? | Schibsted Grotesk SemiBold / 24 / 788 | Schibsted Grotesk SemiBold / 18 / 294 |
| 03 | Geist Mono Regular / 14 / 28 | Geist Mono Regular / 13 / 16 |
| ¿Cómo protegen mi privacidad? | Schibsted Grotesk SemiBold / 24 / 788 | Schibsted Grotesk SemiBold / 18 / 294 |
| 04 | Geist Mono Regular / 14 / 28 | Geist Mono Regular / 13 / 16 |
| ¿La ruta sugerida es 100 % segura? | Schibsted Grotesk SemiBold / 24 / 788 | Schibsted Grotesk SemiBold / 18 / 294 |
| 05 | Geist Mono Regular / 14 / 28 | Geist Mono Regular / 13 / 16 |
| ¿Qué hago ante una emergencia real? | Schibsted Grotesk SemiBold / 24 / 788 | Schibsted Grotesk SemiBold / 18 / 294 |
| 06 | Geist Mono Regular / 14 / 28 | Geist Mono Regular / 13 / 16 |
| ¿Cómo puedo participar? | Schibsted Grotesk SemiBold / 24 / 788 | Schibsted Grotesk SemiBold / 18 / 294 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `53:329` Section / Preguntas | 0 / 10041 | 1440 × 877 | 0 |
| D | `53:330` Frame | 64 / 140 | 432 × 383 | 0 |
| D | `53:333` FAQ list | 504 / 140 | 872 × 597 | 0 |
| M | `54:784` Section / Preguntas | 0 / 11883.27 | 390 × 973 | 0 |
| M | `91:185` Accordion | 20 / 198 | 350 × 559 | 0 |
| M | `54:890` Frame | 20 / 789 | 350 × 88 | 16 |

## 14. Descarga

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `52:394` | `54:766` |
| Tamaño (px) | 1440 × 780 | 390 × 840 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 96 / 20 / 96 / 20 |
| Gap (px) | 0 | 20 |
| Captura | [Desktop](ref/desktop-14-descarga.png) | [Mobile](ref/mobile-14-descarga.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| Alguien espera<br>que llegues bien. | Schibsted Grotesk SemiBold / 96 / 729 | Schibsted Grotesk SemiBold / 40 / 323 |
| Descarga SafeMap gratis y vuelve a casa sabiendo qué pasa en tu camino. | Schibsted Grotesk Regular / 22 / 520 | Schibsted Grotesk Regular / 17 / 350 |
| DISPONIBLE EN | Schibsted Grotesk Medium / 10 / 84 | Schibsted Grotesk Medium / 10 / 84 |
| Google Play | Schibsted Grotesk Medium / 20 / 113 | Schibsted Grotesk Medium / 20 / 113 |
| Gratis · Reportes anónimos · Android | Schibsted Grotesk Medium / 15 / 259 | Schibsted Grotesk Medium / 14 / 241 |
| PLACEHOLDER — no publicar: el enlace se activa cuando la app esté en Google Play. En producción va el badge oficial. | Schibsted Grotesk Medium / 12 / 729 | Schibsted Grotesk Medium / 12 / 350 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `52:394` Section / Descarga | 0 / 10918 | 1440 × 780 | 0 |
| D | `167:74` Photo backdrop | 480 / 0 | 960 × 780 | 0 |
| D | `167:78` Copy | 64 / 176 | 729 × 428 | 0 |
| D | `60:369` Badge / Google Play | 0 / 12 | 193 × 60 | 12 |
| M | `54:766` Section / Descarga | 0 / 12856.27 | 390 × 840 | 0 |
| M | `176:154` Photo backdrop | 0 / 0 | 390 × 620 | 0 |
| M | `176:157` Copy | 20 / 440 | 350 × 328 | 0 |
| M | `176:161` Badge / Google Play | 0 / 8 | 193 × 60 | 12 |

## 15. Footer

| Referencia | Desktop | Mobile |
|---|---|---|
| Nodo | `53:372` | `54:825` |
| Tamaño (px) | 1440 × 676 | 390 × 504 |
| Padding T/R/B/L (px) | 0 / 0 / 0 / 0 | 56 / 20 / 40 / 20 |
| Gap (px) | 0 | 32 |
| Captura | [Desktop](ref/desktop-15-footer.png) | [Mobile](ref/mobile-15-footer.png) |

### Copy literal y tipografía

| Texto literal | Desktop: fuente / px / ancho | Mobile: fuente / px / ancho |
|---|---|---|
| SafeMap | Schibsted Grotesk SemiBold / 250 / 986 | Schibsted Grotesk SemiBold / 64 / 260 |
| Producto | Schibsted Grotesk Bold / 15 / 68 | Schibsted Grotesk Medium / 14 / 61 |
| Cómo funciona | Schibsted Grotesk Regular / 17 / 120 | Schibsted Grotesk Regular / 16 / 167 |
| Privacidad | Schibsted Grotesk Regular / 17 / 83 | Schibsted Grotesk Regular / 16 / 167 |
| Planes | Schibsted Grotesk Regular / 17 / 53 | Schibsted Grotesk Regular / 16 / 167 |
| Comunidad | Schibsted Grotesk Bold / 15 / 85 | Schibsted Grotesk Medium / 14 / 76 |
| Equipo | Schibsted Grotesk Regular / 17 / 55 | Schibsted Grotesk Regular / 16 / 167 |
| Preguntas | Schibsted Grotesk Regular / 17 / 80 | Schibsted Grotesk Regular / 16 / 167 |
| Para instituciones | Schibsted Grotesk Regular / 17 / 140 | — |
| Legal | Schibsted Grotesk Bold / 15 / 40 | Schibsted Grotesk Medium / 14 / 35 |
| Privacidad de datos | Schibsted Grotesk Regular / 17 / 155 | Schibsted Grotesk Regular / 16 / 167 |
| Términos de uso | Schibsted Grotesk Regular / 17 / 131 | — |
| Contacto | Schibsted Grotesk Bold / 15 / 67 | Schibsted Grotesk Medium / 14 / 60 |
| X · @trinity-bytes | Schibsted Grotesk Regular / 17 / 136 | Schibsted Grotesk Regular / 16 / 167 |
| Lima, Perú | Schibsted Grotesk Regular / 17 / 83 | Schibsted Grotesk Regular / 16 / 167 |
| © 2026 SafeMap · Vigilantix · Proyecto académico de Ingeniería de Software, UPC | Schibsted Grotesk Regular / 15 / 567 | Schibsted Grotesk Regular / 14 / 350 |
| Instituciones | — | Schibsted Grotesk Regular / 16 / 167 |
| Términos | — | Schibsted Grotesk Regular / 16 / 167 |

### Geometría clave

Coordenadas relativas al contenedor indicado; medidas completas, radios y separación en los JSON.

| Vista | Nodo / contenedor | x / y | ancho × alto | radio |
|---|---|---|---|---|
| D | `53:372` Section / Footer | 0 / 11698 | 1440 × 676 | 0 |
| D | `53:374` Mark (large) | 64 / 69.62 | 178.12 × 213.75 | 0 |
| D | `53:379` Frame | 64 / 361 | 120 × 126 | 0 |
| D | `53:384` Frame | 394 / 361 | 140 × 126 | 0 |
| D | `53:389` Frame | 724 / 361 | 155 × 90 | 0 |
| D | `53:393` Frame | 1054 / 361 | 136 × 90 | 0 |
| D | `53:397` Frame | 64 / 570 | 1312 × 23 | 0 |
| M | `54:825` Section / Footer | 0 / 13696.27 | 390 × 504 | 0 |
| M | `54:826` Frame | 20 / 56 | 350 × 84 | 0 |
| M | `54:833` Frame | 20 / 172 | 350 × 218 | 0 |

## Menú mobile abierto

Nodo `183:59`, 390 × 844 px. Captura: [mobile-menu-open.png](ref/mobile-menu-open.png).

| Texto literal | Fuente / tamaño |
|---|---|
| SafeMap | Schibsted Grotesk / 24 |
| Cerrar | Schibsted Grotesk / 16 |
| Cómo funciona | Schibsted Grotesk / 28 |
| Privacidad | Schibsted Grotesk / 28 |
| Para instituciones | Schibsted Grotesk / 28 |
| Planes | Schibsted Grotesk / 28 |
| Equipo | Schibsted Grotesk / 28 |
| Preguntas | Schibsted Grotesk / 28 |
| Descargar la app | Schibsted Grotesk / 16 |
| Gratis · Reportes anónimos · Android | Schibsted Grotesk / 14 |

## Movimiento y comportamiento aprobado

Extractos literales del Log de `odd/tasks/landing-redesign.md`. Las capturas muestran estados estáticos, no definen timings distintos.

### L22

- **L22** (2026-11-12, el usuario): "vava. me gusta lo qu esugieres". **Decisión de implementación:** (1) el hero lleva un campo de glifos en canvas 2D propio (curvas de nivel en bandas, animación lenta, pausado con `prefers-reduced-motion` o fuera de pantalla), sin video; (2) una narrativa con scroll en una sección fija con teléfono 2.5D, donde el texto cambia por pasos y el teléfono pasa de pantalla en pantalla. "Cómo funciona" y "La app" se fusionan en esa narrativa. Un 3D real (GLB) queda como mejora opcional. Se hacen T6 y T7 (pantallas) y el tablero `Hero + Narrativa v2`.

### L43

  - **Teléfono separado del fondo:** borde en `accent/glow` al 45 % y resplandor trasero (`accent/glow` al 16 %, desenfoque 72) en lugar de la sombra oscura, que no se veía sobre fondo oscuro. Aplica a desktop y mobile.
  - **Halo de glifos (solo desktop):** tres bandas concéntricas alrededor del teléfono, en Geist Mono 10/11 como el hero: `Halo / r1` (○, `accent/glow`, 80 %, a 8–20 px del teléfono), `Halo / r2` (∘, 50 %, a 30–42 px) y `Halo / r3` (·, `accent/trust`, 50 %, a 52–64 px). Van debajo del escudo y del teléfono. Para que el halo no toque el texto, teléfono y escudo se corren 16 px (teléfono x 536, escudo desde x 896, sangra 94 px).
  - **Nota de movimiento para T8:** el halo se anima como ondas que salen del teléfono (las bandas r1 → r2 → r3 suben y bajan de opacidad en secuencia, en un ciclo lento de 3 a 4 s). Con `prefers-reduced-motion` queda estático. En Figma está estático.

### L48

- **L48** (2026-11-13, el usuario): "vamos a continuar con el diseño, te decia que no me terminan de convencer los bordes inferiores y superiores". Diagnóstico: la Narrativa es una sección fija al scroll (L22), así que en la página real las cuatro fotos nunca se apilan: se funden una sobre otra en el mismo lugar. El fundido al 100 % arriba y abajo de cada paso era un artefacto del mockup apilado; convertía cada foto en una franja con bandas oscuras y tapaba el cielo y el reflejo de la calle. **Se quita el fundido superior e inferior entre pasos** (se eliminan `129:41` y `129:45`; la foto ocupa todo el alto en los pasos 2 y 3). Quedan solo los dos bordes reales de la sección fija: `Fade / top (entry)` en el paso 1 (`129:37`) y `Fade / bottom (exit)` en el paso 4 (`129:49`), más largos y suaves (26 % del alto, con paradas 100 % → 62 % → 25 % → 0 %). En el mockup las fotos de pasos contiguos se tocan con corte seco: es un corte de storyboard, no un borde de la página. Para T8: las fotos hacen fundido cruzado en el lugar; el degradado vertical solo existe a la entrada y a la salida de la sección fija. **Pendiente de la aprobación del usuario.**

### L49

- **L49** (2026-11-13, el usuario): "yo creo que lo que podría hacer que esa sección funcione es que [...] tanto los textos como los mockups y las imágenes transicionen [...] el fondo entonces en todas esas acciones es lo mismo o muy parecido entonces no tiene sentido que el usuario este se deslice y vea casi lo mismo" y, sobre qué dispara el cambio, "prefiero lo del sceoll,bro". **Se confirma la sección fija de L22 y se define su coreografía; el cambio lo dispara el scroll** (se descartó el avance automático con temporizador: quien lee lento pierde el paso). Como el fondo es casi igual en los cuatro pasos, el cambio se tiene que notar en los elementos y no en el fondo. Para T8 (propuesta de valores, a ajustar en el navegador):
  - **Estructura:** una sola sección fija de alto de pantalla; el recorrido de scroll se divide en 4 tramos. Las 4 secciones de Figma son el storyboard de los estados, no secciones apiladas.
  - **Disparo:** cada tramo de scroll activa su paso, hacia adelante y hacia atrás. La transición corre con su propia duración (no va atada píxel a píxel al scroll), para que siempre termine.
  - **Foto:** fundido cruzado lento (~600 ms). Es ambiente, no protagonista.
  - **Teléfono:** el marco queda quieto; la pantalla cambia adentro con su propia animación (~350 ms). Es el protagonista del cambio.
  - **Texto:** el titular y el párrafo salen (~150 ms) y entran (~300 ms) con fundido y un desplazamiento corto (~12 px).
  - **Progreso:** la barra de 4 pasos avanza con cada cambio.
  - **`prefers-reduced-motion`:** sin desplazamientos; solo fundidos cortos o cambio directo.

### L53

  - **Stepper 01–04 en la Narrativa:** la barra de 4 rayitas (`Progress`) se reemplaza en los cuatro pasos por `Stepper` (`155:42`, `155:52`, `155:62`, `155:72`): el paso actual es una píldora en `accent/trust` con número y nombre ("01 Reporta", "02 Validan", "03 Alerta", "04 Llegas") y los demás son círculos de 44 px con el número. Para T8: son botones; tocar uno lleva a ese paso de la sección fija, además del scroll (L49), y deben funcionar con teclado.
  - **Menú en píldora con sección activa:** los enlaces del header pasan a `Nav / pill` (`50:332`): contenedor con `bg/surface` al 72 %, borde `line/subtle` y desenfoque de fondo; enlaces en `text/secondary`. El header del hero conserva sus 98 px de alto. En el paso 1 de la Narrativa se agrega `Header / sticky (scrolled, Cómo funciona activo)` (`155:155`, 83 px, `bg/night` al 82 % con desenfoque y línea inferior) para mostrar el estado fijo al hacer scroll: el enlace activo lleva relleno `bg/raised`, un punto `accent/trust` y texto en `text/primary`. Para T8: el header queda fijo y el enlace activo sigue a la sección visible.

### L54

  - Para T8: los chips flotan con una deriva lenta y leve (pocos píxeles, cada uno a su ritmo) y se desplazan un poco con el scroll; con `prefers-reduced-motion` quedan quietos.

### L58

  - **Manifiesto (nuevo, `174:47`, 390×620):** titular en 34 px centrado y bajada en 16 px; los seis chips de desktop reescalados (45 a 80 px) van **arriba y abajo del texto**, tres y tres, nunca a los lados ni dentro del texto (regla de L54).
  - **Narrativa (los 4 pasos):** se eliminan `Stage / pin-shield` y la barra `Progress`. Cada paso lleva `Copy` (titular solo en el paso 1, `Stepper` 01–04 clonado de desktop y texto del paso), el teléfono centrado (230×475) y un `Photo backdrop` a sangre de toda la sección: la foto del paso con un degradado vertical del color de la sección (100 % arriba, bajo el texto, hasta 38 % abajo). El paso 4 suma el fundido de salida abajo. Sin halo de glifos en mobile (no hay margen a los lados del teléfono). Cierra el pendiente de L45/L46: el pin-escudo ya no es ventana de foto en ninguna versión.

### L63

  - **Menú abierto del header mobile:** nuevo tablero `Landing v3 / Mobile · Menú abierto` (`183:59`, 390×844, a la derecha del mobile). Pantalla completa sobre `bg/night`: header con "Cerrar" en lugar de "Menú"; seis enlaces en 28 px separados por una línea (Cómo funciona, Privacidad, Para instituciones, Planes, Equipo, Preguntas), el activo en `text/primary` con punto `accent/trust` y los demás en `text/secondary`; abajo, el botón "Descargar la app" a todo el ancho y la línea "Gratis · Reportes anónimos · Android". Para T8: es un diálogo modal (foco atrapado, se cierra con Escape y al elegir un enlace); con `prefers-reduced-motion` aparece sin animación.

## Verificación de exportación

- 31 capturas: 15 desktop + 15 mobile + menú abierto, PNG no vacíos.
- 31 respuestas individuales `get_design_context`, todas de alta fidelidad (ninguna respuesta sparse). Se omitieron únicamente párrafos de glifos decorativos en los archivos de referencia para evitar megabytes de texto repetido; los glifos siguen visibles en las capturas.
- Copy y geometría extraídos mediante lectura de nodos sin cambiar el diseño.
- 125 SVG no vacíos: 120 recursos referenciados por sección y 5 exportaciones de marca/ícono con nombre estable.
- Originales PNG existentes no modificados.
- Sin build ni pruebas de UI: T1 solo exporta la referencia; la implementación y las comparaciones de navegador corresponden a T3–T10.
