<template>
  <div class="avatar text-5xl">
    <div class="h-[1em] w-[1em]" :class="circle ? 'rounded-full' : ''">
      <div v-if="color" class="flex h-full w-full items-center justify-center text-center text-[0.5em] text-white" :style="{ 'background-color': color }">{{ text ? text.charAt(0) : "" }}</div>
      <img v-else :src="src || avatar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import avatar from "@/assets/img/layouts/avatar.png";
defineProps<{ src?: string; circle?: boolean; color?: string; text?: string }>();
</script>

<style lang="scss" scoped>
.avatar {
  @apply inline-flex;
  > div {
    @apply block aspect-square overflow-hidden;
  }
}
</style>
