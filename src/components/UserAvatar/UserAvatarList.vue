<template>
  <div class="flex items-center text-white">
    <UserAvatar v-for="item in avatarList" :key="item.id" class="!text-4xl" circle :color="item.color" :text="item.user.name"> </UserAvatar>

    <span v-if="props.source.length > 3" class="z-50 inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-300 text-2xl">
      <ElIcon>
        <IEpMore></IEpMore>
      </ElIcon>
    </span>
  </div>
</template>

<script setup lang="ts">
let props = defineProps<{ source: any[] }>();

let avatarList = ref([]);

onMounted(() => {
  avatarList.value = props.source.slice(0, 3);
});
</script>

<style scoped></style>
