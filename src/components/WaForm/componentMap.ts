import { Component } from "vue";

import { ElCascader, ElCheckboxGroup, ElColorPicker, ElDatePicker, ElInput, ElInputNumber, ElRadioGroup, ElRate, ElSelectV2, ElSlider, ElSwitch, ElTimePicker, ElTimeSelect, ElAutocomplete, ElDivider, ElSelect } from "element-plus";
import ExampleInput from "./example/ExampleInput.vue";
// import DtSelect from "@/components/DtSelect";

const componentMap = new Map<ComponentName, Component>();

componentMap.set("Radio", ElRadioGroup); // 单选
componentMap.set("RadioButton", ElRadioGroup);
componentMap.set("Checkbox", ElCheckboxGroup); // 单选
componentMap.set("CheckboxButton", ElCheckboxGroup);
componentMap.set("Input", ElInput); //输入框
componentMap.set("Autocomplete", ElAutocomplete); // https://element-plus.org/zh-CN/component/input.html#input-%E5%B1%9E%E6%80%A7
componentMap.set("InputNumber", ElInputNumber); // 数字输入框
componentMap.set("Select", ElSelect); // 选择器
componentMap.set("Cascader", ElCascader); // 级联选择器
componentMap.set("Switch", ElSwitch); // 开关
componentMap.set("Slider", ElSlider); // 滑块
componentMap.set("TimePicker", ElTimePicker);
componentMap.set("DatePicker", ElDatePicker); // 日期选择器
componentMap.set("Rate", ElRate); // 评分
componentMap.set("ColorPicker", ElColorPicker); // 取色器
componentMap.set("Divider", ElDivider); // 分割线
componentMap.set("TimeSelect", ElTimeSelect); // 时间选择器
componentMap.set("SelectV2", ElSelectV2); // 虚拟化选择器

export { componentMap };
