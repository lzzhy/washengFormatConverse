import { $t } from "@/i18n";
import { checkNickname as checkName, notMeetingName, notGroupName, checkEmail, checkMobile } from "@/utils/regexp";
import { getStrLen } from "@/utils/string";
import { checkUserExist, checkInvitationCode } from "@/apis/user";
import { ResultEnum } from "@/vendors/axios/enums/httpEnum";

/**
 * 验证用户名
 * 1. 内置用户 admin
 * 2. 邮箱
 * 3. 手机号
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string): boolean {
  const value = str.trim();
  const valid_map = ["admin"];
  return valid_map.indexOf(value) >= 0 || validEmail(value) || validPhone(value);
}

/**验证手机号 */
export function validPhone(phoneNumber: number | string): boolean {
  return new RegExp("^(\\+?0?86\\-?)?1[345789]\\d{9}$").test(phoneNumber + "");
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email: string): boolean {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}
/**
 * 整数 或者 小数  不包含负数
 * @param {*} value
 * @returns {boolean}
 */
export function isRtionalNumber(value: number): boolean {
  // return /^(([1-9]{1}d*)|(0{1}))(.d+)?$/.test(value);
  return /^\d+(.\d+)?$/.test(value + "");
}
/**
 * 校验经度是否符合规范
 * @param {*} value
 * @returns {boolean}
 */
export function checkLng(lng: number): boolean {
  const longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
  const lngs = String(lng);
  return longrg.test(lngs);
}
/**
 * 校验纬度是否符合规范
 * @param {*} value
 * @returns {boolean}
 */
export function checkLat(lat: number): boolean {
  const latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
  const lats = String(lat);
  return latreg.test(lats);
}

/**
 * 校验用户昵称
 * @param name {String} 用户昵称
 * @return Boolean
 */
export const checkNickname = (name: string) => {
  // return true;
  const nameLength = getStrLen(name);
  return nameLength > 0 && nameLength <= 32;
  // const nicknameRegexp = /^[\u4E00-\u9FA5\sA-Za-z0-9_]+$/;
  // return nicknameRegexp.test(name);
};

/**
 * 校验用户团队名称
 * @param name {String} 用户昵称
 * @return Boolean
 */
export const checkTeamName = (name: string) => {
  const nameLength = getStrLen(name);
  return nameLength > 0 && nameLength <= 32 && checkName(name);
};

// 校验邮箱
export const existEmail = async (value: string) => {
  if (!value) return false;
  const isMobile = checkMobile(value);
  const [err] = await awaitWrap(
    checkUserExist({
      recipient: value,
      recipientType: isMobile ? "MOBILE" : "EMAIL",
      checkType: "REGISTER",
    })
  );
  if (err) {
    return $t("nindeyouxi_7430d7");
  } else {
    return null;
  }
};

// 校验邀请码
export const existInvitation = async (value: string) => {
  if (!value) return false;
  const [err] = await awaitWrap(
    checkInvitationCode({
      rinvitationCode: value,
    })
  );
  if (err) {
    return $t("wuxiaoyaoq_e17e5b");
  } else {
    return null;
  }
};

// 判断是否为一个域名
export const checkDomain = (value: string) => {
  if (!value) return false;
  if (value.indexOf("https") > -1) {
    return false;
  } else {
    return true;
  }
};
