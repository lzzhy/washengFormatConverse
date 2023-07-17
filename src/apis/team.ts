import { request } from "@/vendors/axios/index";
import vm from "@/utils/vm";

/**
 * 发送邀请链接
 */
export const apiTeamInviteCreate: ApiCollections.ApiUserTeamDetailPost.Request = async function (data) {
  // 获取x-st
  const config = {};
  const s = await vm.e();
  if (!s) return false;
  config[vm.h()] = {};
  config[vm.h()][vm.n()] = s;

  return request({
    url: "/api/invite/team/create",
    method: "post",
    data: data,
    ...config,
  });
};

/**
 * 创建团队
 */
export const apiTeamCreate: ApiCollections.ApiTeamCreateInvitPost.Request = function (data) {
  return request(
    {
      url: "/api/team/invitationTeam",
      method: "post",
      data: data,
    },
    {
      // isReturnNativeResponse: true,
    }
  );
};

/**
 * 创建团队
 */
export const apiTeamCreate2: ApiCollections.ApiTeamCreateInvitPost.Request = function (data) {
  return request(
    {
      url: "api/team/createTeam",
      method: "post",
      data: data,
    },
    {
      // isReturnNativeResponse: true,
    }
  );
};

/**
 * 升级
 */
export const apiTeamUpgrade: ApiCollections.ApiTeamCreateUpgradePost.Request = function (data) {
  return request({
    url: "/api/team/upgradeByInvitationCode",
    method: "post",
    data: data,
  });
};

/**
 * 离开团队
 */
export const apiUserLeaveTeam: ApiCollections.ApiTeamCreateUpgradePost.Request = function (data) {
  return request({
    url: "api/team/deleteUserFromTeam",
    method: "post",
    data: data,
  });
};

/**
 * 转移超管权限
 */
export const apiTeamTransferTeam: ApiCollections.ApiTeamCreateTransferPost.Request = function (data) {
  return request({
    url: "/api/team/transferTeam",
    method: "post",
    data: data,
  });
};

/**
 * 更新
 */
export const apiUserTeamUpdate: ApiCollections.ApiUserTeamUpdatePost.Request = function (data) {
  return request({
    url: "/api/team/updataTeam",
    method: "post",
    data,
  });
};

/**
 * 获取团队成员信息
 */
export const apiTeamTeamMemberList: ApiCollections.ApiTeamTeamMemberListGet.Request = function (data) {
  return request({
    url: "/api/team/teamMemberList",
    method: "get",
    params: data,
  });
};

/**
 * 删除团队
 */
export const apiTeamDeleteTeam: ApiCollections.ApiTeamDeleteTeamPost.Request = function (data) {
  return request(
    {
      url: "/api/team/deleteTeam",
      method: "post",
      data: data,
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

/**
 * 从团队中删除成员
 */
export const apiTeamDeleteUserFromTeam: ApiCollections.ApiTeamDeleteUserFromTeam.Request = function (data) {
  return request({
    url: "/api/team/deleteUserFromTeam",
    method: "post",
    data: data,
  });
};

/**
 * 获取团队邀请码
 */
export const apiTeamInviteCode: ApiCollections.ApiTeamInviteCode.Request = function (data) {
  return request({
    url: "/api/invite/open/generateTeamCode",
    method: "post",
    data: data,
  });
};

/**
 * 更新团队头像
 */
export const apiTeamAvatarUpdate: ApiCollections.ApiUserAvataUpdatePost.Request = function (data) {
  return request({
    url: "/api/team/updataTeam",
    method: "post",
    data: data,
  });
};

/**
 * 更新团队
 */
export const apiTeamsUpdate: ApiCollections.ApiUsersUpdatePost.Request = function (data) {
  return request({
    url: "/api/team/updataTeam",
    method: "post",
    data: data,
  });
};

/**
 * 手动创建默认团队
 */
export const apiUserCreateTeam: ApiCollections.ApiCreateTeamPost.Request = function (data) {
  return request({
    url: "/api/user/createTeam",
    method: "post",
    data: data,
  });
};
