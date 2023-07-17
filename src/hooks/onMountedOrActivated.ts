import { nextTick, onMounted, onActivated } from "vue";

// eslint-disable-next-line @typescript-eslint/ban-types
export function onMountedOrActivated(hook: Function) {
  let mounted: boolean;

  onMounted(() => {
    hook();
    nextTick(() => {
      mounted = true;
    });
  });

  onActivated(() => {
    if (mounted) {
      hook();
    }
  });
}
