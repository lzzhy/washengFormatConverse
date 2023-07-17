import { ComputedRef, Ref } from "vue";
import { BASIC_TABLE_PROPS, PAGINATION } from "../types";
import { PAGINATION_INNER } from "./usePagination";
import { Result, useRequest } from "./useRequest";
import { TABLE_FORM } from "./useTableForm";

/**获取表格dataSource
 * 因为表格数据的请求，可能以来 表单 和 分页。
 * 所以将这两个带入，以便获取数据
 * 在钩子触发 beforeRequest的时候，尝试将表单数据和分页数据携带过去
 */
export function useDataSource(props: BASIC_TABLE_PROPS, { pagination, form }: { pagination: Ref<PAGINATION_INNER | null>; form: ComputedRef<TABLE_FORM | null> }) {
  /**初始化数据源数据 */
  const initData = {
    data: ref([]),
    loading: ref(false),
    error: ref(null),
    run: () => null,
  };

  const dataSource: Ref<Result<any, any>> = ref(initData as any);

  /**如果request发生改变时，触发数据源的更新 */
  watch(
    [() => props.request, pagination, form],
    async () => {
      if (!props.request) throw "request is not defined";
      const options = { ...props.request };
      const { defaultParams, onSuccess } = options;

      /**收集所有可能触发重新请求数据的依赖
       * 1. 搜索条件发生变化
       * 2. 分页条件发生变化时
       */
      const reloadDependency = [];

      /**注入分页 依赖 */
      const paginationInstance = unref(pagination);

      /**表单默认值的获取 */
      let formParams: Ref<Recordable> = ref({});
      if (unref(form)) {
        formParams = await unref(form)?.methods.getFormData(true);
        /**TODO: 可以手动开启和关闭，并且进行防抖， 依赖性应该采用 反转依赖 */
        // reloadDependency.push(() => unref(formParams));

        options.defaultParams = async () => {
          return {
            ...(defaultParams || {}),
            ...formParams,
          };
        };
      }

      if (paginationInstance) {
        options.defaultParams = async () => {
          return {
            ...(defaultParams || {}),
            [PAGINATION.PAGE]: paginationInstance.currentPage,
            [PAGINATION.SIZE]: paginationInstance.pageSize,
            ...formParams,
          };
        };
        options.onSuccess = (...args) => {
          if (pagination.value) pagination.value.total = args[0][PAGINATION.TOTAL] * 1;
          onSuccess && onSuccess(...args);
        };

        /**添加依赖 */
        reloadDependency.push(
          () => pagination.value?.currentPage,
          () => pagination.value?.pageSize
        );
      }

      watch(reloadDependency, () => {
        dataSource.value.run();
      });

      dataSource.value = useRequest({ fullScreenLoading: false, ...options });

      // /**当分页发生变化时进行 调用重新获取接口 */
      // if (pagination.value) {
      //   watch([() => pagination.value?.pageSize, () => pagination.value?.currentPage], () => {
      //     dataSource.value.run();
      //   });
      // }
    },
    {
      /**
       * @link https://v3.cn.vuejs.org/api/instance-methods.html#watch
       * @FIXME 优化 pagination 比   props.request 晚一个 tick改变 ， 产生重复渲染*/
      flush: "post",
    }
  );

  return dataSource;
}
