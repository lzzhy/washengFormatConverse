<template>
  <el-dropdown :trigger="trigger" placement="bottom-start" @command="command">
    <slot></slot>
    <template #dropdown>
      <el-dropdown-item v-for="(item, index) in schema" :key="`dropdown${index}`" :divided="item.divided" :disabled="item.disabled" :command="item">
        <el-icon :size="14">
          <component :is="iconMap[item.icon]" />
        </el-icon>
        {{ item.label }}
      </el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { ArrowLeftBold, ArrowRightBold, CloseBold, Discount, Refresh } from "@element-plus/icons-vue";

type contextMenuSchema = {
  disabled?: boolean;
  divided?: boolean;
  icon: string;
  label: string;
  command?: (item: contextMenuSchema) => void;
};

const iconMap = {
  Refresh,
  CloseBold,
  ArrowLeftBold,
  ArrowRightBold,
  Discount,
};

defineProps({
  schema: {
    type: Array as PropType<contextMenuSchema[]>,
    default: () => [],
  },
  trigger: {
    type: String as PropType<"click" | "hover" | "focus" | "contextmenu">,
    default: "click",
  },
});

const command = (item: contextMenuSchema) => {
  item.command && item.command(item);
};
</script>

<style lang="scss" scoped></style>
