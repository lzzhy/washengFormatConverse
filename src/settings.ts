export default {
  /**标题 */
  title: import.meta.env.VITE_APP_TITLE,
  /**是否具有导航栏 */
  hasNavbar: true,

  /**当前应用的版本
   * @description
   * 1.大的版本号迭代，做了不兼容旧版的修改时要更新 MAJOR 版本号
   *
   * 2.小版本迭代，发生兼容旧版API的修改或功能更新时，更新MINOR版本号
   *
   * 3.修订版本号，一般针对修复 BUG 的版本号
   */
  version: import.meta.env.VITE_APP_VERSION,

  /**如果用户信息不存在需要跳转的页面 */
  redirectUrl: "/login",

  /**部署根目录 */
  projectDicUrl: import.meta.env.VITE_APP_NGINX_URL || "/",

  /**环境信息 */
  local: import.meta.env.VITE_APP_LOCAL,
  /**项目DOMAIN*/
  domain: import.meta.env.VITE_APP_DOMAIN,

  /**axios配置 */
  baseURL: "", //import.meta.env.VITE_REMOTE_API,
  urlPrefix: import.meta.env.VITE_URL_PREFIX || "",

  /**核心画板地址 */
  canvasUrl: import.meta.env.VITE_CANVAS_URL,

  /**production or development */
  environment: import.meta.env.MODE,

  /**是否启用pay模块
   *  cc为国内站点，无支付功能按旧逻辑；us为海外站点，有支付功能
   */
  enablePay: import.meta.env.MODE == "us" || import.meta.env.MODE == "development",

  // 微信登录
  enableWechat: import.meta.env.VITE_APP_LOCAL === "zh-cn",
};
