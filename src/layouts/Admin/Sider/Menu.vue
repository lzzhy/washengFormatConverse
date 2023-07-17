<template>
  <ElMenu class="sider-menu" router :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <Render :value="menuList || []"></Render>
  </ElMenu>
</template>

<script lang="ts" setup>
import { useUserStore } from "@stores/user";
import { ref } from "vue";
import Render from "./Render.vue";

let { visibleMenuList: menuList } = storeToRefs(useUserStore());

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.sider-menu {
  --el-menu-bg-color: transparent;
  --el-menu-hover-bg-color: rgba(255, 255, 255, 0.12);
  --el-menu-text-color: #fff;
  --el-menu-active-color: #fff;
  border: none;
  :deep(.el-menu-item.is-active) {
    background-color: var(--el-menu-hover-bg-color);
  }
}

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
</style>
