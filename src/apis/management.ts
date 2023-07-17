import { request } from "@/vendors/axios";

/**
 * 获取用户列表
 */
export const apiUserManageList: ApiCollections.ApiMonitorUserManage.Request = function (data) {
  return request({
    url: "/api/manage/user/list",
    method: "post",
    data: data,
  });
};

/**
 * 获取用户来源列表
 */
export const apiUserOriginManageList: ApiCollections.ApiMonitorUserManage.Request = function (data) {
  return request({
    url: "/api/manage/user/login/source",
    method: "post",
    data: data,
  });
};

/**
 * 获取用户登录列表
 */
export const apiUserLoginManageList: ApiCollections.ApiMonitorUserManage.Request = function (data) {
  return request({
    url: "/api/manage/user/login/record",
    method: "post",
    data: data,
  });
};
