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

interface CreateRenderProps {
  menu: Menu;
}

/**渲染菜单 */
function renderMenu(menu: Menu) {
  return (
    <ElMenuItem index={menu.path} key={menu.name}>
      {menu.icon ? (
        <div>
          <Icon name={menu.icon as any}></Icon>
        </div>
      ) : null}
      <span>{$t("biaoti_32c65d")}</span>
    </ElMenuItem>
  );
}

/**渲染父菜单 */
function renderSubMenu(menu: Menu) {
  return (
    <ElSubMenu index={menu.name} key={menu.name}>
      {{
        title: () => (
          <>
            <div>
              <Icon name={menu.icon as any}></Icon>
            </div>
            <span></span>
          </>
        ),
        default: () => menu.children.map((item) => createMenuEntry({ menu: item })),
      }}
    </ElSubMenu>
  );
}

/**启动渲染 */
function createMenuEntry({ menu }: CreateRenderProps) {
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
    return renderMenu(menu);
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
    // const MenuVnode = computed(() => props.value.map((item) => createMenuEntry({ menu: item })));
    return () => props.value.map((item) => createMenuEntry({ menu: item }));
  },
});
</script>
