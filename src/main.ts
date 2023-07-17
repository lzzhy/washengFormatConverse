import App from "./App.vue";
import "./styles/index.scss";
import "./styles/index.postcss";
import "./assets/css/common/index.scss";
import prePlugins from "@/vendors/prePlugins";
import { Local, loadLanguageAsync } from "./i18n";

const getAfterPlugins = () => import("@/vendors/afterPlugins");

/**如果之前登陆过我们系统，是老版本的
 * 清空老版本的所有数据
 */
// function tryClearOldVersionStorage() {
//   const userString = localStorage.getItem("user");
//   if (typeof userString === "string") {
//     try {
//       const userObj = JSON.parse(userString);
//       if (userObj.platformType * 1 == 0) {
//         localStorage.clear();
//       }
//     } catch (error) {}
//   }
// }
// tryClearOldVersionStorage();

const app = createApp(App);
// app.use;

prePlugins(app);

const appStore = useAppStore();
loadLanguageAsync(appStore.locale).then(() => {
  getAfterPlugins().then(({ default: afterPlugins }) => {
    afterPlugins(app);
    app.mount("#app");
  });
});

export { app };
