<template>
  <div class="project-number">
    <div class="project-number__tit">{{ props.title }}</div>
    <div class="project-number__desc">{{ props.desc }}</div>

    <div v-if="project?.current?.invite === 1 || useStore.base!.id === project?.current?.ownerId" class="text-right" @click="handleAddMember">
      <el-tooltip class="box-item" effect="dark" :content="$t('tianjiaxia_cdb945')" placement="top">
        <ElIcon class="cursor-pointer text-[20px]">
          <IEpPlus></IEpPlus>
        </ElIcon>
      </el-tooltip>
    </div>

    <div v-loading="groupMemberLoading" class="project-box">
      <div v-for="item in numberData" :key="item.id" class="project-content flex items-center justify-between">
        <div class="project-content__basic flex items-center justify-between">
          <UserAvatarProfile :profile="item" class="mr-4"></UserAvatarProfile>
          <div class="project-content__per">
            <div class="name">{{ item.user.name }}</div>
            <div class="email">{{ item.user.email }}</div>
          </div>
        </div>
        <div class="project-oprate">
          <div v-if="item.isOwner">{{ $t("xiangmusuo_e110fc") }}</div>
          <div v-else class="flex space-x-4">
            <el-popconfirm :title="$t('ninqueding_cf0e48')" width="260" @confirm="handleTransferManager(item)">
              <template #reference>
                <ElIcon :title="$t('yijiaosuoy_1eb0a4')" class="cursor-pointer">
                  <Icon name="transfer-user"></Icon>
                </ElIcon>
              </template>
            </el-popconfirm>
            <el-popconfirm :title="$t('ninqueding_eb05d9')" width="260" @confirm="handleDeletManager(item)">
              <template #reference>
                <ElIcon :title="$t('yichu_86048b')" class="cursor-pointer">
                  <IEpDelete></IEpDelete>
                </ElIcon>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $t } from "@/i18n";
import { MODAL_KEY } from "@/components/Modal";
const dialogInstance: any = inject(MODAL_KEY);

const { fetchGroupMember, fetchProjectList, fetchGroupMemberRemove, fetchGroupOwner } = useProjectStore();
import ProjectMember from "@/layouts/AdminV3/Sider/Project/ProjectMember.vue";

const project = useProjectStore();
const useStore = useUserStore();

interface Props {
  title: Partial<string>;
  desc: Partial<string>;
  groupId: Partial<string>;
}
const props = defineProps<Props>();

const numberData = ref<any>([]);

/**
 * 获取成员权限列表
 */
const { run: groupMemberRun, loading: groupMemberLoading } = useRequest({ service: fetchGroupMember, manual: true });
onMounted(async () => {
  const memberList = await groupMemberRun({ groupId: props.groupId });
  numberData.value = memberList?.records.map((item) => {
    return {
      ...item,
      color: "#333",
      avatarType: item.user?.avatarType,
      typeavatar: "PERSON",
      name: item.user?.name,
      avatar: item.user?.avatar,
    };
  });
});

/**
 * 移交权限
 */
const { run: fetchGroupGroupExit } = useRequest({
  service: fetchGroupOwner,
  manual: true,
  successMessage: $t("yijiaoquan_3ae03b"),
  onSuccess: () => {
    fetchProjectList();
    dialogInstance.action.handleCancel();
  },
});
const handleTransferManager = (item: any) => {
  fetchGroupGroupExit({ groupId: item?.groupId, userId: item.user?.id });
};

/**
 * 删除成员
 */
const { run: fetchGroupMemberRemoveRun } = useRequest({
  service: fetchGroupMemberRemove,
  manual: true,
  successMessage: $t("shanchuche_26f559"),
  onSuccess: () => {
    fetchProjectList();

    project.handleGetAvatarList({ groupId: props.groupId });
    dialogInstance.action.handleCancel();
  },
});
const handleDeletManager = (item: any) => {
  fetchGroupMemberRemoveRun({ groupId: item.groupId, userId: item.user?.id });
};

const handleAddMember = () => {
  dialogInstance.action.handleCancel();
  Dialog.open(ProjectMember, { width: 460, hiddenHeader: true, hiddenFooter: true }, { type: "ADD", id: props.groupId, title: $t("weigaixian_69cd7f") });
};
</script>

<style scoped lang="scss">
.project-number {
  color: #000000;
  &__tit {
    font-size: 27px;
    font-weight: 500;
  }
  &__desc {
    font-size: 18px;
    font-weight: 400;
  }

  :deep(.el-button.is-round) {
    width: 116px;
  }

  .project-box {
    overflow: scroll;
    height: 300px;
  }
  .project-content {
    margin-top: 23px;

    &__per {
      margin-left: 11px;
    }
    &__img {
      width: 24px;
      height: 24px;
    }
  }

  .name {
    font-size: 18px;
    font-weight: 400;
  }

  .email {
    font-size: 14px;
    font-weight: 400;
  }
}
.project-out__btns {
  margin: 23px 0 15px 0;
}
</style>
