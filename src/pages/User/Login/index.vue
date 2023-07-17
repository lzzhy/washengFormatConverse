<template>
  <LoginHome v-loading="WXLoading">
    <div class="flex items-center justify-center">
      <img class="w-[450px] xl:w-[500px] 2xl:w-[700px]" src="@/assets/img/login/login-back.png" :alt="$t('jiazaizhon_26b5bd')" />
      <div class="w-[150px] xl:w-[150px] 2xl:w-[200px]"></div>
      <div class="login-box w-[300px] xl:w-[400px] 2xl:w-[590px]">
        <div class="title-content">
          <p class="title-content__txt">NearHub</p>
          <p class="title-content__desc">{{ $t("huanyingde_04b015") }}</p>
        </div>
        <el-form ref="formRef" class="login-form" :model="formState" :disabled="loading">
          <el-form-item prop="name">
            <el-input v-model="formState.name" name="email" type="text" placeholder="请输入用户名" clearable />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formState.password" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false" name="password" type="password" :placeholder="$t('qingshuruz_539808')" clearable show-password @keyup.enter="handleSubmit" />
          </el-form-item>
          <el-form-item>
            <div class="login-btns">
              <el-button :loading="loading" class="login-btns__submit" round @click="handleSubmit">{{ $t("denglu_402d19") }}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </LoginHome>
</template>

<script setup lang="ts">
import { $t } from "@/i18n";
import { promiseQueue } from "@/utils";
import { FormState } from "@/pages/User/form.model";
import LoginHome from "@/pages/User/LoginHome/index.vue";
import { ElMessage } from "element-plus";
import { handleRedirect } from "@/utils/invite";
import settings from "@/settings";
import router from "@/vendors/route";
const { login } = useUserStore();
const project = useProjectStoreWithout();
const { WXLogin } = useUserStore();

const route = useRoute();
const [{ formState, formRef, formRules }] = useFormContext(FormState);

const { run, loading } = useRequest({
  service: login,
  manual: true,
  onSuccess: (data) => {
    ElMessage.success($t("dengluchen_71fa3b"));
    router.push("/getDAU");
    return data;
  },
});
async function handleSubmit(e: Event) {
  e.preventDefault();
  await awaitWrap(
    promiseQueue(
      () => {
        return formRef.value?.validate();
      },
      () => run({ password: formState.password, username: formState.name })
    )
  );
}

const { run: WXRun, loading: WXLoading } = useRequest({
  service: WXLogin,
  manual: true,
  onSuccess: (data) => {
    handleRedirect({ data, route });
    return data;
  },
});
onMounted(async () => {
  if (route?.query?.code) {
    WXRun({ code: route.query.code });
  }
});
</script>

<style src="../common.scss" lang="scss" scoped></style>
<style src="./index.scss" lang="scss" scoped></style>
