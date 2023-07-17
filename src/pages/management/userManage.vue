<template>
  <div>
    <LayoutContent>
      <div>
        <div class="mb-[20px] flex justify-end">
          <el-button type="primary" @click="handleToExcel">导出Excel</el-button>
        </div>

        <el-form :inline="true" :model="formInline" class="mb-[30px]">
          <el-form-item label="用户名">
            <el-input v-model="formInline.name" clearable placeholder="请输入" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formInline.email" clearable placeholder="请输入" />
          </el-form-item>
          <el-form-item label="注册来源">
            <el-select v-model="formInline.registerType" clearable placeholder="请选择">
              <el-option v-for="item in REGISTER_SOURCE_ARRAY" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker v-model="formInline.regTime" type="daterange" range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" />
          </el-form-item>
          <el-form-item label="登录时间">
            <el-date-picker v-model="formInline.loginTime" type="daterange" range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit">查询</el-button>
            <el-button @click="handleReset">清空</el-button>
          </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="tableData" style="width: 100%">
          <!-- column的方式 -->
          <!-- <el-table-column v-for="item in columns" :key="item.key" :label="item.title">
            <template #default="scope">
              {{ scope.row[item.dataIndex] || "-" }}
            </template>
          </el-table-column> -->
          <el-table-column type="index" />
          <el-table-column label="用户名" width="200">
            <template #default="scope">
              {{ scope.row.name || "-" }}
            </template>
          </el-table-column>
          <el-table-column label="邮箱">
            <template #default="scope">
              {{ scope.row.email || "-" }}
            </template>
          </el-table-column>
          <el-table-column label="登录时间" width="160">
            <template #default="scope">
              {{ scope.row.loginTime || "-" }}
            </template>
          </el-table-column>
          <el-table-column label="注册来源">
            <template #default="scope">
              {{ scope.row.registerType == 0 || scope.row.registerType ? REGISTER_SOURCE_TYPES[scope.row.registerType] : "-" }}
            </template>
          </el-table-column>
          <el-table-column label="注册时间" width="160">
            <template #default="scope">
              {{ scope.row.registerTime || "-" }}
            </template>
          </el-table-column>
          <el-table-column label="注册IP">
            <template #default="scope">
              {{ scope.row.registerIp || "-" }}
            </template>
          </el-table-column>
        </el-table>

        <div class="mt-[20px] flex justify-center">
          <el-pagination v-model:current-page="pagination.current" v-model:page-size="pagination.size" background :page-sizes="[10, 50, 100]" :total="totalCount" layout=" total,prev, pager,->, next, jumper,sizes " @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </LayoutContent>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { apiUserManageList } from "@/apis";
import LayoutContent from "../layout/index.vue";
import { exportExcel } from "@/utils/tableToExcel";
import { REGISTER_SOURCE_TYPES, REGISTER_SOURCE_ARRAY } from "@/enums/user";
import { formatter } from "@/utils/index";

const tableData = ref([]);
const totals = ref();
// 总页数
const totalCount = ref(0);
const pagination = reactive({
  // 一页有几条
  size: 10,
  // 当前页
  current: 1,
  type: 0,
});
const formInline = reactive({
  name: "",
  registerType: "",
  email: "",
  regTime: "",
  loginTime: "",
});

// const columns = ref([
//   {
//     title: "姓名",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "邮箱",
//     dataIndex: "email",
//     key: "email",
//   },
//   {
//     title: "住址",
//     dataIndex: "address",
//     key: "address",
//   },
// ]);

const { run, loading } = useRequest({
  service: apiUserManageList,
  manual: true,
  onSuccess: async (data) => {
    const { records: dataList, total } = data;
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
    ...formInline,
    regStartTime: formInline.regTime ? formatter(formInline.regTime[0], "YYYY-MM-DD 00:00") : null,
    regEndTime: formInline.regTime ? formatter(formInline.regTime[1], "YYYY-MM-DD 24:00") : null,
    loginStartTime: formInline.loginTime ? formatter(formInline.loginTime[0], "YYYY-MM-DD 00:00") : null,
    loginEndTime: formInline.loginTime ? formatter(formInline.loginTime[1], "YYYY-MM-DD 24:00") : null,
  };
  delete params.regTime;
  delete params.loginTime;
  run(params);
};

const handleSizeChange = (val: number) => {
  pagination.size = val;
  handleFetch();
};

const handleCurrentChange = (currentPage: number) => {
  pagination.current = currentPage;
  handleFetch();
};

const handleToExcel = () => {
  // 处理表头
  const head = {
    name: "用户名",
    registerType: "注册来源",
    email: "邮箱",
    registerIp: "注册IP",
    registerTime: "注册时间",
    loginTime: "登录时间",
  };
  const list = tableData.value.map((item: any) => {
    const obj = {};
    for (const k in item) {
      if (head[k]) {
        obj[head[k]] = item[k];
      }
    }
    return {
      ...obj,
      注册来源: item.registerType == 0 || item.registerType ? REGISTER_SOURCE_TYPES[item.registerType] : "-",
    };
  });
  exportExcel(list, "用户列表");
};

const handleSubmit = () => {
  pagination.current = 1;
  handleFetch();
};

const handleReset = () => {
  formInline.name = "";
  formInline.registerType = "";
  formInline.email = "";
  formInline.regTime = "";
  formInline.loginTime = "";

  pagination.current = 1;
  pagination.size = 10;
  handleFetch();
};
</script>
