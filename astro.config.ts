// @ts-check
import { defineConfig, fontProviders, envField } from "astro/config";
import icon from "astro-icon";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sitemap from "@astrojs/sitemap";

/*
TO DO:
Get astro prettier - DONE
Fix environment for builds - DONE
Fix image loading - DONE
Fix props for components - clean up and use global Props interfaces - https://docs.astro.build/en/guides/typescript/#component-props - DONE
Clean up all components - DONE
Make sure styles are pulling from proper sources - DONE
Fix astro favicon showing on mobile
Fix mobile menu issue - DONE
Env variables
Using pnpm?
New page template component? - DONE
Head component - DONE
Security headers - DONE
404 page - DONE
Fix yaml for CMS
Redirects - DONE
Cookies, site map, accessibility
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

  security: {
    csp: {
      algorithm: "SHA-512",
      directives: [
        // script-src and style-src are included by default: https://docs.astro.build/en/reference/configuration-reference/#securitycspdirectives
        "default-src 'self'",
        "connect-src 'self' https://api.web3forms.com https://hcaptcha.com https://*.hcaptcha.com",
        "frame-src 'self' https://hcaptcha.com https://*.hcaptcha.com",
        "base-uri 'self'",
        "form-action 'self' https://api.web3forms.com",
      ],
      scriptDirective: {
        resources: [
          "'self'",
          "https://static.cloudflareinsights.com",
          "https://web3forms.com",
          "https://js.hcaptcha.com",
          "https://hcaptcha.com",
          "https://*.hcaptcha.com",
        ],
      },
      styleDirective: {
        resources: [
          "'self'",
          "'unsafe-inline'",
          "https://hcaptcha.com",
          "https://*.hcaptcha.com",
        ],
      },
    },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Noto Sans",
      cssVariable: "--font-noto-sans",
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  ],
  env: {
    schema: {
      PUBLIC_WEB3FORMS_ACCESS_KEY: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },

  integrations: [icon(), sitemap()],
  vite: {
    plugins: isDev ? [watchExtraFiles()] : [],
  },
});
