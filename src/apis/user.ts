//接口请求文件 user-controller
import vm from "@/utils/vm";
import { request } from "@/vendors/axios/index";
import { ContentTypeEnum } from "@/vendors/axios/enums/httpEnum";
import { useUserInfo } from "@/vendors/axios/implement";

/** 账号密码登录
 * 生成时间: 2022-12-23 02:36:24
 * 无参数
 * @returns
 */
export const apiUserLogin: ApiCollections.ApiUserLoginPost.Request = function (data) {
  return request({
    url: "/api/manage/account/login",
    method: "post",
    data,
    headers: {
      "Content-Type": ContentTypeEnum.FORM_DATA,
    },
  });
};

/**获取微信回调域 */
export const apiGetWxLoginParam: ApiCollections.ApiUserLoginPost.Request = function (data) {
  return request({
    url: "/api/user/wx/getWxLoginParam",
    method: "get",
    params: data,
  });
};

/** 微信登录
 */
export const apiUserWXLogin: ApiCollections.ApiUserLoginPost.Request = function (data) {
  return request({
    url: "/api/user/wx/callback",
    method: "get",
    params: data,
    headers: {
      "Content-Type": ContentTypeEnum.FORM_URLENCODED,
    },
  });
};

/** 获取用户详情
 * 生成时间: 2022-12-23 02:36:24
 * 无参数
 * @returns
 */
export const apiUserInfo: ApiCollections.ApiUserInfoPost.Request = function () {
  return request({
    url: "/api/user/info",
    method: "post",
  });
};

// 编辑用户信息
export const apiUserEdit: ApiCollections.ApiUserInfoPost.Request = function (data) {
  return request({
    url: "/api/user/editUserProfile",
    method: "post",
    data,
  });
};

/** 退出登陆
 * 生成时间: 2022-12-23 02:36:24
 * 无参数
 * @returns
 */
export const apiUserLogout: ApiCollections.ApiUserLogoutPost.Request = function () {
  return request({
    url: "/api/user/logout",
    method: "post",
  });
};

/**
 * 找回密码
 * @param recipientType {String} 账户类型, ['EMAIL', 'MOBILE']
 * @param recipient {String} 邮箱地址或手机号
 * @param validationCode {Number} 验证码
 * @param password {String} 新的登录密码
 * @return Promise
 */
export const retrievePassword: ApiCollections.ApiUserLogoutPost.Request = function (data) {
  return request({
    url: "/api/user/password/forget",
    method: "post",
    data,
  });
};

// 验证账号是否已注册
export const checkUserExist: ApiCollections.ApiUserLogoutPost.Request = function (data) {
  return request({
    url: "/api/user/check",
    method: "post",
    data,
  });
};

// 校验邀请码
export const checkInvitationCode: ApiCollections.ApiUserLogoutPost.Request = function (data) {
  return request({
    url: "/api/team/checkInvitationCode",
    method: "post",
    data,
  });
};

/** 账号密码注册
 */
export const apiUserSignup: ApiCollections.ApiUserLoginPost.Request = async (data) => {
  // 获取x-st
  const config = {};
  if (data?.recipient) {
    const s = await vm.e(data.recipient);
    if (!s) return false;
    config[vm.h()] = {};
    config[vm.h()][vm.n()] = s;
  }
  return request({
    url: "/api/user/register",
    method: "post",
    data,
    ...config,
  });
};

/**
 * @description 验证码发送服务
 */
export const sendEmailCode: ApiCollections.ApiUserLogoutPost.Request = async ({ verificationPhaseType, email = "", mobile = "", clientType = "web", language = "zh-cn" } = {}) => {
  const verificationPhaseTypes = new Set("REG,PASSWORD,PASSWORD_SETTING,BINDING,UNBINDING,REPLACE,LOGIN,ACCESS,RET_PAY_PASSWORD".split(","));
  if (!verificationPhaseTypes.has(verificationPhaseType)) {
    throw new Error(verificationPhaseType, [...verificationPhaseTypes] as any);
  }

  const config = {};
  if (email) {
    const s = await vm.e(email);
    if (!s) return false;
    config[vm.h()] = {};
    config[vm.h()][vm.n()] = s;
  }
  return request(
    {
      url: "/api/verification/send",
      method: "post",
      data: { verificationPhaseType, email, mobile, clientType, language },
    },
    {
      ...config,
      // errorMessageMode: "none",
    }
  );
};

/**
 * 邮箱验证码校验
 */
export const checkEmailCode: ApiCollections.ApiUserLogoutPost.Request = function (data) {
  return request(
    {
      url: "/api/verification/check",
      method: "post",
      data,
    },
    {
      // errorMessageMode: "none",
    }
  );
};

/**
 * 获取TeamCode
 */
export const apiUserTeamList: ApiCollections.ApiUserLogoutPost.Request = function (data) {
  return request({
    url: "/api/team/teamList",
    method: "get",
    params: data,
    headers: {
      "Content-Type": ContentTypeEnum.JSON,
    },
  });
};

export const apiUpload: ApiCollections.ApiUserInfoPost.Request = function (data) {
  return request(
    {
      url: "https://public.nearhub.cc/",
      method: "post",
      data: data,
      headers: {
        "Content-Type": ContentTypeEnum.FORM_DATA,
        "x-oss-server-side-encryption": "AES256",
      },
    },
    {
      isReturnNativeResponse: true,
    }
  );
};
/**
 * 获取团队成员信息
 */
export const apiUserTeamMember: ApiCollections.ApiUserLogoutPost.Request = function (data) {
  return request({
    url: "/api/team/teamMemberList",
    method: "get",
    params: data,
    headers: {
      "Content-Type": ContentTypeEnum.JSON,
    },
  });
};

/**
 * 获取团队详情
 */
export const apiUserTeamDetail: ApiCollections.ApiUserTeamDetailPost.Request = function (data) {
  return request(
    {
      url: "/api/team/teamDetail",
      method: "get",
      params: data,
      headers: {
        "Content-Type": ContentTypeEnum.JSON,
      },
    },
    {
      // errorMessageMode: "none",
    }
  );
};

/**
 * 发送邀请链接
 */
export const apiUserShareCode: ApiCollections.ApiUserShareCode.Request = function (data) {
  return request({
    url: "/api/user/shareCode",
    method: "post",
    data: data,
  });
};

/**
 * 修改用户姓名
 */
export const apiUserUpdate: ApiCollections.ApiUserUpdatePost.Request = function (data) {
  return request({
    url: "/api/user/update",
    method: "post",
    data: data,
  });
};

/**
 * 更新头像
 */
export const apiUserAvatarUpdate: ApiCollections.ApiUserAvataUpdatePost.Request = function (data) {
  return request({
    url: "/api/user/avatar/update",
    method: "post",
    data: data,
  });
};

/**
 * 更新
 */
export const apiUsersUpdate: ApiCollections.ApiUsersUpdatePost.Request = function (data) {
  return request({
    url: "/api/user/update",
    method: "post",
    data: data,
  });
};
