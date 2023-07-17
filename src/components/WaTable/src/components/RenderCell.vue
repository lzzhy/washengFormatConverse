<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["scope", "item"],
  setup(props) {
    if (props.item.customRender) {
      /**收集依赖 防止数据变化 视图没有刷新 */
      const render = computed(() => {
        let args = [props.scope];
        /**如果当前指定了 键值对 那么第一个参数为 对应的值，否则为整个数据对象 */
        if (props.item.prop) {
          args.unshift(props.scope.row[props.item.prop]);
        }
        return props.item.customRender(...args);
      });

      return () => render.value;
    }
    return () => <span>{props.scope.row[props.item.prop] ?? props.item.defaultValue}</span>;
  },
});
</script>
