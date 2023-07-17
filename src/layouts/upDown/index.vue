<!-- 上下结构 -->
<template>
  <ElContainer class="admin-layout h-screen">
    <ElHeader class="flex items-center bg-[#010715] shadow-ui">
      <Logo></Logo>
      <div class="ml-auto flex items-center space-x-7">
        <el-button type="primary" @click="project.savePayData({ source: '' })">Go to dashboard</el-button>

        <User></User>
      </div>
    </ElHeader>

    <ElContainer>
      <ElMain>
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
import { User, Logo } from "../AdminV3/Tools";
import { useRoute, useRouter } from "vue-router";
const project = useProjectStoreWithout();
const router = useRouter();

const route = useRoute();

onMounted(() => {
  const { query } = route;
  if (query.merchantTransactionId) {
    project.savePayData({ merchantTransactionId: query.merchantTransactionId });
    // 清除路由上的参数，防止手动刷新导致重复打开弹框
    router.replace(route.path);
  }

  // 是否官网引流进支付
  if (query?.website) {
    project.savePayData({ source: query.website, payType: query.payType });
  } else {
    project.savePayData({ source: "" });
  }
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
</style>
