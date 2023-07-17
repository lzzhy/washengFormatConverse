
/**业务组件弹窗的操作 */
export type BUSINESS_MODAL_ACTION = {
  open(record?: Recordable<any, string> | undefined): void;
  close(): void;
};

/**业务组件弹窗的操作 */
export type BUSINESS_FORM_ACTION<TData = any> = {
  submit(): Promise<TData>;
  resetFields(): void;
};

export type MODAL_PROVIDE = {
  updateFormInstance(methods: BUSINESS_FORM_ACTION): void;
};

export const MODAL_KEY = Symbol("MODAL_KEY");



/**业务组件弹窗的操作 */
export type BUSINESS_DRAWER_ACTION = {
  open(record?: Recordable<any, string> | undefined): void;
  close(): void;
};

export type DRAWER_PROVIDE = {
  updateFormInstance(methods: BUSINESS_FORM_ACTION): void;
};

export const DRAWER_KEY = Symbol("BUSINESS_DRAWER_KEY");
