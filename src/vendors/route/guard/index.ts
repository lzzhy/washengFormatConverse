/*
 * @Author: lich
 * @Date: 2022-08-07 23:27:41
 * @Last Modified by: lich
 * @Last Modified time: 2022-11-17 10:56:52
 * @description: 路由守卫配置
 * @see: https://github.com/vbenjs/vue-vben-admin/blob/dac9301af485a32583e5b3aa8bc667ead514ae17/src/router/guard/index.ts#L17
 */

import type { RouteLocationNormalized, Router } from "vue-router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUserStore } from "@/vendors/store/modules/user";
import { awaitWrap } from "@/utils";

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  //   createPageGuard(router);
  //   createPageLoadingGuard(router);
  createScrollGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
}

// Routing switch back to the top
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
    return true;
  });
}

// Routing switch loading progress
export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    nProgress.done();
    return true;
  });
}

// Routing permission guard
/**
 * 1. 公开路由，立即放行
 * 2. 私有路由
 *    2.1 存在token，证明之前登陆过，则根据token获取用户信息
 *    2.2 不存在token，前往登陆页面
 * @param router
 */
function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const { path, query, params } = to;
    // 如果当前路由是 公开路由，则进行放行
    if (to.meta.public) {
      return next();
    }

    const { loginAuto, isLogined, token } = useUserStore();
    if (isLogined) {
      loginAuto();
      next();
      return;
    }

    if (!token) {
      // 重定向外部链接
      if (query.website) {
        let link = `/login`;
        const href = window.location.href;
        link += `?redirect=${encodeURIComponent(href)}`;
        next(link);
      } else {
        next("/login");
      }
      return;
    }

    // 解决第一次访问页面时，因为路由是异步更新的，所以没有初始化到。 重新进行一次匹配渲染
    const [err] = await awaitWrap(loginAuto());
    if (!err) {
      next(to);
      // // 当code不是用户信息认证失败时，跳转登录权限展示页
      // // 如果时401 直接跳转登录逻辑
      // if (err.code !== 401) {
      //   next("/401?msg=" + err.msg);
      // }
    }
    //  else {
    //   next(to);
    // }
  });
}

// // Used to handle page loading status
// function createPageLoadingGuard() {
//   // @TODO: Used to handle page loading status
// }
