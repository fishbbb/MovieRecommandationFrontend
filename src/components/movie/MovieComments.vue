<template>
  <div>
    <h1>我是评论区</h1>
    <!-- Comment Form -->
    <el-form :model="newComment" ref="commentForm" class="comment-form" @submit.prevent="submitComment">
      <el-form-item label="内容" prop="content">
        <el-input v-model="newComment.content"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="newComment.author"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">发布评论</el-button>
      </el-form-item>
    </el-form>
    <!-- Show Comments -->
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
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
// import movieRequest from "@/api/movie";

export default {
  name: 'MovieComments',
  data() {
    return {
      comments: reactive([
        { content: '这是一条评论的内容。', author: '用户A', date: '2024-05-16' },
        { content: '这是另一条评论的内容。', author: '用户B', date: '2024-05-17' },
        // Add more dummy comments as needed
      ]),
      newComment: { content: '', author: '' } // New comment object to bind to the form
    };
  },
  created() {
    const route = useRoute(); // Use useRoute to get the current route
    this.id = route.query.id; // Access the id from the current route
  },
  methods: {
    // fetchComments(){
    //   movieRequest.getComments()
    //       .then(response => {
    //       this.comments = response.data
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    // },
    submitComment() {
      // Add the new comment to the comments array
      this.comments.push({
        content: this.newComment.content,
        author: this.newComment.author,
        date: new Date().toLocaleString() // You may want to format the date accordingly
      });

      // Clear the form fields after submission
      this.newComment.content = '';
      this.newComment.author = '';

      // Reset form validation state
      this.$refs.commentForm.clearValidate();
    },
    deleteComment(index) {
      // Implement deleteComment method as per your requirements
      this.comments.splice(index, 1);
    }
  },
  mounted() {
    // this.fetchComments()
  }
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
</style>


<!--planB:有回复的版本
<template>
  <div>
    <h1>我是评论区</h1>
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
        <span>{{ comment.date }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'MovieComments',
  data() {
    return {
      comments: reactive([
        { content: '这是一条评论的内容。', author: '用户A', date: '2024-05-16' },
        { content: '这是另一条评论的内容。', author: '用户B', date: '2024-05-17' },
        // Add more dummy comments as needed
      ])
    };
  },
  methods: {
    deleteComment(index) {
      this.comments.splice(index, 1);
    }
  }
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
</style>
-->
