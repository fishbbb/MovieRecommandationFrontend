<template>
  <div>
    <el-card class="qps-container">
      <h2>实时QPS：{{ currentQPS }}</h2>
    </el-card>
    <el-card class="qps-container">
      <h2>查询历史QPS：</h2>
      <el-form :model="queryForm" inline>
        <el-form-item label="起始时间">
          <el-date-picker v-model="queryForm.time_start" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="queryForm.time_end" type="datetime"></el-date-picker>
        </el-form-item>
<!--        <el-form-item label="页码">-->
<!--          <el-input v-model="queryForm.page"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="每页大小">-->
<!--          <el-input v-model="queryForm.page_size"></el-input>-->
<!--        </el-form-item>-->
        <el-button type="primary" @click="getHistoryQPS">查询历史QPS</el-button>
      </el-form>
    </el-card>

    <el-card class="qps-container">
      <h2>历史QPS：</h2>
      <el-table :data="historyQPS" v-if="historyQPS.length > 0">
        <el-table-column label="时间段" prop="time"></el-table-column>
        <el-table-column label="平均QPS" prop="qps"></el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import adminRequest from "@/api/admin";

export default {
  data() {
    return {
      currentQPS: 100, // 假数据
      queryForm: {
        time_start: '',
        time_end: '',
        page: 1,
        page_size: 10
      },
      historyQPS: [] // 假数据
    };
  },
  created() {
    this.fetchCurrentQPS(); // 初始加载
    this.timer = setInterval(() => {
      this.fetchCurrentQPS();
    }, 1000); // 每隔1秒调用一次 fetchCurrentQPS
  },
  unmounted() {
    clearInterval(this.timer); // 组件销毁时清除定时器
  },
  methods: {
    fetchCurrentQPS(){
      //GET security/qps/now
      adminRequest.getCurrentQPS().then(res => {
        this.currentQPS = res.data
        console.log(res.data)
      }).catch(err => {
        console.error(err)
      })
    },
    // 获取历史QPS数据
    async getHistoryQPS() {
      console.log(this.queryForm.time_end+this.queryForm.time_start)
      // 调用接口获取历史QPS数据
      adminRequest.getHistoryQPS(this.queryForm.time_start,this.queryForm.time_end)
          .then(res =>{
              this.historyQPS = res.data
          }).catch(err =>{
            console.log(err)
      })
      // 假数据
      this.historyQPS = [
        { time: '2024-06-06 12:00:00', qps: 80 },
        { time: '2024-06-06 12:01:00', qps: 90 },
        { time: '2024-06-06 12:02:00', qps: 100 }
      ];
    }
  }
};
</script>

<style>
.qps-container{
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>