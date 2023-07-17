export {};
declare global {
  namespace ApiCollections {
    /**登录接口 */
    namespace ApiDemo {
      type Request = (params: RequestParams) => ResponseParams;
      type RequestParams = any;
      type ResponseParams = Promise<Result>;
      type Result = any;
    }
  }
}
