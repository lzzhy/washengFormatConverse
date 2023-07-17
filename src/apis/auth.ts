import { $t } from "@/i18n";
import { Menu } from "@/types";

export const getPermissions = async () => {
  const res = {
    code: 200,
    defExec: true,
    result: {
      allOperationList: [
        new Operation({ title: "日活量", path: "/getDAU", icon: "menu-dashboard", isBulitIn: true }),
        new Operation({ title: "月活量", path: "/getMAU", icon: "menu-dashboard", isBulitIn: true }),
        new Operation({ title: "用户管理", path: "/userManagement", icon: "menu-dashboard", isBulitIn: true }),
        new Operation({ title: "用户登录管理", path: "/userLoginManagement", icon: "menu-dashboard", isBulitIn: true }),
        new Operation({ title: "大屏激活用户", path: "/userOriginManagement", icon: "menu-dashboard", isBulitIn: true }),
        new Operation({ title: $t("suoyoubaib_6cb942"), path: "/misinformation-list", icon: "menu-dashboard", isBulitIn: true }),
        // new Operation({ title: "模版库", path: "/templates", icon: "menu-templates", isBulitIn: true }), //
        // new Operation({
        //   title: "public.meeting_room",
        //   path: "/room",
        //   icon: "room-manager",
        //   children: [
        //     // new Operation({ title: "仪表盘", path: "/room/dashBoard", component: "/Category/index" }), // 仪表盘
        //     // new Operation({ title: "问题", path: "/userSettring", component: "/Category/index" }), // 仪表盘
        //     new Operation({ title: "sideBar.inventory", path: "/room-stocks", icon: "stocks", component: "/RoomStocks/index" }), // 仪表盘
        //   ],
        // }),
        // new Operation({ title: "sideBar.system", path: "/system", icon: "setting", component: "/System/index" }),
        // new Operation({ title: "sideBar.user_setting", path: "/user-setting", icon: "setting", component: "/UserSetting/index" }),
        // new Operation({ title: "异步组件", path: "/asyncPage", isBulitIn: true }),
        // new Operation({ title: "分类管理", path: "/category", component: "/Category/index" }),
        // new Operation({ title: "商品管理", path: "/product", component: "/Products/index" }),
      ],
      permissions: ["/platform/comment:view", "/system/menu:view"],
    },
    message: "SUCCESS",
    timestamp: "1661184299111",
    errorMessage: null,
    isSuccess: true,
  };
  return res.result as { allOperationList: any; permissions: string[] };
};

export class Operation implements Menu {
  id: string = (Math.random() * 100000).toFixed(0);
  name = "";
  jumpType!: null;
  title = "";
  path = "";
  icon = "home-01";
  parentId = "0";
  sort = 0;
  component!: string;
  type: "MENU" | "MODULE" | "BUTTON" = "MENU";
  redirect = "";
  hidden: 0 | 1 = 0;
  noCache: 0 | 1 = 0;
  fullScreen: 0 | 1 = 0;
  children: Operation[] = [];
  public = true;
  isBulitIn = false;
  isAsync = false;
  constructor(operation: Partial<Operation>) {
    Object.assign(this, operation);
    if (!this.name) {
      this.name = this.path.replace(/\/(\w)/g, (_, w: string) => w.toUpperCase());
    }
  }
}
