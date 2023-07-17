import { default as _dayjs } from "dayjs";
import toObject from "dayjs/plugin/toObject";
_dayjs.extend(toObject);

export const timeCompare = function (date1: Date | string, date2: Date | string): boolean {
  return dayjs(date2).isAfter(dayjs(date1));
};
export const formatter = function (date: Date | string, format = "YYYY-MM-DD"): string {
  return dayjs(date).format(format);
};

// 两日期之间相隔天数
export const differenceDays = function (date: Date | string): any {
  const dayJsTime = dayjs(`${new Date()}`).format("YYYY-MM-DD");
  return dayjs(date).diff(dayJsTime, "day");
};

// 从某天往后开始计算的几天之后的日期
export const arriveDate = function (date: Date | string, day: number): any {
  return dayjs(date).add(day, "day").format("YYYY-MM-DD");
};

export const dayjs = _dayjs;
