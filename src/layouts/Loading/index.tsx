import { defineComponent, defineAsyncComponent } from "vue";
import Loading from "./Wrapper.vue";
export const wrapperAsyncComponent = (asyncCompoent: any) => {
  const Async = defineAsyncComponent(asyncCompoent);
  return defineComponent({
    render() {
      return (
        <Loading>
          <Async></Async>
        </Loading>
      );
    },
  });
};
