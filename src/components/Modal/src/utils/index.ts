/**
 * @param a
 * @param b
 * @desc
 * 如果 键值在 a和b中 都存在， 则采用b的 否者采用a
 */
export const mergeObj = (a: object, b: object) => {
  const result: typeof a & typeof b = {};
  for (const key of [...Object.keys(a), ...Object.keys(b)]) {
    if (b[key] !== undefined && b[key] !== null) {
      result[key] = b[key];
    } else {
      result[key] = a[key];
    }
  }
  return result as any;
};
