/**菜单的定义
 * @description
 * 注意事项：同级的name要是唯一的，实际使用中，
 * 每一级的name都是通过上一级的name用-拼接而来,会通过动态导入生成规则），
 * 这样可以保证每一个菜单或者按钮项都有唯一的标识。
 * 后续不论是做按钮权限控制还是做菜单的缓存，都与此拼接的name有关。
 * 我们注意此时没有id，后续会讲到根据name全称使用md5来生成id。
 */
export interface Menu {
  /** 菜单标题 */
  title: string;
  /**对应路由的name,也是页面或者按钮的唯一标识 */
  name: string;
  /**module 代表模块(子系统，例如APP和后台管理系统)，MENU代表菜单,BUTTON代表按钮 */
  type: "MODULE" | "MENU" | "BUTTON";
  /**路径，对应路由的path */
  path: string;
  /**重定向，对应路由的redirect */
  redirect: string;
  /**菜单或者按钮的图标 */
  icon: string;
  /**当作为菜单的时候,对应菜单的项目加载组件 */
  component: string;
  /**当作为菜单的时候是否在左侧菜单树隐藏 */
  hidden: 0 | 1;
  /**当作为菜单的时候该菜单是否缓存 */
  noCache: 0 | 1;
  /**当作为菜单的时候是否全屏显示当前菜单 */
  fullScreen: 0 | 1;
  /**子菜单 */
  children: Menu[];
  /**当前菜单是否是公开的，如果时则不需要token就能访问 */
  public: boolean;
  /**是否是内置路由 */
  isBulitIn: boolean;
  /**是否为异步组件 */
  isAsync: boolean;
}

export type RouterMeta = {
  title: string;
  icon: string;
  hidden: boolean;
  type: Menu["type"];
  fullScreen: boolean;
  noCache: boolean;
};
