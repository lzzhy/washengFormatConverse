// 项目代理设置
// https://github.com/chimurai/http-proxy-middleware

import { ServerOptions } from "vite";

export function configServerOptions(env: ImportMetaEnv = import.meta.env): ServerOptions {
  console.log("🚀 -> file: serviceProxy.ts:23 -> configServerOptions -> env.VITE_REMOTE_API", env.VITE_REMOTE_API);

  return {
    host: "0.0.0.0",
    port: 4200,
    proxy: {
      "/us/api": {
        target: env.VITE_REMOTE_US_API,
        rewrite(path) {
          return path.replace(/^\/us\/api/, "");
        },
        changeOrigin: true,
      },
      "/cc/api": {
        target: env.VITE_REMOTE_CC_API,
        rewrite(path) {
          return path.replace(/^\/cc\/api/, "");
        },
        changeOrigin: true,
      },
      // 埋点
      "/monitor/api": {
        target: "http://54.212.57.42:7878",
        rewrite(path) {
          return path.replace(/^\/monitor/, "");
        },
        changeOrigin: true,
      },
      // "/api/projectManagement": {
      //   target: env.VITE_REMOTE_API__PROJECT,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      //   changeOrigin: true,
      // },
    },
  };
}
