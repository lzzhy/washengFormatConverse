<template>
  <LayoutContent>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="index">
          {{ item?.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </LayoutContent>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import LayoutContent from "../layout/index.vue";

const route = useRoute();

const breadcrumbData = ref([]);

watch(
  () => route.matched,
  (val) => {
    breadcrumbData.value = val.filter((item) => item.meta && item.meta.title).map((item) => item.meta);
  },
  { immediate: true }
);
</script>
