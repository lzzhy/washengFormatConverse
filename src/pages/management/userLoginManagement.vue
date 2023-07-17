<template>
  <div v-loading="loading">
    <LayoutContent>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" />
          <el-table-column label="邮箱">
            <template #default="scope">
              {{ scope.row.recipient || "-" }}
            </template>
          </el-table-column>
          <el-table-column label="登录时间">
            <template #default="scope">
              {{ formatter(scope.row.loginTime, "YYYY-MM-DD HH:mm:ss") || "-" }}
            </template>
          </el-table-column>
          <el-table-column label="登录来源">
            <template #default="scope">
              {{ scope.row.source == 0 || scope.row.source ? REGISTER_SOURCE_TYPES[scope.row.source] : "-" }}
            </template>
          </el-table-column>
        </el-table>

        <div class="mt-[20px] flex justify-center">
          <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize" background :page-sizes="[10, 50, 100]" :total="totalCounts" layout=" total,prev, pager,->, next, jumper,sizes " @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </LayoutContent>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { apiUserLoginManageList } from "@/apis";
import LayoutContent from "../layout/index.vue";
import { REGISTER_SOURCE_TYPES } from "@/enums/user";
import { formatter } from "@/utils/index";

const tableData = ref([]);
// 总页数
const totalCounts = ref();
const pagination = reactive({
  // 一页有几条
  pageSize: 10,
  // 当前页
  pageNum: 1,
});

const { run, loading } = useRequest({
  service: apiUserLoginManageList,
  manual: true,
  onSuccess: async (data) => {
    const { userLoginSourceList: dataList, totalCount } = data;
    tableData.value = dataList;
    totalCounts.value = totalCount;
  },
});
onMounted(() => {
  run(pagination);
});

const handleSizeChange = (val: number) => {
  pagination.pageSize = val;
  run(pagination);
};

const handleCurrentChange = (currentPage: number) => {
  pagination.pageNum = currentPage;
  run(pagination);
};
</script>
