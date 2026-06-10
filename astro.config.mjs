// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const watchExtraFiles = () => ({
  configureServer(server) {
    console.log("[watch-extra-files] Plugin loaded");

    const reload = (file) => {
      console.log(`[watch-extra-files] Reload triggered due to: ${file}`);
      server.ws.send({ type: "full-reload" });
    };

    const watchPaths = [
      path.resolve(__dirname, "src/assets/images"),
      path.resolve(__dirname, "src/content/blog"),
    ];

    server.watcher.add(watchPaths);
    console.log("[watch-extra-files] Watching paths:", watchPaths);

    server.watcher.on("add", reload);
    server.watcher.on("unlink", reload);
  },
  name: "watch-extra-files",
});

// import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  //adapter: cloudflare()
  output: "static",

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Bodoni Moda",
      cssVariable: "--font-bodoni-moda",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Cabin",
      cssVariable: "--font-cabin",
    },
  ],

  integrations: [icon()],
  vite: {
    plugins: [watchExtraFiles()],
  },
});
