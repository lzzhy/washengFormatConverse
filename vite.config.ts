import { resolve } from "path";
import { ConfigEnv, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { configHtmlPlugin, configServerOptions } from "./build";
import autoImport from "./build/plugins/autoImport";
import inspect from "vite-plugin-inspect";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { splitVendorChunkPlugin } from "vite";

process.env.VITE_APP_VERSION = pkg.version;
if (process.env.NODE_ENV === "production") {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString();
}

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const viteEnv = loadEnv(mode, root) as ImportMetaEnv;

  return {
    base: viteEnv.VITE_APP_NGINX_URL,
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@use "@/styles/ui.scss" as *;`,
    //     },
    //   },
    // },
    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
      }),
      vue({
        // script: {
        //   refSugar: true,
        // },
      }),
      vueJsx(),
      splitVendorChunkPlugin(),
      configHtmlPlugin(viteEnv),
      // ...(mode === "development" ? [inspect()] : [configHtmlPlugin(viteEnv)]),
      ...autoImport,
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@stores": resolve(__dirname, "src/vendors/store/modules"),
      },
    },
    build: {
      assetsDir: "static",
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ["vue"],
            "element-plus": ["element-plus"],
          },
          // manualChunks(id) {
          //   console.log("🚀 -> file: vite.config.ts -> line 45 -> manualChunks -> id", id);
          //   if (id.includes("node_modules")) {
          //     return id.toString().split("node_modules/")[2].split("/")[0].toString();
          //   }
          // },
        },
      },

      // 默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。
      // minify: false,
    },
    server: configServerOptions(viteEnv),
  };
};
