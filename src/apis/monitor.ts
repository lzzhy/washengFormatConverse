import { request } from "@/vendors/axios";

/**
 * 获取列表
 */
export const apiReportList: ApiCollections.ApiMonitorGetDAU.Request = function (data) {
  return request({
    url: "/monitor/api/report",
    method: "get",
    params: data,
  });
};

/**
 * 获取日活量
 */
export const apiGetDAU: ApiCollections.ApiMonitorGetDAU.Request = function (data) {
  return request({
    url: "/monitor/api/report/dau",
    method: "get",
    params: data,
  });
};

/**
 * 获取用户日活量具体活动详情
 */
export const apiGetDAUDetail: ApiCollections.ApiMonitorGetDAU.Request = function (data) {
  return request({
    url: `/monitor/api/report/dau/${data?.id}`,
    method: "get",
    params: data,
  });
};

/**
 * 获取月活量
 */
export const apiGetMAU: ApiCollections.ApiMonitorGetDAU.Request = function (data) {
  return request({
    url: "/monitor/api/report/mau",
    method: "get",
    params: data,
  });
};

/**
 * 获取用户月活量具体活动详情
 */
export const apiGetMAUDetail: ApiCollections.ApiMonitorGetDAU.Request = function (data) {
  return request({
    url: `/monitor/api/report/mau/${data?.id}`,
    method: "get",
    params: data,
  });
};
