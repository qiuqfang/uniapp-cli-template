import { ConfigEnv, defineConfig, loadEnv } from "vite";
import UnoCSS from "unocss/vite";
import uni from "@dcloudio/vite-plugin-uni";
import eslint from "vite-plugin-eslint";
import obfuscatorPlugin from "rollup-plugin-javascript-obfuscator";

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
  const env = loadEnv(config.mode, process.cwd());
  console.log(config, env);

  return {
    plugins: [
      uni({}),
      UnoCSS({ mode: "vue-scoped" }),
      eslint(),
      config.mode === "production" && obfuscatorPlugin({ compact: true }),
    ],
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
