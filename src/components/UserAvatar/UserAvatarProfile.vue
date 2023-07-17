<template>
  <div class="avatar relative text-5xl">
    <div class="h-[1em] w-[1em]" :class="circle ? 'rounded-full' : ''">
      <div v-if="props.profile?.avatarType == 1 && props.typeavatar === 'PERSON'" class="flex h-full w-full items-center justify-center text-center text-[0.5em] text-white" :style="{ 'background-color': props.profile?.color }">{{ props.profile?.name?.charAt(0) || "" }}</div>
      <img v-else :src="imgSrc" />
      <!-- <icon v-if="loading" /> -->
    </div>
    <!-- 勿删，保证img会更新 -->
    <img v-if="imgSrc" class="hidden" :src="imgSrc" />
    <el-dropdown v-if="props.isEdit" ref="dropdownAvatar" class="absolute inset-0">
      <div class="absolute inset-0"></div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleDefault">{{ $t("shiyongmor_40a878") }}</el-dropdown-item>
          <el-dropdown-item>
            <el-upload ref="upload" class="img-uploader" :accept="'image/*'" :auto-upload="false" :show-file-list="false" :limit="1" @change="handleCustom"> {{ $t("shiyongzid_61298e") }} </el-upload>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import avatar from "@/assets/img/layouts/avatar.png";
import teamAvatar from "@/assets/img/layouts/teamAvatar.png";
import type { UploadInstance, UploadProps } from "element-plus";
import { apiUploadFile } from "@/apis/common/upload";

const file = ref();

interface Source {
  avatar: string;
  /**1 默认样式 ， 2 图片 */
  avatarType: 1 | 2;
  color: string;
  name: string;
}

interface Props {
  profile: Partial<Source>;
  circle?: boolean;
  isEdit?: boolean;
  typeavatar?: string;
}
const props = withDefaults(defineProps<Props>(), {
  circle: true,
  typeavatar: "PERSON",
});

const emit = defineEmits(["onAvatarUploadSuccess", "onAvatarDefault"]);

const handleDefault = () => {
  emit("onAvatarDefault", 1);
};

const upload = ref<UploadInstance>();

// 团队和个人默认头像不一致
const imgSrc = computed(() => {
  if (props.profile?.avatarType == 2) {
    return props.profile?.avatar;
  } else {
    return props.typeavatar === "PERSON" ? avatar : teamAvatar;
  }
});

const { run: fetchUpload, loading } = useRequest({
  service: apiUploadFile,
  manual: true,
});

const handleCustom: UploadProps["onChange"] = async function (uploadRawFile) {
  file.value = uploadRawFile.raw;
  if (!file.value) return;
  const data = await fetchUpload({ file: file.value });
  upload.value?.clearFiles();
  emit("onAvatarUploadSuccess", data.key);
};
</script>

<style lang="scss" scoped>
.avatar {
  @apply inline-flex;
  > div {
    @apply block aspect-square overflow-hidden;
  }
}
</style>
