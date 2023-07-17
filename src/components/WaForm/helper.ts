import { $t } from "@/i18n";
import { Slots } from "vue";
import { PlaceholderMoel } from "./types";

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function => {
  return typeof val === "function";
};

export const getSlot = (slots: Slots, slot = "default", data?: Recordable) => {
  // Reflect.has 判断一个对象是否存在某个属性
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`);
    return null;
  }
  const slotFn = slots[slot];
  if (!slotFn) return null;
  return slotFn(data);
};

/**
 * @param col 内置栅格
 * @returns 返回栅格属性
 * @description 合并传入进来的栅格属性
 */
export const setGridProp = (col: ColProps = {}): ColProps => {
  const colProps: ColProps = {
    // 如果有span，代表用户优先级更高，所以不需要默认栅格
    ...(col.span
      ? {}
      : {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        }),
    ...col,
  };
  return colProps;
};

/**
 * 获取Input,Select等组件的插槽
 * @param slots 插槽
 * @param slotsProps 插槽属性
 * @param field 字段名
 */
export const setItemComponentSlots = (slots: Slots, slotsProps: Recordable = {}, field: string): Recordable => {
  const slotObj: Recordable = {};
  for (const key in slotsProps) {
    if (slotsProps[key]) {
      // 由于组件有可能重复，需要有一个唯一的前缀
      slotObj[key] = (data: Recordable) => {
        return getSlot(slots, `${field}-${key}`, data);
      };
    }
  }

  return slotObj;
};

export const setDefaultRules = (schema: FormSchema): FormItemProps => {
  const defaultRules = [
    {
      required: true,
      message: $t("qingxuanze_708c9d") + schema.label,
    },
  ];
  if (!schema.formItemProps) {
    return {
      rules: [...defaultRules],
    };
  }
  if (typeof schema.formItemProps.required === "boolean" && !schema.formItemProps.required) {
    return schema.formItemProps;
  }

  return { ...schema.formItemProps, rules: Array.isArray(schema.formItemProps.rules) ? [...schema.formItemProps.rules, ...defaultRules] : [...defaultRules] };
};

/**
 * @param schema 对应组件数据
 * @returns 返回提示信息对象
 * @description 用于自动设置placeholder
 */
export const setTextPlaceholder = (schema: FormSchema): PlaceholderMoel => {
  const textMap = ["Input", "Autocomplete", "InputNumber", "InputPassword"];
  const selectMap = ["Select", "TimePicker", "DatePicker", "TimeSelect", "TimeSelect", "Cascader"];
  if (textMap.includes(schema?.component as string)) {
    return {
      placeholder: $t("qingshuru_02cc4f") + schema.label,
    };
  }
  if (selectMap.includes(schema?.component as string)) {
    // 一些范围选择器
    const twoTextMap = ["datetimerange", "daterange", "monthrange", "datetimerange", "daterange"];
    if (twoTextMap.includes((schema?.componentProps?.type || schema?.componentProps?.isRange) as string)) {
      return {
        startPlaceholder: $t("kaishishij_592c59"),
        endPlaceholder: $t("jieshushij_f78277"),
        rangeSeparator: "-",
      };
    } else {
      return {
        placeholder: $t("qingxuanze_708c9d") + schema.label,
      };
    }
  }
  return {};
};

/**
 * 根据官网描述form-item只有两种插槽error 和 label
 * @param slots 插槽
 * @param field 字段名
 * @returns 返回FormIiem插槽
 */
export const setFormItemSlots = (slots: Slots, field: string): Recordable => {
  const slotObj: Recordable = {};
  if (slots[`${field}-error`]) {
    slotObj["error"] = (data: Recordable) => {
      return getSlot(slots, `${field}-error`, data);
    };
  }
  if (slots[`${field}-label`]) {
    slotObj["label"] = (data: Recordable) => {
      return getSlot(slots, `${field}-label`, data);
    };
  }
  console.log("formItemslot", slotObj);
  return slotObj;
};

/**
 *除了颜色选择器和分割线之外 加上clearable属性(可清空输入框等)
 * @param item 传入的组件属性
 * @returns 默认添加 clearable 属性
 */
export const setComponentProps = (item: FormSchema): Recordable => {
  const notNeedClearable = ["ColorPicker", "ElDivider"];
  const componentProps: Recordable = notNeedClearable.includes(item.component as string)
    ? { ...item.componentProps }
    : {
        clearable: true,
        ...item.componentProps,
      };
  // 需要删除额外的属性
  delete componentProps?.slots;
  return componentProps;
};

/**
 * @param schema Form表单结构化数组
 * @param formModel FormMoel
 * @returns FormMoel
 * @description 生成对应的formModel
 */
export const initModel = (schema: FormSchema[], formModel: Recordable) => {
  const model: Recordable = { ...formModel };
  schema.map((v) => {
    // 如果是hidden，就删除对应的值
    if (v.hidden) {
      delete model[v.field];
    } else if (v.component && v.component !== "Divider") {
      const hasField = Reflect.has(model, v.field);
      // 如果先前已经有值存在，则不进行重新赋值，而是采用现有的值
      model[v.field] = hasField ? model[v.field] : v.value !== void 0 ? v.value : "";
    }
  });
  return model;
};
