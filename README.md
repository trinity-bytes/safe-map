# SafeMap — Landing

Landing informativa del proyecto académico SafeMap: reportes anónimos validados por vecinos para conocer lo que pasa en tu zona. Implementada en Astro 5 y Tailwind, sin runtime de React ni prototipo de mapas web. La futura app Flutter se mantiene en otro repositorio.

## Desarrollo

Requisitos: Node.js 22 y npm.

```sh
npm ci
npm run dev
```

Abrir `http://localhost:4321/safe-map/`. La ruta base es obligatoria también en desarrollo.

## Verificación

Ejecutar de a uno, no en paralelo: el entorno de desarrollo tiene aproximadamente 3 GB de RAM.

```sh
npm run lint
NODE_OPTIONS=--max-old-space-size=768 npm run type-check
node --test --test-concurrency=1 tests/build-wrapper.test.mjs
npm run build
npm run preview
```

`build` limita el heap de Node a 768 MiB y el pool de trabajo de imágenes a un hilo. Conserva los argumentos de Astro (`npm run build -- --outDir /tmp/safemap-preview`). Los PNG originales no se modifican: Astro/Sharp produce variantes AVIF/WebP durante el build. El primer build tarda más por las imágenes; los siguientes reutilizan caché.

Las regresiones de navegador usan Playwright. Instalar Chromium una vez con `npx playwright install chromium` si no existe. Con el servidor activo, ejecutar **un script por vez**:

```sh
node tests/navigation.mjs
node tests/glyph-field.mjs
node tests/narrative.mjs
node tests/trust-content.mjs
node tests/closing-content.mjs
node tests/integration.mjs
node tests/metadata.mjs
```

`TEST_URL` cambia la URL de prueba; `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` permite usar un Chromium ya instalado, sin descargar otro. Los navegadores se cierran al terminar cada script. `QA_SCREENSHOT_DIR` permite guardar capturas desde el test de integración fuera del repositorio. [Informe observado](docs/landing-qa/README.md).

## Estructura

- `src/components/sections/`: secciones de la landing aprobada.
- `src/components/ui/`: primitivas y campo de glifos decorativo.
- `src/components/layout/`: header, diálogo mobile y footer.
- `src/assets/landing/`: fotos, retratos, pantallas y SVG aprobados.
- `docs/landing-spec/`: copy, medidas, contextos y capturas originales de Figma.
- `odd/tasks/landing-implementation.md`: tareas, decisiones, evidencia y faltantes.

## Contenido pendiente

No hay enlace de Google Play, páginas legales, enlaces del equipo ni destino de contacto aprobado. No se publican destinos ficticios. El badge de Google Play está inactivo. Figma contiene seis preguntas y solo la primera respuesta: las cinco restantes permanecen en los datos con `answer: null`, fuera de la página pública. Todos los mapas y cifras de las pantallas son ejemplos; las metas no se presentan como logros.

La narrativa funciona con scroll cuando el contenido cabe en la pantalla; en viewports bajos y sin JavaScript, los cuatro pasos se leen apilados. El menú usa un diálogo nativo, las FAQ usan `details`, y se respeta la preferencia de movimiento reducido.

## Integración y publicación

Las ramas de trabajo parten de `develop` y se consolidan allí mediante merges directos, sin PR. `main` no se modifica durante esta implementación. Ver [DEPLOYMENT.md](DEPLOYMENT.md): publicar en producción es una operación separada.
