export {};
declare global {
  namespace ApiCollections {
    /**更新团队信息 */
    namespace ApiUserTeamUpdatePost {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { invitationSetting: number; teamCode: string; invitationLink: "1" | "2"; teamName?: string };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**获取团队成员 */
    namespace ApiTeamTeamMemberListGet {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { teamCode: string };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**删除成员 */
    namespace ApiTeamDeleteTeamPost {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { teamCode: string };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**从团队中删除成员 */
    namespace ApiTeamDeleteUserFromTeam {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { teamCode: string; userId: string };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**从团队中删除成员 */
    namespace ApiTeamInviteCode {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { 
        teamCode: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /** 上传 */
    namespace ApiUploadPolicyGet {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { 
        type: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
  }
}
