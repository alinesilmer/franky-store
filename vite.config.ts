// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (source: string, filename: string) => {
          const f = filename.replace(/\\/g, "/");
          const skip =
            /\/src\/styles\/_variables\.scss$/i.test(f) ||
            /\/src\/styles\/_mixins\.scss$/i.test(f) ||
            /\/src\/styles\/_functions\.scss$/i.test(f);
          if (skip) return source;

          return `
@use "@/styles/_variables.scss" as v;
@use "@/styles/_mixins.scss"   as m;
${source}`;
        },
      },
    },
  },
});
