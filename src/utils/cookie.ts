// /**
//  * @description 项目内cookie工具库
//  * @exports getCookie 读取cookie
//  * @exports setCookie 写入cookie
//  * @exports removeCookie 删除cookie
//  */
// import Cookies from "js-cookie";
// import { nearhubDomain } from "./regexp";
// const { host } = location;
// const domainMatch = host.match(nearhubDomain) || [];
// const [cookieDomain] = domainMatch;
// export const getCookieName = () => {
//   const env = process.env.NODE_ENV;
//   switch (env) {
//     case "dev":
//       return "dev_user_token";
//     case "development":
//       return "dev_user_token";
//     case "testing":
//       return "test_user_token";
//     case "production":
//       return "prod_user_token";
//     default:
//       return "prod_user_token";
//   }
// };
// export const cookieName = getCookieName();
// export const getCookie = (key: string) => (Cookies.get(key) ? JSON.parse(Cookies.get(key) as string) : "");
// export const setCookie = (key: string, value: any, options: any = {}) => {
//   options.expires = 7;
//   if (cookieDomain && host.match(nearhubDomain)) {
//     options.domain = `.${cookieDomain}`;
//     options.secure = false;
//   }
//   Cookies.set(key, value, options);
// };
// export const removeCookie = (key: string, options: any = {}) => {
//   if (host.match(nearhubDomain)) {
//     options.domain = cookieDomain;
//   }
//   Cookies.remove(key, options);
// };
// export const baiduChannelCookieName = process.env.NODE_ENV + "hyz_baidu_channel";
