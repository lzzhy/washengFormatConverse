<template>
  <div class="upload-img__wrap">
    <el-upload class="img-uploader" :auto-upload="false" :show-file-list="false" :limit="1" @change="handleChange">
      <div v-if="imageUrl" class="group relative max-w-md" @click.stop>
        <img ref="previewImageRef" :src="imageUrl" class="img-uploader__core object-contain" />
        <div class="absolute inset-0 flex transform items-center justify-around bg-black text-3xl text-white opacity-0 transition-opacity group-hover:opacity-40">
          <span @click="handlePreview()">
            <ElIcon><IEpZoomIn /></ElIcon>
          </span>
          <span @click="handleEdit()">
            <ElIcon><IEpEdit /></ElIcon>
          </span>
          <span @click="handleRemove()">
            <ElIcon><IEpDelete /></ElIcon>
          </span>
        </div>
      </div>
      <el-icon v-else class="img-uploader-icon"><IEpPlus /></el-icon>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { $t } from "@/i18n";
import type { UploadUserFile, UploadRawFile, UploadProps } from "element-plus";
import { Dialog } from "../Modal";
import Cropper from "../../components/Cropper/index.vue";
import { useVModel } from "@vueuse/core";
import { handlePreviewImages } from "@/utils/index";
import { upLoadFile } from "@/apis/common/upload";

let props = defineProps<{ modelValue: string }>();
let emit = defineEmits(["delete", "update:modelValue"]);

// const getSrcFromFile = (file: UploadRawFile): Promise<string> => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//   });
// };

const imageUrl = useVModel(props);

function handleRemove() {
  imageUrl.value = "";
  emit("delete");
}

const previewImageRef = ref<HTMLImageElement>();

function handlePreview() {
  handlePreviewImages(previewImageRef.value!);
}

async function handleEdit(src: string = imageUrl.value, fileName?: string) {
  Dialog.open(Cropper, { title: $t("xinzengtup_2c38da") }, { src, fileName }).then((res: UploadUserFile) => {
    imageUrl.value = res.url || "";
  });
}

const handleChange: UploadProps["onChange"] = async function (uploadRawFile) {
  let file = uploadRawFile.raw;
  if (!file) return;

  let res = await upLoadFile(file);
  imageUrl.value = res.url || "";
  // let src = await getSrcFromFile(file);
  // handleEdit(src, uploadRawFile.name);
};
</script>
<style lang="scss" scoped>
.img-uploader .img-uploader__core {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.img-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.img-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.img-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
