<template>
  <div class="flex space-x-2">
    <UploadImage v-for="(_, index) in state" :key="index" v-model="state[index]" @delete="handleDelete(index)"></UploadImage>
    <UploadImage v-if="showUploadSection" v-model="state[state.length]"></UploadImage>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import UploadImage from "./Image.vue";

const props = withDefaults(defineProps<{ modelValue: string[]; limit: number }>(), {
  modelValue: () => [],
  limit: 3,
});
const state = useVModel(props, "modelValue");

const showUploadSection = computed(() => {
  return state.value.length <= props.limit;
});

function handleDelete(index) {
  state.value.splice(index, 1);
}
</script>

<style scoped></style>
