# Desplegar la landing de Tranqui

El sitio es estático y GitHub Pages lo sirve en el dominio propio `https://tranqui.jahattrinidad.com/`, en la raíz. La implementación se integra en `develop`; esa rama no publica en producción. Las versiones llegan a `main` con un release de git-flow.

## Comprobar el artefacto local

Con Node.js 22:

```sh
npm ci
npm run lint
NODE_OPTIONS=--max-old-space-size=768 npm run type-check
npm run build
npm run preview -- --host 127.0.0.1
```

Abrir `http://127.0.0.1:4321/` (o el puerto anunciado). Comprobar imágenes, fuentes, favicon, anclas y menú mobile. No abrir `dist/index.html` directamente: las rutas son absolutas desde la raíz del dominio.

El build usa 768 MiB de heap, un hilo de libuv y concurrencia de libvips limitada. No ejecutar otro build, checker o navegador al mismo tiempo en el host pequeño. Se generan AVIF/WebP con Astro/Sharp; no se requiere convertir originales manualmente.

## Flujo de ramas

1. Crear una rama desde `develop`.
2. Implementar y verificar una tarea coherente.
3. Commit Conventional Commits sin atribución de IA.
4. Merge directo de la rama a `develop`; sin PR.
5. Para publicar: `git flow release start <versión>`, subir la versión en `package.json`, `git flow release finish <versión>` y push de `main`, `develop` y el tag. El push de `main` despliega.

Un push de `develop` no activa el despliegue: `.github/workflows/deploy.yml` escucha únicamente pushes a `main`. No cambiar ese trigger para publicar la rama de integración. La ejecución manual del workflow también es una publicación; no usarla como prueba.

## GitHub Pages

El workflow existente usa Node.js 22, `npm ci`, `npm run build` y sube únicamente `dist/`.

`astro.config.mjs` fija `site` en `https://tranqui.jahattrinidad.com` y `base` en `/`. El dominio también figura en `public/CNAME`, `public/robots.txt` y en la configuración de Pages del repositorio (Settings → Pages → Custom domain); el DNS es un CNAME a `trinity-bytes.github.io`. Si cambia el dominio, actualizar los cuatro lugares y `tests/metadata.mjs`.

## Imágenes de vista previa

Se diseñan en Figma, página `00 · Cover` (frames `Preview / …`):

- `public/og-image.png` (1200×630): Open Graph y Twitter de la web.
- `docs/previews/github-social-preview.png` (1280×640): se sube a mano en GitHub, Settings → General → Social preview.
- `docs/previews/figma-cover.png` (1920×960): portada del archivo de Figma; se fija a mano con clic derecho en el frame → Set as thumbnail.

## Antes de publicar

- Revisar los faltantes de contenido documentados en el plan.
- Mantener el badge de Google Play inactivo hasta tener un enlace real.
- No publicar enlaces legales, de equipo o contacto inventados.
- Revisar el informe de auditoría de dependencias; no ejecutar `npm audit fix --force` como paso de despliegue.
- Repetir los checks de teclado, movimiento reducido y contenido sin JavaScript.
- Comprobar social cards en la URL publicada cuando se autorice el despliegue; el chequeo local solo valida el HTML y los archivos.
