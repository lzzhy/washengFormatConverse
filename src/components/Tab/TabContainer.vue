<script lang="tsx">
import { PropType } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<{ label: any; value: any }[]>,
      required: true,
    },
    tag: {
      type: String,
      default: "ul",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { slots, emit }) {
    const handleActive = (value: any) => {
      emit("update:modelValue", value);
      emit("change");
    };

    const opts = computed(() => {
      let { options, modelValue } = props;

      return toRaw(options).map((item) => ({
        ...item,
        active: modelValue === item.value,
      }));
    });

    return () => {
      let { tag } = props;

      return h(tag, {}, slots.default!({ options: opts.value, handleActive }));
    };
  },
});
</script>

<style scoped></style>
