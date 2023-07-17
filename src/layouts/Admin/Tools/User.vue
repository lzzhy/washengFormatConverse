<template>
  <div class="toolbar flex items-center">
    <ElDropdown>
      <span class="flex items-center">
        <ElIcon style="margin-right: 8px"><IEpSetting /></ElIcon>
        <span>{{ user.base?.name }}</span>
      </span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem @click="user.logout()">11{{ $t("tuichudeng_44efd1") }}</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<script setup lang="ts">
const user = useUserStoreWithout();
</script>

<style scoped></style>
