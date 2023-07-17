/**开启一个计时器 */
export function useCountDown(initValue = 60, { delay = 1000, immediate = false }: { delay?: number; immediate?: boolean } = { delay: 1000, immediate: false }) {
  const count = ref(initValue);
  const active = ref<boolean>(false);
  let intervalId: number | null;

  function restart() {
    destory();
    count.value === initValue;
    resume();
  }
  function destory() {
    active.value = false;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function resume() {
    active.value = true;
    intervalId = setInterval(() => {
      count.value--;
      if (count.value <= 0) {
        destory();
      }
    }, delay);
  }

  function pause() {
    active.value = false;
    if (intervalId) clearInterval(intervalId);
  }

  onUnmounted(() => {
    destory();
  });

  if (immediate) restart();

  return {
    count,
    restart,
    destory,
    resume,
    active,
    pause,
  };
}
