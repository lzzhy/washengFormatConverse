export {};
declare global {
  namespace ApiCollections {
    /**
     * 会议列表
     */
    namespace ApiMeetingListPost {
      export interface Instance {
        sharePermissions: any;
        id: string;
        code: string;
        teamCode: string;
        createrId: string;
        ownerId: string;
        name: string;
        seq: string;
        type: number;
        snapshot: string;
        duration: number;
        autoSnapshot: number;
        privacy: number;
        status: number;
        mikeStatus: number;
        joinCallStatus: number;
        independentMuteStatus: number;
        pushTalkStatus: number;
        entryTime: Date;
        leaveTime: Date;
        updateTime: Date;
        createTime: Date;
        meetingMemberList: MeetingMemberList[];
        meetingMemberCount: number;
        collection: number;
        memberRole: number;
        ownerName: string;
        permissions: number;
        checkPassword: number;
        isOwner: Boolean;
      }

      export interface MeetingMemberList {
        id: string;
        meetingId: string;
        userId: string;
        isOwner: number;
        color: string;
        viewArea: string;
        viewPercentage: string;
        rights: string;
        entryTime: Date;
        leaveTime: Date;
        source: number;
        permissions: number;
        status: number;
        updateTime: Date;
        createTime: Date;
        online: number;
        user: User;
      }

      export interface User {
        id: string;
        name: string;
        avatarType: number;
        type: number;
      }

      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = {
        begin: number;
        num: number;
        category: "ALL" | "OWNER" | "JOIN" | "FAV" | "";
        current: number;
        size: number;
        orderKey: "LEAVE" | "SEQ" | "CREATE" | "UPDATE";
        sort: "ASC" | "DESC";
        groupId: string;
        selectId: string;
        teamCode?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = {
        records: Instance[];
        total: number;
        size: number;
        current: number;
        searchCount: boolean;
        pages: number;
      };
    }

    namespace ApiMeetingCollectionPost {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        meetingId: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiMeetingInfo {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        meetingId: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiMeetingManageMember {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        meetingId?: string;
        permissions?: number;
        userId?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiMeetingSave {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        name?: string;
        interval: number;
        meetingId: string;
        groupId?: string;
        startTime?: string;
        isDelete?: string;
        data?: string;
        autoSnapshot?: string;
        snapshot?: string;
        checkPassword: number;
        password?: string;
        teamCode: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
    namespace ApiMeetingRemove {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        meetingId: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    namespace ApiTeamGetOrder {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        totalNum?: string;
        billingPeriod?: string;
        preferential?: string;
        merchantTransactionId?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
    namespace apiTeamPaymentStatus {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        merchantTransactionId?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
    namespace apiTeamIsUpdatings {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        teamCode?: string;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
    namespace ApiMeetingPermissionsSetting {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = {
        meetingId?: string;
        privacy?: number;
      };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }

    
  }
}
