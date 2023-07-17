/**如果是函数直接执行，如果是值，直接返回 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function transformToRecord(fnOrData: Function | Recordable | undefined): Promise<Recordable> {
  let result: Recordable;
  if (typeof fnOrData === "function") {
    result = fnOrData();
  } else {
    result = fnOrData ? fnOrData : {};
  }
  return toPromise(result);
}

/**如果是promise直接返回，如果是 值，进行promise包裹 */
export function toPromise(value: Promise<any> | any): Promise<any> {
  if (value instanceof Promise) return value;
  return Promise.resolve(value);
}
