// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// GitHub Pages serves a project site under /<repo>/, so `base` must track the
// repository name. Deriving it from GITHUB_REPOSITORY keeps the build correct
// through a rename: hardcoding it is what silently broke production when this
// repo went from SafeMap-Web to safe-map. The fallback covers local builds.
const [ghOwner, ghRepo] = (
  process.env.GITHUB_REPOSITORY ?? "trinity-bytes/safe-map"
).split("/");

// https://astro.build/config
export default defineConfig({
  site: `https://${ghOwner}.github.io/${ghRepo}`,
  base: `/${ghRepo}/`,
  integrations: [react(), tailwind(), sitemap()],
  vite: {
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            leaflet: ["leaflet"],
          },
        },
      },
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
