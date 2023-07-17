export {};
declare global {
  namespace ApiCollections {
    /**复制会议 */
    namespace ApiTemplateCopyMeetingPost {
      type Request = (params: Partial<RequestParams>) => ResponseParams;
      type RequestParams = { teamCode: string; meetingId: string; language: string };
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
  }
}
