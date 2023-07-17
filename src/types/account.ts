export interface TeamDetailData {
  id: string;
  teamName: string;
  teamCode: string;
  owner: string;
  subscriptionService: number;
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
