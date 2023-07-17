import { $t } from "@/i18n";
import { isFunction } from "@/utils";
import copy from "copy-to-clipboard";
import { ElLoadingService, ElMessage } from "element-plus";
import type { Directive } from "vue";
export const vCopy: Directive = {
  mounted(el: HTMLElement, { value }) {
    console.log("🚀 -> file: copy.ts -> line 5 -> mounted -> value", value);
    el.classList.add("cursor-pointer");
    el.addEventListener("click", async () => {
      let result = "";
      if (isFunction(value)) {
        const loading = ElLoadingService({
          fullscreen: true,
          text: $t("zhengzaish_a6e8cd"),
        });
        result = await value();
        loading.close();
      } else {
        result = value;
      }
      copy(result, import.meta.env.PROD ? {} : { debug: true, message: "Press #{key} to copy" });
      ElMessage.success($t("fuzhicheng_20a495"));
    });
  },
};
