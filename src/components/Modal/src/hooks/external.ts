import { $t } from "@/i18n";
import type { ModalAction } from "./core";
import { MODAL_KEY, ModalState } from "@/components/Modal";

// /**暴露给外面使用的钩子 */
// export const useLinkModel = (state: IMODAL_CHILD) => {
//   defineExpose(state);
// };

/**
 *
 * @returns
 */
export const useStateFromModal = () => {
  const inhrefProps = inject<{ state: ModalState; action: ModalAction }>(MODAL_KEY);
  if (!inhrefProps) {
    throw new Error($t("dangqianbi_7dd87d"));
  }
  const { state, action } = inhrefProps;

  return [state, action] as const;
};
