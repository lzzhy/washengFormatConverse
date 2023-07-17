import { $t } from "@/i18n";
/*
 * @Author: lich
 * @Date: 2022-08-07 22:29:48
 * @Last Modified by: lich
 * @Last Modified time: 2023-01-09 18:42:16
 * @description: 路由配置的地方
 */

import type { RouteRecordRaw } from "vue-router";

export const projectRoutes: RouteRecordRaw[] = [
  {
    meta: {
      public: true,
    },
    name: "",
    path: "",
    redirect: "/getDAU",
  },
  {
    path: "/admin",
    redirect: "/getDAU",
    name: "admin",
    component: () => import("@/layouts/AdminV3/index.vue"),
    children: [
      {
        meta: {
          title: $t("shouye_db1c89"),
        },
        name: "Misinformation",
        path: "/misinformation-list",
        component: () => import("@/pages/misinformation/index.vue"),
      },
      {
        meta: {
          title: "日活量",
        },
        name: "getDAU",
        path: "/getDAU",
        component: () => import("@/pages/Activity/DAU.vue"),
      },
      {
        meta: {
          title: "月活量",
        },
        name: "getMAU",
        path: "/getMAU",
        component: () => import("@/pages/Activity/MAU.vue"),
      },
      {
        meta: {
          title: "用户管理",
        },
        name: "userManagement",
        path: "/userManagement",
        component: () => import("@/pages/management/userManage.vue"),
      },
      {
        meta: {
          title: "用户登录管理",
        },
        name: "userLoginManagement",
        path: "/userLoginManagement",
        component: () => import("@/pages/management/userLoginManagement.vue"),
      },
      {
        meta: {
          title: "大屏激活用户",
        },
        name: "userOriginManagement",
        path: "/userOriginManagement",
        component: () => import("@/pages/management/userOriginManagement.vue"),
      },
    ],
  },
  {
    meta: {
      title: $t("denglu_bb1c73"),
      public: true,
    },
    name: "Login",
    path: "/login",
    component: () => import("@/pages/User/Login/index.vue"),
  },
  {
    meta: {
      title: $t("denglu_bb1c73"),
      public: true,
    },
    name: "",
    path: "/formatConverse",
    component: () => import("@/pages/formatConverse/index.vue"),
  },
];
