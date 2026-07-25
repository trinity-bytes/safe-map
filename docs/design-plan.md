# SafeMap Landing Page — Plan de rediseño

> **Decisión:** rediseñar la landing con una estética **Cyber-Safe**, oscura y premium, manteniendo el modo oscuro como única experiencia. El objetivo no es sumar efectos: es aumentar claridad, confianza y conversión sin convertir la página en una demo técnica.

## Resumen ejecutivo

La dirección visual aprobada es válida, pero el plan original mezclaba decisiones de diseño con implementación prematura. Esta versión corrige el alcance:

- El mapa se presenta como **demo simulada**, no como información en vivo.
- Astro sigue siendo el default; React se reserva para islas con interacción real.
- Framer Motion no será el motor único: CSS y APIs nativas cubren las animaciones simples.
- Datos, claims, assets y rutas se validan antes de amplificarlos visualmente.
- Accesibilidad, rendimiento y conversión son gates de cada fase, no tareas de cierre.
- Se conserva el flujo de registro beta asociado a `#registro`; Pricing no se rediseña de forma aislada.

---

## 1. Auditoría del estado actual

| Hallazgo | Evidencia | Decisión |
|---|---|---|
| Framer Motion está instalado, pero no se usa actualmente en `src/` | `package.json`, componentes Astro existentes | Introducirlo solo en islas React justificadas |
| Header y Hero son Astro, no React | `src/components/layout/Header.astro`, `src/components/sections/Hero.astro` | No usar hooks de React directamente; migrar solo interacciones complejas |
| El mapa actual usa datos mock y variantes duplicadas | `MapPreview.tsx`, `MapDemoClean.tsx`, `MapDemoFixed.tsx`, `MapDemo.tsx` | Elegir una implementación y rotularla como demo simulada |
| `features.json` y `faq.json` existen, pero las secciones no los consumen | `src/data/`, `Features.astro`, `FAQ.astro` | Definir contratos de datos y eliminar hardcode duplicado |
| Pricing incluye el registro beta | `Pricing.astro`, `ContactForm.tsx` | Separar visualmente oferta y registro sin romper `#registro` |
| Ya existe un isotipo de escudo | `Header.astro` | Consolidar la identidad; no crear un logo desde cero sin necesidad |
| La paleta original tenía un token de texto con contraste insuficiente | `text-muted: #475569` sobre `#070d1a` | Reservarlo para estados no esenciales o reemplazarlo por un tono accesible |
| Hay rutas/assets pendientes de resolver | `MapPreview.tsx`, ausencia de assets documentados | Usar `import.meta.env.BASE_URL` y validar assets antes de diseñar alrededor de ellos |

### Riesgos que bloquean el inicio visual

1. **Claims no verificados:** métricas de IA, testimonios, disponibilidad, certificaciones y promesas de seguridad no deben presentarse como hechos hasta tener fuente o aprobación.
2. **Arquitectura de hidratación ambigua:** cada isla React aumenta JS y complejidad; no se acepta `client:load` como default.
3. **Interacciones costosas:** canvas, marquee, tilt 3D y carruseles drag son opcionales y deben justificar su coste.
4. **Conversión frágil:** el CTA debe llevar al registro beta existente, no a un flujo nuevo inventado durante el rediseño.

---

## 2. Resultado y estructura de página

### Narrativa objetivo

1. **Entender:** SafeMap ayuda a moverse y reportar con mayor seguridad.
2. **Ver:** la demo muestra cómo se consulta el contexto de una zona.
3. **Confiar:** privacidad, límites del producto y evidencia verificable.
4. **Actuar:** registro beta claro y accesible.

### Orden propuesto

```
Header
├── Hero: propuesta de valor + CTA principal
├── Cómo funciona: 3 pasos, alimentados por datos
├── Demo de mapa simulada: interacción explicable, sin prometer tiempo real
├── Impacto: métricas y visualizaciones únicamente verificadas
├── Testimonios: solo contenido aprobado o placeholder explícito
├── Oferta / Pricing: condiciones claras
├── Registro beta: flujo existente, separado visualmente
├── FAQ: búsqueda progresiva y respuestas verificadas
└── Footer: navegación, privacidad y contacto
```

**Fuera de alcance inicial:** backend de newsletter, datos de mapas en tiempo real, integración con autoridades, autenticación, nueva lógica de pagos y creación de assets externos no disponibles.

---

## 3. Sistema visual dark-only

### Tokens

| Token | Valor | Uso |
|---|---|---|
| `bg-base` | `#070d1a` | Fondo principal |
| `bg-surface` | `#0f1729` | Cards y contenedores |
| `bg-elevated` | `#1a233a` | Elementos elevados |
| `brand-primary` | `#2563eb` | CTA y acciones principales |
| `brand-glow` | `#3b82f6` | Estados hover/focus y glow |
| `brand-success` | `#059669` | Confirmaciones, no como único indicador |
| `brand-danger` | `#dc2626` | Alertas y emergencia |
| `brand-accent` | `#7c3aed` | Acentos secundarios |
| `text-primary` | `#f1f5f9` | Texto principal |
| `text-secondary` | `#94a3b8` | Texto secundario |
| `text-muted` | `#64748b` | Solo texto no esencial/disabled; verificar contraste por contexto |
| `border-subtle` | `#1e293b` | Bordes y separación |

- No habrá toggle de tema.
- El contraste se verifica con una herramienta antes de cerrar la fase visual.
- El color nunca será el único medio para comunicar estado.
- La estética tecnológica debe reforzar confianza, no parecer una interfaz de videojuego o de trading.

---

## 4. Política de arquitectura y movimiento

### Frontera Astro / React

| Necesidad | Implementación |
|---|---|
| Layout, tipografía, contenido y enlaces | Astro + CSS |
| Hover, focus, reveals y transiciones simples | CSS/transitions + Intersection Observer nativo si hace falta |
| Mapa o interacción con estado complejo | Una única isla React |
| Gestos o layout animation realmente necesarios | Framer Motion dentro de esa isla React |
| Acordeón y navegación básica | HTML semántico + progressive enhancement |
| Canvas/partículas | Opcional; solo después de medir impacto |

Reglas:

1. No migrar componentes Astro a React por animaciones decorativas.
2. No usar `useSpring`, `AnimatePresence` ni `useDrag` desde archivos `.astro`; si se necesitan, viven en una isla React.
3. Usar `useDragControls`/`drag` solo si la interacción aporta comprensión, no como ornamento.
4. `client:load` se limita a interacciones críticas; `client:visible` se usa solo cuando la interacción puede esperar.
5. Toda animación respeta `prefers-reduced-motion`.
6. Cada isla debe tener una razón documentada y un presupuesto de JS.

---

## 5. Plan de implementación por fases

### Fase 0 — Baseline factual y técnico

- [ ] Inventariar claims, assets, anchors, rutas y fuentes de datos.
- [ ] Registrar baseline de build, lint, type-check, Lighthouse y revisión de teclado.
- [ ] Confirmar el flujo beta y el destino de cada CTA.
- [ ] Elegir la implementación de mapa que se conservará.
- [ ] Marcar como pendientes todas las métricas/testimonios sin fuente.

**Gate:** no quedan decisiones dependientes de assets o claims desconocidos.

### Fase 1 — Contratos y saneamiento de contenido

- [ ] Hacer que Features y FAQ consuman sus JSON o eliminar los archivos si no serán la fuente única.
- [ ] Crear fuentes explícitas para testimonials, pricing y stats, con tipos/validación.
- [ ] Separar datos de presentación de los componentes.
- [ ] Eliminar las variantes de mapa duplicadas después de elegir una.
- [ ] Corregir encoding y textos inconsistentes del contenido existente.

**Gate:** cada afirmación visible tiene fuente, estado `verified` o placeholder explícito.

### Fase 2 — Fundación visual y shell

- [ ] Consolidar tokens dark-only en Tailwind y estilos globales.
- [ ] Unificar tipografías, focus-visible, selección, bordes y estados.
- [ ] Refinar Header, navegación mobile y Footer.
- [ ] Añadir `aria-label`, `aria-controls`, `aria-expanded` y gestión de foco donde corresponda.
- [ ] Resolver rutas con `import.meta.env.BASE_URL`; no usar paths absolutos frágiles.
- [ ] Definir IDs estables: `#como-funciona`, `#demo`, `#impacto`, `#pricing`, `#registro`, `#faq`.

**Gate:** navegación por teclado completa y anchors funcionales en el base path de despliegue.

### Fase 3 — Hero y narrativa inicial

- [ ] Crear headline orientado al beneficio, sin estadísticas negativas como apertura.
- [ ] Mantener un CTA primario hacia registro y un CTA secundario hacia la demo.
- [ ] Usar una composición visual ligera; partículas/canvas solo como mejora opcional.
- [ ] Animar entrada y estados con CSS por defecto; React solo si la interacción lo justifica.
- [ ] No añadir logos aliados, screenshots u `og-image` hasta que existan y estén aprobados.

**Gate:** el mensaje principal se entiende sin animación, imágenes ni JavaScript.

### Fase 4 — Cómo funciona y demo de mapa

- [ ] Construir 3 pasos data-driven con estados claros.
- [ ] Presentar el mapa como **demo simulada** y explicar qué es real y qué es ilustrativo.
- [ ] Consolidar la interacción en una sola implementación.
- [ ] Añadir estados de carga, error y fallback sin JS.
- [ ] Mantener el demo accesible por teclado y usable con reduced motion.

**Gate:** no hay copy que sugiera datos en tiempo real si no existe una fuente real.

### Fase 5 — Impacto, testimonios y conversión

- [ ] Implementar el bento solo con métricas verificadas.
- [ ] Añadir visualizaciones SVG simples antes que librerías o efectos 3D.
- [ ] Mostrar testimonios aprobados; si no existen, usar casos de uso sin atribución falsa.
- [ ] Mantener Pricing y registro beta como dos responsabilidades visibles y conectadas.
- [ ] Si se añade toggle mensual/anual, documentar precios, ahorro, estado y persistencia.

**Gate:** cada CTA tiene destino, estado de éxito/error y copy consistente con el producto actual.

### Fase 6 — FAQ y refinamiento

- [ ] Implementar búsqueda progresiva sobre `faq.json`.
- [ ] Preferir `details/summary` o un acordeón semántico antes que una animación compleja.
- [ ] Mantener respuestas sobre privacidad y emergencias precisas y visibles.
- [ ] Añadir micro-interacciones únicamente donde mejoren orientación o feedback.
- [ ] El scroll spy, marquee, tilt y page transitions son opcionales y deben pasar el presupuesto.

**Gate:** teclado, lector de pantalla, reduced motion y viewport móvil verificados.

### Fase 7 — Verificación final

- [ ] Ejecutar `npm run build`.
- [ ] Ejecutar `npm run lint`.
- [ ] Ejecutar `npm run type-check`.
- [ ] Auditar contraste, foco, headings, landmarks, enlaces y formularios.
- [ ] Medir performance con y sin JavaScript de islas.
- [ ] Revisar rutas en desarrollo y en el base path de producción.
- [ ] Eliminar imports, CSS y componentes muertos.

**Objetivo:** establecer baseline antes de prometer una métrica Lighthouse; como mínimo, no introducir regresiones en performance, accesibilidad o conversión.

---

## 6. Criterios de aceptación

### Visual

- [ ] Dark-only consistente en todas las rutas.
- [ ] Jerarquía visual clara en móvil y desktop.
- [ ] El diseño transmite seguridad y comunidad, no urgencia artificial ni estética de videojuego.
- [ ] El isotipo existente se integra en una identidad coherente.

### Producto y contenido

- [ ] La propuesta de valor se entiende en los primeros segundos.
- [ ] El mapa está rotulado honestamente como demo simulada.
- [ ] No hay claims, testimonios, cifras o certificaciones sin validación.
- [ ] El registro beta sigue funcionando desde `#registro`.

### Accesibilidad

- [ ] Todo flujo se puede completar con teclado.
- [ ] Controles interactivos exponen nombre, estado y relación con su contenido.
- [ ] Contraste AA verificado para texto normal y grande.
- [ ] Reduced motion elimina desplazamientos, parallax y loops no esenciales.

### Calidad técnica

- [ ] Build, lint y type-check pasan.
- [ ] No se agregan dependencias sin justificar.
- [ ] Las islas React y sus directivas de hidratación están justificadas.
- [ ] No quedan implementaciones duplicadas del mapa ni CSS muerto crítico.
- [ ] Los links funcionan con el base path de despliegue.

## 7. Stack

Se mantienen Astro 5, Tailwind 3, React 19, Leaflet/react-leaflet, Lucide React y Framer Motion 12 ya instalados. No se agregan dependencias en esta iteración. Framer Motion queda como herramienta especializada, no como requisito para cada animación.

