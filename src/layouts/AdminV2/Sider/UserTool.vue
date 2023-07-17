<template>
  <div class="user-tools flex flex-row items-center justify-between overflow-hidden">
    <div class="flex flex-row">
      <!-- <Icon name="setting" size="28"></Icon> -->
      <div class="inline-block h-7 w-7 rounded-full bg-primary"></div>
      <p :class="[appStore.isHoverAdminLayoutSide ? 'active' : '']">nearhub</p>
    </div>
    <el-popover placement="top-start" title="" :width="200" trigger="click" show="popoverShow" @show="showPopover(true)" @click="userDetail">
      <template #reference>
        <el-icon class="rotate-90 cursor-pointer"><IEpMoreFilled /></el-icon>
      </template>
      <template #default>
        <ul>
          <li class="mb-4 cursor-pointer font-bold" @click="userDetail">{{ $t("xiangqing_f26225") }}</li>
          <li class="cursor-pointer font-bold" @click="logout">{{ $t("tuichu_c39922") }}</li>
        </ul>
      </template>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import router from "@/vendors/route";
import { useAppStore } from "@/vendors/store/modules/app";
const emits = defineEmits(["popoverJudge"]);
const { logout } = useUserStore();
const appStore = useAppStore();
const userDetail = () => {
  router.push("/user-setting");
  showPopover(false);
};
const showPopover = (show: boolean) => {
  emits("popoverJudge", show);
};
</script>
<style lang="scss" scoped>
.user-tools {
  padding: 12px;
  padding-left: 16px !important;
  width: 200px;

  transition: margin-left 0ms ease 300ms;
  p {
    padding-left: 15px;
  }
  &:hover {
    /* background-color: rgb(244, 244, 244); */
    color: theme("color.primary");
  }
  &.hover {
    transition: margin-left 0ms ease 0ms;
  }
}
</style>
