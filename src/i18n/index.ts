import { createI18n } from "vue-i18n";
import zh from "./zh.json";
const modules = import.meta.glob("./*.json");
const css = import.meta.glob("./*.css");

export type Local = "zh-cn" | "en" | "ja";

const loadedLanguages: Local[] = [];

const i18n = createI18n({
  legacy: false,
  locale: "",
  // messages: {
  //   zh,
  // },
});

export function setI18nLanguage(lang: Local) {
  const bodyClassName = document.body.className;
  if (/^lang_.*/.test(bodyClassName)) {
    const newbodyClassName = bodyClassName.replace(/^lang_.*/, `lang_${lang}`);
    document.body.className = newbodyClassName;
  } else {
    document.body.className += ` lang_${lang}`;
  }
  i18n.global.locale.value = lang;
  return lang;
}

export async function loadLanguageAsync(lang: Local) {
  if (i18n.global.locale.value !== lang) {
    if (!loadedLanguages.includes(lang)) {
      css[`./${lang}.css`]?.();
      const messages = await modules[`./${lang}.json`]?.();
      if (messages) {
        // 动态加载语言包：使用 i18n.setLocaleMessage(locale, messages) 方法动态加载语言包，其中 locale 是语言代码，messages 是语言包
        i18n.global.setLocaleMessage(lang, messages as Record<string, string>);
        loadedLanguages.push(lang);
        return setI18nLanguage(lang);
      }
    }
    return Promise.resolve(setI18nLanguage(lang));
  }
  return Promise.resolve(lang);
}

export function $t(...rest: any[]) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return i18n.global.t(...rest);
}

export default i18n;
