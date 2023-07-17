import type { Menu } from "@/types";
import { RouteRecordRaw, RouterView } from "vue-router";
import { createVNode } from "vue";
import { createGetTotalVueComponents } from "./utils";
import { wrapperAsyncComponent } from "@/layouts/Loading";

const findComponents = createGetTotalVueComponents();

function joinPath(p: string, n: string) {
  const isAbsolutePath = (path: string) => /^\//.test(path);
  if (isAbsolutePath(n)) {
    return n;
  } else if (!!n) {
    return [p, n].join("/");
  } else {
    return "";
  }
}

function createComponent({ component, isAsync }: Menu) {
  if (!component) {
    return createVNode(RouterView);
  } else {
    /**@see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations */
    // return () => import(`../../pages/${component.replace(/^\//, "")}.vue`);
    const currentComponent = findComponents(component);
    return isAsync ? wrapperAsyncComponent(currentComponent) : currentComponent;
  }
}

// 生成可访问的路由表
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateRoutes = (routes: Menu[], { name: parentName, path: parentPath }: any = { name: "", path: "/app" }): RouteRecordRaw[] => {
  return routes.reduce((prev, menu) => {
    const { type, isBulitIn, path, name, title, icon, redirect, hidden, fullScreen, noCache, public: _public, children = [] } = menu;
    const currentName = `${parentName ? parentName + "-" : parentName}${name}`;
    // 是菜单项就注册到路由进去
    if (type === "MENU") {
      const currentMenu = {
        path: joinPath(parentPath, path),
        component: isBulitIn ? null : (createComponent(menu) as any),
        name: currentName,
        props: true,
        redirect,
        meta: {
          title,
          icon,
          hidden,
          type,
          fullScreen,
          noCache,
          public: _public,
        },
      };
      const processChildren = children?.length ? generateRoutes(children, currentMenu) : [];
      prev.push({ ...currentMenu, children: processChildren });
    }
    return prev;
  }, [] as RouteRecordRaw[]);
};
