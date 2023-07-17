<template>
  <div class="project-number">
    <div class="project-number__tit">{{ props.title }}</div>
    <div class="project-number__desc">{{ props.desc }}</div>

    <div v-loading="groupMemberLoading" class="project-box">
      <div v-if="numberData?.length > 0">
        <div v-for="item in numberData" :key="item.id" class="project-content flex items-center justify-between">
          <div class="project-content__basic flex items-center justify-between">
            <UserAvatarProfile :profile="item" class="mr-4"></UserAvatarProfile>
            <div class="project-content__per">
              <div class="name">{{ props.type === "ADD" ? item.userName : item.user.name }}</div>
              <div class="email">{{ props.type === "ADD" ? item.email : item.user.email }}</div>
            </div>
          </div>
          <div class="project-content__select">
            <el-checkbox v-if="props.type === 'ADD'" size="large" @change="handleGetUserId(item)" />
            <Icon v-else name="radio" :color="item.isSelected ? 'red' : '#000'" @click="handleChange(item)"></Icon>
          </div>
        </div>
      </div>

      <div v-else>
        <ElEmpty :description="$t('zanwushuju_21efd8')" :image-size="100"> </ElEmpty>
      </div>
    </div>

    <div class="project-number__btns flex justify-end">
      <el-button round @click="dialogInstance.action.handleCancel()">{{ $t("quxiao_625fb2") }}</el-button>
      <el-button :loading="groupExitLoading || groupInviteLoading" type="primary" round @click="handleSubmit">{{ $t("wancheng_769d88") }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $t } from "@/i18n";
import { ElMessage } from "element-plus";
import { MODAL_KEY } from "@/components/Modal";
const dialogInstance: any = inject(MODAL_KEY);

interface Props {
  type: Partial<string>;
  title: Partial<string>;
  id: Partial<string>;
  desc: Partial<string>;
}
const props = defineProps<Props>();
const userStore = useUserStore();
const project = useProjectStore();

const { TeamMember, fetchProjectList, fetchGroupInvite, fetchGroupMember, fetchGroupExit } = useProjectStore();

const numberData = ref<any>([]);

/**
 * 获取成员列表
 */
const { run, loading } = useRequest({ service: TeamMember, manual: true });
const { run: groupMemberRun, loading: groupMemberLoading } = useRequest({ service: fetchGroupMember, manual: true });
onMounted(async () => {
  // 新增项目成员
  if (props.type === "ADD") {
    const list = await run({});

    const memberList = await groupMemberRun({ groupId: props.id });

    numberData.value = list.filter((item: any) => !memberList?.records.some((subItem: any) => subItem.userId == item.userId));

    numberData.value = numberData.value.map((item: any) => {
      return {
        ...item,
        color: "#333",
        typeavatar: "PERSON",
        name: item.userName,
        avatar: item.avatar,
      };
    });
  } else if (props.type === "EDIT") {
    // 退出时移交权限
    const list = await groupMemberRun({ groupId: props.id });

    numberData.value = list?.records.filter((item: any) => {
      if (item.userId != userStore.base?.id) {
        return Object.assign({}, item, { isSelected: false });
      }
    });
  }
});

const { run: groupInviteRun, loading: groupInviteLoading } = useRequest({
  service: fetchGroupInvite,
  manual: true,
  successMessage: $t("tianjiache_ca18f9"),
  onSuccess: () => {
    project.handleGetAvatarList({ groupId: props.id });
    dialogInstance.action.handleCancel();
  },
});
const { run: groupExitRun, loading: groupExitLoading } = useRequest({
  service: fetchGroupExit,
  manual: true,
  successMessage: $t("yituichuxi_9be62d"),
  onSuccess: () => {
    dialogInstance.action.handleCancel();
    fetchProjectList();
  },
});
const handleSubmit = () => {
  if (props.type === "ADD") {
    // 添加成员
    const selectedIds: any[] = [];
    numberData &&
      numberData.value.forEach((item: any) => {
        if (item.isSelected) {
          selectedIds.push(item.userId);
        }
      });

    if (selectedIds?.length < 1) {
      ElMessage.warning($t("qingxuanze_af35b8"));
      return false;
    }

    groupInviteRun({ groupId: props.id, userIds: selectedIds.toString() });
  } else if (props.type === "EDIT") {
    // 移交成员权限
    const selecedMember = numberData.value.filter((item: any) => {
      return item.isSelected === true;
    });

    if (!(selecedMember && selecedMember[0]?.groupId)) {
      ElMessage.warning($t("qingxuanze_af35b8"));
      return false;
    }
    groupExitRun({ groupId: selecedMember && selecedMember[0]?.groupId, userId: selecedMember && selecedMember[0]?.userId });
  }
};

const handleGetUserId = (item: any) => {
  numberData &&
    numberData.value.forEach((subItem: any) => {
      if (subItem.id === item.id) {
        subItem.isSelected = !subItem.isSelected;
      }
    });
};

const handleChange = (item: any) => {
  numberData.value.map((subItem: any) => {
    if (subItem.id === item.id) {
      return (subItem.isSelected = true);
    } else {
      return (subItem.isSelected = false);
    }
  });
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
    height: 300px;
    overflow: scroll;
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
