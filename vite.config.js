import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { globSync } from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import copy from "rollup-plugin-copy";
export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
      },
      input: Object.fromEntries(
        globSync("src/**/*.html").map((file) => [
          // This remove `src/` as well as the file extension from each
          // file, so e.g. src/nested/foo.js becomes nested/foo
          path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length)
          ),
          // This expands the relative paths to absolute paths, so e.g.
          // src/nested/foo becomes /project/src/nested/foo.js
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
    },
  },
  resolve: {
    alias: {
      "@": "/src", // This helps with imports
    },
  },
  server: {
    host: true,
  },
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
  plugins: [
    tailwindcss(),
    copy({
      targets: [{ src: "src/assets/images/*", dest: "dist/assets/images" }],
      hook: "writeBundle", // copy after bundle has been written
    }),
  ],
});
