<template>
  <view v-if="loading" class="flex min-h-[300px] w-full items-center justify-center text-2xl text-primary">
    <p class="mr-1 text-sm">{{ $t("zhengzainu_1bfe27") }}</p>
    <ElIcon class="is-loading">
      <IEpLoading></IEpLoading>
    </ElIcon>
  </view>
  <view v-else-if="isEmpty" class="flex min-h-[300px] w-full items-center justify-center">
    <ElEmpty :description="des || ''" :image-size="100">
      <!-- <template #image>
        <image mode="aspectFill" src="@/assets/img/empty.png"></image>
      </template> -->
      <slot name="bottom-btn">
        <ElButton v-if="showButton" class="mt-4 px-4" type="primary" @click="$emit('create')">{{ $t("tianjiashu_94b5f4") }}</ElButton>
      </slot>
    </ElEmpty>
  </view>

  <template v-else>
    <slot></slot>
    <view v-if="showLogo" class="flex w-full items-center justify-center py-3">
      <!-- <image src="@/assets/img/footerlogo.png" mode="aspectFit" class="h-10 w-[112px]"></image> -->
      <div>Near Sync</div>
    </view>
  </template>
</template>

<script setup lang="ts">
interface IProps {
  /**如果存在source则 优先source判断 */
  source?: any[];
  /**错误信息描述 */
  des?: string;
  /**是否需要展示项目logo */
  showLogo?: boolean;
  /**是否展示 添加数据 */
  showButton?: boolean;
  /**判断是否符合条件 */
  condition?: boolean;
  /**是否需要开启loading */
  loading?: boolean;
}
let props = defineProps<IProps>();

defineEmits(["create"]);

const isEmpty = computed(() => {
  let { source, condition } = props;
  if (source !== undefined) {
    return !source || !source.length;
  }
  if (condition !== undefined) return !condition;
});
</script>

<style lang="scss"></style>
