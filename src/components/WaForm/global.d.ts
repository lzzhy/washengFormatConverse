import type { CSSProperties } from "vue";
import { UserDefinedComponents } from "./user.defined";
declare global {
  // Record的作用请到TS官网查看
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : any, T>;

  // 目前可以使用的组件名称 和 @/components/Form/ComponentsMap 对应
  type FormCoreComponent =
    | "Radio"
    | "RadioButton"
    | "Checkbox"
    | "CheckboxButton"
    | "Input"
    | "Autocomplete"
    | "InputNumber"
    | "Select"
    | "Cascader"
    | "Switch"
    | "Slider"
    | "TimePicker"
    | "DatePicker"
    | "Rate"
    | "ColorPicker"
    | "Divider"
    | "TimeSelect"
    | "SelectV2"
    | "lich"
    | "FormulaEdit"
    | "CheckDep"
    | "AssessMentItemCheck"
    | "CheckUserDialog";
  type ComponentName = FormCoreComponent | UserDefinedComponents;

  type ColProps = {
    span?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    tag?: string;
  };

  type FormValueType = string | number | string[] | number[] | boolean | undefined | null;

  // <el-form-item></el-form-item>的一些配置 可在官网进行参考
  type FormItemProps = {
    labelWidth?: string | number;
    required?: boolean;
    rules?: Recordable;
    error?: string;
    showMessage?: boolean;
    inlineMessage?: boolean;
    style?: CSSProperties;
  };

  interface labelRender {
    render: (value?: unknown) => string;
  }

  type TLabe = string | labelRender;

  // 选择器下拉的数据配置
  type ComponentOptions = {
    label?: string;
    value?: FormValueType;
    disabled?: boolean;
    key?: string | number;
    children?: ComponentOptions[];
    options?: ComponentOptions[];
  } & Recordable;

  // 自定义选择器label和value对应的字段名
  type ComponentOptionsAlias = {
    labelField?: string;
    valueField?: string;
  };

  type ComponentProps = {
    optionsAlias?: ComponentOptionsAlias;
    options?: ComponentOptions[] | null;
    optionsSlot?: boolean;
  } & Recordable;

  type FormSchema = {
    // 唯一值
    field: string;
    // 标题
    label: TLabe;
    // col组件属性
    colProps?: ColProps;
    // 表单组件属性，slots对应的是表单组件的插槽，规则：${field}-xxx，具体可以查看element-plus文档
    componentProps?: { slots?: Recordable } & ComponentProps;
    // formItem组件属性
    formItemProps?: FormItemProps;
    // 渲染的组件
    component?: ComponentName;
    // 初始值
    value?: FormValueType;
    // 是否隐藏
    hidden?: boolean;
  };

  type FormPropsType = Omit<FormSchema, "label" | "component" | "value"> & { label?: TLabe };

  type FormSetPropsType = {
    field: string;
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
  };
}
