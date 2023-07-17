import { request } from "@/vendors/axios/index";

/**
 * 创建项目,编辑项目
 */
export const apiProjectGroupSave: ApiCollections.ApiTeamGropSavePost.Request = function (data) {
  return request({
    url: "/api/group/save",
    method: "post",
    data: data,
  });
};

/**
 * 项目列表
 */
export const apiGroupList: ApiCollections.ApiGropListPost.Request = function (data) {
  return request({
    url: "/api/group/list",
    method: "post",
    data: data,
  });
};

/**
 * 删除项目
 */
export const apiGroupRemove: ApiCollections.ApiGropRemovePost.Request = function (data) {
  return request(
    {
      url: "/api/group/remove",
      method: "post",
      data: data,
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

/**
 * 设置项目
 */
export const apiGroupInfo: ApiCollections.ApiGropInfoPost.Request = function (data) {
  return request({
    url: "/api/group/info",
    method: "post",
    data: data,
  });
};

/**
 * 添加项目成员
 */
export const apiGroupInviteInto: ApiCollections.ApiGropInvitePost.Request = function (data) {
  return request(
    {
      url: "/api/invite/group/inviteIntoGroup",
      method: "post",
      data: data,
    },
    {
      // errorMessageMode: "none",
    }
  );
};

/**
 * 项目成员列表
 */
export const apiGroupMembers: ApiCollections.ApiGropMemberPost.Request = function (data) {
  return request(
    {
      url: "/api/group/members",
      method: "post",
      data: data,
    },
    {
      // errorMessageMode: "none",
    }
  );
};

/**
 * 移交项目
 */
export const apiGroupOwner: ApiCollections.ApiGropMemberPost.Request = function (data) {
  return request(
    {
      url: "/api/group/owner",
      method: "post",
      data: data,
    },
    {
      // errorMessageMode: "none",
    }
  );
};
/**
 * 移交项目成员
 */
export const apiGroupExit: ApiCollections.ApiGropMemberPost.Request = function (data) {
  return request({
    url: "/api/group/exit",
    method: "post",
    data: data,
  });
};

/**
 * 移交项目成员
 */
export const apiGroupMemberRemove: ApiCollections.ApiGropMemberPost.Request = function (data) {
  return request({
    url: "/api/group/member/remove",
    method: "post",
    data: data,
  });
};
