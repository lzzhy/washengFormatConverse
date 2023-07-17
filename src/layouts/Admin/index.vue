<template>
  <ElContainer class="admin-layout h-screen">
    <ElAside width="200px" class="flex flex-col bg-sider">
      <Logo></Logo>
      <div class="flex-1 overflow-hidden">
        <ElScrollbar>
          <Menu></Menu>
        </ElScrollbar>
      </div>
    </ElAside>
    <ElContainer>
      <ElHeader class="flex items-center justify-end shadow-ui">
        <User></User>
      </ElHeader>
      <ElMain>
        <ElScrollbar class="admin-layout__scroll">
          <RouterView></RouterView>
        </ElScrollbar>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
<script lang="ts" setup>
import { Menu, Logo } from "./Sider";
import User from "./Tools/User.vue";
</script>
<style lang="scss" scoped>
.admin-layout {
  &__scroll {
    :deep(.el-scrollbar__view) {
      @apply flex min-h-full flex-col;
    }
  }
}
</style>
