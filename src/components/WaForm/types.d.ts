import { ElForm } from "element-plus";
export { default as Form } from "./BasicForm.vue";
export interface PlaceholderMoel {
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  rangeSeparator?: string;
}

export type FormProps = {
  schema?: FormSchema[];
  isCol?: boolean;
  model?: Recordable;
  autoSetPlaceholder?: boolean;
  isCustom?: boolean;
  labelWidth?: string | number;
} & Recordable;

export interface FormExpose {
  setValues: (data: Recordable) => void;
  getElFormRef: () => InstanceType<typeof ElForm>;
}
