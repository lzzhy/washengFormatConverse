export {};
declare global {
  namespace ApiCollections {
    /**创建邀请链接 */
    namespace ApiInviteOpenCreate {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { meetingId: string; groupId: string; remark: string; openIds: string; id: string; userIds: string; recipients: string; permissions: 0 | 1; language: string };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**生成白板邀请码 */

    namespace ApiInviteOpenGenerateInvitationCode {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { meetingId: string };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiMonitorGetDAU {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { 
        pageSize: number,
        pageNo: number,
       };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiInviteCanJoinCode {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { 
        code?: any;
        userType?: any;
        source?: any;
        token?:string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiInviteInfoCode {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { 
        code?: any;
        type?: string;
        token?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiCreateTempUserCode {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { 
        username?: string;
        platform?: string;
        type?: string;
        code?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    /**加入白板 */

    namespace ApiInviteMeetingLargeScreenCodePost {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { code: string };
      type ResponseParams = Promise<Result>;
      type Result = {
        id: string;
        code: string;
        createrId: string;
        ownerId: string;
        name: string;
        snapshot: string;
        privacy: number;
        status: number;
      };
    }

    namespace ApiInviteOpenCreate {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { 
        meetingId: string;
        recipients: string;
        permissions: number;
        recipient: string;
       };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiNoticeDetail {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { 
        noticeMessageId?: string;
        pageNum?: number;
        pageSize?: number;
        status?: number;
        noticeMessageIds?: string;
       };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiMonitorUserManage {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { 
        current: number,
        size: number,
        type: number,
       };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
  }
}
