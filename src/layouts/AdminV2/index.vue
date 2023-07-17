<template>
  <ElContainer class="admin-layout h-screen">
    <ElAside class="aside flex flex-col overflow-hidden bg-sider" :class="[appStore.isHoverAdminLayoutSide ? 'active' : '']" @mouseover="addSideClass" @mouseleave="removeSideClass" @click="addSideClass">
      <div class="flex flex-auto flex-col overflow-hidden">
        <div class="flex-auto">
          <Logo />
          <div>
            <ElScrollbar>
              <Menu></Menu>
            </ElScrollbar>
          </div>
        </div>
        <Setting />
      </div>
      <UserTool @popoverJudge="getShow" />
    </ElAside>
    <ElContainer>
      <ElHeader class="flex items-center justify-end space-x-4 shadow-ui">
        <!-- <ThemeChange></ThemeChange> -->
        <User></User>
      </ElHeader>
      <!-- <Breadcrumb v-if="app.needBreadcrumb" class="breadcrumb" /> -->
      <TagsView class="tags_view" />
      <ElMain class="p-0">
        <ElScrollbar class="admin-layout__scroll">
          <RouterView v-slot="{ Component }">
            <Transition name="fade-slide" mode="out-in" appear>
              <component :is="Component"></component>
            </Transition>
          </RouterView>
        </ElScrollbar>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
<script lang="ts" setup>
import { Menu, Logo, Setting, UserTool } from "./Sider";
import { User, ThemeChange, TagsView } from "./Tools";
import { useAppStore } from "@/vendors/store/modules/app";
// import { useTagsStore } from "./Tools/TagsView/index";
// const tags = useTagsStore();

const appStore = useAppStore();
const popover = ref(false);
const getShow = (show: boolean) => {
  popover.value = show;
  if (!show) {
    appStore.isHoverAdminLayoutSide = false;
  }
};
// side hover event
const addSideClass = () => {
  appStore.isHoverAdminLayoutSide = true;
};
const removeSideClass = () => {
  if (!popover.value) {
    appStore.isHoverAdminLayoutSide = false;
  }
};

/**
const popoverShow = () => {
  appStore.isHoverAdminLayoutSide = true;
};
*/
</script>
<style lang="scss" scoped>
.admin-layout {
  &__scroll {
    :deep(.el-scrollbar__view) {
      @apply flex min-h-full flex-col;
    }
  }
  padding-left: 56px;
  .aside {
    justify-content: space-between;
    position: absolute;
    overflow: hidden;
    left: 0;
    z-index: 10;
    width: 56px;
    height: 100vh;
    // padding: 20px 0;
    padding-bottom: 20px;
    transition: width 300ms ease 0s;
    box-shadow: rgb(47 49 50 / 4%) 0px 4px 16px 0px;

    &.active {
      width: 200px;
      transition: width 300ms ease 0s;
    }
  }
  .menu-list {
    span {
      margin-left: 15px;
      transition: margin-left 300ms ease 0s;
      &.active {
        margin-left: 4px;
      }
    }
  }
}
</style>
