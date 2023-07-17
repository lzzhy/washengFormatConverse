
export {};
declare global {
  namespace ApiCollections {
    /**复制会议 */
    namespace ApiGroupTransferPost {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { targetGroupId: string; meetingId: string; targetTeamCode: string };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
  }
}
