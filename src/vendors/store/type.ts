import { Menu } from "@/types";
// import { RouteRecordRaw } from "vue-router";

/**登录方式 */
export type LOGINFACTORY_TYPE = "account" | "scan_app" | "scan_wechat" | "platform";

export interface UserBase {
  id: string;
  avatar: string;
  name: string;
  email: string;
  mobile: string;
  avatarType: 1 | 2;
  status: number;
  type: number;
  registerType: number;
  platformType: number;
  registerTime: Date;
  hcSign: string;
  userProfile: UserProfile;
  fixedColors: string[];
  customColors: any[];
  company: string;
  industry: string;
  role: string;
}

export interface UserProfile {
  userId: string;
  color: string;
  zoomInverse: number;
  trailer: number;
  shortcuts: number;
  notice: number;
  sound: number;
  popMessage: number;
  boxMode: number;
  gridMode: number;
  gridAlign: number;
  lang: string;
  ctrlDevice: string;
}

export interface TeamInfo {
  teamCode: string;
  teamName: string;
  subscriptionService: number;
  avatar: null;
  avatarType: number;
  shareCode: string;
  owner: string;
}

export interface UserState {
  menuList: Menu[];
  permissions: Map<string, boolean>;
  //   routerList?: RouteRecordRaw[];
  base: UserBase;
  token: string;
  platformType: "pw";
  teamList: TeamInfo[];
  teamCode: string;
  teamInfo: TeamDetail;
}

export interface TeamDetail {
  id: string;
  teamName: string;
  teamCode: string;
  owner: string;
  /**服务类型:1免费版;2团队版;3商务版; */
  subscriptionService: 1 | 2 | 3;
  totalNum: number;
  assignedNum: number;
  expirationTime?: any;
  invitationSetting: number;
  invitationLink: number;
  avatar?: any;
  avatarType: 1 | 2;
  createUser: string;
  createTime: Date;
  updateUser: string;
  updateTime: Date;
  flag: number;
  shareCode: string;
  meetingCount: number;
  isOwner: boolean;
  /**是否启用邀请 */
  invitationStatus: boolean;
}
