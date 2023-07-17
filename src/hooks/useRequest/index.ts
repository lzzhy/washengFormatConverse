import { default as _useRequest } from "./useRequest";
export { useRequestImplement } from "./baseRequest";
export * from "./types";

/**每次执行 useRequest 都会去 安装插件， 怎么进行优化
 * 插件 默认注册会影响 所有的 useRequest
 */

export const useRequest = _useRequest;
