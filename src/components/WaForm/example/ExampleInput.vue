<template>
  wqewqewqeqw<input v-model="test" type="primary" link @input="onInput" />

  <!-- // <input type="file" onchange=""></input> -->
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const test = ref<string>("");

    watch(
      () => props.modelValue,
      () => {
        test.value = props.modelValue;
      }
    );

    function onInput(e: any) {
      test.value = e.target.value;
      emit("update:modelValue", test.value);
      emit("change", test.value);
    }

    return {
      test,
      onInput,
    };
  },
});
</script>
