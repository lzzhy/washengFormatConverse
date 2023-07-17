import { getST } from "@/apis/common";
import { getToken } from "./project";
// import { getCookie, cookieName } from "./cookie";

/**
 * 用于生成指纹信息
 * Created by wanchao
 */
const ek = {
  "0": "v",
  "1": "X",
  "2": "b",
  "3": "2",
  "4": "5",
  "5": "7",
  "6": "9",
  "7": "0",
  "8": "A",
  "9": "4",
  a: "k",
  b: "I",
  c: "m",
  d: "w",
  e: "6",
  f: "s",
  "-": "a",
};

const dk = {
  v: "0",
  X: "1",
  b: "2",
  "2": "3",
  "5": "4",
  "7": "5",
  "9": "6",
  "0": "7",
  A: "8",
  "4": "9",
  k: "a",
  I: "b",
  m: "c",
  w: "d",
  "6": "e",
  s: "f",
  a: "-",
};

export default {
  /**
   * 编码指纹信息
   * @param value 没有值时，默认使用token
   */
  async e(value: any) {
    // if (!value) value = getCookie(cookieName); // 使用token
    if (!value) value = getToken();
    const charCodeStr = this.getCharCodeStr(value);
    const meStr = await this.getMeStr();
    if (!meStr) return "";
    const str = meStr + "-" + charCodeStr;
    return this.eStr(str);
  },

  /**
   * 校验信息与value是否一致
   * @param str
   * @param value
   * @return {boolean}
   */
  // vaild(str, value) {
  //   if (!str)
  //   {
  //     console.log('指纹不存在');
  //     return false;
  //   }
  //
  //   str = this.decodeStr(str)
  //   const result = str.split('-')
  //   const me = parseInt(result[0], 16)
  //   const charCodeStr = result[1];
  //
  //   // 检查是否过期
  //   const isExpire = Date.now() - me > 1000
  //   if (isExpire)
  //   {
  //     console.log('指纹信息已过期');
  //     return false;
  //   }
  //
  //   // 检查value是否相同
  //   const currentCharCodeStr = this.getCharCodeStr(value);
  //   if (charCodeStr !== currentCharCodeStr)
  //   {
  //     console.log('数据不一致', charCodeStr, currentCharCodeStr)
  //     return false;
  //   }
  //
  //   return true;
  // },

  /**
   * 获取字符串charCode相加总和
   * @param value
   */
  getCharCodeStr(value: string) {
    const list = value.split("");
    let total = 0;
    list.forEach((letter) => {
      total += letter.charCodeAt(0);
    });
    total += 123; // 增加一个混淆数
    return total.toString(16);
  },

  /**
   * 编码字符串
   * @param str
   */
  eStr(str: string) {
    const list = str.split("");

    let letter;
    const convertList = [];
    for (const i in list) {
      letter = list[i];
      if (ek) convertList.push(ek[letter]);
    }

    return convertList.join("");
  },

  /**
   * 解码字符串
   * @param enStr
   */
  dStr(enStr: string) {
    const list = enStr.split("");

    const convertList = [];
    let letter;
    for (const i in list) {
      letter = list[i];
      if (dk[letter]) convertList.push(dk[letter]);
    }
    return convertList.join("");
  },

  /**
   * 编码服务器时间
   * @param serverTime
   */
  eT(me: any) {
    me = me.toString(16);
    return this.eStr(me);
  },

  /**
   * 解码服务器时间
   * @param serveTimeStr
   */
  dT(meStr: string) {
    const me = parseInt(this.dStr(meStr), 16);
    return me;
  },

  /**
   * 获取服务器时间的str
   */
  async getMeStr() {
    const result = await getST();
    console.log(result);
    if (!result || !result.data) return "";
    const meStr = result.data;
    const t = this.dT(meStr);
    return t.toString(16);
  },

  /**
   * 用于混淆获取指纹的字段名 x-st
   */
  n() {
    const n = [130, 55, 125, 126, 78, 64, 44];
    let s = "";
    n.forEach((l) => {
      l = l - 10;
      s += String.fromCharCode(l);
    });
    return s.substr(0, 4);
  },
  /**
   * 用户混淆获取字符名 headers
   */
  h() {
    const h = [104, 101, 97, 100, 101, 114, 115];
    let s = "";
    h.forEach((l) => {
      s += String.fromCharCode(l);
    });
    return s;
  },
};
