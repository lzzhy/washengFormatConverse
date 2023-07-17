<template>
  <div class="move-icon">
    <el-icon :size="18" @click="clickIcon">
      <DArrowLeft v-if="DirIcon[direction] === 'left'" />
      <DArrowRight v-if="DirIcon[direction] === 'right'" />
      <Refresh v-if="DirIcon[direction] === 'refresh'" />
      <Setting v-if="DirIcon[direction] === 'setting'" />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { DArrowLeft, DArrowRight, Refresh, Setting } from "@element-plus/icons-vue";
interface Props {
  direction?: number;
}
const props = withDefaults(defineProps<Props>(), {
  direction: 0,
});
enum DirIcon {
  left,
  right,
  refresh,
  setting,
}
const moveNum = [-200, 200];
const emit = defineEmits<{
  (e: "onClickCurEvent", to: number): void;
  (e: "onClickRefresh"): void;
}>();

const clickIcon = () => {
  if (props.direction == 3) return;
  if (props.direction == 2) {
    emit("onClickRefresh");
  }
  emit("onClickCurEvent", moveNum[props.direction]);
};
</script>

<style lang="scss" scoped>
.move-icon {
  border-left: 1px solid;
  border-right: 1px solid;
  @apply flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center border-gray-300;
}
</style>
