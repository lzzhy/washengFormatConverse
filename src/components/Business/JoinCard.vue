<template>
  <div v-loading="loading">
    <ElForm ref="formRef" :model="formState" :rules="formRules" size="large">
      <ElFormItem prop="name">
        <InputCode v-model="formState.code" @done="handleSuccess"></InputCode>
      </ElFormItem>
      <div class="text-black">
        <p class="text-lg">{{ $t("ruhehuodey_8183bc") }}</p>
        <p class="label-text mt-2">{{ $t("xunwenbaib_6d8928") }}</p>
      </div>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { $t } from "@/i18n";
import { Prop } from "@/services/model";
import { ModalAction } from "@/components/Modal";
import { useMessage } from "@/hooks/useMessage";
import { apiInviteMeetingLargeScreenCode as runPatch } from "@/apis";
import { openCanvasPage } from "@/utils";
import { ElMessage } from "element-plus";
import { codeMsg } from "@/vendors/axios/code";
import CODE from "@/enums/responseCode";
import { MODAL_KEY } from "@/components/Modal";
const dialogInstance: any = inject(MODAL_KEY);

const loading = ref(false);
class FormState {
  @Prop({ required: true, message: "请输入邀请码" })
  code = "";
}

const [{ formState, formRules, formRef }] = useFormContext(FormState, {});

async function handleSuccess() {
  if (!formRef.value) return false;
  const createMessage = useMessage().createMessage;
  try {
    let [err] = await awaitWrap(formRef.value.validate());
    if (err) return false;
    try {
      loading.value = true;
      const { data } = runPatch && (await runPatch({ ...formState }));
      if (data.code == CODE.OK) {
        createMessage.success($t("caozuochen_33130f"));
        openCanvasPage(data.data.id);
      } else {
        ElMessage.error(codeMsg[data.code]);
      }
      loading.value = false;
      dialogInstance.action.handleCancel();
    } catch (error) {
      // createMessage.error(msg.error);
    }
  } finally {
  }
}
</script>

<style scoped></style>
