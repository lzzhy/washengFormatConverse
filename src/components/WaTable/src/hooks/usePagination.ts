import { Ref } from "vue";
import { BASIC_TABLE_PROPS } from "../types";

export interface PAGINATION_INNER {
  currentPage: number;
  pageSize: number;
  total: number;
  background: boolean;
  layout: string;
  currentChange: (page: number) => void;
  sizeChange: (pageSize: number) => void;
  updateTotal: (e: number) => number;
}
const usePaginationInner = (instance: Ref<any>, { page, size, total } = { page: 1, size: 10, total: 0 }) => {
  instance.value = {
    currentPage: page,
    pageSize: size,
    total: total,
    background: true,
    layout: "total,sizes,prev,pager,next",
    // currentChange: (page: number) => onChange(page),
    // sizeChange: (pageSize: number) => onChange(instance.value.currentPage, pageSize),
    // showTotal: (total: number) => `共 ${total} 条数据`,
    updateTotal: (e: number) => (instance.value.total = e),
  };

  // function onChange(page: number, pageSize?: number) {
  //   if (page !== instance.value.currentPage) instance.value.currentPage = page;
  //   if (pageSize !== undefined && pageSize !== instance.value.pageSize) instance.value.pageSize = pageSize;
  // }
};

export const usePagination = (props: BASIC_TABLE_PROPS) => {
  const instance = ref<null | PAGINATION_INNER>(null);
  watch(
    () => props.pagination,
    () => {
      if (props.pagination === void 0) return;
      if (typeof props.pagination === "boolean") {
        if (props.pagination) {
          usePaginationInner(instance);
        } else {
          instance.value = null;
        }
      } else {
        usePaginationInner(instance, props.pagination);
      }
    }
    // {
    //   flush: "sync",
    // }
  );

  return instance;
};
