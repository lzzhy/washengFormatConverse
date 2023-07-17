/**
 * 解决await的错误捕获
 * @template T
 * @param { Promise<T> } promise
 * @returns {Promise<[ null | Error, T ]> }
 *  const [err, data] = await fetchData().then(data => [null, data] ).catch(err => [err, null])
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function awaitWrap<T>(promise: Promise<T>): Promise<readonly [null, T] | readonly [any, null]> {
  return promise
    .then((data) => [null, data] as const)
    .catch((err) => {
      console.log(888, err);
      return [err, null] as const;
    });
}

/**
 * 数组根据某个属性进行分组
 */
export function groupBy<T>(array: T[], key: keyof T): T[][] {
  const groups: T[][] = [];
  array.forEach((item) => {
    const group = groups.find((group) => group[0][key] === item[key]);
    if (group) {
      group.push(item);
    } else {
      groups.push([item]);
    }
  });
  return groups;
}

/**数组根据某个属性排序 降序 升序 */
export function sortBy<T>(array: T[], key: keyof T, order: "desc" | "asc" = "desc"): T[] {
  return array.sort((a, b) => {
    if (a[key] < b[key]) {
      return order === "desc" ? 1 : -1;
    }
    if (a[key] > b[key]) {
      return order === "desc" ? -1 : 1;
    }
    return 0;
  });
}

/**字符串 根据 固定长度 拆解 */
export function splitByLength(str: string, length: number): string[] {
  const result: string[] = [];
  let start = 0;
  while (start < str.length) {
    result.push(str.substr(start, length));
    start += length;
  }
  return result;
}

/**更新对象，只更新存在的键值对 */
export function updateObj(a: object, b: object) {
  Object.assign(a, b);
}

/**promise实现一个队列的，执行栈 */
export async function promiseQueue(...args: any[]) {
  if (args.length <= 0) return;
  const currentAction = args.shift();
  try {
    await currentAction();
  } catch (error) {
    //   debugger;
    throw error;
  }
  await promiseQueue(...args);
  // for await (const iterator of args) {
  //   await iterator();
  // }
}

/** 获取文件后缀
 * @example
 * formatterTimeToMinute("fifteen.mp3") => "mp3";
 */
export const getSuffix = (str = "") => {
  // try {
  // return str.match(/(?<=\.)([a-z]+)$/i)[0];
  // } catch (error) {
  if (!str) return;
  const index = str.length - str.lastIndexOf(".") - 1;
  return str.substr(-1 * index);
  // }
};

/**
 * 下载录音文件
 * @private
 * @param {*} src      src
 * @param {string} name 下载的文件名
 * @param {string} type 下载的文件后缀
 */
export function download(src: string, name: string, type: string): void {
  const oA = document.createElement("a");

  oA.href = src;
  oA.download = `${name}.${type}`;
  oA.click();
}
