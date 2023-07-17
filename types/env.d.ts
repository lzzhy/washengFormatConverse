/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<any, {}, any>;
  export default component;
}

declare module 'element-plus/*';

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  // Only string type here to avoid hard to debug cast problems in your components!
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_BUILD_EPOCH?: string;
  // 项目标题
  readonly VITE_APP_TITLE: string;
  // 接口地址
  readonly VITE_REMOTE_API: string;
  // nginx部署根目录
  readonly VITE_APP_NGINX_URL: string;
  // 项目本地化
  readonly VITE_APP_LOCAL: string;
  // 项目DOMAIN
  readonly VITE_APP_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : any, T>;

type Nullable<T> = { [P in keyof T]: T[P] | null };

declare module md5.js {}