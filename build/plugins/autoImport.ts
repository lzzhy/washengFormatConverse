import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
// loader helpers
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import { resolve } from "path";

/**@see https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5 */
export default [
  AutoImport({
    // Auto import functions from Vue, e.g. ref, reactive, toRef...
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    imports: [
      "vue",
      "vue-router",
      "@vueuse/core",
      "pinia",
      {
        "@/vendors/store/modules/app": ["useAppStore", "useAppStoreWithout"],
      },
      {
        "@/vendors/store/modules/user": ["useUserStore", "useUserStoreWithout"],
      },
      {
        "@/vendors/store/modules/project": ["useProjectStore", "useProjectStoreWithout"],
      },
      {
        "@/utils": ["updateObj", "awaitWrap"],
      },
      {
        "@/hooks": ["useRequest", "useFormContext"],
      },
      {
        "@/components/Modal": ["Dialog"],
      },
      {
        "@/utils": ["createImgImport"],
      },
      {
        "@/i18n": ["$t"],
      },
    ],
    dts: "types/auto-imports.d.ts",
    eslintrc: {
      enabled: true,
    },
    resolvers: [
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      ElementPlusResolver(), // Auto import icon components
      // 自动导入图标组件
      IconsResolver({
        prefix: "Icon",
      }),
    ],
  }),
  Components({
    resolvers: [
      /**
       * Auto register Element Plus components
       * 自动导入 Element Plus 组件
       * @see https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/element-ui.ts#L13
       */
      ElementPlusResolver({
        // importStyle: "sass",
        directives: true,
        importStyle: false,
      }),
      // Auto register icon components
      // 自动注册图标组件
      IconsResolver({ enabledCollections: ["ep"] }),
    ],
    dirs: ["src/components"],
    extensions: ["vue"],
    dts: "types/components.d.ts",
  }),
  Icons({
    autoInstall: true,
    customCollections: {
      // a helper to load icons from the file system
      // files under `./assets/icons` with `.svg` extension will be loaded as it's file name
      // you can also provide a transform callback to change each icon (optional)
      "my-yet-other-icons": FileSystemIconLoader(resolve(__dirname, "src/assets/icons"), (svg) => {
        console.log("🚀 -> file: autoImport.ts -> line 41 ->:FileSystemIconLoader -> svg", svg);
        return svg.replace(/^<svg /, '<svg fill="currentColor" ');
      }),
    },
  }),
];
