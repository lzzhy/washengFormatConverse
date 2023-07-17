import { Options } from "../types";
import { ElMessage, ElMessageBoxOptions as PluginOptions } from "element-plus";

export type pluginOptions = Partial<PluginOptions>;

/**扩展message插件 */
export function messagePlugin<TData, TParams>(coreOptions: Options<TData, TParams>, options?: pluginOptions) {
  if (!coreOptions.successMessage) return;
  const { onSuccess } = coreOptions;

  function interpreSuccess(data: TData, params?: TParams) {
    ElMessage.success(coreOptions.successMessage);
    onSuccess && onSuccess(data, params);
  }

  coreOptions.onSuccess = interpreSuccess;
}
