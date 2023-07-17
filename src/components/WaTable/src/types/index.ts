import { Options as RequestOptions } from "../hooks/useRequest";

export interface FORM_ACTION_TYPE {
  name: string;
}

export enum PAGINATION {
  PAGE = "current",
  SIZE = "size",
  TOTAL = "total",
}

/**表格的请求参数 默认参数+搜索条件+分页 */
export type FEATCH_PARAMS = Recordable & { [PAGINATION.PAGE]: number; [PAGINATION.SIZE]: number };

/**表格的定义入参 */
export interface BASIC_TABLE_PROPS<TData = any, TParams = any> {
  /**接口请求 */
  request: RequestOptions<TData, TParams>;
  /**列表 */
  columns: any;
  /**搜索条件 */
  formConfig?: any;
  /**分页 */
  pagination?: boolean | { page: number; size: number; total: number };
}

/**表格的操作方法 */
export interface TABLE_ACTION_TYPE<TData, TParams> {
  /**重新加载表格数据 */
  reload: (opt?: TParams & FEATCH_PARAMS) => Promise<TData>;
  /**更新prosp属性 */
  setProps(props: Partial<BASIC_TABLE_PROPS>): void;
  /**获取当前表格内的数据 */
  getTableData(): TData;
}

// export interface USE_TABLE_DEFINE {
//   <TData, TParams>(tableProps: BASIC_TABLE_PROPS): [(instance: TABLE_ACTION_TYPE<TData, TParams>, formInstance: Recordable) => void, TABLE_ACTION_TYPE<TData, TParams>];
// }

/**表格数据源的刷新来源
 * 搜索条件触发成功后，刷新表格数据
 *      触发情况：
 *            1. 搜索条件发生变化
 *            2. 点击搜索按钮
 *            3. keyup事件触发
 * 分页触发成功后，刷新表格数据
 * [手动]列表操作触发成功后，刷新表格数据
 */
export enum TABLE_REFRESH_SOURCE {}

/**表格列的定义 */
export interface TABLE_COLUMN<TData extends object = any> {
  label?: string;
  prop?: keyof TData;
  customRender?: ((text: any, Recordable: TData) => any) | ((Recordable: TData) => any);
  slot?: string;
  width?: string | number;
  defaultValue?: string;
  search?: ComponentName | any;
}
