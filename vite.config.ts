import process from "node:process";
import preact from "@preact/preset-vite";
import AutoImport from "unplugin-auto-import/vite";
import UnoCSS from "unocss/vite";
import viteImagemin from "vite-plugin-imagemin";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import legacy from "@vitejs/plugin-legacy";
import path from 'path';

export default defineConfig({
    base: "./",
    define: {
        __VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
      alias: {
          '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
    build: {
        sourcemap: true,
        rollupOptions: {
            // https://rollupjs.org/configuration-options/
            output: {
                manualChunks: {
                    preact: ["preact", "react", "react-router-dom"],
                    "@openreplay": ["@openreplay/tracker"],
                    lib: ["numeral", "qrcode-generator", "dayjs", "clipboard-polyfill"],
                    swiper: ["swiper"],
                },
            },
        },
    },
    plugins: [
        AutoImport({
            dirs: ["./src/global/**"],
        }),
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 20,
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
            },
            svgo: {
                plugins: [
                    {
                        name: "removeViewBox",
                    },
                    {
                        name: "removeEmptyAttrs",
                        active: false,
                    },
                ],
            },
        }),
        UnoCSS(),
        preact(),
        visualizer({
            open: process.env.SOURCE_MAP === "true",
            gzipSize: true,
            brotliSize: true,
        }),
        legacy({
            // https://browsersl.ist/#q=%3E+0.06%25%2Cnot+dead
            targets: ["> 0.06%,not dead"],
            renderModernChunks: false,
        }),
    ],
});
