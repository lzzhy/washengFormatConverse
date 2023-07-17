import { WatchStopHandle } from "vue";
import { BASIC_TABLE_PROPS, FEATCH_PARAMS, FORM_ACTION_TYPE, TABLE_ACTION_TYPE } from "../types";

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

/**表格钩子
 * 用户可以通过这个钩子来注册表格的相关事件
 * 用户可以通过这个钩子来获取表格的相关方法和数据
 */
export function useTable<TData = any, TParams = any>(tableProps: BASIC_TABLE_PROPS): readonly [(instance: TABLE_ACTION_TYPE<TData, TParams>, formInstance: FORM_ACTION_TYPE) => void, TABLE_ACTION_TYPE<TData, TParams>] {
  const tableRef = ref();
  const loadedRef = ref();
  const formRef = ref();
  let stopWatch: WatchStopHandle;

  function register(instance: TABLE_ACTION_TYPE<TData, TParams>, formInstance: FORM_ACTION_TYPE) {
    onUnmounted(() => {
      tableRef.value = null;
      loadedRef.value = null;
    });

    if (unref(loadedRef) && instance === unref(tableRef)) return;

    tableRef.value = instance;
    formRef.value = formInstance;
    tableProps && instance.setProps(getDynamicProps(tableProps));
    loadedRef.value = true;

    stopWatch?.();

    stopWatch = watch(
      () => tableProps,
      () => {
        tableProps && instance.setProps(getDynamicProps(tableProps));
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  function getTableInstance(): TABLE_ACTION_TYPE<TData, TParams> {
    const table = unref(tableRef);
    if (!table) {
      console.error("The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!");
    }
    return table;
  }

  const methods: TABLE_ACTION_TYPE<TData, TParams> = {
    reload: async (opt?: TParams & FEATCH_PARAMS) => {
      return await getTableInstance().reload(opt);
    },
    setProps: (props: Partial<BASIC_TABLE_PROPS>) => {
      return getTableInstance().setProps(props);
    },
    getTableData() {
      return getTableInstance().getTableData();
    },
  };

  return [register, methods] as const;
}
