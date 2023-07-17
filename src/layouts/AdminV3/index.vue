<template>
  <ElContainer class="admin-layout h-screen">
    <ElHeader class="flex items-center bg-[#010715] shadow-ui">
      <Logo></Logo>
      <div class="ml-auto flex items-center space-x-7">
        <ActionButton v-if="!useProject.pay?.source"></ActionButton>
        <el-button v-else type="primary" @click="project.savePayData({ source: '' })">Go to dashboard</el-button>

        <User></User>
      </div>
    </ElHeader>

    <!-- nearhub正常样式，左右结构 -->
    <ElContainer>
      <ElAside class="aside w-[250px] bg-white">
        <div class="flex flex-auto flex-col overflow-hidden">
          <div class="flex-auto">
            <div>
              <ElScrollbar>
                <Menu></Menu>
              </ElScrollbar>
            </div>
          </div>
        </div>
      </ElAside>
      <ElMain class="p-[0px]">
        <ElScrollbar class="admin-layout__scroll">
          <RouterView v-slot="{ Component }">
            <Transition name="fade-slide" mode="out-in" appear>
              <div class="admin-layout">
                <Breadcrumb></Breadcrumb>
                <component :is="Component" class="content m-[20px]"></component>
              </div>
            </Transition>
          </RouterView>
        </ElScrollbar>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
<script lang="ts" setup>
import { Menu } from "./Sider";
import { User, Logo, ProjectTeam, ActionButton } from "./Tools";
import { useAppStore } from "@/vendors/store/modules/app";
// import { useTagsStore } from "./Tools/TagsView/index";
// const tags = useTagsStore();
import { useRoute, useRouter } from "vue-router";

import Breadcrumb from "@/pages/layout/breadcrumb.vue";
const userStore = useUserStore();
const project = useProjectStoreWithout();
const useProject = useProjectStore();
const router = useRouter();

const appStore = useAppStore();

const route = useRoute();

onMounted(() => {
  const { query } = route;
  if (query.merchantTransactionId) {
    project.savePayData({ merchantTransactionId: query.merchantTransactionId });

    // 清除路由上的参数，防止手动刷新导致重复打开弹框
    router.replace(route.path);
  }
  project.savePayData({ source: "" });
});
</script>
<style lang="scss" scoped>
.admin-layout {
  &__scroll {
    :deep(.el-scrollbar__view) {
      @apply flex min-h-full flex-col;
    }
  }
}

.flex-auto {
  :deep(.rounded-full) {
    width: 32px;
    height: 32px;
  }
}
.admin-layout {
  :deep(.content) {
    max-height: calc(100vh - 200px);
    overflow: auto;
  }
}
</style>
