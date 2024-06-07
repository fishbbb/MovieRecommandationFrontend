<template>
  <div>
    <el-card class="security-content">
      <div class="header">流量日志列表</div>
      <el-table
          :data="trafficLogs"
          style="width: 100%"
          stripe>
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="userIp" label="用户IP"></el-table-column>
        <el-table-column prop="api" label="调用接口"></el-table-column>
        <el-table-column prop="success" label="响应是否成功"></el-table-column>
      </el-table>
    </el-card>

    <el-card class="security-content">
      <div class="header">异常IP列表</div>
      <el-tag v-for="ip in abnormalIps" :key="ip" type="danger">{{ ip }}</el-tag>
    </el-card>

    <el-card class="security-content">
      <div class="header">当前服务器组健康状态</div>
      <p v-for="(state, index) in serverStates" :key="index">{{ state }}</p>
    </el-card>
  </div>
</template>

<script>
import adminRequest from "@/api/admin";
export default {
  data() {
    return {
      trafficLogs: [
        { userId: 1, userIp: '192.168.1.1', api: '/api/user', success: true },
        { userId: 2, userIp: '192.168.1.2', api: '/api/product', success: false },
        { userId: 3, userIp: '192.168.1.3', api: '/api/order', success: true },
      ],
      abnormalIps: ['192.168.1.10', '192.168.1.20', '192.168.1.30'],
      serverStates: ['Server A: Online', 'Server B: Offline', 'Server C: Online', 'Server D: Online'],
      // trafficLogs: [],
      // abnormalIps: [],
      // serverStates: []
    }
  },
  created() {
    // 在页面创建时获取数据并填充到对应的数组中
    this.fetchTrafficLogs();
    this.fetchAbnormalIps();
    this.fetchServerStates();
  },
  methods:{
    fetchTrafficLogs() {
      // 调用 GET /security/logs 接口，获取流量日志列表数据
      // 填充到 this.trafficLogs 中
      adminRequest.getLogs().then(res => {
       this.trafficLogs = res.data
      }).catch(err => {
        console.error(err)
      })
    },
    fetchAbnormalIps() {
      // 调用 GET /security/abnormal-ips 接口，获取异常IP列表数据
      // 填充到 this.abnormalIps 中
      adminRequest.getAbnormalIp().then(res => {
        this.abnormalIps = res.data
      }).catch(err => {
        console.error(err)
      })
    },
    fetchServerStates() {
      // 调用 GET /security/server-state/now 接口，获取当前服务器组健康状态数据
      // 填充到 this.serverStates 中
      adminRequest.getServerState().then(res => {
        this.serverStates = res.data
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style>
.security-content{
  margin-bottom: 20px;
}
</style>