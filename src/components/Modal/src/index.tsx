import { DialogProps, ElConfigProvider } from "element-plus";
import { App, ComponentPublicInstance, createApp, VNode } from "vue";
import BaseDialog from "./BaseDialog.vue";
import { BaseDialogProps } from "./BaseDialog.vue";
import BaseDrawer from "./BaseDrawer.vue";
import { app } from "@/main";
import zhCn from "element-plus/dist/locale/zh-cn";
import en from "element-plus/dist/locale/en";
import ja from "element-plus/dist/locale/ja";
import ConfirmDialog, { IConfirmDialog } from "./ConfirmDialog.vue";
const ModalImpl = function <T>(BaseModal: any) {
  return (Child: any, options?: T, childOptions?: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      /**这里手动触发 是因为想 触发钩子
       * 如果渲染直接打开，默认先直接 open -> 进行 child实例的初始化 -> 再绑定 link modal 和 child的通信
       *                                -> 触发 打开钩子 到 孩子        【这里通信的时候 modal和child的通信还没有建立】
       */
      function onInit(params: any) {
        nextTick(() => params.open(childOptions));
      }
      function getLocal() {
        const appStore = useAppStoreWithout();
        switch (appStore.locale) {
          case "en":
            return en;
          case "zh-cn":
            return zhCn;
          case "ja":
            return ja;
          default:
            return zhCn;
        }
      }
      const modalApp = createApp(
        <ElConfigProvider locale={getLocal()}>
          <BaseModal onRegister={onInit} {...options} onClosed={() => onClosed()} onSuccess={(value: any) => resolve(value)}>
            {{
              default: ({ ref, action, ...reset }: any) => <Child ref={ref} {...reset} {...action} {...childOptions}></Child>,
            }}
          </BaseModal>
        </ElConfigProvider>
      );

      modalApp.config.globalProperties = app.config.globalProperties;

      const vm = showModal(modalApp);

      function onClosed() {
        hideModal(modalApp, vm);
        reject();
      }
    });
  };
};

function showModal(app: App<Element>) {
  const oFrag = document.createDocumentFragment();
  const vm = app.mount(oFrag as any);
  document.body.appendChild(oFrag);
  return vm;
}

function hideModal(app: App<Element>, vm?: ComponentPublicInstance<any>) {
  app.unmount();
}

// export const openDialog = ModalImpl(BaseDialog);
// export const openDrawer = ModalImpl(BaseDrawer);

type DialogOptions = DialogProps & BaseDialogProps;
export const Dialog = {
  open: ModalImpl<Partial<DialogOptions>>(BaseDialog),
  confirm: (options: Partial<DialogOptions>, props: IConfirmDialog) => {
    return ModalImpl<Partial<DialogOptions>>(BaseDialog)(ConfirmDialog, options, props);
  },
};
export const Drawer = {
  open: ModalImpl(BaseDrawer),
};
