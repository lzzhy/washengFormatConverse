<script lang="tsx">
import { PropType } from "vue";
import { omit } from "lodash-es";
import { ElPagination } from "element-plus";
import { PAGINATION_INNER } from "../hooks";
import { useVModel } from "@vueuse/core";
export default defineComponent({
  name: "Pagination",
  components: {
    ElPagination,
  },
  props: {
    config: {
      type: Object as PropType<PAGINATION_INNER>,
      default: () => ({}),
    },
    pageSize: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const pageSize = useVModel(props, "pageSize", emit);
    const currentPage = useVModel(props, "currentPage", emit);
    return () => {
      console.log("🚀 -> file: Pagination.vue -> line 35 -> Pagination render");
      let bindProps = omit(props.config, ["pageSize", "currentPage", "updateTotal"]);
      return <ElPagination {...bindProps} v-model:pageSize={pageSize.value} v-model:currentPage={currentPage.value} />;
    };
  },
});
</script>

<style scoped></style>
