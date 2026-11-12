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

**Tesis:** SafeMap no vende miedo, vende **tranquilidad** (L9). Convierte la incertidumbre de la calle en información compartida y verificada por vecinos. Frase guía (adaptada de la ref Henka): *"El miedo es niebla. SafeMap la despeja."* La landing tiene que sentirse **confiable, cívica, humana y nocturna**, no "cyber", policial ni alarmista.

**Prohibido:** escudos policiales o de antivirus (ver L23: el **pin-escudo** sí está permitido, como forma propia), rojo dominante, glitch/terminal/hacker, sirenas, siluetas de delincuentes, fotos de crímenes, stock genérico de "seguridad", claims de IA como función actual, métricas inventadas o testimonios falsos.

### 2.1 Referencias elegidas (Inspiration Garden)

| ID | Ref | Qué se toma | Uso en SafeMap |
|---|---|---|---|
| `bc69edeb-ef38-44fe-8dc1-95719dad42ca` (`media/2026/11/04a70f51-b0f4-4115-a1e5-94c10b6fd630.png`) | TrueEarth | Foto enmarcada en una card grande con etiquetas flotantes tipo pin conectadas por un punto | Hero o sección "cómo funciona": foto real de una calle de Lima con pins tipo "Zona tranquila · 12 validaciones" o "Robo reportado · hace 8 min". El mapa colaborativo hecho imagen. |
| `c518025e-7802-4612-9969-4659d05ddcb7` (preview `media/2026/11/ceaa6550-9917-427f-983a-2c64903eab3c.png`) | Finmax | Teléfono al centro con tarjetas de datos flotando alrededor y un brillo de color desde abajo | Sección de app: teléfono con el heatmap y tarjetas de alerta, ruta y validación alrededor. Ahí entran después las pantallas de la app (T7). |
| `6eaf4903-66c4-44de-95b9-4575d224d893` (`media/2026/11/5a8f75db-b976-4d0b-8489-283dc9a67cab.png`) | Aurora | Titular editorial serif sereno y centrado, CTA pill, tres atributos con ícono y franja de logos | Ritmo del hero y tres pilares: **Anónimo · Validado por vecinos · A tiempo**. La franja de logos solo con aliados REALES; si no hay, se cambia por una franja de fuentes (INEI) o se omite. |
| `ed01b1bd-0af1-465d-9e78-83b925d9c494` (`media/2026/11/ff507e19-e726-4bd3-9239-b60ace1cb78b.png`) | Henka | Sistema de marca en verde petróleo oscuro con acento menta, grilla, tono "Fear is fog, we make it clear" | Tono de copy y grilla. **Ya no es referencia de paleta** desde L6 (la paleta pasó a azul nocturno). |
| `aa349b58-7334-4474-bbb2-5fa569a171a2` (`media/2026/11/a80a28c4-063b-4deb-b38c-092fb654fb7d.png`) | See Beyond | CTA de lista de espera y lista vertical de beneficios con íconos lineales | Bloque de registro beta (`#registro`) y lista de beneficios. |
| `e624f84c-a3e4-4408-be8b-89acc23cd7f7` (`media/2026/11/6a6c4266-1657-4ed4-be26-14a58dd4b955.png`) | Luno | Ambiente nocturno sereno, mucho aire, titular liviano | Atmósfera: la ciudad de noche, cuando más importa sentirse seguro. Desde L6 también es la referencia principal de paleta (azul nocturno). |

Descartadas a propósito (no corresponden al tono): retratos/prompts (`158f2e5c`, `27c98d46`, `4eea0f00`, `69e21564`, `786bd09d`, `b253267a`), samuráis (`5e58a4c6`, `cf163473`), bebidas, autos, audio, retail. Si el usuario agrega referencias nuevas al Garden, se vuelven a consultar y se filtran con el mismo criterio: **¿transmite confianza cívica, comunidad, mapa/territorio o calma nocturna?**

### 2.2 Sistema visual (punto de partida, se valida en Figma)

Dark-first (como Luno). En los wireframes, evaluar si conviene una sección clara para la parte B2B/instituciones.

**Paleta v2, azul nocturno** (L6, 2026-11-12). Reemplaza la v1 verde petróleo: el azul evoca confianza, pero se mantiene nocturno y desaturado para no leerse policial ni bancario. El verde queda **solo** como estado "validado". Ya está cargada como variables (colección `Color`, modo `Dark`) en Figma, y el tablero `Palette / Propuesta azul` de `02 · Foundations` la muestra en uso. Los contrastes WCAG se calcularon contra `bg/night`, `bg/surface` y `bg/raised`, y todos pasan AA (≥ 4.5:1).

| Token | Valor | Uso | Contraste (night / surface / raised) |
|---|---|---|---|
| `bg/night` | `#071426` | Fondo base (azul noche) | — |
| `bg/surface` | `#0D1F36` | Cards, paneles | — |
| `bg/raised` | `#142B47` | Cards elevadas y tarjetas flotantes | — |
| `line/subtle` | `#22395A` | Bordes y divisores | — |
| `text/primary` | `#EAF1FA` | Texto principal | 16.2 / 14.6 / 12.6 |
| `text/secondary` | `#9FB3CC` | Texto secundario | 8.6 / 7.7 / 6.7 |
| `accent/trust` | `#5AA9FF` | Marca y CTA (texto `#071426` encima: 7.5:1) | 7.5 / 6.8 / 5.8 |
| `accent/glow` | `#8FD3FF` | Destacados puntuales, palabras en itálica del titular, brillo del teléfono | 11.4 / 10.2 / 8.8 |
| `state/validated` | `#6FD6A8` | **Solo** el estado "validado / zona tranquila" | 10.4 / 9.4 / 8.1 |
| `alert/amber` | `#F4B740` | Alertas e incidentes recientes (**solo** semántico) | 10.3 / 9.2 / 8.0 |
| `risk/coral` | `#F2705B` | Riesgo alto, **solo** dentro del heatmap y la UI del mapa | 6.4 / 5.7 / 4.9 |

- **Heatmap:** escala transparente → `alert/amber` → `risk/coral`. Las zonas sin reportes no se pintan, para que el azul del fondo no se confunda con "seguro". Nunca un rojo plano dominante.
- **Tipografía:** **sans, sin serif** (L8): la serif editorial está gastada y una sans moderna transmite mejor la confianza. Se usa una sola familia para titulares y cuerpo. Inter y Geist quedan descartadas a propósito porque también están gastadas. La palabra clave del titular se destaca con color (`accent/glow`), no con itálica. **Elegida: Schibsted Grotesk** (L9), que está en Google Fonts. Las candidatas descartadas (Manrope y Onest) quedan en el tablero `Type / Propuesta sans` (nodo `5:2`).
- **Imagen:** fotos reales de ciudad (Lima de noche, calles, veredas, personas caminando), con tono frío verdoso. Nada de stock de "crimen". En Figma se puede usar `generate_image`, pero dejá anotado en el frame que es un placeholder y que va con licencia o foto propia para producción.
- **Forma:** radios generosos (24–32 en cards grandes, pill en CTAs), bordes de 1px `line/subtle` y glass sutil solo en las tarjetas flotantes.
- **Movimiento** (se especifica en mockups y se implementa después): pins que aparecen escalonados, pulso suave en el pin "en vivo", tarjetas flotantes con parallax leve. Respetar `prefers-reduced-motion`. Nada en loop permanente que distraiga.

---

## 3. Arquitectura de la landing (propuesta para wireframes)

Narrativa: **problema sentido → cómo lo resuelve la comunidad → la app → por qué confiar → planes → registrarse.** Una sola landing, sin página de demo (la demo ahora es la app Flutter).

| # | Sección | Contenido | Ref | Fuente del contenido |
|---|---|---|---|---|
| 1 | Header | Logo, anclas (Cómo funciona, App, Privacidad, Planes, FAQ) y CTA "Unirme a la beta" | Aurora | — |
| 2 | Hero | Titular sans que hable del **beneficio para el visitante**, no de una idea abstracta (L9: "claridad" suena a visión o GPS). Las opciones están en el tablero `Hero / Opciones de titular` (nodo `9:2`); **Titular del hero (L13):** *"Llega a tu destino con más tranquilidad."* (destacado: "más tranquilidad")., bajada con los 3 pilares, CTA a `#registro` y CTA secundario a "Cómo funciona". Visual: **reemplazado en L21–L22** (ver Log); la versión L18 decía: **video de fondo** en loop, sin audio y de ~10–15 s, con dos capas: (1) un campo de caracteres (· ∘ ○ :) que dibuja las curvas de nivel de la marca en azul tenue y respira lento, en clave serena y **no** matrix/terminal; (2) un mockup animado de la app (llega la alerta → el anillo 3/5 se llena → la ruta se redibuja). Lleva un poster estático para la carga y para `prefers-reduced-motion`, y se rotula "vista previa" | TrueEarth + Luno + Aurora | Informe §Propósito |
| 3 | Pilares | Anónimo · Validado por vecinos · A tiempo (alertas), con ícono lineal y una línea cada uno | Aurora | HU-12, HU-20, HU-07 |
| 4 | Problema | Contexto INEI con la cita y fecha correctas; los datos públicos existen pero no se usan en el día a día | Henka (tono) | Informe + INEI 2024 |
| 5 | Cómo funciona | Titular (L13): *"Entérate de lo que pasa en tu camino antes de salir."* (destacado: "antes de salir"). 3 pasos: Reportás (anónimo, geolocalizado) → la comunidad valida → el mapa y las alertas se actualizan | TrueEarth | HU-12, HU-20, HU-19 |
| 6 | La app | Teléfono al centro con el heatmap y tarjetas flotantes (alerta cercana, ruta segura, validación). Rotulado como **vista previa / demo simulada** | Finmax | HU-19, HU-14, HU-11 |
| 7 | Rutas seguras | Ruta A→B que evita zonas de riesgo y se comparte en vivo | Finmax/TrueEarth | HU-14, HU-15, HU-18 |
| 8 | Privacidad y confianza | Anonimato, cifrado, validación colaborativa y por qué los datos son confiables. Ataca el riesgo de adopción | See Beyond (lista) | Informe §Conclusiones, §Restricciones |
| 9 | Para instituciones | Municipalidades y empresas: datos agregados y reportes (B2B). Sin logos inventados | Henka | Informe §Propósito, objetivos (convenios) |
| 10 | Planes | Free vs Premium (offline, alertas de voz, estadísticas, reportes prioritarios). **Sin precios inventados**: si no hay precio aprobado, va "Próximamente" | — | HU-24, HU-10, HU-17, HU-23 |
| 10b | Equipo | (L19) "Las personas detrás de SafeMap.": los 4 integrantes de Vigilantix (UPC) que figuran en el informe, con foto, rol y enlaces. Va antes del registro para sumar confianza. **Sin códigos de alumno.** Faltan los roles, las fotos con permiso y los enlaces | — | Informe (integrantes) |
| 11 | Registro beta `#registro` | Campo de email y CTA, beneficios con íconos y nota de privacidad | See Beyond | Flujo existente `BetaRegistration.astro` / `ContactForm.tsx` |
| 12 | FAQ | Reusar las preguntas de `src/data/faq.json`, revisadas | — | `faq.json` |
| 13 | Footer | Marca, enlaces legales (privacidad, términos HU-09), contacto, crédito académico si corresponde | — | — |

El orden y las secciones se pueden ajustar en los wireframes. Cualquier cambio de arquitectura queda registrado en el Log.

### 3.1 Criterio de copy y claims (obligatorio)

- Solo se afirma lo que respalda el informe. Las metas (30 %, <5 min, 1000 usuarios, 3 convenios) **no se muestran como logros**. Si aparecen, van como "nuestra meta".
- Nada de testimonios, logos de aliados, ratings ni cantidades de usuarios ficticios. Si un mockup necesita un dato de relleno, se marca en el frame con la nota `PLACEHOLDER — no publicar`.
- La IA y la predicción se mencionan, como mucho, como "próximamente".
- Todo mapa o pantalla de la app en la landing se rotula como demo o vista previa.
- Tono: cercano, sereno y en segunda persona, **con tuteo y nunca voseo**. El público es peruano: nada de giros rioplatenses (L10). Evitar los imperativos que parezcan voseo, como "sabe": usar "entérate" (L11). Nada de miedo, sensacionalismo ni lenguaje policial.

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
- **S8** — Paleta azul en vez de verde: "la paleta basada en verde no menagrada para esre tipo de proyecto. en este csso si me parece justificado usar tonos azules para evocar confianza en los visitantes, so colores de esa indole." y "mengusraeia ver una propuesta en el figma".
- **S7** — Dirección aprobada y plan commiteado para retomar: "apruebo la direccion. pero quiero que dejes el plan bien detallado ommiteado para seguir desde otra instancia del repo. tiene que estar todo lo relevante para que no se pierda naa del contexto y del criterio qu ese usara"

## Tasks

| ID | Specs | Tarea | Ruta | Estado | Evidencia |
|---|---|---|---|---|---|
| T0 | S4, S6, S7 | Analizar el informe y las referencias, elegir la dirección y commitear este plan | inline | ✅ hecho | commit de este archivo en `feat/landing-redesign` |
| T1 | S3 | Crear el archivo Figma `SafeMap — Landing Redesign` en trinitycorp con las páginas de §4 y anotar acá la URL y el fileKey | inline | ✅ hecho | https://www.figma.com/design/Nqg2FTMTqhVNziGwIF8Oki (fileKey `Nqg2FTMTqhVNziGwIF8Oki`) |
| T2 | S4, S6 | `01 · Moodboard`: subir las 6 refs (descargarlas con curl desde `/api/media/<r2Key>`) con notas, paleta y tipografía candidata | inline | ✅ hecho | Tablero `Moodboard` (nodo `29:2`): las 6 refs de landing, 3 refs de componentes (000h, beUI y Transitions.dev) y la lista de descartes. Las imágenes se subieron con `upload_assets` sobre rectángulos destino. |
| T3 | S1, S3, S8 | `02 · Foundations`: variables, estilos de texto y componentes base. Elegir la tipografía final y validar el contraste AA | inline | ✅ hecho (falta la revisión del usuario) | Colecciones `Color` (11), `Spacing` (13, escala 4/8) y `Radius` (sm 8, md 16, lg 24, xl 32, full); 11 estilos de texto en Schibsted Grotesk (`Display/XL` 72 → `Overline` 12); componentes `Button` (Primary/Secondary/Ghost), `Badge` (Neutral/Validated/Alert), `Input` (Default/Focus), `Pin label` (Validated/Alert/Route/Risk) y `Floating card`, con fills, paddings y radios ligados a las variables. Tablero de revisión `Foundations / Specimen` (nodo `20:50`); los componentes están en `Components` (nodo `20:2`). Íconos pendientes (propuesta: set lineal de 1.5px, tipo Lucide). |
| T4 | S1, S3, S5 | `03 · Landing · Wireframes` desktop y mobile con la arquitectura de §3 → **gate de aprobación del usuario** | inline | ✅ aprobado (L20) | `Landing / Desktop` (nodo `32:2`) y `Landing / Mobile` (nodo `32:171`), con 14 secciones (se sumó Equipo). |
| T5 | S1, S3 | `04 · Landing · Mockups` desktop y mobile en alta fidelidad, con notas de movimiento y copy según §3.1 → **gate de aprobación del usuario** | inline | 🟡 esperando aprobación (v3) | `Landing v3 / Desktop` (nodo `50:314`) y `Landing v3 / Mobile` (nodo `54:329`), en la dirección One motif. Los v1 quedan renombrados como `[v1 descartado]`. |
| T6 | S5 | Elegir con el usuario qué pantallas de la app muestra la landing (candidatas: heatmap HU-19, reportar HU-12, ruta segura HU-14, alerta HU-11/07) | inline | ✅ hecho (L22) | Narrativa de 5 pasos: 01 Mapa (HU-19), 02 Reportar anónimo (HU-12), 03 Validar (HU-20), 04 Alerta (HU-07/11), 05 Ruta + compartir (HU-14/18). |
| T7 | S5 | `05 · App screens`: diseñar solo esas pantallas, colocarlas en los mockups de la landing → aprobación | inline | 🟡 esperando aprobación | `App screens / Narrativa` (nodo `45:2`, página 05), con 5 pantallas dentro de marcos de teléfono. En la página 04, `Hero + Narrativa v2` (nodo `46:287`) muestra el hero sin video y el storyboard del scroll. |
| T8 | S2, S3 | (Solo después de aprobar T5/T7) Implementar la landing nueva en este repo y quitar el prototipo web (`demo.astro`, `interactive/*`, Leaflet) como en Minka `feat/landing-only`. Se planifica en detalle en ese momento | inline | 🔒 bloqueado por aprobación | — |
| T9 | S2, S5 | (Después de T8) App Flutter en un repo aparte. Fuera de este documento; se abre su propio plan | — | 🔒 bloqueado | — |

## Log

- **L1** (2026-11-12, pedido original, verbatim): "quiero un rediseño total de esta landing. haremos algo similar que lo que se hizo con mikna, dividiremos la landing y la demo que sera una app flutter que sera un repo aparte. la parte del rediseño ira exclusivamente en figma trinitycorp hasta ser aprobado para implemetacion. recuerda que tienes acceso al endpoint get de inspiration garden donde puedes acceder a mis referencias de inspiracion. en docs tienes el informe del proyecto como referencia. alguna duda?"
- **L2** (2026-11-12, el usuario responde sobre el alcance de Figma): "primero solo la landing, luego alguna pantalla que pueda ser util de ostrar en la landing. pero principalmente es hacer primero la landing y leugo cuando este terminada pasamos a la app flutter."
- **L3** (2026-11-12, el usuario): "en las referencias busca algo que vaa acorde a la propuesta de safe-map". Se revisaron las 35 imágenes y las previews de los links del Garden. Elegidas: TrueEarth, Finmax, Aurora, Henka, See Beyond y Luno (§2.1).
- **L4** (2026-11-12, el usuario): "apruebo la direccion. pero quiero que dejes el plan bien detallado ommiteado para seguir desde otra instancia del repo. tiene que estar todo lo relevante para que no se pierda naa del contexto y del criterio qu ese usara". Se aprueba la dirección "vigilancia serena" y se escribe y commitea este plan.
- **L5** (2026-11-12, el usuario): "va. suvelo" — el informe `.docx` se commitea en la rama para que otros clones lo tengan.
- **L6** (2026-11-12, el usuario): "respecto a la propuesta de diseño, me gustaria revisitarla ya que la paleta basada en verde no menagrada para esre tipo de proyecto. en este csso si me parece justificado usar tonos azules para evocar confianza en los visitantes, so colores de esa indole." Se propone la paleta v2 azul nocturno (§2.2), con el verde solo como estado "validado" y el heatmap sin color en las zonas seguras.
- **L7** (2026-11-12, el usuario): "vavava, mengusraeia ver una propuesta en el figma". Se crea el archivo Figma (T1) con las 6 páginas de §4, la colección de variables `Color` (11 tokens con scopes y code syntax `var(--color-…)`) y el tablero `Palette / Propuesta azul` en `02 · Foundations`: swatches, escala del heatmap y un boceto de hero en uso. Fuentes verificadas en Figma: Instrument Serif (Regular/Italic), Fraunces, Geist e Inter; el boceto usa Instrument Serif + Geist, y la elección final sigue pendiente en T3.
- **L8** (2026-11-12, el usuario): "hmmm, los colores los veo OK, nadansobresaoientenki excelentenpero rampoco mediocre. respecto al uso de fuentes serif, eso era novedoso hace un año, hoy ekndia todo el mundo las usa y ya cansa. ademas  psra transmitir condiansa las fuentes sans serif o modernasncumolen bien." Se descarta la serif y se arma el tablero `Type / Propuesta sans` (nodo `5:2`) con tres opciones de una sola familia: Manrope, Schibsted Grotesk y Onest. La paleta queda aceptada como base, pero sin entusiasmo: hay que darle carácter en los mockups (brillo, mapa, fotografía) antes que cambiar los tonos.
- **L9** (2026-11-12, el usuario): "va, ennefecto la B es la quenmejor le comvence. pero la calabra claridad ennel lensaje es demasiado ambigua y abstracta, preferiria algo como 'tranquilidad' o algo que le haga ektender sl visitante para que y en que le bemeficia a el. la palabra claridad suena a visipn o gps". Se elige Schibsted Grotesk. Se arma el tablero `Hero / Opciones de titular` (nodo `9:2`) con tres titulares centrados en el beneficio (A: "Llega a donde vas con más tranquilidad.", B: "Sabe qué pasa en tu camino antes de salir.", C: "Tus vecinos te avisan. Tú caminas tranquilo.") y una bajada concreta respaldada por HU-19, HU-11 y HU-14.
- **L10** (2026-11-12, el usuario): "me parece que hay un tono un poco argentino y no creo que vaya acorde al publico pruano, prro de esas 3 yo digo que la primera esnlanque masnfunciona, el top 2 seria la c". Se elige el titular A, con C como segunda opción. Sobre el tono: el copy usa tuteo (llega, mira, recibe, elige) y no voseo, pero queda como **regla para todo el copy** validarlo con hablantes peruanos y evitar giros rioplatenses (voseo, "che", "re-", "laburo", "colectivo"). En caso de duda, preferir el léxico peruano o el neutro.
- **L11** (2026-11-12, el usuario): "\"sabe que pasa en ru camino\" suena a sabé qué pasa en tu camino, che". Es correcto: el imperativo de "saber" con tú ("sabe") casi no se usa y se lee como voseo sin tilde. La opción B pasa a ser "Entérate de lo que pasa en tu camino antes de salir." Regla nueva: evitar los imperativos que se confunden con voseo (sabe, ten, ve); preferir verbos claros en tuteo (entérate, mira, recibe).
- **L12** (2026-11-12, el usuario): "luego de esas coreeciones mi decision estaria entre la A y B corregido. con un cambio en la a y es oa de \"llega a tu destino\"". La opción A pasa a ser "Llega a tu destino con más tranquilidad." Quedan A y B como finalistas y C se descarta (en Figma está marcada y atenuada).
- **L13** (2026-11-12, el usuario): "va, me gusta lo que sugieres." Se adopta la combinación: A como titular del hero y B como titular de la sección "Cómo funciona" (§3).
- **L14** (2026-11-12): T3 armada en Figma. Ver la fila de T3 en `## Tasks`.
- **L15** (2026-11-12, el usuario): "pos, meh, osea  son los mismosncomponentes que se ven enninfinidad de lugares. no hay algo diferente? revisa el inspiration garden que creo que hay bibliotecss de componentes y puedes sacar ideas de ahi". Se revisaron las bibliotecas del Garden (000h `cojeev.com/ui`, beUI `beui.dev`, Transitions.dev, Glisse). Los componentes básicos quedan como piezas neutras, y la identidad pasa a un tablero de **componentes con firma**, `Components / Firma` (nodo `24:32`), con 6 piezas: 01 medidor de validación (anillo de 5 segmentos), 02 pila de alertas en vivo, 03 radio de aviso (arc picker con número animado), 04 "Cómo funciona" como una ruta punteada con paradas, 05 textura de curvas de nivel (la firma visual; el heatmap se vuelve topografía) y 06 isla de ruta compartida (HU-18). Cada una tiene su nota de movimiento. Por ahora son ilustraciones SVG con hex fijos; se convierten en componentes con variables cuando se aprueben.
- **L16** (2026-11-12, el usuario): "seee, me co concence mas, aunque los componentes 04 y 05 necesitan mejoras perocvamos bien en general". Se aprueba la dirección de los componentes con firma. El usuario no detalló qué mejorar en 04 y 05, así que se iteró según la crítica propia. **04** ahora ocurre sobre un mapa con calles: la ruta tiene un tramo recorrido (sólido) y uno pendiente (punteado), y cada parada es un pin en forma de gota con su mini-interfaz (reporte, medidor 3/5, alerta). Así se conecta con 01 y 02. **05** ahora es un campo de datos real: curvas de nivel generadas por marching squares sobre focos de actividad, azules y espaciadas donde todo está tranquilo, ámbar o coral y apretadas donde hay reportes, con leyenda y pins. Sirve como textura de marca y como heatmap.
- **L17** (2026-11-12, el usuario): "va, mucho mejor". Se aprueban los componentes con firma (01–06), incluida la iteración de 04 y 05. Se hace T2: tablero `Moodboard` (nodo `29:2`).
- **Pendiente de confirmar:** si la beta está realmente abierta. Mientras no se confirme, los wireframes usan "Registro a la beta", que no afirma nada.
- **L18** (2026-11-12, el usuario): "dale. empieza con los wireframes. lo que tengo claro es que el hero debe tener un video de fondo que muestre un mockup animado de la appo. idealmente con un fondo animado del tipo character rendering o algo asi bien chido". El character rendering se reinterpreta: los glifos dibujan las curvas de nivel en azul tenue, para no caer en la estética terminal/hacker prohibida (§2). Se arman los wireframes desktop y mobile (T4). La sección "La app" reúne el radio de aviso (03), y "Empieza gratis" es el titular de Planes.
- **L19** (2026-11-12, el usuario): "falta una seccion para conocer al team". Se agrega `Section / Equipo` (desktop `34:2`, mobile `34:33`) entre Planes y Registro, con los 4 integrantes del informe (Mariana Morocho, Fabrizio Santi, Mauricio Terán y Jahat Trinidad). Los roles, las fotos y los enlaces están pendientes. Se rebalancean los fondos alternos.
- **L20** (2026-11-12, el usuario): "va. me convence". Se aprueban los wireframes (gate T4) y se arman los mockups (T5) desktop y mobile. Decisiones: el hero es el poster del video, y los glifos se dibujan como bandas topográficas (sin coral, para no alarmar). La FAQ suma la nota de emergencia: "llama al 105 (Policía Nacional del Perú)". Se quitaron del copy público las referencias a HU y una promesa no respaldada ("aviso cuando llegas").
- **L21** (2026-11-12, el usuario): "vavava, un punto de partida ok. vamos por prtes. para empezar el hero: estoy viendo que es edio complicado crear el video del mockup, principalmente porque las paginas para generar mockups no permiten crar el vieo sin fondo, la alternativa que se me ocurrio es usar un modelo 3d de un mockup  que al ir haceindo scroll este vaya cmabiando de pantalla para que muestre lo que hace la app, en plan narrativa. y en el hero el fondo serian los caraceres aniagos de fondo, me parece que hay una liberia en js o ts que hace eso. que opinas?". Análisis: `AsciiEffect` de three.js (grilla de texto en el DOM, pesada) y `ASCIIEffect` de pmndrs/postprocessing (shader con `cellSize`, set de caracteres y `color`) convierten una escena 3D a ASCII; para las curvas de la marca alcanza un canvas 2D propio sin dependencias. Para el teléfono se recomienda 2.5D (marco HTML + transformaciones CSS 3D, pantallas nítidas, liviano en Android de gama media) antes que un modelo GLB con three.js.
- **L22** (2026-11-12, el usuario): "vava. me gusta lo qu esugieres". **Decisión de implementación:** (1) el hero lleva un campo de glifos en canvas 2D propio (curvas de nivel en bandas, animación lenta, pausado con `prefers-reduced-motion` o fuera de pantalla), sin video; (2) una narrativa con scroll en una sección fija con teléfono 2.5D, donde el texto cambia por pasos y el teléfono pasa de pantalla en pantalla. "Cómo funciona" y "La app" se fusionan en esa narrativa. Un 3D real (GLB) queda como mejora opcional. Se hacen T6 y T7 (pantallas) y el tablero `Hero + Narrativa v2`.
- **L23** (2026-11-12, el usuario): "2 cosas: los mockups duelen de ver,son demasiado genericos, tienes skills para hacer algo mejjor y referencias por si busas componentes y otros, no se justifica el diesño tan mediocre. lo segudo es que podemos aprovechar el fondo animado del hero para que apoye la narrativa del hero, osea, se ven zonas de peligro asi qu eestaria biueno un escudo en el centro atras del texto y por donde esta la app, representando la tranquilidad, igualmente croe que el logo o icono de la app debe tener algo que aluda a un escudo, no un escudo como tal pero si algo mas interesante que un punto con circulos al rededor".
  - Se aplica la skill `design-taste-frontend`. Dirección repartida y elegida: **One motif** (seed 1928522809; se descartaron `loud-flat-poster` y `page-is-the-object`). El hero dealt ("Striped card beside the room") se reemplaza por la composición de la propia dirección (el motivo gigante y recortado), porque necesitaba una foto de un ambiente que no existe y contradecía el pedido explícito del usuario.
  - **Idea:** la zona de calma que los reportes validados recortan en el mapa de la ciudad se vuelve el motivo único, el **pin-escudo** (hombros de escudo arriba, punta suave de pin abajo). Aparece como logo, como claro del hero, como escenario del teléfono, como viñeta y como cierre del footer.
  - **Reglas de la casa a partir de ahora:** sin etiquetas en mayúsculas sobre los títulos, sin píldora sobre el titular, sin palabra del titular destacada en color, sin tarjetas con ícono arriba, sin vidrio ni blur, sin brillos ni sombras en reposo, sin bordes finos, sin numeración 01/02, sin gradientes (salvo un velo neutro sobre foto), titulares de máximo 2 líneas y un solo h1.
  - Logo: tablero `Logo / Pin-escudo` (nodo `47:49`) con A (curvas de nivel), B (el claro en el mapa) y C (sólido). Recomendado: C.
  - Hero v3 (nodo `48:308`, página 04): campo de glifos con zonas de actividad y riesgo en los bordes, el pin-escudo gigante en `bg/surface` como claro de calma con un borde de glifos en `accent/glow`, el copy centrado dentro y el teléfono que nace de la punta.
- **L24** (2026-11-12, el usuario): "me encanta el logo, respecto al heri, si va por buen camino, solo que el cambio es brusco, podria ser algo mas sutil tipo lo que hace el nueo icono con las lineas interiores. suavizando el fondo  manteinendo el contraste y la tendencia a dark". **Logo elegido: C (sólido)**, que era el recomendado (se asume, porque el usuario habló de "el logo"). Hero v3: se elimina el escudo plano. Ahora el pin-escudo se forma con bandas concéntricas de glifos que siguen su contorno (período de ~26 px). Son brillantes en el borde (`accent/glow`) y se apagan y ralean hacia el centro (`accent/trust`, hasta 0.22 de opacidad), igual que las líneas internas del ícono. El campo de la ciudad se disuelve gradualmente al acercarse. El copy baja para no cruzar la banda brillante superior.
- **L25** (2026-11-12, el usuario): "si. me encanta". Se aprueba el hero v3 y se lleva la dirección One motif a toda la landing (v3). Composición por sección:
  - **Problema:** una franja con el statement y la cifra INEI grande (placeholder).
  - **Narrativa:** 4 pantallas fijas al scroll ("Primero, alguien reporta lo que vio." → "Luego, los vecinos de la zona lo confirman." → "Entonces te llega la alerta, si estás cerca." → "Y llegas a tu destino con más tranquilidad."). El campo sube de tono en cada paso y termina en `accent/trust`. El teléfono va sobre un escenario con forma de pin-escudo, y el progreso se marca con viñetas de pin-escudo, sin numeración.
  - **Privacidad:** mosaico de primeros planos (toggle anónimo, medidor 3/5, campo cifrado, etiqueta "Vecino anónimo", contactos), sin tarjetas con ícono.
  - **Instituciones:** panel con un fragmento del panel recortado en forma de pin-escudo.
  - **Planes:** fichas que suben de altura (Free → Premium), con la franja inferior como botón.
  - **Equipo:** retratos con máscara de pin-escudo.
  - **Registro:** campo azul con el diálogo de la app ya abierto ("Empieza por tu calle.").
  - **FAQ:** acordeón de fichas llenas, con la de emergencia (105) en ámbar.
  - **Footer:** el nombre en grande y la marca C.
- **Próximo paso:** que el usuario apruebe los mockups v3 (gate T5/T7); después, T8 (implementación). Pendientes de dato: roles y fotos del equipo, si la beta está abierta, la cifra del INEI, el crédito UPC, el correo de contacto y la regla final de validación.