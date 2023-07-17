<template>
  <div>
    {{ tip }}
  </div>
</template>

<script setup lang="ts">
import { ModalAction } from "./hooks";
export interface IConfirmDialog {
  tip: string;
  beforeClose?: (data: ModalAction) => void;
}
let props = defineProps<IConfirmDialog>();

defineExpose({
  async onConfirm(methods: ModalAction) {
    try {
      props.beforeClose && props.beforeClose(methods);
    } finally {
    }
  },
});
</script>
