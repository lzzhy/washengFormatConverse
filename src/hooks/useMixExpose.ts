export const useMixExpose = (exposed: Recordable) => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(`expose() should be called in setup`);
  }
  instance.exposed = exposed || {};
};
