import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  presetIcons,
} from "unocss";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";
import { presetDaisy } from "unocss-preset-daisy";
import { beeTheme } from "./daisy.themes";

export default defineConfig({
  mode: "per-module",
  theme: {
    colors: {
      primary: "#FFC04D",
      secondary: "#A894FF",
    },
  },
  presets: [
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetTypography(),
    presetDaisy({
      // styled: false,
      themes: [{ beeTheme }],
    }),
    presetIcons({
      collections: {
        bees: FileSystemIconLoader("./public/icons", (svg) =>
          svg.replace(/#fff/, "currentColor")
        ),
        bi: () => import("@iconify-json/bi/icons.json").then((i) => i.default),
      },
    }),
  ],
  rules: [
    [
      /^bg-url-(.*)$/,
      ([_, d]) => {
        return {
          background: `url('../${d}')`,
          "background-size": "100% 100%",
          "background-repeat": "no-repeat",
        };
      },
    ],
  ],
});
