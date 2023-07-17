/**
 * @description 字符串处理工具
 * @exports getStrLen 计算字符串长度
 * @exports parseUrl 解析url
 * @exports getAbbr 获得昵称的缩略词
 */
import { checkZh } from "./regexp";

/**
 * @description 计算字符串长度
 */
export const getStrLen = (str: string, bytes = 2): number => {
  const { length = 0 } = str;
  let strlen = 0;
  for (let i = 0; i < length; i++) {
    const code = str.charCodeAt(i);
    if ((code >= 0x0001 && code <= 0x007e) || (code >= 0xff60 && code <= 0xff9f)) {
      strlen++;
    } else {
      strlen += bytes;
    }
  }
  return strlen;
};

/**
 * @description 解析URL参数返回参数对象
 */
export const parseUrl = (url = "") => {
  const params = {};
  url
    .replace(/.*?\?+(.*)$/, "$1")
    .split(/&+/)
    .forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item = item.split("=");
      params[item[0]] = item[1];
    });
  return params;
};

/**
 * @description 获得昵称的缩略词
 * @param name {String} 昵称
 * @returns string
 */
export const getAbbr = (name: string) => {
  if (!name) return "";
  const isZh = checkZh(name);
  if (isZh) {
    return name.substring(name.length - 1);
  } else {
    return name.substring(0, 1);
  }
};

/**
 * 截取字符串
 * @param s{String} 需要截取的字符串
 * @param n{Number} 需要截取的长度
 * @source https://blog.oldj.net/2010/08/19/javascript-left-n-characters/
 */
export const cutStr = (s: string, n: number): any => {
  const s2 = s.slice(0, n);
  let i = s2.replace(/[^x00-xff]/g, "**").length;
  if (i <= n) return s2;
  i -= s2.length;
  let k, s3, j;
  switch (i) {
    case 0:
      return s2;
    case n:
      return s.slice(0, n >> 1);
    default:
      k = n - i;
      s3 = s.slice(k, n);
      j = s3.replace(/[x00-xff]/g, "").length;
      return j ? s.slice(0, k) + cutStr(s3, j) : s.slice(0, k);
  }
};
