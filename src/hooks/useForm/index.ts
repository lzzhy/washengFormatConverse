import { SchemaFactory } from "@/services";
import type { ElForm, FormItemRule } from "element-plus";

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

/**业务组件弹窗的操作 */
export type BUSINESS_FORM_ACTION<TData = any> = {
  submit(): Promise<TData>;
  resetFields(): void;
};

/** 表单钩子
 *  实现
 *  1.  定义表单实例  formRef
 *  2.  定义表单数据结构 formModel
 *  3.  定义表单验证结构 formRules
 *  4.  定义表单验证函数
 *  5.  定义表单重制函数
 * @param FormState 表单的定义类
 * @param initValue 初始化表单的值
 */
export function useFormContext<TClass extends object>(FormState: Type<TClass>, initValue: Partial<TClass> = {}) {
  /**@instance 获取表单实例 */
  const formRef = ref<InstanceType<typeof ElForm>>();

  /**@define 定义表单数据结构 */
  const formState = reactive<TClass>({ ...new FormState(), ...(initValue || {}) });

  /**@define 获取表单验证规则 */
  const formRules = ref(SchemaFactory.createRulesForClass(FormState));

  /**@define 定义表单暴露的方法 */
  const exposeMethods: BUSINESS_FORM_ACTION = {
    async submit() {
      return formRef.value?.validate().then((res) => {
        console.log("🚀 -> file: Form.vue -> line 25 -> returnformRef.value?.validate -> res", res);
        return toRaw(formState);
      });
    },
    resetFields() {
      formRef.value?.resetFields();
    },
  };

  function addRules(name: keyof TClass, rules: FormItemRule[] | FormItemRule) {
    if (!Array.isArray(rules)) {
      rules = [rules];
    }
    if (!formRules.value[name as any]) {
      formRules.value[name as any] = [...rules];
    } else {
      formRules.value[name as any].push(...rules);
    }
  }

  //   /**defineExpose() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect.  */
  //   /**@expose 暴露出表单提交 */
  //   defineExpose<BUSINESS_FORM_ACTION>(exposeMethods);

  return [{ formRef, formState, formRules, addRules }, exposeMethods] as const;
}
