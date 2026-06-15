// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";
import path from "node:path";
import { fileURLToPath } from "node:url";

/*
TO DO:
Get astro prettier - DONE
Fix environment for builds - DONE
Fix image loading - DONE
Fix props for components - clean up and use global Props interfaces - https://docs.astro.build/en/guides/typescript/#component-props - DONE
Clean up all components
Make sure styles are pulling from proper sources
Fix astro favicon showing on mobile
Fix mobile menu issue
Env variables
Using pnpm?
New page template component?
Head component - DONE
*/

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.argv.includes("dev");

// This custom plugin watches extra files and triggers a full reload when they change. Only used in development environment.
const watchExtraFiles = () => ({
  name: "watch-extra-files",

  apply: "serve" as const,

  configureServer(server: any) {
    const s = server;

    const reload = (file: any) => {
      console.log(`[watch-extra-files] Reload triggered due to: ${file}`);
      s.ws.send({ type: "full-reload" });
    };

    const watchPaths = [
      path.resolve(__dirname, "src/assets/images"),
      path.resolve(__dirname, "src/content/blog"),
    ];

    s.watcher.add(watchPaths);
    s.watcher.on("add", reload);
    s.watcher.on("unlink", reload);
  },
});

// https://astro.build/config
export default defineConfig({
  site: "https://noelwebstudio.com",

  output: "static",

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Bodoni Moda",
      cssVariable: "--font-bodoni-moda",
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Cabin",
      cssVariable: "--font-cabin",
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Noto Sans",
      cssVariable: "--font-noto-sans",
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  ],

  integrations: [icon()],
  vite: {
    plugins: isDev ? [watchExtraFiles()] : [],
  },
});
