import { $t } from "@/i18n";
import { ElMessage, ElMessageBox } from "element-plus";

interface MessageContext {
  title?: string;
  message?: string;
  type?: "warn" | "error" | "success" | "info";
}
export const useMessage = () => {
  return {
    createErrorModal(context: MessageContext) {
      ElMessageBox.alert(context.message, $t("cuowuxiaox_98d346"));
    },
    error(context: MessageContext) {
      ElMessage.error({
        message: context.message,
      });
      console.error(context.message);
    },
    createMessage(context: MessageContext) {
      ElMessage.error({
        message: context.message,
      });
      console.error(context.message);
    },
  };
};
