# SafeMap — Verificación de la implementación

Verificación local del 2026-11-14, en `/safe-map/`, sobre el artefacto estático de producción. No se publicó el sitio ni se ejecutó GitHub Actions. `main` permanece en `80adfa875fceaa6830921efd7e4d32adaaacec6e`; las tareas se integran en `develop`.

## Resultados observados

| Check | Resultado |
|---|---|
| `npm ci` | Aprobado desde el lockfile |
| `npm run lint` | Aprobado |
| `npm run type-check` | 0 errores, 0 warnings, 0 hints |
| `node --test --test-concurrency=1 tests/build-wrapper.test.mjs` | 1 test aprobado; forwarding de flags RED → GREEN |
| `npm run build` | Aprobado, una ruta, 58 variantes de imagen |
| `node tests/metadata.mjs` | Canonical, OG, idioma, manifest, iconos y un único h1 aprobados |
| `node tests/navigation.mjs` | Apertura modal, Escape, retorno del foco y cierre por enlace aprobados |
| `node tests/glyph-field.mjs` | DPR, semántica decorativa, pausa, reduced motion, no-JS y rasterizado diferido aprobados |
| `node tests/narrative.mjs` | 01→04→01, marco fijo, reduced motion, viewport bajo y no-JS aprobados |
| `node tests/trust-content.mjs` | Promesas, cifras de ejemplo, planes, imágenes y overflow a 1440/390 aprobados |
| `node tests/closing-content.mjs` | Equipo, metas, FAQ nativa y descarga inactiva a 1440/390, sin JS aprobados |
| `node tests/integration.mjs` | Todas las anclas/imágenes, sin errores de página/red, sin overflow, Tab/Shift+Tab y Escape aprobados |
| Búsquedas de `PLACEHOLDER`, React y Leaflet en código/config | Sin coincidencias |
| Consistencia package.json/package-lock y `git diff --check` | Aprobada |

Los navegadores se ejecutaron de a uno, sin builds/checkers simultáneos. El wrapper limita Node a 768 MiB, libuv a 1 hilo y libvips a 1. El build frío tardó unos 51 s; durante la medición, la memoria disponible del host no bajó de 1779 MiB. El build con caché tardó unos 3 s. El entorno local usa Node 26; Node 22 quedó configurado en CI y sus engines fueron revisados, pero el workflow remoto no se ejecutó.

## Lighthouse mobile

[Lighthouse 13.6.0, JSON completo](lighthouse-mobile.json), contra el preview local estático con throttling mobile simulado:

| Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|
| 90 | 100 | 100 | 100 |

FCP 1,0 s; LCP 3,3 s; TBT 150 ms. La primera medición dio 78/100/100/100 y TBT 570 ms: se detectó rasterizado de texturas fuera de pantalla al iniciar. Se reprodujo el fallo (12 pinturas anticipadas), se difirió al primer cruce visible real de IntersectionObserver y se protegió con regresión. Las cifras son baseline local, no garantías de mediciones de campo.

## Comparación visual

Se compararon las secciones a 1440 y 390 con las capturas originales de `../landing-spec/ref/`. [Capturas completas y menú](actual/), más los cuatro estados desktop de narrativa, conservan evidencia de producción. Se aceptan diferencias de rasterización de fuentes y de las pantallas PNG; no se usan capturas de Figma como fondos de la página.

Correcciones observadas: avance fijo de 6 px para los glifos Unicode ausentes en Geist Mono; halo sin ensanchar texto por fallback; textura del footer; calidad de pantallas; envoltura de titulares según Figma. El SVG `Mark (small)` incluía ancestros del panel de notificación: se conservaron sus trazados exactos y su clip, eliminando únicamente la contaminación de exportación. El favicon y el icono iOS se regeneraron desde ese recurso.

Diferencias intencionales y explícitas:

- En pantallas bajas, la narrativa queda apilada para no recortar copy ni teléfono. Sin JavaScript siempre están los cuatro pasos completos.
- FAQ: solo se publica la respuesta 01 aprobada. Las preguntas 02–06 siguen en `faq.json` con `answer:null`, sin controles vacíos.
- Se omiten legales/perfiles sin destinos. `Conversemos` no tiene enlace ficticio y Google Play permanece inactivo.
- El footer añade el crédito del curso solicitado por el plan; no publica enlaces legales inexistentes.
- El menú conserva el modal nativo: Tab puede llegar a la interfaz del navegador, pero nunca a controles de la página que quedó inerte. No se agrega un foco atrapado manual redundante.

## Pendientes antes de publicar

1. Aprobar las cinco respuestas FAQ restantes y los destinos reales de Google Play/contacto/legales/equipo que correspondan.
2. Revisar las vulnerabilidades heredadas: `npm audit` reportó 28 (2 bajas, 4 moderadas, 21 altas, 1 crítica). La [crítica de Astro/Sharp](https://github.com/advisories/GHSA-26w7-cxv4-gfx2) afecta procesar AVIF no confiables; el fix publicado exige una versión mayor de Astro distinta de la 5 aprobada en este plan. Esta landing solo procesa originales locales conocidos y Pages sirve archivos estáticos, pero eso no equivale a remediar las dependencias. No se ejecutó `audit fix --force` ni una migración de stack fuera de alcance.
3. Verificar la social card en una URL pública únicamente cuando se autorice la publicación. La prueba local valida HTML y archivos, no el crawler de una red social.

**Estado:** implementación técnica verificada; S1 queda parcial por copy de FAQ ausente en la fuente aprobada. No se declara el plan completo sin ese contenido. **Risk: item 5 (dependencias y CI; verificadores independientes sin bloqueadores de la implementación).**
