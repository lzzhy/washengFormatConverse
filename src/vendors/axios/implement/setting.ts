import settings from "@/settings";
const { baseURL = "", apiUrl = "", urlPrefix = "" } = (settings as any) || {};
export const useSetting = () => {
  return {
    authenticationScheme: "",
    baseURL,
    apiUrl,
    urlPrefix,
    timeout: 30 * 1000,
  };
};
