<template>
  <div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        {{ label }} <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in options" :key="item.value">{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string; label: string; options: { label: string; value: any }[] }>();
</script>

<style scoped></style>
