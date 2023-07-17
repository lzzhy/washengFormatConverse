import type { App } from "vue";
import store from "./store";

/**预先安装全局插件，在挂载之前加载 */
export default (app: App) => {
  // Configure store
  // 配置 store
  app.use(store);
};
