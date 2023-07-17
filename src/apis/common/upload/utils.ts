import { $t } from "@/i18n";
import { dayjs, getSuffix } from "@/utils/index";
import { v4 } from "uuid";
import { ElLoadingService } from "element-plus";

export const randomString = (len = 32) => {
  const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * upload file
 */
const BASEURLPATH = "manager".toLowerCase();
/**
 * 创建文件名称
 * 规则 项目文件夹/YYYY/MM/DD/uuid{4}.{ext}
 * @param file
 * @returns
 */
export function createFileName(file: File) {
  const ext = getSuffix(file.name);
  const fileName = v4().toString().substring(0, 4);
  const { years, months, date } = dayjs().toObject();
  return encodeURI(`${BASEURLPATH}/${years}/${months}/${date}/${fileName}.${ext}`);
}

/**获取OSS配置文件 */
export function getOSSconfig() {
  const config = {
    region: "oss-cn-hangzhou",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: "",
    endpoint: "https://oss-cn-hangzhou.aliyuncs.com",
  };
  return config;
}

/**创建遮罩 */
export function createLoadingMask() {
  const instance = ElLoadingService({
    lock: true,
    text: $t("zhengzaish_e8d444"),
    background: "rgba(0, 0, 0, 0.7)",
  });
  return {
    close() {
      instance.close();
    },
  };
}

/**获取图片或者视频的一些媒体信息 */
export function getMediaSize(file: File): Promise<{ width: number; height: number; duration?: number }> {
  return new Promise((resolve, reject) => {
    const { type } = file;
    const fileTypeEnum = {
      video: ["video/mp4"],
      image: ["image/jpg"],
    };
    const isVideo = fileTypeEnum.video.includes(type);
    const _URL = window.URL || window.webkitURL;
    if (isVideo) {
      const video = document.createElement("video");
      video.src = _URL.createObjectURL(file);
      video.onloadeddata = () => {
        const { videoWidth: width, videoHeight: height, duration } = video;
        resolve({
          width,
          height,
          duration,
        });
      };
      video.onerror = (error) => {
        console.log(error);
        reject(error);
      };
    } else {
      const img = new Image();
      img.src = _URL.createObjectURL(file);
      img.onload = () => {
        const { width, height } = img;
        resolve({
          width,
          height,
        });
      };
      img.onerror = (error) => {
        console.log(error);
        reject(error);
      };
    }
  });
}

export class UploadFile {
  // uid: string;
  url: string;
  width: number;
  height: number;
  thumb: string;
  duration: number;
  constructor({ url, width, height, thumb, duration }: any) {
    // this.uid = uid;
    this.url = url;
    this.width = width;
    this.height = height;
    this.thumb = thumb; // only if file is video
    this.duration = duration;
  }
}
