<script lang="ts">
/* icon组件
 * @Author: lich
 * @Date: 2022-02-16 13:31:42
 * @Last Modified by: lich
 * @Last Modified time: 2022-04-06 18:05:19
 * @example
 * <Icon name=''></Icon>
 */
//https://segmentfault.com/a/1190000039255368?utm_source=sf-similar-article
//https://github.com/JetBrains/svg-sprite-loader/issues/434
import { computed, CSSProperties, defineComponent, PropType } from "vue";
import { ICON_TAG_NAME } from "./icons";
export default defineComponent({
  name: "Icon",
  props: {
    name: {
      type: String as PropType<ICON_TAG_NAME>,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.name}`);
    const svgClass = computed(() => {
      if (props.name) {
        return `el-icon icon-${props.name}`;
      }
      return "el-icon";
    });

    const svgStyle = computed(() => {
      let styles: CSSProperties = {};
      if (props.color) {
        styles.color = props.color;
      }
      if (props.size) {
        styles.fontSize = props.size;
      }
      return styles;
    });
    return {
      iconName,
      svgClass,
      svgStyle,
    };
  },
});
</script>

<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ ...svgStyle }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style lang="scss">
// .svg-icon {
//   display: inline-block;
//   width: 1em;
//   height: 1em;
//   fill: currentColor;
//   vertical-align: middle;
// }
</style>
