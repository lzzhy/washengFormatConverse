import { request } from "@/vendors/axios";
/**
 * 修改白板信息
 */
export const apiGroupTransfer: ApiCollections.ApiGroupTransferPost.Request = function (data) {
  return request({
    url: "/api/group/transfer",
    method: "post",
    data: data,
  });
};
