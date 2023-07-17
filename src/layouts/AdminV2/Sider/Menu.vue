<template>
  <!-- :default-active="" -->
  <ElMenu class="sider-menu" router :default-active="$route.path" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <Render :value="menuList || []"></Render>
  </ElMenu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Render from "./Render.vue";

let { visibleMenuList: menuList } = storeToRefs(useUserStore());

// 测试可以删除
// const useRouterCurrent = reactive(useRouter());
// watch(useRouterCurrent, (router) => {
//   console.log(router);
//   console.log(router.currentRoute.path);
// });

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
$primary-color: theme("color.primary");
.sider-menu {
  --el-menu-bg-color: transparent;
  --el-menu-hover-bg-color: rgba(255, 255, 255, 0.12);
  --el-menu-text-color: #000;
  --el-menu-active-color: $primary-color;
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
