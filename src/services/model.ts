import { $t } from "@/i18n";
import type { FormItemRule } from "element-plus";
/**@deprecated  */
export class BaseFormModel {
  static rules: { [key: string]: FormItemRule[] };
  static nameMap: Map<string, string>;
  static getRules() {
    return this.rules;
  }
  static getFieldRules(name: string) {
    return this.rules[name];
  }
  static getFileName(fieldKey: string) {
    return this.nameMap.get(fieldKey);
  }
}

export class SchemaFactory {
  static createRulesForClass(params: any): { [key: string]: FormItemRule[] } {
    // return params.rules;
    // clone  prevent  user manual modify rule efrulefect static
    return Object.keys(params.rules).reduce((prev, item) => {
      prev[item] = [...params.rules[item]];
      return prev;
    }, {} as { [key: string]: FormItemRule[] });
  }
}

export interface IProp {
  required: boolean;
  label: string;
  message: string;
  validate: FormItemRule[] | FormItemRule;
}
/*组合 label rule属性*/
export function Prop(params: Partial<IProp>) {
  return function Output(target: any, propertyKey: string) {
    if (params.label) label(params.label)(target, propertyKey);

    if (params.validate) {
      let validate = params.validate;
      /**hack array */
      if (!Array.isArray(validate)) {
        validate = [validate];
      }
      /**is reuqired in define */
      if (!validate.find((item) => item.required) && params.required) {
        validate.unshift({ required: true, message: params.message || "" });
      }

      rule(params.validate)(target, propertyKey);
    } else if (params.required) {
      rule([{ required: true, message: params.message || "" }])(target, propertyKey);
    }
  };
}

export function label(label: string) {
  return function Output(target: any, propertyKey: string) {
    const staticProps = target.constructor;
    const nameMap: Map<string, string> = staticProps.nameMap || (staticProps.nameMap = new Map());
    nameMap.set(propertyKey, label);
    Object.defineProperty(staticProps, `${propertyKey}Label`, {
      enumerable: false,
      get() {
        return label;
      },
    });
  };
}

export function rule(validate?: FormItemRule[] | FormItemRule) {
  if (!validate) validate = [{ required: true }];
  if (!Array.isArray(validate)) validate = [validate];
  return function Output(target: any, propertyKey: string) {
    const staticProps = target.constructor;
    if (!Array.isArray(validate)) return;
    const rules = staticProps.rules || (staticProps.rules = {});
    validate.forEach((v) => {
      if (v.required === undefined || v.validator === undefined) {
        v.required = true;
      }
      if (!v.message && !v.validator) {
        v.message = $t("bunengweik_f9f6d0", [staticProps.nameMap ? staticProps.nameMap.get(propertyKey) : propertyKey]);
      }
    });
    rules[propertyKey] = validate;
    // rules[fieldKey] = [{ required: true, message: `${params}不能为空` }]
  };
}
