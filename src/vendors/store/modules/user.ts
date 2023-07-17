import { $t } from "@/i18n";
/*
 * @Author: lich
 * @Date: 2022-08-07 22:47:49
 * @Last Modified by: lich
 * @Last Modified time: 2023-01-19 17:12:42
 * @description: 项目配置信息
 */
import router from "@/vendors/route";
import { getPermissions } from "@/apis/auth";
import { generateRoutes } from "@/vendors/route/lazy";
import { store } from "@/vendors/store";
import { RouteRecordRaw } from "vue-router";
import type { UserState, Team, TeamInfo } from "../type";
import { ElLoading, ElNotification } from "element-plus";
import { awaitWrap } from "@/utils";
import { loginEncryption, passwordEncryption } from "@/utils/encryption";
import { apiUserLogin, apiUserInfo, apiUserLogout, retrievePassword, apiUserSignup, apiUserWXLogin, apiUserTeamDetail, apiUserTeamList, apiUserTeamUpdate, apiTeamInviteCreate, apiTeamCreate, apiTeamUpgrade, apiUserLeaveTeam, apiTeamCreate2, apiUserUpdate } from "@/apis";
import { useMessage } from "@/vendors/axios/implement/message";
import { ElMessage } from "element-plus";

const { createMessage } = useMessage();
export const useUserStore = defineStore({
  id: "user",
  state: (): Nullable<UserState> => {
    return {
      menuList: null,
      permissions: null,
      // routerList: null,
      base: null,
      token: null,
      platformType: "pw",
      teamList: null,
      teamCode: null,
      teamInfo: null,
    };
  },
  getters: {
    // token(): string | undefined {
    //   return this.base?.token;
    // },
    isLogined(): boolean {
      return !!this.base;
    },
    visibleMenuList(): UserState["menuList"] {
      if (!this.menuList) return [];
      const visibleMenuList = this.menuList.filter((menu) => menu.hidden === 0);
      return visibleMenuList;
    },
    routerList(): RouteRecordRaw[] {
      if (!this.menuList) return [];
      return generateRoutes(this.menuList);
    },
    // teamInfo(): TeamInfo | null {
    //   return this.teamList?.find((item) => item.teamCode === this.teamCode) || null;
    // },
  },
  actions: {
    /**
     * 登陆
     * eg:
     * {
     *  email: 1000108350@qq.com
     *  password: createToBase64(JSON.stringify({seed:'dasda',pwd:ency('dsada')}))
     * }
     * @param param0
     * @returns
     */
    async login({ username, password }: Pick<ApiCollections.ApiUserLoginPost.RequestParams, "username" | "password">) {
      const params = {
        loginname: username,
        password,
      };
      const [err, result] = await awaitWrap(apiUserLogin({ ...params }));
      if (err) {
        const { _code } = err;
        switch (_code) {
          case "10012":
            createMessage({ type: "error", message: $t("mimabuzhen_5c428a") });
            break;
          case "10002":
            createMessage({ type: "error", message: $t("yonghubucu_489251") });
            break;
          default:
            break;
        }
        throw err;
      }
      await this.loginAuto(result.token);
      this.base = {
        ...result,
      };

      router.push("/getDAU");
      return result.token;
    },

    /**
     * 微信登录
     */
    async WXLogin({ code }: Pick<ApiCollections.ApiUserLoginPost.RequestParams, "code">) {
      const params = {
        code: code,
      };
      const [err, result] = await awaitWrap(apiUserWXLogin({ ...params }));
      if (err) {
        throw err;
      }

      await this.loginAuto(result.token);
      // router.push("/dashBoard");
      return result.token;
    },

    /**
     * 注册
     */
    async signup({ recipient, name, validationCode, password, teamName, invitationCode }: Pick<ApiCollections.ApiUserLoginPost.RequestParams, "recipient" | "code">) {
      const params = {
        recipient,
        name,
        validationCode,
        password,
        teamName,
        invitationCode,
        platform: "pw",
        recipientType: "EMAIL",
      };
      const [err, result] = await awaitWrap(apiUserSignup({ ...params }));
      if (err) {
        throw err;
      }
      if (result?.token) {
        await this.loginAuto(result.token);
        // router.push("/dashBoard");
      }
      return result?.token;
    },

    // 找回密码
    async passwordForget({ email, password, validationCode }: Pick<ApiCollections.ApiUserLoginPost.RequestParams, "recipient" | "code">) {
      const params = {
        recipientType: "EMAIL",
        recipient: email,
        validationCode: validationCode,
        password: password,
      };
      const [err, result] = await awaitWrap(retrievePassword({ ...params }));
      // const [err, { token }] = await awaitWrap({ ...params });
      if (err) {
        throw err;
      }

      ElNotification.success($t("xiugaimima_801368"));
      router.push("/login");
      return result;
    },

    async updatePermissions() {
      const { allOperationList, permissions } = await getPermissions();

      this.menuList = allOperationList;

      this.routerList
        .filter((route) => !!route.component)
        .forEach((route) => {
          if (route.meta?.fullScreen) {
            router.addRoute(route);
          } else {
            router.addRoute("admin", route);
          }
        });

      this.permissions = new Map(permissions.map((key) => [key, true]));
    },
    async loginAuto(token?: string) {
      if (token) {
        this.token = token;
      }

      // await this.fetchUserInfo();

      // 更新菜单信息
      await this.updatePermissions();
      return this.base;
    },

    async toRegister(pending = true) {
      if (pending) await apiUserLogout({ platform: this.platformType as "pw" });
      this.$reset();
      router.push("/register");
    },

    async logout(pending = true) {
      // if (pending) await apiUserLogout({ platform: this.platformType as "pw" });
      ElMessage({
        message: $t("yituichude_4113d3"),
        type: "success",
      });
      this.$reset();
      router.push("/login");
    },
    async fetchUserInfo() {
      const [err1, data] = await awaitWrap(apiUserInfo());
      const [err2, result] = await awaitWrap(apiUserTeamList({ userId: (data as any).id } as any));
      if (err1 || err2 || !data) {
        throw err1 || err2;
      }

      this.teamList = result;

      if (!this.teamCode) {
        this.changeActiveTeam();
      } else {
        this.updateTeamInfo();
      }

      this.base = {
        ...data,
        // teamInfo: result[0],
      };
    },

    /**改变当前选中的团队
     * 如果不传默认选中第一个
     */
    async changeActiveTeam(teamCode?: string) {
      const result = this.teamList;
      if (result?.length === 0) {
        this.teamCode = "";
        this.teamInfo = null;
        return;
      }
      if (!teamCode) {
        teamCode = result && result.length > 0 ? result[0].teamCode : "";
      }
      this.teamCode = teamCode;
      this.updateTeamInfo();
    },

    /**更新当前的团队信息状态 */
    async updateTeamInfo() {
      /**如果当前的teamcode不再团队列表中则重新刷新 */
      if (this.teamList?.map((item) => item.teamCode).includes(this.teamCode || "") === false) {
        return this.changeActiveTeam();
      }
      this.teamInfo = this.teamCode && (await apiUserTeamDetail({ teamCode: this.teamCode }));
      if (this.teamInfo) {
        const isOwner = this.teamInfo.owner === this.base?.id;
        Object.assign(this.teamInfo, { isOwner, invitationStatus: isOwner || this.teamInfo.invitationSetting == 2 });
      }
    },

    /**
     * 邀请成员
     */
    async TeamCreate({ recipients, recipient, language }: Pick<ApiCollections.ApiTeamCreatePost.RequestParams, "recipients" | "recipient" | "language">) {
      const params = {
        recipients,
        teamCode: "",
        userId: this.base?.userProfile?.userId,
        recipient,
        language,
      };
      const [err, result] = await awaitWrap(apiTeamInviteCreate({ ...params }));
      if (err) {
        throw err;
      }
      return result;
    },
  },
  persist: {
    paths: ["token", "teamCode", "base"],
  },
});

// Need to be used outside the setup
export function useUserStoreWithout() {
  return useUserStore(store);
}
