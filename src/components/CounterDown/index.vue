<template>
  <slot v-bind="{ count, restart, active }"></slot>
</template>

<script setup lang="ts">
import { useCountDown } from "@/hooks";
let props = withDefaults(defineProps<{ count?: number; immediate?: boolean }>(), {
  count: 60,
  immediate: false,
});
const { count, restart, active } = useCountDown(props.count, { immediate: props.immediate });
</script>

<style scoped></style>
