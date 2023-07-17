<template>
  <div class="user-tools">
    <el-dropdown>
      <span class="el-dropdown-link flex items-center">
        <UserAvatarProfile :profile="useStore.base!" class="mr-4"></UserAvatarProfile>
        <span class="user-name">您好，欢迎登录！</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="dropdown-menu text-base">
          <el-dropdown-item @click="handleLogOut">{{ $t("tuichudeng_44efd1") }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="tsx" setup>
import { $t } from "@/i18n";
import { Dialog } from "@/components/Modal";
import { ElNotification } from "element-plus";
import logo_v from "@/assets/img/login/logo_v.png";
import settings from "@/settings";

const useStore = useUserStore();
const project = useProjectStoreWithout();

const { logout } = useUserStore();

const handleSetting = () => {};

const handleLogOut = () => {
  logout();
  project.savePayData({ empty: "EMPTY" });
};

const handleCheckVersion = () => {
  const version = settings.version;

  ElNotification({
    customClass: "notification_version",
    dangerouslyUseHTMLString: true,
    // vue3-i18n-cli-disable-next-line
    message: `
      <div class="notification-version">
        <img class="notification-version__logo" src="${logo_v}" />
        <div class="notification-version__split"></div>
        <div>
          <p class="notification-version__tit">${$t("zuixin_123344")}</p>
          <p class="notification-version__desc">${$t("banben_13222")}${version}</p>
        </div>
      </div>
    `,
    offset: 200,
  });
};
</script>

<style src="../../../assets/css/common/elementReset.scss" lang="scss" scoped></style>

<style lang="scss" scoped>
.user-name {
  font-size: 16px;
  font-weight: bolder;
}
.user-tools {
  :deep(.rounded-full) {
    width: 32px;
    height: 32px;
  }
}
</style>

<style lang="scss">
.notification-version {
  &__logo {
    width: 144px;
    height: 32px;
    margin-top: 14px;
  }
  &__split {
    width: 610px;
    border-top: 1px solid #c6c6c6;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  &__tit {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
  }
  &__desc {
    font-size: 16px;
    font-weight: 400;
    color: #777777;
    margin: 15px 0 !important;
  }
}
.notification_version {
  width: 670px;
}

@media screen and (max-width: 1440px) {
  .notification_version {
    width: 600px;
  }

  .notification-version {
    &__split {
      width: 548px;
    }
  }
}
</style>
