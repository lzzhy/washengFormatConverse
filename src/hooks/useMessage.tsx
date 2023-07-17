// import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal';

import { ElMessageBox as Modal, ElMessageBoxOptions, ElMessage as Message, ElNotification as notification, NotificationProps as NotificationArgsProps } from "element-plus";

// import { NotificationArgsProps, ConfigProps } from 'ant-design-vue/lib/notification';

export interface NotifyApi {
  info(config: NotificationArgsProps): void;
  success(config: NotificationArgsProps): void;
  error(config: NotificationArgsProps): void;
  warn(config: NotificationArgsProps): void;
  warning(config: NotificationArgsProps): void;
  open(args: NotificationArgsProps): void;
  close(key: string): void;
  // config(options: ConfigProps): void;
  destroy(): void;
}

export declare type NotificationPlacement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
export declare type IconType = "success" | "info" | "error" | "warning";
export declare type MessageType = "" | "success" | "warning" | "info" | "error";
export type ModalOptionsPartial = { title?: string; content?: string } & ElMessageBoxOptions;

// function createModalOptions({ title, content }: ModalOptionsPartial, icon?: string): []any {
//   return [title, content];
// }

function createErrorModal(options: ModalOptionsPartial) {
  return Modal({
    title: options.title,
    message: options.message || options.content,
    confirmButtonText: "确认",
    type: "error",
  });
}

function createConfirm({ title, message, type } = { title: "", message: "", type: "warning" } as any) {
  return Modal.confirm(message, title, {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: type || "warning",
  });
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: Message,
    notification: notification,
    createConfirm: createConfirm,
    // createSuccessModal,
    createErrorModal,
    // createInfoModal,
    // createWarningModal,
  };
}
