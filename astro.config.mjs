// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Production is served from a custom domain at the root, so there is no base path.
// public/CNAME must keep naming the same host.
const site = "https://tranqui.jahattrinidad.com";

// https://astro.build/config
export default defineConfig({
  site,
  base: "/",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  experimental: {
    clientPrerender: true,
  },
});
