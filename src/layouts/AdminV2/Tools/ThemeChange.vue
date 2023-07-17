<template>
  <select data-choose-theme>
    <option value="light">🌞light</option>
    <option value="dark">🌛Dark</option>
  </select>
</template>

<script setup lang="ts">
import { themeChange } from "theme-change";
onMounted(() => {
  themeChange(false);
});
</script>

<style scoped></style>
