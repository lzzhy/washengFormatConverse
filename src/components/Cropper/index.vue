<template>
  <div class="vue-cropper relative">
    <img ref="imgRef" :src="src" />
    <div class="vue-cropper-tools mt-7 space-y-4">
      <div class="flex items-center space-x-4">
        <span class="shrink-0">{{ $t("suofang_05853d") }}</span>
        <ElSlider v-model="state.scale" :min="0.1" :max="2" :step="0.1" show-input> </ElSlider>
      </div>
      <div class="flex items-center space-x-4">
        <span class="shrink-0">{{ $t("xuanzhuan_79b5a6") }}</span>
        <ElSlider v-model="state.rotate" :min="0" :max="360" :step="1" show-input> </ElSlider>
      </div>
      <div class="flex justify-end">
        <el-button type="primary" @click="handleReset">{{ $t("zhongzhi_4b9c32") }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
const props = withDefaults(defineProps<{ src?: string }>(), {
  src: " https://fengyuanchen.github.io/cropperjs/images/picture.jpg",
});
const state = reactive({
  url: props.src,
  scale: 1,
  rotate: 0,
});
const imgRef = ref<HTMLImageElement | null>(null);
let cropper: Cropper;
watch(imgRef, (newValue) => {
  console.log("🚀 -> file: index.vue -> line 34 -> watch -> props.src", props.src);

  if (cropper) cropper.destroy();
  if (newValue) {
    state.url = props.src;
    cropper = new Cropper(newValue);
  }
});

watchEffect(() => {
  const { rotate, scale } = state;
  if (cropper) cropper.rotateTo(rotate);
  if (cropper) cropper.scale(scale);
});

function handleReset() {
  state.scale = 1;
  state.rotate = 0;
  cropper.reset();
}

defineExpose({
  onConfirm() {
    cropper.getCroppedCanvas().toBlob((e) => {
      console.log(e);
    });
  },
});
</script>
