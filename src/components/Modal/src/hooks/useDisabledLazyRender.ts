// export const useDisabledLazyRender = () => {
//   const modalInstance = ref<InstanceType<typeof import("element-plus")["ElDialog"]>>();
//   console.log("🚀 -> file: useDisabledLazyRender.ts -> line 6 -> watch -> getCurrentInstance()", getCurrentInstance());

//   watch(modalInstance, () => {
//     if (modalInstance.value) {
//       console.log("🚀 -> file: useDisabledLazyRender.ts -> line 5 -> onMounted -> modalInstance.value", modalInstance.value);
//       modalInstance.value.rendered = true;
//     }
//   });

//   return [modalInstance];
// };
