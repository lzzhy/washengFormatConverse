import { $t } from "@/i18n";
// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from "axios";
import type { Recordable, RequestOptions, Result } from "./types";
import type { AxiosTransform, CreateAxiosOptions } from "./axiosTransform";
import { VAxios } from "./Axios";
import { checkStatus } from "./checkStatus";
import { useMessage, useUserInfo, useSetting } from "./implement";
import { RequestEnum, ResultEnum, ContentTypeEnum } from "./enums/httpEnum";
import { isString } from "./utils";
import { setObjToUrlParams, deepMerge } from "./utils";
import { joinTimestamp, formatRequestDate } from "./helper";
import { codeMsg } from "./code";
import { checkDomain } from "../../utils/validate";

const { getToken, logout, getExtraData } = useUserInfo();
const { createMessage, createErrorModal } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse, errorMessageMode } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回

    const { data } = res;
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error($t("qingqiuchu_0f4d3f"));
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data: result, message } = data;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, "code") && Number(code) === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return result;
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    const errorMsg = "";
    // switch (Number(code)) {
    //   case ResultEnum.TIMEOUT:
    //     errorMsg = "login timeout!";
    //     logout();
    //     break;
    //   case ResultEnum.TOKEN_VALID:
    //     errorMsg = "token invalid";
    //     logout();
    //     break;
    //   case ResultEnum.COMMON_ERROR:
    //     errorMsg = $t("caozuoshib_5fa802");
    //     break;
    //   default:
    //     if (message) {
    //       errorMsg = message;
    //     }
    // }

    checkStatus(Number(code), message, errorMessageMode);

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    // if (options.errorMessageMode === "modal") {
    //   createErrorModal({ title: $t("cuowutishi_d7a169"), message: errorMsg });
    // } else if (options.errorMessageMode === "message") {
    //   createMessage({ type: "error", message: errorMsg });
    // }

    // throw new Error(errorMsg || `请求出错，请稍候重试`);
    // const err = new Error(errorMsg || `请求出错，请稍候重试`) as any;
    // err._code = code;
    // err._message = codeMsg[code] || errorMsg;
    // throw err;
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    // 给传入的非域名的接口名拼接cc或us
    if (joinPrefix && checkDomain(config.url) && !config.url?.includes("monitor")) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;

    // 添加teamCode逻辑
    const extraData = getExtraData();
    if (config.data && Reflect.has(config.data, "teamCode") && extraData) {
      Object.assign(config.data, extraData);
    }

    if (config.params && Reflect.has(config.params, "teamCode") && extraData) {
      Object.assign(config.params, extraData);
    }

    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, "data") && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @param e
   * @param options
   */
  async requestCatchHook(e, options) {
    createMessage({ type: "error", message: e.message || (e as any).code });
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = getToken();
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      // (config as Recordable).headers.Authorization = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token;
      // (config as Recordable).headers.token = token;

      // 'x-authorization': token
      // Authorization: `Bearer ${getToken()}`,
      (config as Recordable).headers["X-Authorization-Mms"] = `${token}`;
      (config as Recordable).headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    // const errorLogStore = useErrorLogStoreWithOut();
    // errorLogStore.addAjaxErrorInfo(error);
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || "none";
    const msg: string = response?.data?.msg ?? response?.data?.error?.message ?? "";
    const err: string = error?.toString?.() ?? "";
    let errMessage = "";
    try {
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        errMessage = $t("jiekouqing_7ac2d8");
      }
      if (err?.includes("Network Error")) {
        errMessage = $t("wangluoyic_2db5be");
      }

      if (errMessage) {
        if (errorMessageMode === "modal") {
          createErrorModal({ title: $t("cuowutishi_d7a169"), message: errMessage });
        } else if (errorMessageMode === "message") {
          createMessage({ type: "error", message: errMessage });
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    checkStatus(error?.response?.status, msg, errorMessageMode);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  const { authenticationScheme, baseURL, timeout, apiUrl, urlPrefix } = useSetting();
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        authenticationScheme,
        timeout: timeout || 1000 * 15,
        // 基础接口地址
        baseURL: baseURL || "",

        headers: { "Content-Type": ContentTypeEnum.FORM_DATA },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: "message",
          // 接口地址
          apiUrl: apiUrl || "",
          // 接口拼接地址
          urlPrefix: urlPrefix || "",
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios();
export const request = defHttp.request.bind(defHttp);
// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
