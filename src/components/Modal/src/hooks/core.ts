import { VNode } from "vue";
export interface ModalAction {
  setLoading(value?: boolean): void;
  close(value?: boolean): void;
  handleClose(value?: any): void;
  handleCancel(value?: any): void;
  register(name: ModalLinkType, fnc: () => void): void;
}
export interface IMODAL_CHILD {
  onConfirm?: (state: ModalAction) => void;
  onOpen?: (state: ModalAction) => void;
}
export enum ModalLinkType {
  "beforeConfirm" = "beforeConfirm",
  "beforeOpen" = "beforeOpen",
}

/**链接 弹窗容器和内容的通道钩子 */
export const useLinkChild = () => {
  const childInstance = ref<(VNode & IMODAL_CHILD) | null>(null);
  const [registerHooks, callhook, clearHooks] = useHooks();
  const exposeAction: ModalAction = {
    register(name: ModalLinkType, hook) {
      registerHooks(name, hook);
    },
    setLoading: () => null,
    close: () => null,
    handleCancel: () => null,
    handleClose: () => null,
  };

  watch(childInstance, (newValue, oldValue) => {
    if (oldValue) {
      if (oldValue.onConfirm) clearHooks(ModalLinkType.beforeConfirm, oldValue.onConfirm);
      if (oldValue.onOpen) registerHooks(ModalLinkType.beforeOpen, oldValue.onOpen);
    }

    if (newValue) {
      if (newValue.onConfirm) registerHooks(ModalLinkType.beforeConfirm, newValue.onConfirm);
      if (newValue.onOpen) registerHooks(ModalLinkType.beforeOpen, newValue.onOpen);
    }
  });

  onUnmounted(() => {
    clearHooks();
  });
  return [childInstance, exposeAction, callhook] as const;
};

/**创建一个钩子
 * @provide
 * 1. 注册函数
 * 2. 触发函数
 */
function useHooks() {
  type HookFnc = (params?: any) => any;
  let hooks: Record<string, Array<HookFnc>> = {};

  function callhooks(name: string, ...args: any[]) {
    const hook = hooks[name];
    if (hook && hook.length > 0) {
      return Promise.all(hook.map((fn: any) => fn(...args))).then((validates) => validates.every((validate) => !!validate));
    }
    return Promise.resolve((hook || []).length);
  }

  function registerHooks(name: string, hook: HookFnc) {
    if (hooks[name] === undefined) {
      hooks[name] = [];
    }
    hooks[name].push(hook);
  }

  function clear(name?: string, hook?: HookFnc) {
    if (name && hook) {
      hooks[name] = hooks[name].filter((fn) => fn !== hook);
    } else {
      hooks = {};
    }
  }

  return [registerHooks, callhooks, clear] as const;
}
