<template>
  <div class="project-out">
    <div class="project-out__tit">{{ props.title }}</div>
    <div class="project-out__desc">{{ props.desc }}</div>
    <div class="line"></div>
    <div class="project-out__btns flex justify-end">
      <el-button round @click="dialogInstance.action.handleCancel()">{{ $t("quxiao_625fb2") }}</el-button>
      <el-button :loading="groupExitLoading || loading" type="primary" round @click="handleComplate">{{ $t("wancheng_769d88") }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $t } from "@/i18n";
import { MODAL_KEY } from "@/components/Modal";
import ProjectMember from "@/layouts/AdminV3/Sider/Project/ProjectMember.vue";
const { fetchGroupRemove, fetchProjectList, fetchGroupsExit } = useProjectStore();

const dialogInstance: any = inject(MODAL_KEY);

const userStore = useUserStore();
const project = useProjectStore();

interface Props {
  type: Partial<string>;
  id: Partial<string>;
  ownerId: Partial<string>;
  title: Partial<string>;
  desc: Partial<string>;
}
const props = defineProps<Props>();

/**
 * 操作表单：删除（需区分是否为超管和普通用户，接口调用不同）或退出
 */
const { run, loading } = useRequest({
  service: fetchGroupRemove,
  manual: true,
  successMessage: $t("shanchuche_0007d1"),
  onSuccess: () => {
    fetchProjectList();
    dialogInstance.action.handleCancel();
  },
});
const { run: groupExitRun, loading: groupExitLoading } = useRequest({
  service: fetchGroupsExit,
  manual: true,
  successMessage: $t("tuichuchen_8150f9"),
  onSuccess: () => {
    fetchProjectList();
    dialogInstance.action.handleCancel();
  },
});
const handleComplate = () => {
  if (props.type === "DELETE") {
    run({ groupId: props.id });

    project.changeProject();
  } else if (props.type === "OUT") {
    if (props.ownerId == userStore.base?.id) {
      Dialog.open(ProjectMember, { width: 460, hiddenHeader: true, hiddenFooter: true }, { type: "EDIT", id: props.id, title: $t("yijiaoxian_2fb20b"), desc: $t("qingxuanze_cff763") });
    } else {
      groupExitRun({ groupId: props.id });
    }
  }
};
</script>

<style scoped lang="scss">
.project-out {
  margin: 0 15px 0 15px;
  color: #000000;
  &__tit {
    font-size: 27px;
    font-weight: 500;
  }
  &__desc {
    font-size: 18px;
    font-weight: 400;
    margin-top: 30px;
  }

  :deep(.el-button.is-round) {
    width: 116px;
  }
}
.line {
  margin: 30px 0 27px 0;
  width: 623px;
  height: 1px;
  background-color: #979797;
  opacity: 0.3;
}
.project-out__btns {
  margin-right: 15px;
}
</style>
