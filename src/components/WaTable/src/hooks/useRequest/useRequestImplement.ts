import { ref } from "vue";
import { Options, RegisterPlugin, Result } from "./types";
import { transformToRecord } from "./utils";

/**请求服务Hook */
// export interface UseRequest<TData, TParams> {
//   (options: Options<TData, TParams>): Result<TData, TParams>;
// }

// export type UseRequest = <TData, TParams>(options: Options<TData, TParams>) => Result<TData, TParams>;

export function useRequestImplement<TData = any, TParams = any>(options: Options<TData, TParams>, plugins: RegisterPlugin[]): Result<TData, TParams> {
  /**初始化注册插件 */
  plugins.forEach((install) => install(options));

  const { service, onBefore, onSuccess, onError, onFinally, loadingRef = ref(false), defaultParams, manual = false } = options;

  const data = ref<TData>();
  const loading = loadingRef;
  const error = ref<Error | null>(null);

  // result.loading = loadingRef || ref(false);
  // result.data = ref(null);

  /**定义接口执行函数 */
  async function run(params?: TParams & Recordable) {
    loading.value = true;
    const generateDefaultParams: TParams | Recordable = await transformToRecord(defaultParams);
    params = Object.assign({}, generateDefaultParams as TParams, params || {});
    if (error.value) error.value = null;
    if (onBefore) params = onBefore(params);

    try {
      data.value = await service(params);
      if (onSuccess) data.value = onSuccess(data.value, params) || data.value;
      // if (onFinally) onFinally(data.value, params);

      loading.value = false;
      return data.value;
    } catch (error) {
      /**如果接口异常，抛出Error */
      if (onError) onError(error, params);
      // if (onFinally) onFinally(data.value, params, error);

      loading.value = false;
      throw error;
    } finally {
      if (onFinally) onFinally(data.value, params, error);
    }
  }

  if (!manual) run();

  return {
    data,
    loading,
    error,
    run,
  };
}

// Object.assign(useRequestImplement, {
//   plugins: [],
//   register(plugin: Plugin, config?: any) {
//     (useRequestImplement as any).plugins.push({ install: plugin, config });
//   },
// });
