const excludes = [
  "/Login/index", //  登录
  "/SignUp/index", // 注册
  "/ResetAccount/index", //忘记密码
];
/**导入page下面的所有vue组件
 * 根据key值来按需加载
 */
export const createGetTotalVueComponents = () => {
  const modules = import.meta.glob(`@/pages/*/index.vue`);
  const components: { [key: string]: any } = {};
  for (const path in modules) {
    if (excludes.includes(path)) continue;
    // const result = path.match(/.*\/(.+).vue$/);
    const result = path.match(/\/pages(.+).vue/)![1] as string;
    if (result) {
      const currentComponent = modules[path];
      components[result] = currentComponent;
    }
  }

  return (key: string) => {
    return components[key];
  };
};
