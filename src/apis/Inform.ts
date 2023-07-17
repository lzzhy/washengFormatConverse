import { request } from "@/vendors/axios";

/**
 * 获取消息列表
 */
export const apiGetNoticeMessage: ApiCollections.ApiNoticeDetail.Request = function (data) {
  return request({
    url: "/api/user/notice/getNoticeMessage",
    method: "post",
    data: data,
  });
};

/**
 * 消息详情接口
 */
export const apiNoticeDetail: ApiCollections.ApiNoticeDetail.Request = function (data) {
  return request({
    url: "/api/user/notice/detail",
    method: "post",
    data: data,
  });
};

/**
 * 全部已读
 */
export const apiNoticeRead: ApiCollections.ApiNoticeDetail.Request = function (data) {
  return request({
    url: "/api/user/notice/read",
    method: "post",
    data: data,
  });
};
