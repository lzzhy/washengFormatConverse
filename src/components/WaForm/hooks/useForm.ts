import { ElForm } from "element-plus";
import type { FormExpose, Form, FormProps } from "../types";

export const useForm = () => {
  // el-form 父级实例
  const formRef = ref<typeof Form & FormExpose>();

  // el-form实例
  const elFormRef = ref<InstanceType<typeof ElForm>>();

  // 注册实例
  const register = (ref: typeof Form & FormExpose, elRef: InstanceType<typeof ElForm>) => {
    formRef.value = ref;
    elFormRef.value = elRef;
  };

  const getForm = async () => {
    await nextTick();
    const form = unref(formRef);
    if (!form) {
      console.error("The form is not registered. Please use the register method to register");
    }
    return form;
  };

  const methods: {
    setValues: (data: Recordable) => void;
    getFormData: <T = Recordable | undefined>() => Promise<T>;
    addSchema: (formSchema: FormSchema, index?: number) => void;
    delSchema: (field: string) => void;
    setProps: (prop: FormProps) => void;
    updateSchemaByField: (schemaProps: FormSetPropsType[]) => void;
    updateScheam: (schemaProps: FormPropsType) => void;
    invokeEvent: (eventName: "validate", ...args: any[]) => any;
  } = {
    // 设置设置出示值
    setValues: async (data: Recordable) => {
      const form = await getForm();
      form?.setValues(data);
    },
    /**
     * @returns form data
     */
    getFormData: async <T = Recordable>(isRef = false): Promise<T> => {
      if (isRef) {
        await nextTick();
        return formRef.value?.formModel;
      }
      const form = await getForm();
      return form?.formModel as T;
    },
    /**
     * @param formSchema 组件的配置数据
     * @param index 要插入的位置如果不传push进入
     */
    addSchema: async (formSchema: FormSchema, index?: number) => {
      const form = await getForm();
      console.log(form, "form");
      form?.addSchema(formSchema, index);
    },
    /**
     * @param field 唯一值
     */
    delSchema: async (field: string) => {
      const form = await getForm();
      form?.delSchema(field);
    },
    // 设置el-form的属性
    setProps: async (props: FormProps = {}) => {
      const form = await getForm();
      form?.setProps(props);
    },
    //更新schema
    updateSchemaByField: async (schemaProps: FormSetPropsType[]) => {
      const form = await getForm();
      form?.updateSchemaByField(schemaProps);
    },
    updateScheam: async (schemaProps: FormPropsType) => {
      const form = await getForm();
      form?.updateScheam(schemaProps);
    },
    invokeEvent: (eventName: "validate" | "resetFields", ...args: any[]) => {
      return elFormRef.value ? (elFormRef.value[eventName] as any)?.apply(args) : null;
    },
  };
  return {
    register,
    elFormRef,
    methods,
  };
};
