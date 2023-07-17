import type { ComputedRef, Ref, Slots } from "vue";
import type { BASIC_TABLE_PROPS, TABLE_COLUMN } from "../types";
import { computed } from "vue";
import { useForm } from "@/components/WaForm";
// import type { FormProps } from "/@/components/Form";
// import { isFunction } from "/@/utils/is";
interface FormProps extends Recordable {
  schema: string;
  [key: string]: any;
}

interface TABLE_FORM_INNER {
  formProps: Partial<FormProps>;
  replaceFormSlotKey: (key: string) => string;
  getFormSlotKeys: ComputedRef<string[]>;
}

export interface TABLE_FORM {
  formProps: Partial<FormProps>;
  replaceFormSlotKey: (key: string) => string;
  getFormSlotKeys: string[];
  register: any;
  methods: Recordable;
  [key: string]: any;
}

export function useTableFormInner(instance: Ref<any>, formConfig: BASIC_TABLE_PROPS["formConfig"], slots: Slots) {
  const formProps = {
    // showAdvancedButton: true,
    // submitButtonOptions: { loading: unref(getLoading), ...submitButtonOptions },
    // compact: true,
    labelWidth: "80px",
    ...formConfig,
    schema: appendFormDefiend(formConfig.schema),
  };

  const getFormSlotKeys = computed<string[]>(() => {
    const keys = Object.keys(slots);
    return keys.map((item) => (item.startsWith("form-") ? item : null)).filter((item) => !!item) as string[];
  });

  function replaceFormSlotKey(key: string) {
    if (!key) return "";
    return key?.replace?.(/form\-/, "") ?? "";
  }

  instance.value = {
    formProps,
    replaceFormSlotKey,
    getFormSlotKeys,
    // handleSearchInfoChange,
  };
}

export const useTableForm = (props: BASIC_TABLE_PROPS, slots: Slots) => {
  const instance = ref<null | TABLE_FORM_INNER>(null);
  watch(
    () => props.formConfig,
    () => {
      if (props.formConfig === void 0) return;
      let formConfig = toRaw(props.formConfig);
      formConfig = formConfig === true ? getFormConfigFromTable(toRaw(props.columns)) : formConfig;
      useTableFormInner(instance, formConfig, slots);
    }
    // {
    //   flush: "sync",
    // }
  );

  return instance;
};

/**获取表单的一些配置信息 */
export const useTableFormWithRegister = (props: BASIC_TABLE_PROPS, slots: Slots): ComputedRef<TABLE_FORM | null> => {
  const dataForm = useTableForm(props, slots);

  const { register: registerForm, elFormRef, methods } = useForm();

  const getBindForm = computed(() => {
    console.log("🚀 -> file: useTableForm.ts -> line 82 -> useTableFormWithRegister -> useTableFormWithRegister", dataForm);

    const rawDataForm = unref(dataForm);
    if (!rawDataForm) return null;
    const { formProps, ...reset } = rawDataForm;
    const formData = {
      ...reset,
      formProps: {
        ...formProps,
      },
      register: registerForm,
      methods,
      elFormRef,
    };

    return formData;
  });

  return getBindForm;
};

/**帮助函数 解决一些默认布局 */
function appendFormDefiend(schema: FormSchema[]) {
  schema = [...schema];
  schema.map((item) => {
    const result = { ...item };
    if (!Reflect.has(item, "colProps")) {
      item.colProps = {
        span: 6,
      };
      // item.formItemProps = {
      //   labelWidth: "80px",
      // };
    }
    /**将表单验证关闭 */
    item.formItemProps ? (item.formItemProps.required = false) : (item.formItemProps = { required: false });
    return result;
  });
  schema.push({
    field: "submit",
    label: "",
    colProps: {
      span: 6,
    },
    formItemProps: {
      labelWidth: "80px",
    },
  });

  /**优化布局
   * 如果搜索条件为四个时，默认布局 按钮会被顶到下一行
   * 这里采用 5 5 5 5 4 的栅格布局 优化这种清空
   */
  if (schema.length === 5) {
    schema.forEach((item, index) => {
      if (index === 4) {
        if (item.colProps) item.colProps.lg = 4;
        if (item.formItemProps) item.formItemProps.labelWidth = "0px";
      } else {
        if (item.colProps) item.colProps.lg = 5;
      }
    });
  }

  return schema;
}

/**是否需要从 表格定义中提取 搜索条件 */
export const getFormConfigFromTable = (columns: TABLE_COLUMN[]) => {
  const queryColumns = columns.filter((col) => col.search);
  return {
    schema: queryColumns.map(({ prop, label, search }) => {
      if (search === "Input") {
        return {
          field: prop,
          label: label,
          component: "Input",
        };
      }
    }),
  };
};
