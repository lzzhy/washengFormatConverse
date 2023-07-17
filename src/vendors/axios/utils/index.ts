import { ContentTypeEnum } from "../enums/httpEnum";

const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}
export function cloneDeep(data: object) {
  if (!data) return data;
  return JSON.parse(JSON.stringify(data));
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, "Object");
}

export function isString(val: unknown): val is string {
  return is(val, "String");
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function isFormData(contentType: ContentTypeEnum) {
  return contentType === ContentTypeEnum.FORM_DATA;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = "";
  for (const key in obj) {
    parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, "?") + parameters;
}

/**
 * @description 数据转换工具包
 * @exports json2FormData 将json转换为formData
 * @exports list2json 将列表按指定key转换成json对象 默认key为id。可保留原有索引
 */
export const json2formData = (jsonObj: Record<any, any>) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(jsonObj)) {
    if (value === undefined) continue;
    formData.append(key, value);
  }
  return formData;
};
