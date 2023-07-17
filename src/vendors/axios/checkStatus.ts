import { $t } from "@/i18n";
import type { ErrorMessageMode } from "./types";
import { codeMsg } from "./code";
import { useMessage, useUserInfo } from "./implement";
const { logout } = useUserInfo();

const { error, createErrorModal } = useMessage();

export function checkStatus(status: number, msg: string, errorMessageMode: ErrorMessageMode = "message"): void {
  let errMessage = "";

  switch (status) {
    case -100:
      errMessage = `${msg}`;
      break;
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      errMessage = $t("yonghuxinx_feb824");
      logout();
      break;
    // case 300:
    //   errMessage = $t("yonghuxinx_feb824"); //`用户得到授权，但是访问是被禁止的。!`;
    //   logout();
    //   break;
    // case 403:
    //   errMessage = $t("yonghuxinx_feb824"); //`用户得到授权，但是访问是被禁止的。!`;
    //   logout();
    //   break;
    // 404请求不存在
    case 404:
      errMessage = $t("wangluoqin_46eebe");
      break;
    case 405:
      errMessage = $t("wangluoqin_581611");
      break;
    case 408:
      errMessage = $t("wangluoqin_7facf0");
      break;
    case 500:
      errMessage = $t("fuwuqicuow_09d8b0");
      break;
    case 501:
      errMessage = $t("wangluowei_9c4837");
      break;
    case 502:
      errMessage = $t("wangluocuo_9fc379");
      break;
    case 503:
      errMessage = $t("fuwubukeyo_377f8c");
      break;
    case 504:
      errMessage = $t("wangluocha_8c734f");
      break;
    case 505:
      errMessage = $t("banbenbuzh_ff94bc");
      break;
    default:
      errMessage = codeMsg[status];
  }

  if (errMessage) {
    if (errorMessageMode === "modal") {
      createErrorModal({ title: $t("cuowutishi_d7a169"), message: errMessage });
    } else if (errorMessageMode === "message") {
      error({ message: `${errMessage}` });
    }
  }
  const err = new Error(errMessage || `请求出错，请稍候重试`) as any;
  err._code = status;
  err._message = codeMsg[status] || errMessage;
  throw err;
}
