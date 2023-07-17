import { apiUserShareCode } from "@/apis";
import { $t } from "@/i18n";
import settings from "@/settings";
/**正在开放中模块的提示语 */
export const developingDialog = function () {
  console.log($t("gongnengza_35dd33"));
};

/**
 * 根据图片名称提取图片
 * @param importModules
 * @param keyName
 * @returns
 * @example
 * const roomStocksImgs = import.meta.glob(`@/assets/img/room-stocks/*.png`, { eager: true });
 * getImgFromImport(roomStocksImgs,'room-1.png')
 */
export const getImgFromImport = (importModules: Record<string, any>, keyName: string) => {
  for (const key in importModules) {
    if (Object.prototype.hasOwnProperty.call(importModules, key)) {
      if (key.match(new RegExp(`${keyName}\\.(.+)$`))) return importModules[key].default;
    }
  }
  // return importModules[`/src/assets/img/room-stocks/${keyName}`].default;
};

export const createImgImport = (importModules: Record<string, any>) => {
  return (keyName: string) => getImgFromImport(importModules, keyName);
};

export const getToken = () => {
  return useUserStoreWithout().token;
};

// 区分各个环境
export const getDomain = () => {
  const domain = settings.domain;
  // if (import.meta.env.MODE === "development") {
  //   const local = import.meta.env.VITE_APP_LOCAL;
  //   const queryStringToObject = (url = location.href): Record<string, any> => [...new URLSearchParams(url.split("?")[1])].reduce((a, [k, v]) => ((a[k] = v), a), {});
  //   const query = queryStringToObject();
  //   if (query.env === "local") {
  //     domain = `http://localhost:4200`;
  //   } else if ((query.env = "test")) {
  //     domain = local === "us" ? `http://47.101.153.177:9511` : `http://47.101.153.177:9509`;
  //   }
  // }
  return domain;
};

/**打开核心画板
 * 添加 环境 env local|test
 */
export const openCanvasPage = (meetingId: string, teamCode: string) => {
  let { locale: language_code } = useAppStoreWithout() as any;
  // const language_code: "zh-cn" | "en" =;

  /**
   * zh-cn => zh 适配核心画板中的语言包路径
   */
  language_code = language_code === "zh-cn" ? "zh" : language_code;

  let url = settings.canvasUrl;
  /**如果是开发环境，则使用 开发的画板地址 */
  if (import.meta.env.MODE === "development") {
    const local = import.meta.env.VITE_APP_LOCAL;
    const queryStringToObject = (url = location.href): Record<string, any> => [...new URLSearchParams(url.split("?")[1])].reduce((a, [k, v]) => ((a[k] = v), a), {});
    const query = queryStringToObject();
    if (query.env === "local") {
      url = `http://localhost:8081`;
    } else if (local === "zh-cn") {
      url = `http://47.101.153.177:9509`;
    } else if (local === "cc") {
      url = `http://47.101.153.177:9511`;
    }
  }
  const canvasUrl = url + `?token=${window.encodeURIComponent(getToken() || "")}&meetingId=${meetingId}&teamCode=${teamCode}&language_code=${language_code}`;
  if (settings.canvasUrl !== url) {
    window.open(canvasUrl);
  } else {
    window.location.href = canvasUrl;
  }
};

/**
 * 邀请加入会议
 */
export const createInviteMeetingLink = async (code: string) => {
  const userShareCode = await apiUserShareCode();
  const domain = getDomain();
  return `${domain}/public/meeting/${code}?shareCode=${userShareCode}`;
};

/**
 * 邀请加入团队
 * 链接生成规则：域名+/invite/team/+shareCode(team/teamDetail接口中的字段)
 *  const copyLink = ref(`https://app.nearhub.us/invite/team/${props.source.id}`);
 * @param shareCode
 * @returns
 */
export const createInviteTeamLink = (shareCode?: string) => {
  if (!shareCode) {
    return console.error("createInviteTeamLink error");
  }
  const domain = getDomain();
  // 链接生成规则：域名+/invite/team/+shareCode(team/teamDetail接口中的字段)
  return `${domain}/invite/team/${shareCode}`;
};
