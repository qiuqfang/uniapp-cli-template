import { ConfigEnv, defineConfig, loadEnv } from "vite";
import UnoCSS from "unocss/vite";
import uni from "@dcloudio/vite-plugin-uni";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
  const env = loadEnv(config.mode, process.cwd());
  console.log(config, env);

  return {
    plugins: [uni({}), UnoCSS({ mode: "vue-scoped" }), eslint()],
    server: {
      cors: true,
      proxy: {
        [env.VITE_PROXY]: {
          target: env.VITE_REQUEST_HOST,
          changeOrigin: true,
        },
      },
    },
    build: {
      target: "ES2022",
    },
  };
});
