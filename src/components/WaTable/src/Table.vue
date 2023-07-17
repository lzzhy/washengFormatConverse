<template>
  <div v-if="getBindForm" class="my-0">
    <BasicForm v-bind="getBindForm.formProps" class="mb-3" @register="getBindForm!.register">
      <template v-for="item in getBindForm.getFormSlotKeys" #[getBindForm.replaceFormSlotKey(item)]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <template #submit>
        <div class="flex w-full justify-start">
          <el-button type="primary" @click="reload()">{{ $t("chaxun_bee912") }}</el-button>
          <el-button @click="resetFields()">{{ $t("zhongzhi_4b9c32") }}</el-button>
          <!-- <el-button @click="getBindForm?.methods.invokeEvent('resetFields')">重置</el-button> -->
          <slot name="extra-operation"></slot>
        </div>
      </template>
    </BasicForm>
  </div>
  <div>
    <!-- <RenderTable ref="tableElRef" class="basic_table mb-4" v-bind="getBindTables"></RenderTable> -->
    <ElTable v-loading="getBindTables.loading" class="basic_table mb-4" :data="getBindTables.data" v-bind="getBindTables.attrs" style="width: 100%" size="large" table-layout="fixed">
      <ElTableColumn v-for="(item, index) in getBindTables.columns" :key="index" v-bind="item">
        <template #default="scope">
          <slot v-if="item.slot" :name="item.slot" v-bind="scope"></slot>
          <RenderCell :item="item" :scope="scope" />
        </template>
      </ElTableColumn>
    </ElTable>
    <div v-if="pagination" class="flex justify-end">
      <RenderPagination v-model:pageSize="pagination.pageSize" v-model:currentPage="pagination.currentPage" :config="pagination"></RenderPagination>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ElTable } from "element-plus";
import { BASIC_TABLE_PROPS, FEATCH_PARAMS, TABLE_ACTION_TYPE } from "./types";
import { RenderPagination, RenderCell } from "./components";
import { useDataSource, usePagination } from "./hooks";
import { useTableFormWithRegister } from "./hooks/useTableForm";
export default defineComponent({
  name: "WaTable",
  components: { RenderPagination, RenderCell },
  inheritAttrs: false,
  emits: ["register"],
  setup(props, { emit, attrs, slots }) {
    const tableElRef = ref<InstanceType<typeof ElTable>>();

    const innerPropsRef = reactive<Partial<BASIC_TABLE_PROPS<any, any>>>({});
    const getProps = computed<Recordable & Partial<BASIC_TABLE_PROPS>>(() => {
      return { ...props, ...innerPropsRef } as BASIC_TABLE_PROPS;
    });

    /**初始化分页 */
    const pagination = usePagination(innerPropsRef as BASIC_TABLE_PROPS);
    const getBindForm = useTableFormWithRegister(innerPropsRef as BASIC_TABLE_PROPS, slots);

    /**初始化数据源 */
    const dataSource = useDataSource(innerPropsRef as BASIC_TABLE_PROPS, { pagination, form: getBindForm });

    onMounted(() => {
      console.log("🚀 -> file: Table.vue -> line 30 -> onMounted -> onMounted", onMounted);
    });
    async function resetFields(): Promise<any> {
      unref(getBindForm.value?.elFormRef)?.resetFields();
      unref(dataSource).run({});
    }
    function setProps(props: Partial<BASIC_TABLE_PROPS>) {
      Object.assign(innerPropsRef, props);
    }

    /**刷新表格 */
    async function reload(query?: FEATCH_PARAMS): Promise<any> {
      unref(dataSource).run(query);
    }

    /**尝试获取当前表格的数据 */
    function getTableData() {
      console.log("🚀 -> file: Table.vue -> line 40 -> getTableData -> getTableData", getTableData);
    }

    /**定义表格操作 */
    const tableAction: TABLE_ACTION_TYPE<any, any> = {
      reload,
      setProps,
      getTableData,
    };

    /**所有的配置项 */
    const getBindTables = computed<Recordable & Partial<BASIC_TABLE_PROPS>>(() => {
      let { data, loading } = unref(dataSource);
      const _pagination = unref(pagination);
      const { columns } = unref(getProps);

      let propsData: Recordable = {
        attrs,
        loading,
        data: _pagination ? (data as any)?.records : data,
        columns: columns,
      };
      return propsData;
    });

    /**注册暴露的事件方法 */
    emit("register", tableAction, {} as any);

    return {
      tableElRef,
      getBindTables,
      pagination,
      getBindForm,
      reload,
      resetFields,
    };
  },
});
</script>
<style lang="scss" scoped>
.basic_table {
  --el-table-header-bg-color: #fafafa;
}
</style>
