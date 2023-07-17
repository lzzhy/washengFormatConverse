import type { App } from "vue";
import router from "./route";
// import store from "./store";
import i18n from "./i18n";
import { createHead } from "@vueuse/head";
import { setupRouterGuard } from "./route/guard";
/**导入svg */
import "./icons/index";
/**hack element-plus */
import "./element-plus";

/**安装全局插件 */
export default (app: App) => {
  // Configure store
  // 配置 store
  // app.use(store);

  // Configure routing
  // 配置路由
  app.use(router);

  app.use(i18n);

  // router-guard
  // 路由守卫
  setupRouterGuard(router);

  const head = createHead();
  app.use(head);
};
