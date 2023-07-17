/*
 * @Author: lich
 * @Date: 2022-08-07 22:47:49
 * @Last Modified by: lich
 * @Last Modified time: 2023-03-07 17:30:55
 * @description: 项目配置信息
 */
import settings from "@/settings";
import { store } from "@/vendors/store";
import { Local } from "@/i18n";

interface AppState {
  title: string;
  isHoverAdminLayoutSide: boolean;
  locale: Local;
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => {
    return {
      isHoverAdminLayoutSide: false,
      ...settings,
      locale: (settings.local || "zh-cn") as Local,
    };
  },
  getters: {
    switchAdminLayoutSideStatus(): boolean {
      return !!this.isHoverAdminLayoutSide;
    },
  },
  actions: {
    changeLocale(locale: AppState["locale"]) {
      this.locale = locale;
      location.reload();
    },
  },
  persist: {
    paths: ["locale"],
  },
});

// Need to be used outside the setup
export function useAppStoreWithout() {
  return useAppStore(store);
}
