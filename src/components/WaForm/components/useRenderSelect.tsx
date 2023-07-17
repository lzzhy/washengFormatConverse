import { ElOption, ElOptionGroup } from "element-plus";
import { getSlot } from "../helper";
import { Slots } from "vue";

export const useRenderSelect = (slots: Slots) => {
  // 渲染 select options
  const renderSelectOptions = (item: FormSchema) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField;
    //使用 el-option-group 对备选项进行分组，它的 label 属性为分组名
    // options = [{options: []}]
    return item?.componentProps?.options?.map((option) => {
      if (option?.options?.length) {
        return (
          <ElOptionGroup label={option[labelAlias || "label"]}>
            {() => {
              return option?.options?.map((v) => {
                return renderSelectOptionItem(item, v);
              });
            }}
          </ElOptionGroup>
        );
      } else {
        return renderSelectOptionItem(item, option);
      }
    });
  };

  // 渲染 select option item
  const renderSelectOptionItem = (item: FormSchema, option: ComponentOptions) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField;
    const valueAlias = item?.componentProps?.optionsAlias?.valueField;
    return (
      <ElOption label={option[labelAlias || "label"]} value={option[valueAlias || "value"]}>
        {{
          default: () => {
            return item?.componentProps?.optionsSlot ? getSlot(slots, `${item.field}-option`, { item: option }) : undefined;
          },
        }}
      </ElOption>
    );
  };

  return {
    renderSelectOptions,
  };
};
