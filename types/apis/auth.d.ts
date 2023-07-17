export {};
declare global {
  namespace ApiCollections {
    //api d.ts docs
    /**账号密码登录
     * 生成时间: 2022-12-30 00:55:33
     * refer: /api/auth/login
     */
    namespace ApiUserLoginPost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        password: string;
        username: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**获取分享code -> invite meeting
     * 邀请加入白板的时候使用
     * 生成时间: 2022-12-30 00:55:33
     * refer: /api/auth/login
     */
    namespace ApiUserShareCode {
      type Request = (params?: RequestParams) => ResponseParams;
      type RequestParams = any;
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**
     * 获取TeamCode
     */
    namespace ApiUserTeamDetailPost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        teamCode?: string;
        userId?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**获取用户详情
     * 生成时间: 2022-12-30 00:55:33
     * refer: /api/platform/user
     */
    namespace ApiUserInfoPost {
      type Request = (params?: RequestParams) => ResponseParams;
      type RequestParams = any;
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**退出登陆
     * 生成时间: 2022-12-30 00:55:33
     * refer: /api/platform/user
     */
    namespace ApiUserLogoutPost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        platform?: "pw";
        recipient?: string;
        validationCode?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiTeamCreatePost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        recipients?: string;
        teamCode?: string;
        userId?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**
     * 创建团队
     */
    namespace ApiTeamCreateInvitPost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        teamName?: string;
        subscriptionService?: string;
        invitationCode?: string;
        userId?: string;
        userName?: string;
        email?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**
     * 升级团队
     */
    namespace ApiTeamCreateUpgradePost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        invitationCode: string;
        teamCode: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**
     * 转移超管权限
     */
    namespace ApiTeamCreateTransferPost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        teamCode?: string;
        beforeUserName?: string;
        beforeUserId?: string;
        afterUserName?: string;
        afterUserId?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiTeamGropSavePost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        name?: string;
        privacy?: string;
        keep?: string;
        invite?: string;
        teamCode?: string;
        groupId?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiGropListPost {
      export interface Record {
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
        updateTime: Date;
        createTime: Date;
        sort: number;
      }

      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        current?: number;
        size?: number;
        keyWord?: string;
        teamCode?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = { records: Record[]; total: number; size: number; current: number; searchCount: boolean; pages: number };
    }
    namespace ApiGropRemovePost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        groupId?: string;
        hold?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiGropInfoPost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        groupId?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiGropInvitePost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        groupId?: string;
        userIds?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiGropMemberPost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        groupId?: string;
        current?: number;
        size?: number;
        userId?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
    namespace ApiUserUpdatePost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        name?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiUserAvataUpdatePost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        avatar?: string;
        teamCode?: string;
        avatarType?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiUsersUpdatePost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        avatarType?: string;
        teamCode?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiCreateTeamPost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        teamName: string
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
  }
}
