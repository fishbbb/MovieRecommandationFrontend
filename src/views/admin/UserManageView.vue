<template>
  <div>
    <el-card>
      <div class="header">用户管理</div>
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="userID" label="用户ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="发表评论">
          <template #default="{row}">
            <el-switch v-model="row.canComment" active-text="是" inactive-text="否"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否被禁用">
          <template #default="{row}">
            <el-switch v-model="row.isBanned" active-text="是" inactive-text="否"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [
        { userID: '123456', username: 'User1', canComment: true, isBanned: false },
        { userID: '789012', username: 'User2', canComment: true, isBanned: false },
        { userID: '345678', username: 'User3', canComment: true, isBanned: true },
      ]
    };
  }
}
</script>