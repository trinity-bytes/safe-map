# SafeMap — Implementación de la landing v3 (T8 de `landing-redesign`)

Objetivo: implementar en este repo la landing aprobada en Figma (gate L62 de `odd/tasks/landing-redesign.md`) y quitar el prototipo web.
Rama de integración: `develop` · Entrega: ramas por tarea desde `develop`, merges directos, sin PR; `main` intocable · Tests: no hay runner de tests; cada tarea se cierra con `npm run build`, `npm run lint`, `npm run type-check` y una comparación visual contra las capturas de referencia (§3).

---

## 0. Cómo seguir este plan (cualquier agente: Claude Code, Codex u otro)

1. Leé este documento completo hasta `## Log`. Es la fuente de verdad para la implementación.
2. Del documento de diseño `odd/tasks/landing-redesign.md` solo hacen falta: §1.1 (producto), §2.2 (tokens), §3.1 (reglas de copy) y las entradas del Log que cada tarea cita (L22, L43, L49, etc.). **No leas las secciones de Figma §4 ni los wireframes de la página 03**: están desactualizados.
3. Tomá la primera tarea con estado `⏳ pendiente` de `## Tasks`, cuyas dependencias estén hechas. Hacé **una tarea por commit**.
4. Al cerrar una tarea: marcala `✅` con el hash del commit, agregá una entrada al `## Log` con lo verificado (comandos y resultado observado) y lo que quedó pendiente.
5. **Figma solo hace falta en T1.** Después de T1, todo el diseño necesario (copy final, medidas, SVG y capturas) vive en el repo, en `docs/landing-spec/`. Si un dato no está ahí, **no lo inventes**: anotalo como pendiente en el Log y seguí con lo demás.
6. Idioma: el copy de la landing es español neutro con tuteo (público peruano, ver §3.1 del documento de diseño). El código, los identificadores y los comentarios van en inglés.
7. Commits: Conventional Commits (`feat:`, `refactor:`, `chore:`, `docs:`). **Sin líneas de atribución a IA** (`Co-Authored-By` ni similares). No hagas push ni abras PR: eso lo decide el usuario.

---

## 1. Decisiones técnicas (ya tomadas, no se reabren)

| Tema | Decisión | Por qué |
|---|---|---|
| Imágenes | Las 15 PNG de `src/assets/landing/` se quedan como originales. Se renderizan con `<Picture>` / `<Image>` de `astro:assets` (`sharp`, que ya viene con Astro), con `formats={['avif', 'webp']}`, `widths` y `sizes`. No se instalan herramientas de conversión ni se tocan los originales | Decisión del usuario (L65 del documento de diseño) |
| React | **Se quita** (`@astrojs/react`, `react`, `react-dom`, `framer-motion`, `lucide-react`). Las interacciones son pocas y se hacen con `<script>` de Astro en TypeScript | El diseño no tiene ninguna isla que necesite estado de React; se ahorra el runtime de ~180 kB |
| Leaflet | Se quita (`leaflet`, `react-leaflet`, `@types/leaflet`) junto con el prototipo | S2 del documento de diseño: la demo pasa a ser la app Flutter |
| Íconos | SVG en línea en un componente `Icon.astro`. Los trazados se copian de Lucide (licencia ISC, 1.5 px de trazo) o se exportan de Figma en T1 | Sin dependencia nueva y sin JS |
| Tipografía | Schibsted Grotesk (titulares y cuerpo) y Geist Mono (glifos, números de la FAQ, stepper), autoalojadas con `@fontsource-variable/schibsted-grotesk` y `@fontsource/geist-mono` | Sin pedidos a Google Fonts (privacidad y rendimiento) |
| Tokens | Los 11 colores de §2.2 del documento de diseño como variables CSS (`--color-bg-night`, etc.) en `src/styles/global.css` y mapeados en `tailwind.config.mjs`. Se borra la paleta vieja (`brand`, `primary`, `secondary`, `danger`, `success`) | Una sola fuente de color |
| Animación | CSS y APIs nativas (`IntersectionObserver`, `requestAnimationFrame`, `<dialog>`). Todo respeta `prefers-reduced-motion` | Reglas de movimiento de §2.2 del diseño |
| Base path | Todo enlace interno y todo recurso de `public/` usa `import.meta.env.BASE_URL`. GitHub Pages sirve el sitio en `/safe-map/` | Ver `astro.config.mjs` |

---

## 2. Mapa de la página

Orden final (L38, L53, L56 y L62 del diseño). Cada fila es un componente en `src/components/sections/`.

| # | Componente | Ancla | Contenido clave | Movimiento | Log del diseño |
|---|---|---|---|---|---|
| 1 | `Header.astro` (en `layout/`) | — | Logo, menú en píldora con la sección activa, botón "Descargar la app". Mobile: botón "Menú" que abre un `<dialog>` a pantalla completa | Enlace activo según la sección visible | L53, L63 |
| 2 | `Hero.astro` | — | "Llega a tu destino con más tranquilidad." Campo de glifos en canvas detrás, escudo de glifos al centro | Glifos con animación lenta; pausados fuera de pantalla y con reduced motion | L13, L22, L24, L50, L60 |
| 3 | `Problem.astro` | — | Cifra del INEI (14,9 %), fuente citada | — | L29, L30, L55 |
| 4 | `Manifesto.astro` | — | Frase manifiesto con seis chips de íconos en los márgenes (nunca dentro del texto) | Deriva leve de los chips | L53, L54, L58 |
| 5 | `Narrative.astro` | `#como-funciona` | Sección fija de 4 pasos con stepper 01–04, foto de fondo, teléfono con la pantalla del paso | Ver T6 | L43, L49, L53, L58, L61 |
| 6 | `Privacy.astro` | `#privacidad` | "Tú cuentas lo que viste. / Nadie sabe que fuiste tú.", 5 promesas con íconos Lucide, badge "Vista previa · demo simulada" | — | L40, L56, L60, L61, L63 |
| 7 | `Institutions.astro` | `#instituciones` | Foto de la ciudad a sangre con fundido, panel de zona | — | L50, L51, L59 |
| 8 | `Plans.astro` | `#planes` | Free (S/ 0, con el teléfono del mapa) y Premium ("Llega en una próxima versión") | — | L31, L50, L53, L56, L60 |
| 9 | `Team.astro` | `#equipo` | 5 retratos con nombre y rol | — | L30, L32, L60 |
| 10 | `Goals.astro` | — | 4 metas mostradas como metas, nunca como logros | — | L53, L58 |
| 11 | `Faq.astro` | `#preguntas` | Filas con `<details>`, número en Geist Mono, la primera abierta, aviso del 105 con borde ámbar | — | L56, L58, L60 |
| 12 | `Download.astro` | `#descargar` | Cierre a sangre con la foto `narrativa-04-llegas` y el badge de Google Play (inactivo) | — | L28, L56, L58 |
| 13 | `Footer.astro` (en `layout/`) | — | Nombre en grande, marca, X `@trinity-bytes`, crédito UPC, legales | — | L28, L50 |

---

## 3. Referencia visual (se crea en T1)

```
docs/landing-spec/
├── README.md                  # copy final verbatim y medidas por sección (desktop 1440 y mobile 390)
└── ref/
    ├── desktop-<nn>-<section>.png   # captura de cada sección en Figma, desktop
    ├── mobile-<nn>-<section>.png    # captura de cada sección en Figma, mobile
    └── mobile-menu-open.png
src/assets/landing/svg/        # logo completo, Mark (small), íconos y mapas exportados de Figma
```

Comparación visual: abrí `npm run dev`, mirá cada sección a 1440 px y a 390 px de ancho y comparala con su captura. Se aceptan diferencias de antialiasing y de renderizado de fuente; no se aceptan cambios de copy, orden, color, jerarquía ni espaciado evidente.

---

## Specs

- **S1** — Implementar la landing aprobada: "cerramos el diseño y en la siguiente sesion por fin pasamos a la implementacion" (L62 del diseño). La fuente de verdad es Figma `Nqg2FTMTqhVNziGwIF8Oki`, página 04: nodos `50:314` (desktop), `54:329` (mobile) y `183:59` (menú mobile abierto). El copy se copia tal cual, sin reescribirlo.
- **S2** — Quitar el prototipo web, como en Minka `feat/landing-only`: "dividiremos la landing y la demo que sera una app flutter que sera un repo aparte" (L1 del diseño). Se borran `src/pages/demo.astro`, `src/components/interactive/*` y Leaflet.
- **S3** — Imágenes con el pipeline de Astro: "ah ok, entonces que astro se encargue." (L65 del diseño). Sin herramientas de conversión externas.
- **S4** — Un plan que pueda seguir otro agente: "dejame listo el plan de implementacion para que pueda ser facilmente seguido por codex tambien." (L1 de este documento).
- **S5** — Reglas de contenido (§3.1 del diseño): nada de métricas, testimonios, logos ni usuarios inventados; las metas se muestran como metas; toda pantalla de la app se rotula como vista previa; la IA no se vende como función actual. Los datos que faltan no se publican (ver §4).
- **S6** — Accesibilidad y rendimiento: contraste AA (ya validado en los tokens), navegación completa por teclado, foco visible, `prefers-reduced-motion`, landmarks y jerarquía de titulares correctos, y la página tiene que entenderse sin JavaScript.

## 4. Datos que faltan (no inventar)

| Dato | Qué se hace mientras tanto |
|---|---|
| Enlace de Google Play | El badge se muestra sin `href`, con `aria-disabled="true"` y el texto "Próximamente en Google Play". La nota `PLACEHOLDER` de Figma no se publica |
| Enlaces del equipo (LinkedIn, GitHub) | No se muestran enlaces; solo nombre y rol |
| Qué son los "reportes prioritarios" de Premium | Se usa el texto aprobado en Figma (L56) sin agregar detalle |
| Páginas legales (privacidad, términos) | Enlaces del footer sin destino real: se omiten hasta que existan |
| Imagen Open Graph | Se genera en T9 a partir del hero; si no se puede, se omite `og:image` |

## Tasks

Cada tarea es un commit. **Dependencias:** T1 antes de todo lo visual (T3 a T9); T2 y T3 antes de las secciones; T10 al final.

| ID | Specs | Tarea | Depende de | Necesita Figma | Ruta | Estado | Commit |
|---|---|---|---|---|---|---|---|
| T1 | S1, S4 | Exportar el diseño al repo (§3): copy verbatim y medidas por sección, capturas desktop/mobile/menú y SVG (logo, `Mark (small)`, íconos, mapas) | — | **Sí** | delegated | ✅ completada | 5ab24cb |
| T2 | S2 | Quitar el prototipo y lo que no se usa | — | No | delegated | ✅ con excepción lint preexistente (T3) | b216517 |
| T3 | S1, S6 | Fundaciones: tokens, fuentes, layout base y primitivas | T1, T2 | No | inline | ✅ completada | e3aa57f |
| T4 | S1, S6 | Header, menú mobile y Footer | T3 | No | inline | ✅ implementada; visual final T10 | commit feat: implement accessible landing navigation and footer | — |
| T5 | S1, S6 | Hero (campo de glifos), Problema y Manifiesto | T4 | No | delegated | ✅ funcional; visual T10 | 2539559 | — |
| T6 | S1, S3, S6 | Narrativa con scroll | T4 | No | delegated | ✅ funcional; visual T10 | commit T6 (ver historial) | — |
| T7 | S1, S3, S5 | Privacidad, Instituciones y Planes | T4 | No | delegated | 🔄 en curso | — |
| T8 | S1, S3, S5 | Equipo, Metas, Preguntas y Descarga | T4 | No | delegated | 🔄 en curso | — |
| T9 | S1, S6 | SEO, favicon nuevo, Node del CI y documentación | T5–T8 | No | inline | ⏳ pendiente | — |
| T10 | S1–S6 | Verificación final | T9 | No | inline | ⏳ pendiente | — |

### T1 — Exportar el diseño al repo

- Con el MCP de Figma: `create_session` con el fileKey `Nqg2FTMTqhVNziGwIF8Oki`, después `get_design_context` / `get_metadata` por sección y `get_screenshot` de cada `Section / …` de los nodos `50:314`, `54:329` y `183:59`.
- `docs/landing-spec/README.md`: una subsección por sección del §2, con (a) el copy final **copiado tal cual** (titulares, bajadas, botones, etiquetas, textos alternativos), (b) medidas clave en desktop y mobile (alto de sección, padding, ancho máximo, tamaños de fuente, radios), (c) los tokens que usa y (d) notas de movimiento copiadas del Log.
- Exportar como SVG a `src/assets/landing/svg/`: logo completo, `Mark (small)` (se usa por debajo de 20 px, L38), los íconos que no sean Lucide y los mapas que no sean PNG.
- **Cierre:** existe una captura por sección y por ancho, y cada texto visible en las capturas aparece en el README.

### T2 — Quitar el prototipo

- Borrar: `src/pages/demo.astro`, `src/components/interactive/`, `src/components/sections/*`, `src/components/cards/`, `src/components/ui/`, `src/data/features.json`, `src/styles/global-clean.css`, `src/styles/global-production.css`, `src/styles/leaflet-custom.css`, `public/avatars/`, `public/js/`.
- Mantener `src/data/faq.json` (T8 lo reescribe con el copy final), `Header.astro` y `Footer.astro` (T4 los reescribe).
- `npm uninstall @astrojs/react react react-dom framer-motion lucide-react leaflet react-leaflet @types/leaflet`. En `astro.config.mjs`: quitar `react()` y el bloque `manualChunks` (apunta a `react` y `leaflet` y rompería el build).
- `src/pages/index.astro` queda con `BaseLayout`, `Header`, un `<main>` vacío y `Footer`, para que el build pase.
- **Riesgo:** ítem 5 (dependencias). **Cierre:** `npm run build` y `npm run lint` pasan, y `grep -rn "leaflet\|react" src astro.config.mjs` no devuelve nada.

### T3 — Fundaciones

- `npm install @fontsource-variable/schibsted-grotesk @fontsource/geist-mono` y `npm install -D @astrojs/check` (hoy `npm run type-check` falla porque falta).
- `src/styles/global.css`: los 11 tokens de §2.2 del diseño como variables CSS, las escalas de espaciado (4/8) y de radios (sm 8, md 16, lg 24, xl 32, full), los estilos base (fondo `bg/night`, texto `text/primary`, `::selection`, `:focus-visible` con `accent/trust`) y una regla global `@media (prefers-reduced-motion: reduce)`.
- `tailwind.config.mjs`: reemplazar la paleta vieja por los tokens (que apunten a las variables CSS), las familias tipográficas y los radios.
- `BaseLayout.astro`: `lang="es"`, viewport, título, descripción, canonical, enlace "Saltar al contenido", importación de las fuentes y de `global.css`.
- Primitivas en `src/components/ui/`: `Container`, `Section` (props: `id`, `tone` = night | surface), `Button` (Primary | Secondary | Ghost; renderiza `<a>` o `<button>`), `Badge` (Neutral | Validated | Alert | Demo), `Icon` (SVG en línea, 1.5 px), `Logo` (usa `Mark (small)` por debajo de 20 px), `PhoneFrame` (marco CSS y pantalla con `<Image>` de `src/assets/landing/screens/`).
- **Cierre:** build, lint y type-check pasan, y una página temporal de prueba (que no se commitea) muestra las primitivas con los colores correctos.

### T4 — Header, menú mobile y Footer

- Header fijo. Desktop: menú en píldora (`bg/surface` al 72 %, borde `line/subtle`) con los enlaces del §2 y el activo resaltado. Un `IntersectionObserver` marca la sección visible con `aria-current="true"`.
- Mobile: botón "Menú" que abre un `<dialog>` modal a pantalla completa (L63): seis enlaces en 28 px separados por una línea, el activo con un punto `accent/trust`, el botón "Descargar la app" a todo el ancho y la línea "Gratis · Reportes anónimos · Android". El foco queda atrapado (lo hace `showModal()`), se cierra con Escape, con "Cerrar" y al elegir un enlace, y el foco vuelve al botón "Menú". Con reduced motion aparece sin animación.
- Sin JavaScript, los enlaces del menú tienen que seguir accesibles (por ejemplo, la lista visible en el footer).
- Footer según la captura: nombre en grande, marca, X `@trinity-bytes`, crédito académico (UPC, Ingeniería de Software, SI720 Diseño y Patrones de Software, sección 4122, Vigilantix, 2025).
- **Cierre:** recorrido completo con Tab y Shift+Tab a 1440 y a 390 px; el menú se abre y se cierra con el teclado.

### T5 — Hero, Problema y Manifiesto

- Hero: titular `<h1>` y bajada en HTML (se entienden sin JS). Detrás, un `<canvas aria-hidden="true">` con el campo de glifos (L22, L24, L43): curvas de nivel en bandas, Geist Mono, animación lenta, `Glyphs / coral` al 30 % (L50). Se pausa con un `IntersectionObserver` fuera de pantalla y con `document.hidden`; con reduced motion dibuja un solo cuadro estático. Respeta `devicePixelRatio` y se redimensiona con `ResizeObserver`.
- Problema: la cifra y la fuente INEI exactas del README de T1 (L30).
- Manifiesto: los chips se posicionan en los márgenes y derivan unos pocos píxeles con CSS (`@keyframes`, solo `transform`), desactivado con reduced motion. Mobile: los chips van arriba del texto (L58).
- **Cierre:** el canvas no bloquea el render (el titular se pinta primero), la CPU queda en reposo con la pestaña oculta y la comparación visual pasa.

### T6 — Narrativa con scroll

Especificación (L49, L53, L43):

- Una sección `position: sticky` de alto de pantalla dentro de un contenedor de unos 4 × 100 vh. El recorrido se divide en 4 tramos; cada tramo activa su paso hacia adelante y hacia atrás.
- La transición corre con su propia duración, no atada píxel a píxel al scroll: foto con fundido cruzado (~600 ms), pantalla del teléfono cambiando dentro de un marco que no se mueve (~350 ms), texto que sale (~150 ms) y entra (~300 ms) con fundido y un desplazamiento de ~12 px, y el stepper 01–04 avanza.
- El stepper es clicable: hace scroll al tramo del paso (`scrollIntoView` con `behavior` según reduced motion) y es operable con teclado.
- Halo del teléfono, solo desktop: tres bandas de glifos que suben y bajan de opacidad en secuencia (CSS).
- Fotos: `<Picture>` con `loading="lazy"` (no están en el primer pantallazo), saturación −20 % con `filter` y degradados con pseudo-elementos (L43).
- Copy de los pasos exactamente como en el README (el paso 4 dice "Y quien tú elijas ve que llegaste bien.", L61).
- Mobile según L58 y las capturas mobile.
- Reduced motion: sin desplazamientos, solo fundidos cortos o cambio directo.
- **Sin JavaScript:** los 4 pasos se ven apilados, uno debajo del otro, con su foto y su pantalla.
- **Cierre:** scroll hacia abajo y hacia arriba sin saltos ni pasos salteados, el stepper funciona con mouse y teclado, y la versión sin JS se lee completa.

### T7 — Privacidad, Instituciones y Planes

- Privacidad: titular en dos oraciones (la segunda en `accent/glow`), 5 promesas con íconos Lucide eye-off, users, lock, user-x y eye (20 px, `accent/glow`), y el badge "Vista previa · demo simulada".
- Instituciones: foto `instituciones-ciudad-noche` a sangre con fundido a `bg/surface` y el panel de zona. Los números del panel son los aprobados en Figma; si alguno era `[000]` o placeholder, va como está en el README y se anota en el Log.
- Planes: Free (780 de ancho, "S/ 0", con `PhoneFrame` del mapa recortado) y Premium (524, solo contorno, "Llega en una próxima versión", sin flecha ni botón activo). Cada función lleva título y una línea de descripción.
- **Cierre:** comparación visual a 1440 y 390 px y ningún claim fuera del copy aprobado.

### T8 — Equipo, Metas, Preguntas y Descarga

- Equipo: 5 retratos (`<Image>` con `widths` para 250 px y 500 px), nombre y rol según L32; sin códigos de alumno ni enlaces (§4).
- Metas: las 4 metas con el número grande y el texto que deja claro que son metas.
- Preguntas: reescribir `src/data/faq.json` con el copy final del README y renderizarlo con `<details>` / `<summary>` (la primera con `open`), número en Geist Mono 14 y una línea divisoria entre filas. El aviso del 105 va con fondo oscuro, borde ámbar y texto claro.
- Descarga: foto `narrativa-04-llegas` arriba con fundido, titular y el badge de Google Play inactivo (§4).
- **Cierre:** las preguntas se abren con Enter y Espacio, y la comparación visual pasa.

### T9 — SEO, favicon, CI y documentación

- `BaseLayout`: título y descripción finales del README, `og:title`, `og:description`, `og:image` (si se puede generar), `twitter:card`. Favicon y `apple-touch-icon` con la marca nueva (`Mark (small)`). Revisar `public/site.webmanifest` y `public/robots.txt`.
- `.github/workflows/deploy.yml`: `node-version: 18` → `22`. Astro 5 ya no garantiza soporte para Node 18, que está fuera de mantenimiento. **Riesgo:** ítem 5 (CI y deploy).
- Reescribir `README.md` y `DEPLOYMENT.md` con la estructura nueva (sin demo, sin React y sin Leaflet).
- **Cierre:** `npm run build` genera `dist/` sin advertencias de rutas, y el HTML tiene los metadatos.

### T10 — Verificación final

- `npm ci`, `npm run build`, `npm run lint` y `npm run type-check` pasan.
- `npm run preview` y revisar en `/safe-map/`: anclas, imágenes, fuentes y favicon cargan con el base path.
- Comparación visual de todas las secciones a 1440 y 390 px contra `docs/landing-spec/ref/`.
- Teclado: recorrido completo, foco visible, menú mobile y FAQ.
- Reduced motion (emulado en DevTools): sin desplazamientos ni loops.
- Sin JavaScript (desactivado en DevTools): el contenido completo se lee.
- Lighthouse mobile: anotar Performance, Accessibility, Best Practices y SEO en el Log como baseline. Accessibility ≥ 95.
- `grep -rn "PLACEHOLDER" src` no devuelve nada visible para el usuario.
- **Cierre:** las tareas marcadas, el Log con los resultados observados y una entrada en el Log de `odd/tasks/landing-redesign.md` que cierre su T8.

## Log

- **L1** (2026-11-14, el usuario, pedido verbatim): "ah ok, entonces que sstro se encsrgue. ahora dejame listo el plan de imomementacion osra qye oueda ser fscilmnete seguido por codex tambien." Antes, en la misma sesión, se verificó que en la máquina no hay herramientas de imágenes instaladas y que `sharp` ya está en `package-lock.json` como dependencia de Astro 5.8.1; el usuario eligió que Astro optimice en el build y que los originales no se toquen.
- **L2** (2026-11-14): hallazgos al planificar. No existe `node_modules` (correr `npm ci` antes de cualquier comando). `@astrojs/check` no está en el lockfile, así que `npm run type-check` falla hasta T3. El CI usa Node 18 (se sube en T9). `astro.config.mjs` tiene `manualChunks` con `react` y `leaflet`, que hay que quitar en T2. Se crea `AGENTS.md` en la raíz para que Codex encuentre este plan.
- **Próximo paso:** T1 (necesita el MCP de Figma) y T2, que no depende de Figma y se puede hacer en paralelo.

- **L3** (2026-11-14, usuario, verbatim): "crea la rama develop, y realizas las imomementacionesnsobre esa rama, osea creas ramas en base a esa y vas consolidando los camvios en esa rama. nada de prs, haz merges directos, te autorizo a ello. usa las herramientas y tomanlas decisiones que creas convenientes oero mantenme informado. te dejare trabajando por tu cuenta, evita bloquearte oor tonterias  ya te dije que te autorizo a hacer push pull y lo aue necesites. simolemente deja main sin tocar"
- **L4** (2026-11-14): `develop` creada desde `95aa4a5`, conservando el diseño y los originales; `main` permanece en `80adfa8`. T1 y T2 delegadas como unidades independientes con superficies disjuntas (exportación documental/recursos frente a eliminación del prototipo). Previsión: varios miles de líneas, una tarea por commit, merges a develop sin PR. RDD desactivado globalmente; se mantienen verificaciones funcionales.

- **L5** (2026-11-14): T1 exportada: 31 capturas a resolución nativa, 31 contextos completos y geometría, 125 SVG y README con todo el texto. Validación estructural aprobada. Faltan respuestas FAQ 02–06 y destino de contacto en Figma: no inventar. T2: build aprobado; lint preexistente falla por parser Astro ausente (se corrige en T3). Verificación independiente de dependencias: sin bloqueadores.
- **L6** (2026-11-14, usuario, verbatim): "anotacion: cuando llegues a la oarte de ejecutar test, vigila que ko use mucha rsm porque acs tienes como 3gb nomss y si se llena la mawuina va a crashear". Checks pesados seriales, Node heap limitado a 768–1024 MiB, procesamiento de imágenes de baja concurrencia.

- **L7** (2026-11-14): T2: npm ci, build y grep de dependencias observados; build repetido por parent con heap 768 MiB aprobado. Verificador independiente confirma S2 y originales intactos. Lint falla por configuración preexistente; T3 la repara. RDD off; assessment inicial no disponible por inventario sin stage, sin inferir bajo riesgo. Risk: item 5 (dependencias).

- **L8** (2026-11-14): T3: 11 tokens, fuentes locales, layout y primitivas implementados. Lint reparado con eslint-plugin-astro 1.x compatible con ESLint 9 (3.x rechazado por peer dependency; sin force). Build y lint aprobados; type-check 0 errores, 0 warnings, 0 hints. Wrapper de build limita heap768/UV_THREADPOOL_SIZE=1/VIPS_CONCURRENCY=1; verificador detectó pérdida de flags, regresión reproducida RED y corregida GREEN con test node:test. Primitivas se comparan visualmente al integrarlas en T4–T8, sin declarar prueba visual temporal inexistente. npm reporta 28 vulnerabilidades de dependencias (1 crítica), no se ejecuta audit fix fuera de alcance; se analiza en cierre. Risk: item 5 (dependencias/build).

- **L9** (2026-11-14): El sandbox bloquea subprocesos anidados con EPERM; el test del wrapper se ejecuta con autorización escalada local. RED real del flag descartado observado y GREEN con forwarding aprobado; recheck independiente cierra el único hallazgo. No se atribuye el EPERM a la aplicación.

- **L10** (2026-11-14): T4: header fijo, modal nativo mobile y footer sin destinos ficticios. Test navegador RED (Menú no existe en UI vieja) y GREEN (modal, Escape, retorno del foco y cierre por enlace) observados. Lint y type-check pasan. Prueba formal en tests/navigation.mjs; Playwright se añade como herramienta QA liviana, navegador preinstalado sin descargar. Comparación completa tras integrar secciones en T10. Risk: item 5 (dependencia dev QA), verificación independiente conjunta de tooling en T10.

- **L11** (2026-11-14): T5–T8 delegadas juntas: cuatro unidades independientes de comportamiento, cada una con secciones y pruebas propias, superficies disjuntas. Parent conserva index, estilos/primitivas compartidas y git. Sin builds, installs ni navegadores de workers por RAM; parent ejecuta checks seriales y comparación conjunta. Cada unidad se commitea desde su rama basada en develop y se mergea allí.

- **L12** (2026-11-14): T5: Hero/Problema/Manifiesto y GlyphField con glifos originales recuperados de Figma y RLE sin pérdida. Test navegador pasa DPR, decoración, pausa fuera de viewport y reduced motion, copy sin JS. Lint pasa; type-check detectó colisión private animate con HTMLElement.animate, corregida a tick (recheck final T10). La integración completa se usó para seam tests de las cuatro unidades; commits preservan index por tarea. Risk: none.

- **L13** (2026-11-14): T6: un solo PhoneFrame estacionario, pantallas reales reparentadas; 4 pasos sticky con scroll reversible/stepper, fallback completo sin JS. En viewport corto se apilan para no recortar copy/imagen (storyboard mobile excede viewport común). RED sin sección en index y GREEN de 01→04→01, marco fijo, reduced motion, no-JS y viewport corto observados. Risk: none.
