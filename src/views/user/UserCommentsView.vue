<template>
  <h1>用户影评界面</h1>
  <div>
    <el-card v-for="(comment, index) in comments" :key="index" class="comment-card">
      <template v-slot:header>
        <div class="clearfix">
          <span>评论{{ index + 1 }}</span>
          <el-button type="text" class="delete-btn" @click="deleteComment(index)">删除</el-button>
        </div>
      </template>
      <div>{{ comment.content }}</div>
      <div class="comment-info">
        <span>{{ comment.author }}</span>
        <span style="margin-right: 5px"></span>
        <span>{{ comment.date }}</span>
      </div>
    </el-card>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        :total="comments.length"
        layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>
<script>
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import store from "@/store/store";
import {reactive} from "vue";
import userRequest from "@/api/user";

export default {
  data() {
    return {
      store:useStore(),
      isLogin:store.state.isLogin,
      comments: reactive([
        { content: '这是一条评论的内容。', author: '用户A', date: '2024-05-16' },
        { content: '这是另一条评论的内容。', author: '用户B', date: '2024-05-17' },
        // Add more dummy comments as needed
      ]),
      pageSize: 10,
      currentPage: 1,
      id:store.state.userId
    };
  },
  created() {
    this.fetchComments()
  },
  methods: {
    fetchComments(){
      userRequest.getUserAllComments(this.id,this.currentPage,this.pageSize)
          .then(response => {
            this.comments = response.data
          })
          .catch(error => {
            console.error(error);
          });
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 重置当前页数以显示新的评论
      this.fetchComments();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.fetchComments();
    },
    submitComment() {
      if (this.isLogin) {
        const route = useRoute();
        const userId = store.state.userId; // Assuming there's a method to get userId from global scope
        const movieId = route.query.id; // Get movie id from current route
        const commentData = {
          userID: userId,
          rating: this.rating,
          comment: this.comment,
          movieID: movieId
        };
        console.log(commentData);
        userRequest.addComment(commentData)
            .then(() => {
              // Comment added successfully
              console.log("success!!!");
            })
            .catch((error) => {
              console.error('Error adding comment:', error);
            });
        this.dialogVisible = false;
      } else {
        this.showLoginPrompt();
      }
    },
    deleteComment(index){
      const data={
        userID:this.id,
        movieID:index
      }
      userRequest.deleteComment(data).then(res=>{
        console.log(res.data)
        this.fetchComments()
      }).catch(err=>{
        console.log(err)
      })
    }
  },
}
</script>


<style>
.comment-card {
  margin-bottom: 20px;
}
.comment-info {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}
.delete-btn {
  float: right;
  padding: 0;
  font-size: 12px;
  color: #999;
}
</style>