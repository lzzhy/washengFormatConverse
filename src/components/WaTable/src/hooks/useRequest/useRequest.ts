import { useRequestImplement } from "./useRequestImplement";
import { loadingPlugin } from "./plugins/loadingService";
import { RegisterPlugin, Options } from "./types";

/**@refer https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useRequest/src/useRequest.ts */
function useRequest<TData = any, TParams = any>(options: Options<TData, TParams>, plugins?: RegisterPlugin[]) {
  return useRequestImplement(options, [...(plugins || []), loadingPlugin]);
}

/**@example with plugin config */
// function useRequest<TData = any, TParams = any>(options: Options<TData, TParams>, plugins: RegisterPlugin[]) {
//   return useRequestImplement(options, [...(plugins || []), (core: any) => loadingPlugin(core, { fullscreen: false })]);
// }

export default useRequest;
