// uno.config.ts
import { defineConfig, presetIcons } from "unocss";
import { presetUni } from "@uni-helper/unocss-preset-uni";

export default defineConfig({
  presets: [
    presetIcons(),
    presetUni(),
  ],
});