<template>
  <ElDrawer v-model="visible" modal-class="dt__modal" :title="title" append-to-body @opened="onOpen" @closed="emit('closed')">
    <slot ref="childInstance" :action="exposeAction" :loading="loading"></slot>
    <template #footer>
      <div style="flex: auto">
        <ElButton @click="handleCancel">{{ $t("quxiao_625fb2") }}</ElButton>
        <ElButton type="primary" :loading="loading" @click="handleSubmit()">{{ $t("queren_e83a25") }}</ElButton>
      </div>
    </template>
  </ElDrawer>
</template>

<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { ModalLinkType, useLinkChild } from "./hooks";
import { BUSINESS_MODAL_ACTION } from "./types";
defineProps<{ title?: string }>();

const emit = defineEmits<{
  (e: "success", data: any): void;
  (e: "closed"): void;
  (e: "cancel"): void;
  (e: "register", data: BUSINESS_MODAL_ACTION): void;
}>();

const [visible, toggleVisible] = useToggle(false);
const [loading, setLoading] = useToggle(false);

const [childInstance, exposeAction, callhook] = useLinkChild();

async function handleSubmit() {
  try {
    let len = callhook(ModalLinkType.beforeConfirm, exposeAction);
    if (!len) {
      handleClose();
    }
    // console.log("🚀 -> file: BaseModal.vue -> line 53 -> handleSubmit -> result", result);
    // if (result) toggleVisible(false);
    // emit("success", true);
  } catch (error) {
    console.log("🚀 -> file: MODAL.vue -> line 24 -> handleSubmit -> error", error);
  }
}

function handleCancel() {
  if (!visible.value) return;
  toggleVisible(false);
  emit("cancel");
}

function handleClose(result?: any) {
  if (!visible.value) return;
  toggleVisible(false);
  emit("success", result);
}

const exposeMethods: BUSINESS_MODAL_ACTION = {
  async open(record?: Recordable) {
    console.log("🚀 -> file: BaseModal.vue -> line 48 -> open -> record", record);
    try {
      toggleVisible(true);
      nextTick(() => callhook(ModalLinkType.beforeOpen, record));
    } catch (error) {
      console.log("🚀 -> file: MODAL.vue -> line 24 -> handleSubmit -> error", error);
    }
  },
  close() {
    visible.value = false;
  },
};

defineExpose<BUSINESS_MODAL_ACTION>(exposeMethods);

const onOpen = () => {
  console.log("🚀 -> file: BaseModal.vue -> line 67 -> onOpen -> onOpen", onOpen);
};

/**实现两个方法 */
exposeAction.setLoading = (value) => setLoading(value);
exposeAction.close = (value) => (value ? handleSubmit() : handleCancel());
exposeAction.handleClose = handleClose;
exposeAction.handleCancel = handleCancel;

emit("register", exposeMethods);
</script>

<style lang="scss">
@import "./index.scss";
</style>
