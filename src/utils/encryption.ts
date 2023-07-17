import md5 from "md5";
// import { userManagementUserGenerateKey } from "@/apis";
/**
 * 大写 + md5 二次加密
 * @param value
 * @returns
 */
export const passwordEncryption = (value: string) => {
  if (!value) throw Error();
  return md5(md5(value.toLocaleUpperCase()));
};

/**
 * 登陆接口加密
 * 1. 获取种子
 * 2. 将种子和密码进行 base64 加密
 * @param {string} password
 * @returns
 * @desc 登录接口密码字段传值改为{"seed":"4479101668668714189","pwd":"Disc1234"}的base64加密
 * @link https://github.com/vueuse/vueuse/blob/main/packages/core/useBase64/index.ts
 */
export const loginEncryption = async (password: string) => {
  return passwordEncryption(password);

  // if (!password) throw Error("密码不能为空");
  // const seed = await userManagementUserGenerateKey();
  // const reuslt = { seed, pwd: passwordEncryption(password) };

  // return createToBase64(JSON.stringify(reuslt));
};

function createToBase64(target: string) {
  return blobToBase64(new Blob([target], { type: "text/plain" }));
}

function blobToBase64(blob: Blob, prefix?: boolean) {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      let result = e.target!.result as string;
      if (!prefix) {
        result = result.split(",").pop() as string;
      }
      resolve(result);
    };
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}
