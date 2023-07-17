import { Options } from "../types";
import { ElLoadingService, LoadingOptionsResolved } from "element-plus";

export type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, "target" | "parent"> & {
    target: string | HTMLElement;
    body: boolean;
  }
>;

/**扩展loading插件 */
export function loadingPlugin<TData, TParams>(coreOptions: Options<TData, TParams>, options?: LoadingOptions) {
  if (!coreOptions.fullScreenLoading) return;
  const { onBefore, onFinally } = coreOptions;

  let instance: any;
  function interpretBefore(params?: TParams) {
    instance = ElLoadingService({
      fullscreen: true,
      lock: true,
      visible: true,
      ...options,
    });
    if (onBefore) onBefore(params);
  }

  function interpreFinally(data?: TData, params?: TParams, err?: Error) {
    instance.close();
    if (onFinally) onFinally(data, params, err);
  }

  coreOptions.onBefore = interpretBefore;
  coreOptions.onFinally = interpreFinally;
}
