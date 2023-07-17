import { Options } from "../types";
import { ElLoadingService, LoadingOptions as ElLoadingOptions } from "element-plus";

export type LoadingOptions = Partial<ElLoadingOptions>;

/**扩展loading插件 */
export function loadingPlugin<TData, TParams>(coreOptions: Options<TData, TParams>, options?: LoadingOptions) {
  if (!coreOptions.fullScreenLoading) return;
  const { onBefore, onFinally } = coreOptions;

  let instance: any;
  function interpretBefore(params?: TParams) {
    instance = ElLoadingService({});
    if (onBefore) onBefore(params);
  }

  function interpreFinally(data?: TData, params?: TParams, err?: Error) {
    instance.close();
    if (onFinally) onFinally(data, params, err);
  }

  coreOptions.onBefore = interpretBefore;
  coreOptions.onFinally = interpreFinally;
}
