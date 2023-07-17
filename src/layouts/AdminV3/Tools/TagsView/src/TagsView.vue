<template>
  <div class="tags-view">
    <div class="flex w-full items-center overflow-hidden">
      <ToolIcon @onClickCurEvent="move" />
      <ElScrollbar ref="scrollbarRef" class="h-full flex-1 px-1" @scroll="scroll">
        <div class="flex h-full space-x-1">
          <SettingMenu v-for="item in visitedViews" :key="item.fullPath" trigger="contextmenu" :schema="tagSchema(item)">
            <div class="tag-item" :class="{ 'active-tag-item': selectedTag?.path === item.path }">
              <router-link v-slot="{ navigate }" :to="{ ...item }" custom>
                <div class="flex items-center whitespace-nowrap" @click="navigate">
                  <span class="mr-1 text-xs">{{ item?.meta?.title as String }}</span>
                  <ElIcon :size="10" @click.stop="closeSelectedTag(item)">
                    <ICloseBold />
                  </ElIcon>
                </div>
              </router-link>
            </div>
          </SettingMenu>
        </div>
      </ElScrollbar>
      <ToolIcon :direction="1" @onClickCurEvent="move" />
      <ToolIcon :direction="2" @onClickRefresh="refreshTag" />
      <SettingMenu :schema="iconSchema">
        <ToolIcon :direction="3" />
      </SettingMenu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $t } from "@/i18n";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { ElScrollbar } from "element-plus";
import { useTagsStore } from "./store";
import { ToolIcon, SettingMenu } from "./components";
import { useScrollTo, useTag } from "./hooks";

const store = useTagsStore();

// elscroll ref 实例  获取完成的实例类型
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
// 从vuex中取出visitedViews
const visitedViews = computed(() => store.visitedViews);
// 保存滚动位置
const scrollLeftNumber = ref(0);
const { selectedTag, closeSelectedTag, closeLeftTags, closeReftTags, refreshTag, refreshSelectedTag, closeOthersTags } = useTag();

// 滚动事件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scroll = ({ scrollLeft }: any) => {
  scrollLeftNumber.value = scrollLeft as number;
};

// 点击左右移动按钮
const move = (to: number) => {
  console.log(to);
  const wrap$ = unref(scrollbarRef)?.wrap$;
  const { start } = useScrollTo({
    el: wrap$ as HTMLElement,
    position: "scrollLeft",
    to: unref(scrollLeftNumber) + to,
    duration: 500,
  });
  start();
};

const tagSchema = computed(() => (item: RouteLocationNormalizedLoaded) => [
  {
    label: $t("zhongxinji_7af6c0"),
    icon: "Refresh",
    disabled: unref(selectedTag)?.fullPath !== item.fullPath,
    command: () => {
      refreshSelectedTag(item);
    },
  },
  {
    label: $t("guanbibiao_4c00e9"),
    icon: "CloseBold",
    command: () => {
      closeSelectedTag(item);
    },
  },
  {
    label: $t("guanbizuoc_9349a0"),
    icon: "ArrowLeftBold",
    divided: true,
    disabled: !!visitedViews.value.length && (item.fullPath === visitedViews.value[0].fullPath || unref(selectedTag)?.fullPath !== item.fullPath),
    command: () => {
      closeLeftTags();
    },
  },
  {
    label: $t("guanbiyouc_ceb149"),
    icon: "ArrowRightBold",
    disabled: !!visitedViews.value.length && (item.fullPath === visitedViews.value[visitedViews.value.length - 1].fullPath || unref(selectedTag)?.fullPath !== item.fullPath),
    command: () => {
      closeReftTags();
    },
  },
  {
    divided: true,
    icon: "Discount",
    label: $t("guanbiqita_771653"),
    disabled: !!visitedViews.value.length && unref(selectedTag)?.fullPath !== item.fullPath,
    command: () => {
      closeOthersTags();
    },
  },
]);

const iconSchema = computed(() => [
  {
    label: $t("zhongxinji_7af6c0"),
    icon: "Refresh",
    command: () => {
      refreshSelectedTag(unref(selectedTag) as RouteLocationNormalizedLoaded);
    },
  },
  {
    label: $t("guanbibiao_4c00e9"),
    icon: "CloseBold",
    command: () => {
      closeSelectedTag(unref(selectedTag) as RouteLocationNormalizedLoaded);
    },
  },
  {
    label: $t("guanbizuoc_9349a0"),
    icon: "ArrowLeftBold",
    divided: true,
    disabled: !!visitedViews.value.length && unref(selectedTag)?.fullPath === visitedViews.value[0].fullPath,
    command: () => {
      closeLeftTags();
    },
  },
  {
    label: $t("guanbiyouc_ceb149"),
    icon: "ArrowRightBold",
    disabled: !!visitedViews.value.length && unref(selectedTag)?.fullPath === visitedViews.value[visitedViews.value.length - 1].fullPath,
    command: () => {
      closeReftTags();
    },
  },
  {
    divided: true,
    icon: "Discount",
    label: $t("guanbiqita_771653"),
    command: () => {
      closeOthersTags();
    },
  },
]);
</script>

<style lang="scss">
.tags-view {
  .tag-item {
    border: 1px solid;
    @apply cursor-pointer border-gray-300 px-2 py-1;
  }
  .active-tag-item {
    @apply bg-primary text-white;
  }
  @apply flex  w-full items-center  bg-white;
}
</style>
