<template>
  <div>
    <LayoutContent>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="always">本月总共访问的人数: {{ totals }}人</el-card>
        </el-col>
      </el-row>
    </LayoutContent>

    <LayoutContent>
      <div>
        <el-form :inline="true" :model="formInline" class="mb-[30px]">
          <el-form-item label="日期">
            <el-date-picker v-model="formInline.date" type="date" placeholder="请选择" />
          </el-form-item>
          <el-form-item label="地区">
            <el-select v-model="formInline.region" clearable placeholder="请选择">
              <el-option label="cc" value="cc" />
              <el-option label="us" value="us" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">查询</el-button>
            <el-button @click="handleReset">清空</el-button>
          </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="tableData" :border="parentBorder" style="width: 100%" :row-key="getRowKeys" :expand-row-keys="expands" @expand-change="handleExpandChange">
          <el-table-column type="expand">
            <template #default="props">
              <div v-loading="detailLoading" m="4">
                <el-table :data="detailTableData" :border="childBorder" style="border: 1px solid #e5e7eb; max-height: 400px; overflow: auto; width: 90%; margin-left: 58px">
                  <el-table-column label="用户名">
                    <template #default="scope">
                      {{ scope.row.userInfo.name || "-" }}
                    </template>
                  </el-table-column>
                  <el-table-column label="访问时间">
                    <template #default="scope">
                      {{ scope.row.addTime || "-" }}
                    </template>
                  </el-table-column>
                  <el-table-column label="访问平台">
                    <template #default="scope">
                      {{ scope.row.platform || "-" }}
                    </template>
                  </el-table-column>
                  <el-table-column label="访问地区">
                    <template #default="scope">
                      {{ scope.row.region || "-" }}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="用户名称">
            <template #default="scope">
              {{ scope.row.userName || "-" }}
            </template>
          </el-table-column>
          <el-table-column label="电子邮件">
            <template #default="scope">
              {{ scope.row.email || "-" }}
            </template>
          </el-table-column>
          <el-table-column label="最后更新时间">
            <template #default="scope">
              {{ scope.row.addTime || "-" }}
            </template>
          </el-table-column>
          <el-table-column label="访问次数">
            <template #default="scope">
              {{ scope.row.visitCount || "-" }}
            </template>
          </el-table-column>
          <el-table-column label="访问平台">
            <template #default="scope">
              {{ scope.row.platforms.length > 0 ? scope.row.platforms.join(",") : "-" }}
            </template>
          </el-table-column>
          <el-table-column label="注册来源">
            <template #default="scope">
              {{ scope.row.registerType == 0 || scope.row.registerType ? REGISTER_SOURCE_TYPES[scope.row.registerType] : "-" }}
            </template>
          </el-table-column>
          <el-table-column label="访问地区">
            <template #default="scope">
              {{ scope.row.regions.length > 0 ? scope.row.regions.join(",") : "-" }}
            </template>
          </el-table-column>
        </el-table>

        <div class="mt-[20px] flex justify-center">
          <el-pagination v-model:current-page="pagination.pageNo" v-model:page-size="pagination.pageSize" background :page-sizes="[10, 50, 100]" :total="totalCount" layout=" total,prev, pager,->, next, jumper,sizes " @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </LayoutContent>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import { apiGetMAU, apiGetMAUDetail } from "@/apis";
import { formatter } from "@/utils/index";
import LayoutContent from "../layout/index.vue";
import { REGISTER_SOURCE_TYPES } from "@/enums/user";

const parentBorder = ref(false);
const childBorder = ref(false);

const totals = ref();
const tableData = ref([]);
const pagination = reactive({
  // 一页有几条
  pageSize: 10,
  // 当前页
  pageNo: 1,
});
// 总页数
const totalCount = ref(0);

const userId = ref();
const detailTableData = ref([]);

const expands = ref([]);

const formInline = reactive({
  date: "",
  region: "",
});

const ruleFormRef = ref<FormInstance>();

const getRowKeys = (row: any) => {
  return row.userId;
};

const handleExpandChange = (row: any, rows: any) => {
  userId.value = row.userId;
  detailTableData.value = [];
  // 处理展开一行，其他行收起
  if (rows.length) {
    expands.value = [];
    if (row) {
      expands.value.push(row.userId);
      detailRun({
        id: row.userId,
      });
    }
  } else {
    expands.value = [];
  }
};

const { run, loading } = useRequest({
  service: apiGetMAU,
  manual: true,
  onSuccess: async (data) => {
    const { data: dataList, total } = data;
    totals.value = total;
    tableData.value = dataList;

    totalCount.value = total;
  },
});
onMounted(() => {
  handleFetch();
});

const handleFetch = () => {
  const params = {
    ...pagination,
    date: formInline.date ? formatter(formInline.date, "YYYY-MM-DD") : "",
    region: formInline.region,
  };
  run(params);
};

const handleCurrentChange = (currentPage: number) => {
  pagination.pageNo = currentPage;
  handleFetch();
};

const { run: detailRun, loading: detailLoading } = useRequest({
  service: apiGetMAUDetail,
  manual: true,
  onSuccess: async (data) => {
    detailTableData.value = data;
  },
});

const handleSizeChange = (val: number) => {
  pagination.pageSize = val;
  handleFetch();
};
const handleSubmit = () => {
  console.log(2222, formatter(formInline.date, "YYYY-MM-DD"));
  pagination.pageNo = 1;
  handleFetch();
};

const handleReset = () => {
  formInline.date = "";
  formInline.region = "";

  pagination.pageNo = 1;
  pagination.pageSize = 10;
  handleFetch();
};
</script>
