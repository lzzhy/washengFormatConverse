import { Ref } from "vue";

// interface Service<TData, TParams> {
//   (params?: TParams): Promise<TData>;
// }

// interface Service<TData, TParams> {
//   (params: TParams): Promise<TData>;
// }

export type Service<TData, TParams> = ((id: string, params: TParams) => Promise<TData>) | ((params: TParams) => Promise<TData>) | ((params?: TParams) => Promise<TData>);

/**请求服务配置下 */
export interface Options<TData, TParams> {
  /**接口服务 */
  service: Service<TData, TParams>;
  /**请求发起之前触发函数 */
  onBefore?: (params?: TParams) => any;
  /**请求成功之后触发函数 */
  onSuccess?: (data: TData, params?: TParams) => any;
  /**请求失败之后触发函数 */
  onError?: (err: Error, params?: TParams) => any;
  /**请求结束之后触发函数 */
  onFinally?: (data?: TData, params?: TParams, err?: Error) => any;
  /**默认参数，每次请求都会携带，如果没有被merge掉 */
  defaultParams?: TParams;
  /**是否人工发起请求 */
  manual?: boolean;
  /**请求成功之后的提示信息 */
  successMessage?: string;
  /**请求是否开启Loading洁面 */
  fullScreenLoading?: boolean;
  /**是否使用外部定义的Loading 代理字段 */
  loadingRef?: Ref<boolean>;
  /**@TODO: 接口请求失败是否自动在发起请求，防抖，截流 等参数配置 */
}

/**请求服务返回值 */
export interface Result<TData, TParams> {
  data: Ref<TData | undefined>;
  error: Ref<Error | undefined>;
  loading: Ref<boolean>;
  run: (params?: TParams) => Promise<TData>;
  runPatch: (id: string, params?: TParams) => Promise<TData>;
  // runAsync?: (params?: TParams) => Promise<TData>;
}

/**插件定义 */
export interface Plugin {
  <TData, TParams>(coreOptions: Options<TData, TParams>, options?: any): void;
}

// interface RegisterPlugin {
//   install: Plugin;
//   config: any;
// }
export interface RegisterPlugin {
  <TData, TParams>(coreOptions: Options<TData, TParams>): void;
}
