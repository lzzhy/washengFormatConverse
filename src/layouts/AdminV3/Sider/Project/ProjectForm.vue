<template>
  <div class="project-form">
    <div class="project-form__tit">{{ $t("chuangjian_c881b1") }}</div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="top">
      <el-form-item prop="name">
        <el-input v-model="ruleForm.name" :placeholder="$t('qingshurux_447db6')" :prefix-icon="Search" />
      </el-form-item>
      <el-form-item :label="$t('naxierenke_dbbc73')" prop="invite">
        <el-select v-model="ruleForm.invite" :placeholder="$t('qingxuanze_708c9d')">
          <el-option :label="$t('jinxiangmu_a835ed')" value="OWNER" />
          <el-option :label="$t('suoyouxian_81f380')" value="EVERYONE" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('yonghutuic_37dcf2')" prop="region">
        <el-select v-model="ruleForm.keep" :placeholder="$t('qingxuanze_708c9d')">
          <el-option :label="$t('baoliubaib_1f0f49')" value="KEEP" />
          <el-option :label="$t('bubaoliuba_2e9ab5')" value="UNKEEP" />
        </el-select>
      </el-form-item>
      <div class="project-btns">
        <el-button round class="project-form__cancel" @click="dialogInstance.action.handleCancel()">{{ $t("quxiao_625fb2") }}</el-button>
        <el-button :loading="loading" type="primary" round class="project-form__sure" @click="handleSubmit(ruleFormRef)">{{ $t("baocun_be5fbb") }}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { $t } from "@/i18n";
import type { FormInstance, FormRules } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { MODAL_KEY } from "@/components/Modal";
import { ElMessage } from "element-plus";
const dialogInstance: any = inject(MODAL_KEY);

const { fetchGroupSave, fetchGroupInfo, fetchProjectList } = useProjectStore();

interface Props {
  type: Partial<string>;
  id?: string;
}
const props = defineProps<Props>();

/**
 * 编辑时，数据回填
 */
onMounted(async () => {
  if (props.type == "EDIT") {
    const { run, loading } = useRequest({
      service: fetchGroupInfo,
      manual: true,
    });
    const result = await run({ groupId: props.id });
    const { name, invite, keep } = result;
    ruleForm.name = name;
    ruleForm.keep = keep === 1 ? "KEEP" : "UNKEEP";
    ruleForm.invite = invite === 1 ? "EVERYONE" : "OWNER";
  }
});

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  invite: "EVERYONE",
  keep: "KEEP",
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: $t("xiangmuzum_08ee0b"), trigger: "blur" }],
});

const { run, loading } = useRequest({
  service: fetchGroupSave,
  manual: true,
  successMessage: props.type ? $t("bianjichen_3bb47b") : $t("chuangjian_04a691"),
  onSuccess: () => {
    fetchProjectList();
    dialogInstance.action.handleCancel();
  },
});

/**
 * 编辑或创建表单
 */
const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (!ruleForm.name.trim()) {
        ElMessage.error($t("mingchengb_df09ff"));
        return false;
      }
      if (props.type == "EDIT") {
        run({
          name: ruleForm.name,
          keep: ruleForm.keep,
          invite: ruleForm.invite,
          groupId: props.id,
          privacy: "PUBLIC",
        });
      } else {
        run({
          name: ruleForm.name,
          keep: ruleForm.keep,
          invite: ruleForm.invite,
          privacy: "PUBLIC",
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped lang="scss">
.project-form {
  &__tit {
    font-size: 27px;
    font-weight: 500;
    color: #000000;
    margin-bottom: 20px;
  }

  :deep(.el-input__wrapper) {
    width: 370px;
  }

  :deep(.el-select) {
    width: 100%;
  }

  :deep(.el-form-item__content) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.project-btns {
  text-align: right;
  :deep(.el-button.is-round) {
    width: 116px;
  }
}
</style>
