<template>
  <ElMenu class="sider-menu mb-[20px] space-y-2" router :default-active="$route.path" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <Render :value="menuList || []"></Render>
  </ElMenu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Render from "./Render.vue";
import Projects from "./Project/index.vue";

const project = useProjectStore();

let { visibleMenuList: menuList } = storeToRefs(useUserStore());
console.log("🚀 -> file: Menu.vue:12 -> menuList", menuList);

// 测试可以删除
// const useRouterCurrent = reactive(useRouter());
// watch(useRouterCurrent, (router) => {
//   console.log(router);
//   console.log(router.currentRoute.path);
// });

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  project.current = {};
};
const handleClose = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
$primary-color: theme("color.primary");
.sider-menu {
  --el-menu-bg-color: transparent;
  --el-menu-hover-bg-color: #0a3edb4d;
  --el-menu-text-color: #000;
  --el-menu-active-color: $primary-color;
  --el-menu-item-height: 44px;
  border: none;
  overflow: hidden;
  :deep(.el-menu-item.is-active) {
    /* background-color: var(--el-menu-hover-bg-color); */
    border-left: 3px solid $primary-color;
    color: $primary-color;
    background: rgb(242, 237, 255);
    --el-menu-base-level-padding: 17px;
  }
  :deep(.el-sub-menu .el-sub-menu__icon-arrow) {
    display: none;
  }
}
</style>
