import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import uni from "@dcloudio/vite-plugin-uni";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni({}), UnoCSS({ mode: "vue-scoped" }), eslint()],
  server: {
    cors: true,
    proxy: {
      "/domain": {
        target: "",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/domain/, ""),
      },
    },
  },
  build: {
    target: "ES2022",
  },
});