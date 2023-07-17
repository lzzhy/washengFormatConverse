<template>
  <div class="send-code flex items-center border border-solid border-[#e3e3e3] bg-[#fafafa]">
    <template v-for="(item, index) in code" :key="index">
      <span v-if="[3, 6].includes(index)" class="send-code__line"></span>
      <span class="send-code__wrap" :class="{ 'is-input': !isEmpty(item.value) }">
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
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { isEmpty } from "@/utils";
import { checkNumber } from "@/utils/regexp";

const props = defineProps<{
  modelValue: string;
  // 邀请码长度
  codeLength?: number;
}>();

const CODE_LENGTH = 10;
const codeArray = Array.from({ length: props.codeLength ?? CODE_LENGTH });
const code = ref(codeArray.map((_) => ({ value: "" })));
const inputRef = ref<HTMLInputElement[]>([]);

const emit = defineEmits(["change", "done", "update:modelValue"]);
const onInput = (index: number) => {
  const val = code.value[index].value;
  if (val && !checkNumber(val)) {
    code.value[index].value = "";
    inputRef.value[index]?.focus();
    return;
  }

  if ((val && index < CODE_LENGTH) || (val && index < (props.codeLength ?? CODE_LENGTH))) {
    inputRef.value[index + 1]?.focus();
    emit("change", code.value.map((c) => c.value).join(""));
    emit("update:modelValue", "");
  }
  if (index === CODE_LENGTH - 1 || index === (props.codeLength ?? CODE_LENGTH) - 1) {
    let result = code.value.map((c) => c.value).join("");
    emit("done", result);
    emit("update:modelValue", result);
  }
};
const onDelete = (index: number) => {
  const val = code.value[index].value;
  if (val) {
    code.value[index].value = "";
  } else {
    if (index > 0) {
      code.value[index - 1].value = "";
    }
  }
  if (index > 0) {
    inputRef.value[index - 1]?.focus();
    emit("change", code.value.map((c) => c.value).join(""));
    emit("update:modelValue", "");
  }
};

// function handleFocus(index:number) {

// }

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
    background-color: transparent;
    position: relative;
    z-index: 1;
    // border-bottom: 1px solid #000;
    // position: relative;
    // z-index: 1;
    // &::after {
    //   content: " ";
    //   position: absolute;
    //   width: 10px;
    //   height: 10px;
    //   border-radius: 100%;
    //   background-color: #eee;
    //   top: 50%;
    //   left: 50%;
    //   transform: translate(-50%, -50%);
    // }
  }
  &__wrap {
    position: relative;
    &::before {
      content: " ";
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background-color: #d2d2d2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.is-input {
      &::before {
        display: none;
      }
    }
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
