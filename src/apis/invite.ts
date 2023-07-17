import { request } from "@/vendors/axios";
import vm from "@/utils/vm";

/**
 * 发送邀请链接
 */
export const apiInviteOpenCreate: ApiCollections.ApiInviteOpenCreate.Request = function (data) {
  return request({
    url: "/api/invite/open/create",
    method: "post",
    data: data,
  });
};

/**
 * 生成白板邀请码
 */
export const apiInviteOpenGenerateInvitationCode: ApiCollections.ApiInviteOpenGenerateInvitationCode.Request = function (data) {
  return request({
    url: "/api/invite/open/generateInvitationCode",
    method: "post",
    data: data,
  });
};

/**
 * 加入白板
 */
export const apiInviteMeetingLargeScreenCode: ApiCollections.ApiInviteMeetingLargeScreenCodePost.Request = function (data) {
  return request(
    {
      url: "/api/invite/meeting/largeScreenCode",
      method: "post",
      data: data,
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

/**
 * 加入团队
 */
export const apiInviteTeamLargeScreenCode: ApiCollections.ApiInviteMeetingLargeScreenCodePost.Request = function (data) {
  return request(
    {
      url: "/api/invite/team/largeScreenCode",
      method: "post",
      data: data,
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

/**
 * 白板邀请二维码
 */
export const apiMeetingTwoDimensionalCode: ApiCollections.ApiInviteOpenGenerateInvitationCode.Request = function (data) {
  return request({
    url: "/api/invite/open/meetingTwoDimensionalCode",
    method: "post",
    data: data,
  });
};

// 白板邮箱邀请
export const apiInviteCreate: ApiCollections.ApiUserLoginPost.Request = async (data) => {
  // 获取x-st
  const config = {};
  const s = await vm.e();
  if (!s) return false;
  config[vm.h()] = {};
  config[vm.h()][vm.n()] = s;

  return request({
    url: "/api/invite/open/create",
    method: "post",
    data,
    ...config,
  });
};
