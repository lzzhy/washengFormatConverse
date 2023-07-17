import { ref } from "vue";
import { Options, RegisterPlugin, Result } from "./types";

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
  const error = ref<Error>();

  // result.loading = loadingRef || ref(false);
  // result.data = ref(null);

  /**定义接口执行函数 */
  async function run(params?: TParams) {
    if (error.value) error.value = void 0;
    if (onBefore) onBefore(params);
    loading.value = true;
    try {
      data.value = await service(Object.assign({}, defaultParams, params || {}));
      if (onSuccess) {
        const transferData = onSuccess(toRaw(data.value), params);
        if (transferData) {
          data.value = transferData;
        }
      }
      if (onFinally) onFinally(toRaw(data.value), params);

      loading.value = false;
      return toRaw(data.value);
    } catch (error) {
      data.value = void 0;
      if (error instanceof Error === false) {
        error = new Error((error as string) || "");
      }
      /**如果接口异常，抛出Error */
      if (onError) onError(error as any, params);
      if (onFinally) onFinally(toRaw(data.value), params, error as any);

      loading.value = false;
      throw error as any;
    }
  }

  /**定义接口执行函数 */
  async function runPatch(id: string, params?: TParams) {
    if (error.value) error.value = void 0;
    if (onBefore) onBefore(params);
    loading.value = true;
    try {
      data.value = await service(id, Object.assign({}, defaultParams, params || {}));
      if (onSuccess) {
        const transferData = onSuccess(toRaw(data.value), params);
        if (transferData) {
          data.value = transferData;
        }
      }
      if (onFinally) onFinally(toRaw(data.value), params);

      loading.value = false;
      return toRaw(data.value);
    } catch (error) {
      data.value = void 0;
      if (error instanceof Error === false) {
        error = new Error((error as string) || "");
      }
      /**如果接口异常，抛出Error */
      if (onError) onError(error as any, params);
      if (onFinally) onFinally(toRaw(data.value), params, error as any);

      loading.value = false;
      throw error as any;
    }
  }

  if (!manual) run();

  return {
    data,
    loading,
    error,
    run,
    runPatch,
  };
}
