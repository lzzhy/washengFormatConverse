<template>
  <div v-loading="loading">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="message" label="报错信息" width="300"> </el-table-column>
      <el-table-column prop="pageUrl" label="报错页面"> </el-table-column>
      <el-table-column prop="time" label="报错时间" width="150">
        <template #default="scope">
          <span>{{ scope.row.time ? formatter(scope.row.time, "YYYY-MM-DD hh:mm:ss") : scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="apikey" label="项目编号"> </el-table-column>
      <el-table-column prop="userId" label="用户id"> </el-table-column>
      <el-table-column prop="sdkVersion" label="SDK版本"> </el-table-column>
      <el-table-column prop="deviceInfo" label="浏览器信息">
        <template #default="scope">
          <span>{{ scope.row.deviceInfo?.browser }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="deviceInfo" label="操作系统">
        <template #default="scope">
          <span>{{ scope.row.deviceInfo?.os }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="recordScreenId" label="还原错误代码" width="100">
        <template #default="scope">
          <el-button v-if="scope.row.type == 'error' || scope.row.type == 'unhandledrejection'" type="primary" @click="revertCode(scope.row)">查看源码</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="recordScreenId" label="播放录屏" width="100">
        <template #default="scope">
          <el-button v-if="scope.row.recordScreenId" type="primary" @click="playRecord(scope.row.recordScreenId)">播放录屏</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="breadcrumb" label="用户行为记录" width="125">
        <template #default="scope">
          <el-button v-if="scope.row.breadcrumb" type="primary" @click="revertBehavior(scope.row)">查看用户行为</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="mt-[20px] flex justify-center">
      <el-pagination v-model:current-page="pagination.pageNo" background layout="prev, pager, next" :page-size="pagination.pageSize" :total="totalCount" @current-change="handleCurrentChange"> </el-pagination>
    </div>
  </div>

  <el-dialog v-model:visible="revertdialog" :title="dialogTitle" :class="{ 'revert-disalog': fullscreen }" top="10vh" :fullscreen="fullscreen" width="90%" :destroy-on-close="true">
    <div v-if="dialogTitle != '查看用户行为'" id="revert" ref="revert"></div>
    <el-timeline v-else>
      <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :color="activity.color" :timestamp="format(activity.time)">
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<script lang="ts" setup>
import { apiReportList } from "@/apis";
import { formatter } from "@/utils/index";
const tableData = ref([]);
const pagination = reactive({
  // 一页有几条
  pageSize: 5,
  // 当前页
  pageNo: 1,
});
// 总页数
const totalCount = ref(0);

const { run, loading } = useRequest({
  service: apiReportList,
  manual: true,
  onSuccess: async (data) => {
    const { data: dataList, total } = data;
    tableData.value = dataList;
    totalCount.value = total;
  },
});
onMounted(() => {
  run(pagination);
});

const handleCurrentChange = (currentPage: number) => {
  pagination.pageNo = currentPage;
  run(pagination);
};
</script>
