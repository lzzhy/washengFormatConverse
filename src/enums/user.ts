import { $t } from "@/i18n";
export enum InvitationSetting {
  Manager = 1,
  All = 2,
}

export enum InvitationLink {
  Disabled = 1,
  Enable = 2,
}

//区分是创建还是升级团队
export const OperateType = {
  create: "CREATE",
  upgrade: "UPGRADE",
};

export const SubscriptionServiceType = {
  1: $t("mianfeiban_0357cd"),
  2: $t("tuanduiban_06ff1c"),
  3: $t("shangwuban_d41b0e"),
};

export const UserType = {
  1: $t("chaoguan_777ab5"),
  2: $t("putongyong_7527da"),
};

export const UpgradeFreeType = [
  {
    label: $t("kebianjiba_7178d6"),
    value: "4",
    id: 1,
  },
  {
    label: $t("moban_cb8bba"),
    id: 2,
  },
  {
    label: $t("baibanshuj_05e2c3"),
    id: 3,
  },
  {
    label: $t("suoyouhuab_fba02a"),
    id: 4,
  },
  {
    label: $t("zhuanzhugu_162baf"),
    id: 5,
  },
  {
    label: $t("fuwuzhichi_0f071b"),
    value: $t("youjianfan_b0b08c"),
    id: 6,
  },
];

export const UpgradeProType = [
  {
    label: $t("wuxiankebi_593550"),
    id: 1,
  },
  {
    label: $t("xiangmuwen_2f9d1e"),
    id: 2,
  },
  {
    label: $t("siyouxiang_31c25d"),
    id: 3,
  },
  {
    label: $t("huishouzha_2896bd"),
    id: 4,
  },
  {
    label: $t("zaixiankef_4d14b4"),
    id: 5,
  },
];

export const UpgradeBusinessType = [
  {
    label: $t("ziyoutuand_cccd91"),
    id: 1,
  },
  {
    label: $t("wuxiancunc_16e625"),
    id: 2,
  },
  {
    label: $t("zhuanshuke_090300"),
    id: 3,
  },
];

export const PERMISSION_TYPES = [
  {
    value: 0,
    label: $t("kebianji_a32b3b"),
  },
  // {
  //   value: 1,
  //   label: $t("kepinglun_b9bd8a"),
  // },
  {
    value: 2,
    label: $t("kefangwen_7c443e"),
  },
  {
    value: 3,
    label: $t("bukefangwe_2329a0"),
  },
];

export const MEMBER_TYPES = {
  1: $t("yongyouzhe_44d320"),
  0: $t("chengyuan_ab5dea"),
};

export const CAN_INVITE_TYPES = [
  {
    value: 0,
    label: $t("jinbaibany_b294e2"),
  },
  {
    value: 1,
    label: $t("suoyoutuan_4ef4ec"),
  },
  {
    value: 2,
    label: $t("suoyoukefa_854933"),
  },
];

export const MANAGE_TYPES = [
  {
    value: 0,
    label: $t("kebianji_a32b3b1"),
  },
  {
    value: 1,
    label: $t("kechakan_11b9931"),
  },
];

export const MANAGE_NUM_TYPES = {
  0: $t("kebianji_a32b3b1"),
  1: $t("kechakan_11b9931"),
};

export const TEAMPERMISSION_TYPES = [
  {
    value: 0,
    label: $t("kebianji_a32b3b"),
  },
  // {
  //   value: 1,
  //   label: $t("kepinglun_b9bd8a"),
  // },
  {
    value: 2,
    label: $t("kefangwen_7c443e"),
  },
  {
    value: 3,
    label: $t("bukefangwe_2329a0"),
  },
];

export const FLAGVISITOR_TYPES = {
  // 0: "成员",
  1: $t("fangke_852da3"),
};

export const REGISTER_SOURCE_TYPES = {
  0: "web网页",
  1: "flutter大屏端",
  2: "安卓大屏端",
  3: "手机端",
};

export const REGISTER_SOURCE_ARRAY = [
  {
    value: 0,
    label: "web网页",
  },
  {
    value: 1,
    label: "flutter大屏端",
  },
  {
    value: 2,
    label: "安卓大屏端",
  },
  {
    value: 3,
    label: "手机端",
  },
];

export const STATUS_TYPES = {
  0: "禁用",
  1: "正常",
  2: "锁定",
};

export const REGISTER_TYPE = {
  0: "PC_WEB",
  1: "M_WEB_PLUS",
  2: "M_MINI_PLUS",
  3: "PC_CLIENT",
  4: "FEISHU_MINIAPP_PC",
};
