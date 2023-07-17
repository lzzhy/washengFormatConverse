import OSS from "ali-oss";
import { request } from "@/vendors/axios/index";
import { randomString, createFileName, createLoadingMask, getMediaSize, getOSSconfig, UploadFile } from "./utils";

let OSSClient: OSS;

function getOSSclient() {
  if (OSSClient) return OSSClient;
  const config = getOSSconfig();
  const client = new OSS(config);

  OSSClient = client;
  return OSSClient;
}

/**上传文件 */
export const upLoadFile = (file: File) => {
  const client = getOSSclient();
  // 上传的文件路径
  const uploadPath = createFileName(file);
  const loadingInstance = createLoadingMask();

  return client
    .put(uploadPath, file) // 文件路径 文件对象
    .then((res) => {
      console.log("🚀 -> file: index.ts -> line 14 -> .then -> res", res);
      return res;
    })
    .finally(() => {
      loadingInstance.close();
    });
};

/**分片上传 */
export const uploadMultipartFile = (file: File, processCallback?: OSS.MultipartUploadOptions["progress"]) => {
  const client = getOSSclient();
  // 上传的文件路径
  const uploadPath = createFileName(file);
  const loadingInstance = createLoadingMask();
  return client
    .multipartUpload(uploadPath, file, {
      progress(p, checkpoint) {
        if (typeof processCallback === "function") {
          processCallback(p, checkpoint);
        }
      },
    }) // 文件路径 文件对象
    .then((res) => {
      console.log("🚀 -> file: index.ts -> line 51 -> .then -> res", res);
      if (res.res) {
        return res;
      }
    })
    .catch((e) => {
      console.log("🚀 -> file: index.ts -> line 64 -> upLoadMutipleFiles -> e", e);
    })
    .finally(() => {
      loadingInstance.close();
    });
};

/**上传文件如果可以获取宽高和首帧图，则自动返回
 * @return { UploadFile }
 */
export const upLoadFileWithMedia = async (file: File) => {
  const client = getOSSclient();
  // 上传的文件路径
  const uploadPath = createFileName(file);
  const loadingInstance = createLoadingMask();

  const [{ width, height, duration }, { url, name }] = await Promise.all([getMediaSize(file), client.put(uploadPath, file)]);
  const thumb = await getVideoThumb(url, name, width, height);
  const uploaded = new UploadFile({ url, width, height, thumb, duration });
  loadingInstance.close();
  return uploaded;
};

/**获取视频首帧图 */
export const getVideoThumb = (sourcePath: string, name: string, width = 0, height = 0) => {
  const client = getOSSclient();
  const thumbPath = `${name}-thumb.jpg`;
  const rootPath = sourcePath.replace(name, "");
  return (client as any).processObjectSave(name, thumbPath, `video/snapshot,t_0,w_${width},h_${height},f_jpg`, "media-zaiuk").then((res: any) => {
    if (res.status === 200) {
      return `${rootPath}${thumbPath}`;
    } else {
      return null;
    }
  });
};

export const apiUploadPolicy: ApiCollections.ApiUploadPolicyGet.Request = function (data) {
  return request({
    url: "/api/oss/upload/policy",
    method: "get",
    params: data,
  });
};

export const apiUpload: ApiCollections.ApiUploadPolicyGet.Request = function (data) {
  return request(
    {
      url: "https://public.nearhub.cc/",
      method: "post",
      data,
      headers: {
        "x-oss-server-side-encryption": "AES256",
      },
    },
    {
      isReturnNativeResponse: true,
    }
  );
};

export const apiUploadFile = async (params = {}): Promise<any> => {
  const uploadData = await apiUploadPolicy({ type: "3" });
  const { accessid, expire, policy, signature, dir } = uploadData || {};
  const fileName = randomString() + ".jpg";
  const data = {
    expire,
    policy,
    signature,
    name: fileName,
    OSSAccessKeyId: accessid,
    key: `${dir}${fileName}`,
    success_action_status: "200",
    ...params,
  };
  await apiUpload(data as any);
  return data;
};
