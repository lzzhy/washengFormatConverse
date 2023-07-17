<template>
  <div class="flex w-[200px] cursor-pointer flex-row items-center justify-between overflow-hidden p-3 pl-5 hover:text-primary">
    <Icon name="setting" class="mr-4 text-xl"></Icon>
    <div class="flex flex-auto flex-row items-center justify-between text-sm">
      <span @click="goUsers"></span>
      <ElTag></ElTag>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/vendors/route";

const goUsers = () => {
  router.push("/system");
};
</script>
