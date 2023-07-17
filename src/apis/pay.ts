import { request } from "@/vendors/axios";
import { useUserInfo } from "@/vendors/axios/implement";

/**
 * 获取order所需信息
 */
export const apiTeamGetOrder: ApiCollections.ApiTeamGetOrder.Request = function (data) {
  const { getToken } = useUserInfo();
  return request(
    {
      url: "/api/team/getOrder",
      method: "post",
      data: data,
      headers: {
        "x-authorization": getToken(),
      },
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

/**
 * 获取支付状态
 */
export const apiTeamGetPaymentStatus: ApiCollections.apiTeamPaymentStatus.Request = function (data) {
  return request(
    {
      url: "/api/team/getPaymentStatus",
      method: "post",
      data: data,
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

/**
 * 升级团队：查询是否还在升级中
 */
export const apiTeamIsUpdating: ApiCollections.apiTeamIsUpdatings.Request = function (data) {
  return request(
    {
      url: "/api/team/isUpdating",
      method: "post",
      data: data,
    },
    {
      isReturnNativeResponse: true,
    }
  );
};
