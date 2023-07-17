import { $t } from "@/i18n";
import { checkNickname, checkTeamName, isRtionalNumber, validEmail, validPhone, validUsername, existEmail, existInvitation } from "./validate";
import type { FormItemRule } from "element-plus";
import { checkPassword } from "@/utils/regexp";

type validator = FormItemRule["validator"];
type asyncValidator = FormItemRule["asyncValidator"];

export const asyncValidateUsername: validator = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error($t("qingshuruz_321c2d")));
  } else {
    callback();
  }
};
export const asyncValidateNickname: validator = (rule, value, callback) => {
  if (!checkNickname(value)) {
    callback(new Error($t("yonghuming_efc5ee")));
  } else {
    callback();
  }
};
export const asyncValidateTeamname: validator = (rule, value, callback) => {
  if (!checkTeamName(value)) {
    callback(new Error($t("gezifukeba_e45675")));
  } else {
    callback();
  }
};
export const asyncValidatePassword: validator = (rule, value, callback) => {
  if (!checkPassword(value)) {
    callback(new Error($t("gezifudaxi_505bdb")));
  } else {
    callback();
  }
};
export const asyncValidatePhoneNumber: validator = (rule, value, callback) => {
  if (!validPhone(value)) {
    callback(new Error($t("shoujihaoy_017c30")));
  } else {
    callback();
  }
};

export const asyncValidateEmail: validator = (rule, value, callback) => {
  if (!validEmail(value)) {
    callback(new Error($t("youxiangge_cc5446")));
  } else {
    callback();
  }
};

export const asyncValidateNumber: validator = (rule, value, callback) => {
  console.log("validateNumber");
  if (!isRtionalNumber(value)) {
    callback(new Error($t("shurubixuw_92535b")));
  } else {
    callback();
  }
};

// 校验邮箱
export const asyncCheckExistEmail: asyncValidator = async (rule, value, callback) => {
  const error = await existEmail(value);
  if (error) {
    callback(new Error(error));
  } else {
    callback();
  }
};

// 校验邀请码
export const asyncCheckInvitation: asyncValidator = async (rule, value, callback) => {
  const error = await existInvitation(value);
  if (error) {
    callback(new Error(error));
  } else {
    callback();
  }
};
