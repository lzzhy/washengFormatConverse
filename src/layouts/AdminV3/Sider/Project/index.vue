<template>
  <div class="projects">
    <div class="projects-header">
      <div class="flex items-center">
        <div class="ml-[5px] h-[18px] w-[18px]">
          <img src="@/assets/img/project/project.png" />
        </div>
        <div class="projects-header__name ml-[20px]">{{ $t("xiangmuzu_79e585") }}</div>
      </div>

      <div class="projects-header__opration">
        <el-tooltip class="box-item" effect="dark" :content="$t('chuangjian_060d6a')" placement="top">
          <ElIcon class="h-[30px] w-[30px]">
            <IEpPlus class="projects-header__icon" @click="handleTeamCreate"></IEpPlus>
          </ElIcon>
        </el-tooltip>
      </div>
    </div>

    <div>
      <ul v-if="project.list && project.list.length > 0" class="projects-list">
        <li v-for="(item, index) in project.list" :key="item.id" :class="['projects-item', project.current.id === item.id ? 'active' : '']">
          <div class="flex items-center">
            <div class="mr-[5px] h-[10px] w-[10px] rounded-[2px]" :style="{ 'background-color': colorList[index]?.value || 'blue' }"></div>
            <div class="projects-item__name" @click="handleChange(item)">
              {{ item.name }}
            </div>
          </div>

          <div class="projects-item__opration flex items-center justify-center">
            <el-dropdown>
              <el-icon class="el-icon--right">
                <IEpMore></IEpMore>
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu class="dropdown-menu">
                  <div v-if="item.ownerId === userStore.base?.id">
                    <el-dropdown-item @click="handleMangerMember(item.id)">{{ $t("guanlixian_e1918f") }}</el-dropdown-item>
                    <el-dropdown-item @click="handleTeamSet(item.id)">{{ $t("shezhixian_573987") }}</el-dropdown-item>
                    <el-dropdown-item @click="handleOut('OUT', item.id, item.ownerId)">{{ $t("tuichuxian_6d44b3") }}</el-dropdown-item>
                    <el-dropdown-item @click="handleDelet('DELETE', item.id)">{{ $t("shanchuxia_ef84eb") }}</el-dropdown-item>
                  </div>
                  <div v-else>
                    <el-dropdown-item @click="handleOut('OUT', item.id, item.ownerId)">{{ $t("tuichuxian_6d44b3") }}</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </li>
      </ul>
      <el-empty v-else :description="$t('zanwuxiang_b44080')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { $t } from "@/i18n";
import router from "@/vendors/route";
import ProjectForm from "./ProjectForm.vue";
import ProjectConfirm from "./ProjectConfirm.vue";
import { Project } from "@/vendors/store/modules/project";
import ProjectMember from "@/layouts/AdminV3/Sider/Project/ProjectMember.vue";
import ProjectJurisdiction from "@/layouts/AdminV3/Sider/Project/ProjectJurisdiction.vue";

const project = useProjectStore();
const userStore = useUserStore();

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

const { run } = useRequest({ service: project.fetchProjectList, manual: true });
run();

const handleChange = (item: Project) => {
  project.current = item;
  router.push(`/project/${item.id}`);
};

const handleTeamCreate = () => {
  Dialog.open(ProjectForm, { width: 460, hiddenHeader: true, hiddenFooter: true });
};

const handleTeamSet = (id: string) => {
  Dialog.open(ProjectForm, { width: 460, hiddenHeader: true, hiddenFooter: true }, { type: "EDIT", id });
};

const handleOut = (type: string, id: string, ownerId: string) => {
  Dialog.open(ProjectConfirm, { width: 713, hiddenHeader: true, hiddenFooter: true }, { type, id, ownerId, title: $t("tuichuxian_6d44b3"), desc: $t("nishixiang_ff1241") });
};

const handleDelet = (type: string, id: string) => {
  Dialog.open(ProjectConfirm, { width: 713, hiddenHeader: true, hiddenFooter: true }, { type, id, title: $t("shanchuxia_ef84eb"), desc: $t("nishixiang_cb5414") });
};

const handleAddMember = (id: string) => {
  Dialog.open(ProjectMember, { width: 460, hiddenHeader: true, hiddenFooter: true }, { type: "ADD", id, title: $t("weigaixian_69cd7f") });
};

const handleMangerMember = (groupId: string) => {
  Dialog.open(ProjectJurisdiction, { width: 460, hiddenHeader: true, hiddenFooter: true }, { groupId, title: $t("guanlixian_e1918f") });
};
</script>

<style src="../../../../assets/css/common/elementReset.scss" lang="scss" scoped></style>

<style lang="scss" scoped>
.projects {
  padding: 20px 20px 0 20px;
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 20px;
    right: 0;
    content: "";
    height: 1px;
    background-color: #333;
    opacity: 0.3;
    width: 90%;
  }
}

.projects-header,
.projects-item {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__icon {
    cursor: pointer;
    font-size: 15px;
  }
}

.projects-item {
  font-size: 15px;
  cursor: pointer;

  &.active {
    color: #0a3edb;
  }

  &__name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100px;
  }
}

.projects-list {
  margin-left: 43px;
  &__icon {
    height: 30px;
    width: 15px;
  }
  :deep(.projects-item__opration) {
    text-align: right;
    height: 30px;
  }
  :deep(.el-dropdown) {
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: flex-end;
  }

  .el-icon--right {
    width: 30px;
    height: 30px;
  }
}
</style>
