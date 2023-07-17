<template>
  <div class="send-code flex items-center">
    <template v-for="(item, index) in code" :key="index">
      <span v-if="index !== 0" class="send-code__line"></span>
      <input
        :ref="
          (el) => {
            if (el) inputRef[index] = el as HTMLInputElement;
          }
        "
        v-model="item.value"
        class="send-code__input"
        type="tel"
        maxlength="1"
        @input="onInput(index)"
        @keyup.delete="onDelete(index)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { checkNumber } from "@/utils/regexp";
const CODE_LENGTH = 4;
const codeArray = Array.from({ length: CODE_LENGTH });
const code = ref(codeArray.map((_) => ({ value: "" })));
const inputRef = ref<HTMLInputElement[]>([]);

const emit = defineEmits(["change", "done"]);
const onInput = (index: number) => {
  const val = code.value[index].value;
  if (val && !checkNumber(val)) {
    code.value[index].value = "";
    inputRef.value[index]?.focus();
    return;
  }
  if (val && index < CODE_LENGTH) {
    inputRef.value[index + 1]?.focus();
    emit("change", code.value.map((c) => c.value).join(""));
  }
  if (index === CODE_LENGTH - 1) {
    emit("done", code.value.map((c) => c.value).join(""));
  }
};
const onDelete = (index: number) => {
  const val = code.value[index].value;
  if (val) {
    code.value[index].value = "";
  } else {
    code.value[index].value = "";
  }
  if (index > 0 && index < 4) {
    inputRef.value[index - 1]?.focus();
    emit("change", code.value.map((c) => c.value).join(""));
  } else {
    inputRef.value[index]?.focus();
    emit("change", code.value.map((c) => c.value).join(""));
  }
};

onMounted(() => {
  inputRef.value[0]?.focus();
});
</script>

<style lang="scss" scoped>
.send-code {
  &__input {
    width: 40px;
    height: 40px;
    outline: none;
    text-align: center;
    font-size: 27px;
    font-weight: 500;
    color: #000;
    padding: 6px;
    border-bottom: 1px solid #000;
  }

  &__line {
    width: 7px;
    height: 2px;
    background: #000;
    border-radius: 1px;
    margin: 0 30px;
  }
}
</style>
