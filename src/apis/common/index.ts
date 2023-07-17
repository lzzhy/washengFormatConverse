import { request } from "@/vendors/axios/index";

/**
 * 获取服务端时间
 */
export const getST = () => {
  return request({ url: "/api/support/ts", method: "post" }, { isTransformResponse: false });
};
