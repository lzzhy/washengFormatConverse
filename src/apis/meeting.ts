import { request } from "@/vendors/axios";

/**
 * 修改白板信息
 */
export const apiMeetingSave: ApiCollections.ApiMeetingSave.Request = function (data) {
  return request({
    url: "/api/meeting/save",
    method: "post",
    data: data,
  });
};

/**
 * 删除白板
 */
export const apiMeetingRemove: ApiCollections.ApiMeetingRemove.Request = function (data) {
  return request({
    url: "/api/meeting/remove",
    method: "post",
    data: data,
  });
};

/**
 * 白板链接是否启用
 */
export const apiMeetingPermissionsSetting: ApiCollections.ApiMeetingPermissionsSetting.Request = function (data) {
  return request({
    url: "/api/meeting/permissions/setting",
    method: "post",
    data: data,
  });
};

/**
 * 发送邀请链接
 */
export const apiMeetingList: ApiCollections.ApiMeetingListPost.Request = function (data) {
  return request({
    url: "/api/meeting/list",
    method: "post",
    data: data,
  });
};
/**
 * 收藏白板
 */
export const apiMeetingCollection: ApiCollections.ApiMeetingCollectionPost.Request = function (data) {
  return request({
    url: "/api/meeting/collection",
    method: "post",
    data: data,
  });
};

/**
 * 白板详情
 */
export const apiMeetingInfo: ApiCollections.ApiMeetingInfo.Request = function (data) {
  return request({
    url: "/api/meeting/info",
    method: "post",
    data: data,
  });
};

export const apiMeetingPermissionMember: ApiCollections.ApiMeetingManageMember.Request = function (data) {
  return request({
    url: "/api/meeting/permissions/grant/member",
    method: "post",
    data: data,
  });
};

// 删除成员
export const apiMeetingMemberOut: ApiCollections.ApiMeetingManageMember.Request = function (data) {
  return request({
    url: "/api/meeting/member/kick/out",
    method: "post",
    data: data,
  });
};

// 移交所有权
export const apiMeetingOwner: ApiCollections.ApiMeetingManageMember.Request = function (data) {
  return request({
    url: "/api/meeting/owner",
    method: "post",
    data: data,
  });
};

// 是否能加入某一个白板
export const apiCanJoin: ApiCollections.ApiInviteCanJoinCode.Request = function (data) {
  return request(
    {
      url: "/api/meeting/public/join/check",
      method: "post",
      data: data,
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

export const apiJoin: ApiCollections.ApiInviteCanJoinCode.Request = function (data) {
  return request(
    {
      url: "/api/meeting/join",
      method: "post",
      data: data,
      headers: {
        "x-authorization": data?.token,
      },
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

export const apiGetPublicInfo: ApiCollections.ApiInviteInfoCode.Request = function (data) {
  return request(
    {
      url: `/api/${data?.type}/code`,
      method: "post",
      data: data,
      headers: {
        "x-authorization": data?.token,
      },
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

export const apiGetInviteInfo: ApiCollections.ApiInviteInfoCode.Request = function (data) {
  return request(
    {
      url: `/api/invite/${data.type}`,
      method: "post",
      data: data,
      headers: {
        "x-authorization": data?.token,
      },
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

export const apiCreateTempUser: ApiCollections.ApiCreateTempUserCode.Request = function (data) {
  return request(
    {
      url: `/api/user/anonymous/access`,
      method: "post",
      data: data,
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

export const apiInviteTeam: ApiCollections.ApiCreateTempUserCode.Request = function (data) {
  return request(
    {
      url: "/api/invite/team",
      method: "post",
      data: data,
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

/**
 * 通过mettingid 获取 teamcode
 */
export const apiMeetingGetTeamcode: ApiCollections.ApiInviteOpenGenerateInvitationCode.Request = function (data) {
  return request(
    {
      url: "/api/meeting/getTeamCode",
      method: "post",
      data: data,
    },
    {
      isReturnNativeResponse: true,
    }
  );
};
