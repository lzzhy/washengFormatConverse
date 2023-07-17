import { store } from "@/vendors/store";
import { awaitWrap } from "@/utils";
import { apiProjectGroupSave, apiGroupList, apiGroupRemove, apiGroupInfo, apiGroupInviteInto, apiGroupMembers, apiGroupExit, apiGroupOwner, apiUserTeamMember, apiGroupMemberRemove } from "@/apis";
import router from "@/vendors/route";

export const useProjectStore = defineStore({
  id: "project",
  state: (): ProjectState => {
    return {
      list: [],
      current: {},
      pay: {},
      avatarList: [],
    };
  },
  actions: {
    /**
     * 创建项目
     */
    async fetchGroupSave({ name, keep, invite, privacy, groupId, teamCode }: Pick<ApiCollections.ApiTeamGropSavePost.RequestParams, "name" | "keep" | "invite" | "privacy" | "groupId" | "teamCode">) {
      const params = {
        name,
        keep,
        invite,
        teamCode: "",
        groupId,
        privacy,
      };
      const [err, result] = await awaitWrap(apiProjectGroupSave({ ...params }));
      if (err) {
        throw err;
      }
      return result;
    },

    /**
     * 项目列表
     */
    async fetchProjectList() {
      const params = {
        current: 1,
        size: 20,
        teamCode: "",
      };
      const [err, result] = await awaitWrap(apiGroupList({ ...params }));
      if (err) {
        throw err;
      }
      this.list = result?.records || [];
      return result;
    },

    /**
     * 删除项目
     */
    async fetchGroupRemove({ groupId }: Pick<ApiCollections.ApiGropRemovePost.RequestParams, "groupId">) {
      const params = {
        groupId,
        hold: "HOLD",
      };
      const [err, result] = await awaitWrap(apiGroupRemove({ ...params }));
      if (err) {
        throw err;
      }
      return result;
    },

    /**
     * 设置项目
     */
    async fetchGroupInfo({ groupId }: Pick<ApiCollections.ApiGropInfoPost.RequestParams, "groupId">) {
      const params = {
        groupId,
      };
      const [err, result] = await awaitWrap(apiGroupInfo({ ...params }));
      if (err) {
        throw err;
      }
      return result;
    },

    /**
     * 添加项目成员
     */
    async fetchGroupInvite({ groupId, userIds }: Pick<ApiCollections.ApiGropInvitePost.RequestParams, "groupId" | "userIds">) {
      const params = {
        groupId,
        userIds,
      };
      const [err, result] = await awaitWrap(apiGroupInviteInto({ ...params }));
      if (err) {
        throw err;
      }
      return result;
    },

    /**
     * 项目成员列表
     */
    async fetchGroupMember({ groupId }: Pick<ApiCollections.ApiGropMemberPost.RequestParams, "groupId">) {
      const params = {
        groupId,
        current: 1,
        size: 20,
      };
      const [err, result] = await awaitWrap(apiGroupMembers({ ...params }));
      if (err) {
        throw err;
      }
      return result;
    },

    /**
     * 移交项目成员
     */
    async fetchGroupExit({ groupId, userId }: Pick<ApiCollections.ApiGropMemberPost.RequestParams, "groupId" | "userId">) {
      const params = {
        groupId,
      };

      const [reErr, reResult] = await awaitWrap(apiGroupOwner({ groupId, userId }));
      if (reErr) {
        throw reErr;
      }

      const [err, result] = await awaitWrap(apiGroupExit({ ...params }));
      if (err) {
        throw err;
      }
      return result;
    },

    async fetchGroupOwner({ groupId, userId }: Pick<ApiCollections.ApiGropMemberPost.RequestParams, "groupId" | "userId">) {
      const [err, result] = await awaitWrap(apiGroupOwner({ groupId, userId }));
      if (err) {
        throw err;
      }
      return result;
    },

    async fetchGroupsExit({ groupId }: Pick<ApiCollections.ApiGropMemberPost.RequestParams, "groupId">) {
      const params = {
        groupId,
      };

      const [err, result] = await awaitWrap(apiGroupExit({ ...params }));
      if (err) {
        throw err;
      }
      return result;
    },

    /**
     * 删除项目成员
     */
    async fetchGroupMemberRemove({ groupId, userId }: Pick<ApiCollections.ApiGropMemberPost.RequestParams, "groupId" | "userId">) {
      const params = {
        groupId,
        userId,
      };

      const [err, result] = await awaitWrap(apiGroupMemberRemove({ ...params }));
      if (err) {
        throw err;
      }
      return result;
    },

    /**
     * 成员管理
     */
    async TeamMember({ teamCode }: Pick<ApiCollections.ApiUserTeamDetailPost.RequestParams, "teamCode">) {
      const [err, result] = await awaitWrap(apiUserTeamMember({ teamCode: "" }));
      if (err) {
        throw err;
      }
      return result;
    },

    async handleGetAvatarList(params: any) {
      const [err, projectInfo] = await awaitWrap(apiGroupInfo({ groupId: params.groupId }));

      const avatarList = projectInfo.groupMemberList.map((item: any) => {
        return {
          avatar: item.user.avatar,
          avatarType: item.user.avatarType,
          name: item.user.name,
          color: "#0A3EDB",
        };
      });
      this.avatarList = avatarList;
    },

    async savePayData(params: any) {
      if (params.empty && params.empty === "EMPTY") {
        this.pay = {};
      } else {
        this.pay = {
          ...this.pay,
          ...params,
        };
      }
    },

    async changeProject() {
      if (this.list && this.list.length > 1) {
        this.current = this.current.map((item: any) => {
          if (item.id !== this.current.id) {
            return item;
          }
          return item;
        });

        this.current = this.list[0];
        router.push(`/project/${this.list[0].id}`);
      } else {
        router.push(`/dashboard`);
      }
    },
  },

  persist: {
    paths: ["list", "current", "pay"],
  },
});

// Need to be used outside the setup
export function useProjectStoreWithout() {
  return useProjectStore(store);
}

export interface ProjectState {
  list: Project[];
  current: Partial<Project>;
  pay: Partial<Project>;
  avatarList: Partial<Project>;
}

export interface Project {
  id: string;
  createrId: string;
  ownerId: string;
  name: string;
  seq: string;
  code: string;
  type: number;
  privacy: number;
  hold: number;
  keep: number;
  invite: number;
  emojiType: number;
  emoji: string;
  status: number;
  updateTime: string;
  createTime: string;
  sort: number;
}
