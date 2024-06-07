<template>
  <div>
    <h1>我是评论区</h1>
    <!-- Comment Form -->
    <div class="comment-edit">
      <el-button @click="showCommentDialog">评价一下</el-button>
      <el-dialog
          title="评价"
          v-model="dialogVisible"
          @update:visible="dialogVisible = $event"
          :close-on-click-modal="false"
          :show-close="false"
      >
        <el-rate v-model="rating" :max="10" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :texts="['oops', 'disappointed', 'normal', 'good', 'great']"></el-rate>
        <el-input v-model="comment" type="textarea" autosize placeholder="请输入评论"></el-input>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitComment">发表</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- Show Comments -->
    <div>
      <el-card v-for="(comment, index) in comments" :key="index" class="comment-card">
        <template v-slot:header>
          <div class="clearfix">
            <span>评论{{ index + 1 }}</span>
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
<!--    <el-card v-for="(comment, index) in comments" :key="index" class="comment-card">-->
<!--      <template v-slot:header>-->
<!--        <div class="clearfix">-->
<!--          <span>评论{{ index + 1 }}</span>-->
<!--        </div>-->
<!--      </template>-->
<!--      <div>{{ comment.content }}</div>-->
<!--      <div class="comment-info">-->
<!--        <span>{{ comment.author }}</span>-->
<!--        <span style="margin-right: 5px"></span>-->
<!--        <span>{{ comment.date }}</span>-->
<!--      </div>-->
<!--    </el-card>-->
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import store from "@/store/store";
import {useStore} from "vuex";
import movieRequest from "@/api/movie";
import userRequest from "@/api/user";

export default {
  name: 'MovieComments',
  data() {
    return {
      store:useStore(),
      route:useRoute(), // Use useRoute to get the current route
      isLogin:store.state.isLogin,
      comments: reactive([
        { content: '这是一条评论的内容。', author: '用户A', date: '2024-05-16' },
        { content: '这是另一条评论的内容。', author: '用户B', date: '2024-05-17' },
        // Add more dummy comments as needed
      ]),
      newComment: { content: '', author: '' }, // New comment object to bind to the form
      rating:null,
      comment:null,
      dialogVisible: false,
      pageSize: 10,
      currentPage: 1,
    };
  },
  created() {
    const route = useRoute();
    this.id = route.query.id; // Access the id from the current route
    this.fetchComments()
  },
  methods: {
    showCommentDialog() {
      if (this.isLogin) {
        this.dialogVisible = true;
        console.log(this.dialogVisible)
      } else {
        this.showLoginPrompt();
      }
    },
    fetchComments(){
      movieRequest.getComments(this.id,this.currentPage,this.pageSize)
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
    showLoginPrompt() {
      // Implement your login prompt logic here, such as showing a modal or redirecting to login page
      alert('登录后才能评论');
    },
  },
}
</script>

<style scoped>
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
.rating-container label,
.input-container label {
  margin-right: 10px;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.comment-edit{
  margin-bottom: 20px;
}
</style>

