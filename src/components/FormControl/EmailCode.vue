<template>
  <el-input type="text">
    <template #suffix>
      <ElTooltip v-if="message" :content="message">
        <ElIcon>
          <IEpWarningFilled></IEpWarningFilled>
        </ElIcon>
      </ElTooltip>
      <CounterDown>
        <template #default="{ count, restart, active }">
          <el-button :loading="laoding" type="primary" link size="default" :disabled="!isFilled || active" @click="handleSendEmial(restart)">
            {{ $t("yanzhengma_983f59") }} <span v-if="active" class="ml-1">{{ count }}s</span>
          </el-button>
        </template>
      </CounterDown>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { $t } from "@/i18n";
import { validEmail } from "@/utils";
import { ElMessage } from "element-plus";

/**邮箱验证组件
 * props: emial
 * 1. 根据email 发送邮件
 */
const props = defineProps<{ email: string; action: () => Promise<any> }>();

const [laoding, toggleLoading] = useToggle();

const isFilled = computed(() => {
  return props.email && validEmail(props.email);
});
const message = computed(() => {
  if (!props.email) return $t("qingjianch_e86bf4");
  if (!isFilled.value) return $t("youxiangge_cc5446");
  return null;
});

async function handleSendEmial(restart: any) {
  toggleLoading(true);
  await props.action();
  ElMessage.success($t("youjianfas_ff29b9"));
  restart();
  toggleLoading(false);
}
</script>

<style scoped></style>
