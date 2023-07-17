<script lang="tsx">
import { $t } from "@/i18n";
/**主要实现菜单的无限递归
 * 1. 如果没有孩子节点则直接选入节点
 * 2. 如果存在孩子节点则重复遍历自己
 *
 * 基准条件 menu.children?.length > 0
 * 递归条件 fun(menu)
 */
import { computed, defineComponent, PropType } from "vue";
import { ElMenuItem, ElSubMenu } from "element-plus";
import { Menu } from "@/types";
import { useAppStore } from "@/vendors/store/modules/app";

interface CreateRenderProps {
  menu: Menu;
  isHasSubmenu: boolean;
}

const appStore = useAppStore();

/**渲染菜单 */
function renderMenu(menu: Menu, isHasSubmenu: boolean) {
  return (
    <ElMenuItem index={menu.path} key={menu.name} class={[!isHasSubmenu ? "main-menu" : "sub-menu", appStore.isHoverAdminLayoutSide ? "hover" : ""]}>
      {menu.icon ? (
        <div>
          <Icon name={menu.icon as any}></Icon>
        </div>
      ) : null}
      <span class={appStore.isHoverAdminLayoutSide ? "hover" : ""}>{$t("caidanbiao_79b292")}</span>
    </ElMenuItem>
  );
}

/**渲染父菜单 */
function renderSubMenu(menu: Menu) {
  //console.log(menu.children.map((item) => createMenuEntry({ menu: item })));
  return (
    <ElSubMenu index={menu.name} key={menu.name} class='main-menu'>
      {{
        title: () => (
          <>
            <div>
              <Icon name={menu.icon as any}></Icon>
            </div>
            <span class={appStore.isHoverAdminLayoutSide ? "hover" : ""}>菜单</span>
          </>
        ),
        default: () => menu.children.map((item) => createMenuEntry({ menu: item, isHasSubmenu: true })),
      }}
    </ElSubMenu>
  );
}

/**启动渲染 */
function createMenuEntry({ menu, isHasSubmenu }: CreateRenderProps) {
  const hasChildren = computed(() => !!menu.children?.length);

  /**递归条件
   * 如果存在孩子那么 调用 subMenu,
   * subMenu 执行 ->  createMenuEntry 自身。
   */
  if (hasChildren.value) {
    return renderSubMenu(menu);
  } else {
    /**基准条件
     * 当没有子节点时
     */
    return renderMenu(menu, isHasSubmenu);
  }
}

export default defineComponent({
  props: {
    value: {
      type: Array as PropType<Menu[]>,
      default: () => [],
    },
  },
  setup(props) {
    //console.log("🚀 -> file: Render.vue -> line 77 -> setup -> props", props);
    // const MenuVnode = computed(() => props.value.map((item) => createMenuEntry({ menu: item })));
    return () => props.value.map((item) => createMenuEntry({ menu: item, isHasSubmenu: false }));
  },
});
</script>
<style lang="scss" scoped>
.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-menu-item {
  padding-left: var(--el-menu-base-level-padding);
}
.main-menu {
  span {
    margin-left: 15px;
    transition: margin-left 300ms ease 0s;
    &.hover {
      margin-left: 4px;
    }
  }
}
.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .sub-menu {
  padding-left: var(--el-menu-base-level-padding);
  transition: padding-left 300ms ease 0s, width 300ms ease 0s;
  &.hover {
    padding-left: 36px;
  }
}
</style>
