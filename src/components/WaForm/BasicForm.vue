<!--
 * @Author: zhouby
 * @Date: 2022-03-03 09:59:47
 * @LastEditTime: 2022-03-08 10:18:57
 * @Description: 表单组件
-->
<script lang="tsx">
import { $t } from "@/i18n";
// import { FormSchema } from "@/types/componentType/form";setFormItemSlotsdividerProps
import { defineComponent, PropType } from "vue";
import { ElForm, ElFormItem, ElMessage } from "element-plus";
import { FormProps } from "./types";

import { getSlot, setGridProp, setTextPlaceholder, setComponentProps, setItemComponentSlots, initModel, setDefaultRules } from "./helper";
import { componentMap } from "./componentMap";
import { useRenderSelect } from "./components/useRenderSelect";
import { useRenderRadio } from "./components/useRenderRadio";
import { useRenderChcekbox } from "./components/useRenderChcekbox";
import { set } from "lodash-es";
import { updateObj } from "@/utils";
export default defineComponent({
  name: "WaForm",
  props: {
    // 是否需要栅格布局
    isCol: {
      type: Boolean,
      default: true,
    },
    // form布局结构数组
    schema: {
      type: Array as PropType<FormSchema[]>,
      default: () => [],
    },
    // 是否自动设置placeholder
    autoSetPlaceholder: {
      type: Boolean,
      default: true,
    },
    // 表单label宽度
    labelWidth: {
      type: [String, Number],
      default: "auto",
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  // 注册组件方法
  emits: ["register"],
  //{slots,expose,emit}
  setup(props, { slots, expose, emit }) {
    // 获取ELForm完成的实例类型
    const elFormRef = ref<InstanceType<typeof ElForm>>();
    const mergeProps = ref<FormProps>({});
    // 获取props
    const getProps = computed(() => {
      let schema: FormSchema[];
      if (isRef(props.schema)) {
        schema = props.schema.value as any;
      } else {
        schema = props.schema;
      }
      const propsObj = { ...props, schema: reactive<FormSchema[]>(schema) };
      return { ...propsObj, ...unref(mergeProps) };
    });

    // 存储表单数据  表单的v-model绑定的数据
    const formModel = ref<Recordable>({});

    // 监听表单结构化数组，重新生成formModel
    watch(
      () => unref(getProps).schema,
      (schema = []) => {
        formModel.value = initModel(schema, unref(formModel));
      },
      {
        immediate: true,
        deep: true,
      }
    );

    // 渲染包裹标签，是否使用栅格布局
    const renderWrap = () => {
      const { isCol } = unref(getProps);
      const content = isCol ? (
        <el-row style='margin:0 !important;' gutter={20}>
          {renderFormItemWrap()}
        </el-row>
      ) : (
        renderFormItemWrap()
      );
      return content;
    };

    // 渲染el-col
    const renderFormItemWrap = () => {
      const { schema, isCol } = unref(getProps);
      // hidden 不显示相应组件
      return schema
        .filter((v) => !v.hidden)
        .map((item) => {
          // 分隔符组件需要自己占用一行
          const isDivider = item.component === "Divider";
          const Com = componentMap.get(item.component as ComponentName) as ReturnType<typeof defineComponent>;
          return isDivider ? <Com {...{ contentPosition: "left", ...item.componentProps }}>{item?.label}</Com> : isCol ? <el-col {...setGridProp(item.colProps)}>{renderFormItem(item)}</el-col> : renderFormItem(item);
        });
    };

    const renderFormItem = (item: FormSchema) => {
      // 单独给只有options属性的组件做判断
      // SelectV2和Cascader 的options属性是加在标签上的 比如<el-select-v2 :options="options" /> <Cascader :options="options" />
      // Select 的options属下试以<el-option>标签插入到<el-select></el-select>中
      const notRenderOptions = ["SelectV2", "Cascader"];
      // 将自定义插槽和<el-option></el-option>插入到相应组件中
      const slotsMap: Recordable = {
        ...setItemComponentSlots(slots, item?.componentProps?.slots, item.field),
      };
      if (item?.component !== "SelectV2" && item?.component !== "Cascader" && item?.componentProps?.options) {
        slotsMap.default = () => renderOptions(item);
      }
      return (
        <ElFormItem {...setDefaultRules(item)} prop={item.field} label={formItemLabel(item.label)}>
          {{
            default: () => {
              const Com = typeof item.component == "string" ? (componentMap.get(item.component as ComponentName) as ReturnType<typeof defineComponent>) : item.component;
              // 是否需要自动填充placeholder
              const { autoSetPlaceholder } = unref(getProps);
              return slots[item.field] ? (
                getSlot(slots, item.field, { item })
              ) : (
                <Com vModel={formModel.value[item.field]} {...(autoSetPlaceholder && setTextPlaceholder(item))} {...setComponentProps(item)} {...(notRenderOptions.includes(item?.component as string) && item?.componentProps?.options ? { options: item?.componentProps?.options || [] } : {})}>
                  {slotsMap}
                </Com>
              );
            },
          }}
        </ElFormItem>
      );
    };

    // 渲染options
    const renderOptions = (item: FormSchema) => {
      switch (item.component) {
        case "Select":
          const { renderSelectOptions } = useRenderSelect(slots);
          return renderSelectOptions(item);
        case "Radio":
        case "RadioButton":
          const { renderRadioOptions } = useRenderRadio();
          return renderRadioOptions(item);
        case "Checkbox":
        case "CheckboxButton":
          const { renderChcekboxOptions } = useRenderChcekbox();
          return renderChcekboxOptions(item);
        default:
          break;
      }
    };

    const formItemLabel = (label: TLabe) => {
      if (typeof label === "string") {
        return label;
      } else {
        return label?.render && label?.render();
      }
    };
    // $attrs
    const getFormBindValue = () => {
      const delKeys = ["schema", "isCol", "autoSetPlaceholder", "isCustom", "model"];
      const props = { ...unref(getProps) };
      for (const key in props) {
        if (delKeys.includes(key)) {
          delete props[key];
        }
      }
      return props;
    };

    // 对表单赋值
    const setValues = (data: Recordable = {}) => {
      let newModelValues = { ...unref(formModel) };
      updateObj(newModelValues, data);
      formModel.value = newModelValues;
    };

    const getElFormRef = (): InstanceType<typeof ElForm> => {
      return unref(elFormRef) as InstanceType<typeof ElForm>;
    };

    /**
     * 添加组件
     * @param formSchema 组件的配置数据
     * @param index 要插入的位置如果不传push进入
     */
    const addSchema = (formSchema: FormSchema, index?: number) => {
      const { schema } = unref(getProps);
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void
      if (index !== void 0) {
        schema.splice(index, 0, formSchema);
        return;
      }
      schema.push(formSchema);
    };

    /**
     * 根据field字段删除相应的Schema
     * @param field 唯一值
     */
    const delSchema = (field: string) => {
      const { schema } = unref(getProps);
      const index = schema.findIndex((v) => v.field === field);
      if (index > -1) {
        schema.splice(index, 1);
      } else {
        // message.warning('没有找到对应的组件,请')
        ElMessage({
          message: $t("meiyouzhao_b30664"),
          type: "warning",
        });
      }
    };

    // 设置表单<el-form>的props属下
    const setProps = (props: FormProps = {}) => {
      mergeProps.value = { ...unref(mergeProps), ...props };
    };

    // 更新schema  可以更新多个
    const updateSchemaByField = (schemaProps: FormSetPropsType[]) => {
      const { schema } = unref(getProps);
      for (const v of schema) {
        for (const item of schemaProps) {
          if (v.field === item.field) {
            set(v, item.path, item.value);
          }
        }
      }
    };

    // 更新schema
    const updateScheam = (schemaProps: FormPropsType) => {
      const { schema } = unref(getProps);
      const notIterator = ["label", "hidden"];
      const index = schema.findIndex((v) => v.field === schemaProps.field);
      const curSchema = { ...schema[index] };
      for (const v in schemaProps) {
        if (v === "field") continue;
        if (!notIterator.includes(v)) {
          curSchema[v] = curSchema[v] ? { ...curSchema[v], ...schemaProps[v] } : schemaProps[v];
        } else if (notIterator.includes(v)) {
          curSchema[v] = schemaProps[v];
        }
      }
      schema.splice(index, 1, curSchema);
    };

    expose({
      setValues,
      formModel,
      getElFormRef,
      addSchema,
      delSchema,
      setProps,
      updateSchemaByField,
      updateScheam,
    });

    // getCurrentInstance();

    onMounted(() => {
      emit("register", unref(elFormRef)?.$parent, unref(elFormRef));
    });

    return () => (
      <el-form {...getFormBindValue()} ref={elFormRef} model={formModel.value}>
        {{
          // 需要自定义的时候会提供默认插槽
          default: () => {
            const { isCustom } = unref(getProps);
            return isCustom ? getSlot(slots, "default") : renderWrap();
          },
        }}
      </el-form>
    );
  },
});
</script>
