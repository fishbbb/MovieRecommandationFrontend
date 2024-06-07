<template>
  <div>
    <el-card>
      <h2 class="header">用户列表</h2>
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="userID" label="用户ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="发表评论">
          <template #default="{row}">
            <el-switch
                v-model="row.canComment"
                active-text="是"
                inactive-text="否"
                @input="updateCanComment(row.userID)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否被禁用">
          <template #default="{row}">
            <el-switch
                v-model="row.isBanned"
                active-text="是"
                inactive-text="否"
                @input="updateIsBanned(row.userID)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import adminRequest from "@/api/admin";

export default {
  data() {
    return {
      userList: [
        { userID: '123456', username: 'User1', canComment: true, isBanned: false },
        { userID: '789012', username: 'User2', canComment: true, isBanned: false },
        { userID: '345678', username: 'User3', canComment: true, isBanned: true },
      ]
    };
  },
  created() {
    this.fetchUser();
  },
  methods:{
    fetchUser(){
      //TODO:获取用户列表
      adminRequest.getUserList().then(res => {
        this.userList =res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    updateCanComment(id){
      console.log(id);
      adminRequest.userCommentBan(id).then(res => {
        alert("禁言成功")
        console.log(res)
      }).catch(err =>{
        console.log(err)
        alert("禁言失败")
      })
    },
    updateIsBanned(id){
      console.log(id);
      adminRequest.deleteUser(id).then(res => {
        alert("禁用成功")
        console.log(res)
      }).catch(err =>{
        console.log(err)
        alert("禁用失败")
      })
    }
  }
}
</script>

<style>
.header{
  margin-bottom: 10px;
}
</style>