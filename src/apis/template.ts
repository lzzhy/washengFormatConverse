import { request } from "@/vendors/axios";
/**
 * 修改白板信息
 */
export const apiTemplateCopyMeeting: ApiCollections.ApiTemplateCopyMeetingPost.Request = function (data) {
  return request({
    url: "/api/template/copy/meeting",
    method: "post",
    data: data,
  });
};
