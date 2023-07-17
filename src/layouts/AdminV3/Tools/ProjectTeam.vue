<template>
  <div class="left-container flex items-center justify-between">
    <el-dropdown popper-class="dropdown" class="mr-4 overflow-hidden">
      <div class="flex w-full items-center">
        <UserAvatarProfile :typeavatar="'TEAM'" :profile="userInfo" class="avatar-content mr-4"></UserAvatarProfile>
        <span class="truncate text-lg font-bold text-black">{{ userStore.teamInfo?.teamName }} </span>
        <ElIcon class="el-icon--right">
          <IEpArrowDown></IEpArrowDown>
        </ElIcon>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="dropdown-menu min-w-[150px]">
          <el-dropdown-item
            v-for="(item, index) in userStore.teamList"
            :key="item.owner"
            @click="
              () => {
                changeActiveTeam(item.teamCode);
                fetchProjectList();
              }
            "
          >
            <span class="flex items-center justify-center truncate">
              <div class="mr-[5px] h-[10px] w-[10px] rounded-[2px]" :style="{ 'background-color': colorList[index]?.value || 'blue' }"></div>
              {{ item.teamName }}
            </span>
            <ElIcon v-if="userStore.teamCode === item.teamCode" class="ml-auto"> <IEpCheck></IEpCheck> </ElIcon>
          </el-dropdown-item>
          <el-dropdown-item divided @click="handleCreate('CREATE')"><IEpPlus class="mr-2" />{{ $t("chuangjian_bfb76d") }}</el-dropdown-item>
          <el-dropdown-item @click="handleJoinTeam()"><IEpPlus class="mr-2" />{{ $t("jiarutuand_8d67b8") }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button v-if="userStore.teamInfo?.subscriptionService" type="primary" round size="small" @click="handleSetting('UPGRADE')">
      {{ SubscriptionServiceType[userStore.teamInfo?.subscriptionService] }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { $t } from "@/i18n";
import { SubscriptionServiceType } from "@/enums/user";
import { apiUserCreateTeam } from "@/apis/team";
const { fetchProjectList } = useProjectStore();

const userStore = useUserStore();
const { changeActiveTeam } = useUserStore();

const colorList = ref([
  {
    value: "#C23BB8",
    index: 1,
  },
  {
    value: "#753BC2",
    index: 2,
  },
  {
    value: "#3BA2C2",
    index: 3,
  },
  {
    value: "#C2B63B",
    index: 4,
  },
]);

const userInfo = computed(() => {
  const { teamName, avatar, avatarType } = userStore?.teamInfo || {};
  return {
    avatar,
    avatarType,
    name: teamName,
    color: "#0A3EDB",
  };
});

const handleSetting = (type?: string) => {};

const handleCreate = (type?: string) => {};

const { run } = useRequest({
  service: apiUserCreateTeam,
  manual: true,
});
watch(
  () => userStore.teamList,
  async () => {
    if (userStore.teamList && userStore.teamList.length < 1) {
      run({ teamName: `${userStore.base!.id}_defaultTeamName` });
      await userStore.fetchUserInfo();
    }
  },
  { immediate: true }
);

const handleJoinTeam = () => {};
</script>

<style src="../../../assets/css/common/elementReset.scss" lang="scss" scoped></style>

<style scoped lang="scss">
.avatar-content {
  width: 32px;
  height: 32px;
  border-radius: 5px;
  background: #000;
}
</style>
