<template>
  <ElConfigProvider :locale="local">
    <RouterView v-slot="{ Component }" :key="routeKey">
      <!-- <Transition name="fade-slide" mode="out-in" appear> -->
      <component :is="Component"></component>
      <!-- </Transition> -->
    </RouterView>
  </ElConfigProvider>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import zhCn from "element-plus/dist/locale/zh-cn";
import en from "element-plus/dist/locale/en";
import ja from "element-plus/dist/locale/ja";
const appStore = useAppStore();
const router = useRoute();
const routeKey = computed(() => router.path);

const local = computed(() => {
  switch (appStore.locale) {
    case "en":
      return en;
    case "zh-cn":
      return zhCn;
    case "ja":
      return ja;
    default:
      return zhCn;
  }
});
</script>
