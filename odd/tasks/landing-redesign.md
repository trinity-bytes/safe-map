# SafeMap — Rediseño total de la landing (diseño en Figma)

Objetivo: rediseñar por completo la landing de SafeMap. El diseño vive SOLO en Figma (plan `trinitycorp`) hasta que se apruebe; después se implementa en este repo, y la demo pasa a ser una app Flutter en un repo aparte.
Rama: `feat/landing-redesign` · Entrega: `ask-on-risk` · Tests: no aplican mientras la fase sea solo Figma (cierre de cada tarea = revisión visual con capturas `get_screenshot`).

---

## 0. Cómo retomar desde otra instancia (leer primero)

1. Leé este documento completo hasta `## Log`. Es la fuente de verdad: el criterio está acá, no en el chat.
2. Engram: `mem_current_project` (debería dar `safe-map`), después `mem_search` con el tema `odd/landing-redesign` (espejo: `odd/landing-redesign/tasks`, decisiones: `odd/landing-redesign/decisions`).
3. Figma: buscá el archivo `SafeMap — Landing Redesign` en el equipo `trinitycorp` (plan key `team::1506772803868682613`). Si la tabla de tareas ya tiene la URL/fileKey, usala. Si T1 no está hecha, crealo con `create_new_file` (editorType `design`, ese planKey). Antes de cualquier `use_figma`, cargá la skill `/figma-use`; para pantallas, también `/figma-generate-design`. Llamá a `create_session` con el fileKey antes de la primera lectura o escritura.
4. Seguí con la primera tarea pendiente de `## Tasks`. Cuando cierres una, actualizá la tabla, agregá una entrada al Log y actualizá el espejo de Engram.
5. Idioma: con el usuario se conversa en español rioplatense. El copy de la landing es español neutro (el sitio es `lang="es"`, público de Lima). Este documento está en español porque `docs/` ya lo está.

---

## 1. Contexto

### 1.1 Producto (fuente: `docs/upc-pre-202501-si720-4122-Vigilantix-report-tf01.docx`)

SafeMap es una **app móvil de seguridad ciudadana colaborativa** para Lima/Perú:

- **Reportes anónimos** de incidentes con geolocalización (HU-12) e historial propio (HU-13).
- **Validación colaborativa** entre usuarios (es el núcleo de la confianza; HU-20, HU-21).
- **Mapa de calor en tiempo real** de zonas de riesgo (HU-19), con filtros (HU-22).
- **Alertas personalizadas** según perfil y zonas monitoreadas (HU-07, HU-11).
- **Rutas seguras** con análisis de riesgo (HU-14, HU-15, HU-16) y compartir ruta/ubicación en vivo (HU-18).
- **Premium** (HU-24, mensual/anual): mapas offline (HU-10), alertas de voz (HU-17), estadísticas (HU-23), reportes prioritarios.
- **B2B / sostenibilidad**: datos procesados y reportes para empresas e instituciones.
- **IA** (clasificación de denuncias y predicción de zonas): **fuera de alcance de esta fase**, es crecimiento futuro. No se la vende como funcionalidad actual.
- Problema: la criminalidad creció en los últimos 4 años (INEI). Data-Crime del INEI existe, pero no es accesible ni de uso cotidiano. Fuente citable: INEI (dic. 2024), *Estadísticas de la criminalidad, seguridad ciudadana y violencia*, informe técnico N.º 04.
- Objetivos del informe (son **metas, no logros**; nunca presentarlos como resultados): 30 % de participación el primer año; alertas en menos de 5 min tras un reporte confirmado; 40 % de los usuarios activos mensuales con ≥1 reporte validado; 0 brechas de seguridad; 3 convenios con municipalidades; 1000 usuarios free y 100 premium al final del año.
- Riesgos del informe que la landing tiene que atacar: **baja adopción por falta de confianza** y miedo por la privacidad. Por eso la landing tiene que construir confianza (anonimato, validación, cifrado) antes de pedir el registro.
- Restricciones relevantes: mobile-first, cifrado (SHA-256 mencionado), asume conectividad estable.

### 1.2 Patrón a replicar: Minka (proyecto `minka` en Engram)

En Minka se hizo así: (1) app en Figma, (2) landing en Figma con tableros `Landing · Wireframes` y `Landing · Mockups` (Dark/Light), (3) con el diseño aprobado, el repo quedó **solo con la landing** (se borró el prototipo web, rama `feat/landing-only`) y (4) las pantallas del teléfono en la landing se exportaron como PNG (scale 2) desde los mockups de la app. En SafeMap el orden cambia: **primero la landing**, después algunas pantallas de la app para mostrarlas en la landing, y la app Flutter recién al final.

### 1.3 Estado actual del repo (para no confundirse)

- Astro 5 + React 19 + Tailwind, `lang="es"`. Último rediseño: commit `97ecfaf` ("terminal design system"). **Este rediseño lo reemplaza por completo.**
- `src/pages/demo.astro` y `src/components/interactive/*` (mapas Leaflet, `MapDemo*.tsx`) son el prototipo web. **No se tocan durante la fase Figma.** Se eliminan recién en la tarea de implementación (como en Minka), cuando exista la app Flutter.
- `docs/design-plan.md` (dirección "Cyber-Safe") queda **reemplazado** por este documento. Lo que sí se rescata de ahí: no inventar claims, el mapa siempre es una demo simulada, el CTA lleva al registro beta `#registro`, y accesibilidad/rendimiento son condiciones de cada fase.

### 1.4 Fuentes y accesos

| Recurso | Cómo |
|---|---|
| Informe | `docs/upc-pre-202501-si720-4122-Vigilantix-report-tf01.docx` (extraer con `pandoc -t plain` o `unzip -p … word/document.xml`) |
| Inspiration Garden (referencias del usuario) | `GET https://inspo.jahattrinidad.com/api/items` (paginado: `?cursor=<nextCursor>`; ~187 ítems al 2026-11-12). Medios: `GET https://inspo.jahattrinidad.com/api/media/<r2Key>`. **Usá `curl`**: `urllib` de Python recibe 403. |
| Figma | Plan `trinitycorp`, `team::1506772803868682613` (rol admin, tier student). La cuenta también tiene un plan de invitado (`u202416274's team`); **no usarlo**. |

---

## 2. Dirección aprobada: "vigilancia serena"

Aprobada por el usuario el 2026-11-12 (L4).

**Tesis:** SafeMap no vende miedo, vende **claridad y calma**. Convierte la incertidumbre de la calle en información compartida y verificada por vecinos. Frase guía (adaptada de la ref Henka): *"El miedo es niebla. SafeMap la despeja."* La landing tiene que sentirse **confiable, cívica, humana y nocturna**, no "cyber", policial ni alarmista.

**Prohibido:** escudos gigantes, rojo dominante, glitch/terminal/hacker, sirenas, siluetas de delincuentes, fotos de crímenes, stock genérico de "seguridad", claims de IA como función actual, métricas inventadas o testimonios falsos.

### 2.1 Referencias elegidas (Inspiration Garden)

| ID | Ref | Qué se toma | Uso en SafeMap |
|---|---|---|---|
| `bc69edeb-ef38-44fe-8dc1-95719dad42ca` (`media/2026/11/04a70f51-b0f4-4115-a1e5-94c10b6fd630.png`) | TrueEarth | Foto enmarcada en una card grande con etiquetas flotantes tipo pin conectadas por un punto | Hero o sección "cómo funciona": foto real de una calle de Lima con pins tipo "Zona tranquila · 12 validaciones" o "Robo reportado · hace 8 min". El mapa colaborativo hecho imagen. |
| `c518025e-7802-4612-9969-4659d05ddcb7` (preview `media/2026/11/ceaa6550-9917-427f-983a-2c64903eab3c.png`) | Finmax | Teléfono al centro con tarjetas de datos flotando alrededor y un brillo de color desde abajo | Sección de app: teléfono con el heatmap y tarjetas de alerta, ruta y validación alrededor. Ahí entran después las pantallas de la app (T7). |
| `6eaf4903-66c4-44de-95b9-4575d224d893` (`media/2026/11/5a8f75db-b976-4d0b-8489-283dc9a67cab.png`) | Aurora | Titular editorial serif sereno y centrado, CTA pill, tres atributos con ícono y franja de logos | Ritmo del hero y tres pilares: **Anónimo · Validado por vecinos · A tiempo**. La franja de logos solo con aliados REALES; si no hay, se cambia por una franja de fuentes (INEI) o se omite. |
| `ed01b1bd-0af1-465d-9e78-83b925d9c494` (`media/2026/11/ff507e19-e726-4bd3-9239-b60ace1cb78b.png`) | Henka | Sistema de marca en verde petróleo oscuro con acento menta, grilla, tono "Fear is fog, we make it clear" | Lenguaje de marca, paleta y tono de copy. |
| `aa349b58-7334-4474-bbb2-5fa569a171a2` (`media/2026/11/a80a28c4-063b-4deb-b38c-092fb654fb7d.png`) | See Beyond | CTA de lista de espera y lista vertical de beneficios con íconos lineales | Bloque de registro beta (`#registro`) y lista de beneficios. |
| `e624f84c-a3e4-4408-be8b-89acc23cd7f7` (`media/2026/11/6a6c4266-1657-4ed4-be26-14a58dd4b955.png`) | Luno | Ambiente nocturno sereno, mucho aire, titular liviano | Atmósfera: la ciudad de noche, cuando más importa sentirse seguro. |

Descartadas a propósito (no corresponden al tono): retratos/prompts (`158f2e5c`, `27c98d46`, `4eea0f00`, `69e21564`, `786bd09d`, `b253267a`), samuráis (`5e58a4c6`, `cf163473`), bebidas, autos, audio, retail. Si el usuario agrega referencias nuevas al Garden, se vuelven a consultar y se filtran con el mismo criterio: **¿transmite confianza cívica, comunidad, mapa/territorio o calma nocturna?**

### 2.2 Sistema visual (punto de partida, se valida en Figma)

Dark-first (como Henka/Luno). En los wireframes, evaluar si conviene una sección clara para la parte B2B/instituciones.

| Token | Valor inicial | Uso |
|---|---|---|
| `bg/night` | `#06181A` | Fondo base (verde petróleo casi negro) |
| `bg/surface` | `#0C2427` | Cards, paneles |
| `bg/raised` | `#13333A` | Cards elevadas y tarjetas flotantes |
| `line/subtle` | `#1F4249` | Bordes y divisores |
| `text/primary` | `#ECF3EF` | Texto principal |
| `text/secondary` | `#A7BDB6` | Texto secundario (validar AA ≥ 4.5:1 sobre `bg/night` y `bg/surface`) |
| `accent/safe` | `#7EE2B0` | Acento de marca: seguro, validado, CTA |
| `accent/signal` | `#C9F26B` | Destacados puntuales (con moderación) |
| `alert/amber` | `#F4B740` | Alertas e incidentes recientes (**solo** semántico) |
| `risk/coral` | `#F2705B` | Riesgo alto, **solo** dentro del heatmap y la UI del mapa |

- **Heatmap:** escala `accent/safe` → `alert/amber` → `risk/coral` con transparencia. Nunca un rojo plano dominante.
- **Tipografía:** titulares en serif editorial (candidatos: *Instrument Serif* o *Fraunces*) con palabras clave en itálica (como Aurora y Synergeus); UI y cuerpo en grotesk (candidatos: *Geist* o *Inter*). Hay que verificar que la fuente exista en Figma antes de fijarla. Registrar la elección en el Log.
- **Imagen:** fotos reales de ciudad (Lima de noche, calles, veredas, personas caminando), con tono frío verdoso. Nada de stock de "crimen". En Figma se puede usar `generate_image`, pero dejá anotado en el frame que es un placeholder y que va con licencia o foto propia para producción.
- **Forma:** radios generosos (24–32 en cards grandes, pill en CTAs), bordes de 1px `line/subtle` y glass sutil solo en las tarjetas flotantes.
- **Movimiento** (se especifica en mockups y se implementa después): pins que aparecen escalonados, pulso suave en el pin "en vivo", tarjetas flotantes con parallax leve. Respetar `prefers-reduced-motion`. Nada en loop permanente que distraiga.

---

## 3. Arquitectura de la landing (propuesta para wireframes)

Narrativa: **problema sentido → cómo lo resuelve la comunidad → la app → por qué confiar → planes → registrarse.** Una sola landing, sin página de demo (la demo ahora es la app Flutter).

| # | Sección | Contenido | Ref | Fuente del contenido |
|---|---|---|---|---|
| 1 | Header | Logo, anclas (Cómo funciona, App, Privacidad, Planes, FAQ) y CTA "Unirme a la beta" | Aurora | — |
| 2 | Hero | Titular serif sereno (dirección de copy: *"Camina tu ciudad con más claridad."*), bajada con los 3 pilares, CTA a `#registro` y CTA secundario a "Cómo funciona". Visual: foto nocturna de Lima en card con pins flotantes | TrueEarth + Luno + Aurora | Informe §Propósito |
| 3 | Pilares | Anónimo · Validado por vecinos · A tiempo (alertas), con ícono lineal y una línea cada uno | Aurora | HU-12, HU-20, HU-07 |
| 4 | Problema | Contexto INEI con la cita y fecha correctas; los datos públicos existen pero no se usan en el día a día | Henka (tono) | Informe + INEI 2024 |
| 5 | Cómo funciona | 3 pasos: Reportás (anónimo, geolocalizado) → la comunidad valida → el mapa y las alertas se actualizan | TrueEarth | HU-12, HU-20, HU-19 |
| 6 | La app | Teléfono al centro con el heatmap y tarjetas flotantes (alerta cercana, ruta segura, validación). Rotulado como **vista previa / demo simulada** | Finmax | HU-19, HU-14, HU-11 |
| 7 | Rutas seguras | Ruta A→B que evita zonas de riesgo y se comparte en vivo | Finmax/TrueEarth | HU-14, HU-15, HU-18 |
| 8 | Privacidad y confianza | Anonimato, cifrado, validación colaborativa y por qué los datos son confiables. Ataca el riesgo de adopción | See Beyond (lista) | Informe §Conclusiones, §Restricciones |
| 9 | Para instituciones | Municipalidades y empresas: datos agregados y reportes (B2B). Sin logos inventados | Henka | Informe §Propósito, objetivos (convenios) |
| 10 | Planes | Free vs Premium (offline, alertas de voz, estadísticas, reportes prioritarios). **Sin precios inventados**: si no hay precio aprobado, va "Próximamente" | — | HU-24, HU-10, HU-17, HU-23 |
| 11 | Registro beta `#registro` | Campo de email y CTA, beneficios con íconos y nota de privacidad | See Beyond | Flujo existente `BetaRegistration.astro` / `ContactForm.tsx` |
| 12 | FAQ | Reusar las preguntas de `src/data/faq.json`, revisadas | — | `faq.json` |
| 13 | Footer | Marca, enlaces legales (privacidad, términos HU-09), contacto, crédito académico si corresponde | — | — |

El orden y las secciones se pueden ajustar en los wireframes. Cualquier cambio de arquitectura queda registrado en el Log.

### 3.1 Criterio de copy y claims (obligatorio)

- Solo se afirma lo que respalda el informe. Las metas (30 %, <5 min, 1000 usuarios, 3 convenios) **no se muestran como logros**. Si aparecen, van como "nuestra meta".
- Nada de testimonios, logos de aliados, ratings ni cantidades de usuarios ficticios. Si un mockup necesita un dato de relleno, se marca en el frame con la nota `PLACEHOLDER — no publicar`.
- La IA y la predicción se mencionan, como mucho, como "próximamente".
- Todo mapa o pantalla de la app en la landing se rotula como demo o vista previa.
- Tono: cercano, sereno y en segunda persona. Nada de miedo, sensacionalismo ni lenguaje policial.

---

## 4. Estructura del archivo Figma

Archivo: **`SafeMap — Landing Redesign`** en el equipo `trinitycorp`.

| Página | Contenido |
|---|---|
| `00 · Cover` | Portada con nombre, estado (Wireframes / Mockups / Aprobado) y fecha |
| `01 · Moodboard` | Las 6 refs elegidas con nota de qué se toma de cada una, más la paleta y la tipografía |
| `02 · Foundations` | Variables (colores de §2.2, espaciado 4/8, radios), estilos de texto y componentes base (botón, pill, input, card, pin-label, tarjeta flotante, ícono) |
| `03 · Landing · Wireframes` | Desktop 1440 y mobile 390, en escala de grises, con la arquitectura de §3 |
| `04 · Landing · Mockups` | Desktop 1440 y mobile 390 en alta fidelidad, con notas de movimiento |
| `05 · App screens (para landing)` | Más adelante (T7): solo las pantallas que se muestran en la landing |

Convenciones: frames con el nombre `Landing / Desktop`, `Landing / Mobile` y secciones como `Section / Hero`. Auto-layout en todo. Colores y radios siempre vía variables (sin hex sueltos). Grilla desktop de 12 columnas, max-width de contenido 1200, gutter 24; mobile con márgenes de 16 o 20. Las notas para el usuario van como comentarios o texto en un frame `Notes` al lado de cada tablero.

**Gate de aprobación:** el usuario aprueba los wireframes antes de pasar a mockups, y los mockups antes de cualquier implementación. Sin aprobación explícita no se escribe código de la landing en este repo.

---

## Specs

- **S1** — Rediseño total de la landing: "quiero un rediseño total de esta landing."
- **S2** — Separar la landing de la demo, igual que en Minka: "haremos algo similar que lo que se hizo con mikna, dividiremos la landing y la demo que sera una app flutter que sera un repo aparte."
- **S3** — El diseño va solo en Figma hasta que se apruebe: "la parte del rediseño ira exclusivamente en figma trinitycorp hasta ser aprobado para implemetacion."
- **S4** — Usar las referencias del Inspiration Garden y el informe de `docs/`: "recuerda que tienes acceso al endpoint get de inspiration garden donde puedes acceder a mis referencias de inspiracion. en docs tienes el informe del proyecto como referencia."
- **S5** — Orden de trabajo: "primero solo la landing, luego alguna pantalla que pueda ser util de ostrar en la landing. pero principalmente es hacer primero la landing y leugo cuando este terminada pasamos a la app flutter."
- **S6** — Referencias acordes a la propuesta: "en las referencias busca algo que vaa acorde a la propuesta de safe-map". Resuelto en §2.1.
- **S7** — Dirección aprobada y plan commiteado para retomar: "apruebo la direccion. pero quiero que dejes el plan bien detallado ommiteado para seguir desde otra instancia del repo. tiene que estar todo lo relevante para que no se pierda naa del contexto y del criterio qu ese usara"

## Tasks

| ID | Specs | Tarea | Ruta | Estado | Evidencia |
|---|---|---|---|---|---|
| T0 | S4, S6, S7 | Analizar el informe y las referencias, elegir la dirección y commitear este plan | inline | ✅ hecho | commit de este archivo en `feat/landing-redesign` |
| T1 | S3 | Crear el archivo Figma `SafeMap — Landing Redesign` en trinitycorp con las páginas de §4 y anotar acá la URL y el fileKey | inline | ⬜ pendiente | — |
| T2 | S4, S6 | `01 · Moodboard`: subir las 6 refs (descargarlas con curl desde `/api/media/<r2Key>`) con notas, paleta y tipografía candidata | inline | ⬜ pendiente | — |
| T3 | S1, S3 | `02 · Foundations`: variables, estilos de texto y componentes base. Elegir la tipografía final y validar el contraste AA | inline | ⬜ pendiente | — |
| T4 | S1, S3, S5 | `03 · Landing · Wireframes` desktop y mobile con la arquitectura de §3 → **gate de aprobación del usuario** | inline | ⬜ pendiente | — |
| T5 | S1, S3 | `04 · Landing · Mockups` desktop y mobile en alta fidelidad, con notas de movimiento y copy según §3.1 → **gate de aprobación del usuario** | inline | ⬜ pendiente | — |
| T6 | S5 | Elegir con el usuario qué pantallas de la app muestra la landing (candidatas: heatmap HU-19, reportar HU-12, ruta segura HU-14, alerta HU-11/07) | inline | ⬜ pendiente | — |
| T7 | S5 | `05 · App screens`: diseñar solo esas pantallas, colocarlas en los mockups de la landing → aprobación | inline | ⬜ pendiente | — |
| T8 | S2, S3 | (Solo después de aprobar T5/T7) Implementar la landing nueva en este repo y quitar el prototipo web (`demo.astro`, `interactive/*`, Leaflet) como en Minka `feat/landing-only`. Se planifica en detalle en ese momento | inline | 🔒 bloqueado por aprobación | — |
| T9 | S2, S5 | (Después de T8) App Flutter en un repo aparte. Fuera de este documento; se abre su propio plan | — | 🔒 bloqueado | — |

## Log

- **L1** (2026-11-12, pedido original, verbatim): "quiero un rediseño total de esta landing. haremos algo similar que lo que se hizo con mikna, dividiremos la landing y la demo que sera una app flutter que sera un repo aparte. la parte del rediseño ira exclusivamente en figma trinitycorp hasta ser aprobado para implemetacion. recuerda que tienes acceso al endpoint get de inspiration garden donde puedes acceder a mis referencias de inspiracion. en docs tienes el informe del proyecto como referencia. alguna duda?"
- **L2** (2026-11-12, el usuario responde sobre el alcance de Figma): "primero solo la landing, luego alguna pantalla que pueda ser util de ostrar en la landing. pero principalmente es hacer primero la landing y leugo cuando este terminada pasamos a la app flutter."
- **L3** (2026-11-12, el usuario): "en las referencias busca algo que vaa acorde a la propuesta de safe-map". Se revisaron las 35 imágenes y las previews de los links del Garden. Elegidas: TrueEarth, Finmax, Aurora, Henka, See Beyond y Luno (§2.1).
- **L4** (2026-11-12, el usuario): "apruebo la direccion. pero quiero que dejes el plan bien detallado ommiteado para seguir desde otra instancia del repo. tiene que estar todo lo relevante para que no se pierda naa del contexto y del criterio qu ese usara". Se aprueba la dirección "vigilancia serena" y se escribe y commitea este plan.
- **L5** (2026-11-12, el usuario): "va. suvelo" — el informe `.docx` se commitea en la rama para que otros clones lo tengan.
- **Próximo paso:** T1 (crear el archivo Figma en trinitycorp).
