<template>
  <ElDialog
    v-model="visible"
    :close-on-click-modal="stateComputed.closeOnClickModal"
    :close-on-press-escape="stateComputed.closeOnPressEscape"
    align-center
    draggable
    :width="stateComputed.width"
    :modal-class="['dt__modal', stateComputed.hiddenHeader ? 'header-hidden' : '', stateComputed.inlineModal ? 'inline-modal' : '', stateComputed.autoHeight ? 'auto-height' : ''].join(' ')"
    :title="title"
    append-to-body
    @opened="onOpen"
    @closed="emit('closed')"
  >
    <slot :ref="(instance: any) => (childInstance = instance)" :action="exposeAction" :loading="loading"></slot>
    <template v-if="!stateComputed.hiddenFooter" #footer>
      <div style="flex: auto" class="project-btns">
        <ElButton round @click="handleCancel">{{ cancelBtnText || cancel_btn }}</ElButton>
        <ElButton round type="primary" :loading="loading" @click="handleSubmit()">{{ confirmBtnText || confirm_btn }}</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { $t } from "@/i18n";
import { useToggle } from "@vueuse/core";
import { ModalLinkType, useLinkChild } from "./hooks";
import { mergeObj } from "./utils/index";
import { BUSINESS_MODAL_ACTION, MODAL_KEY, ModalState } from "./types";

export interface BaseDialogProps {
  title?: string;
  width?: string | number;
  inlineModal?: boolean;
  hiddenFooter?: boolean;
  hiddenHeader?: boolean;
  confirmBtnText?: string;
  cancelBtnText?: string;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  autoHeight?: boolean;
}
let props = withDefaults(defineProps<BaseDialogProps>(), {
  closeOnClickModal: true,
  closeOnPressEscape: true,
});

const cancel_btn = $t("quxiao_625fb2");
const confirm_btn = $t("queren_e83a25");

const emit = defineEmits<{
  (e: "success", data: any): void;
  (e: "closed"): void;
  (e: "cancel"): void;
  (e: "register", data: BUSINESS_MODAL_ACTION): void;
}>();

const state = reactive<Partial<ModalState & typeof props>>({
  hiddenFooter: false,
  hiddenHeader: false,
  autoHeight: false,
});
const stateComputed = computed<ModalState & typeof props>(() => {
  // let { width } = props;
  console.log("🚀 -> file: BaseDialog.vue -> line 35 -> stateComputed ->  mergeObj({ width }, state) ", mergeObj(state, props));
  return mergeObj(state, props);
});

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

provide(MODAL_KEY, { state, action: exposeAction });

emit("register", exposeMethods);
</script>

<style lang="scss">
@import "./index.scss";
</style>
