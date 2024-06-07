<template>
  <el-card class="movie-result">
    <el-row :gutter="20">
      <el-col :span="4">
        <img class="movie-image" :src="movie.imageUrl" alt="Movie Image" />
      </el-col>
      <el-col :span="15">
        <div class="movie-details">
          <h2>{{ movie.name }}</h2>
          <p>主演: {{ movie.starring }}</p>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="movie-rating">
          <span>评分：</span>
          <el-rate v-model="movie.rating" disabled :max="5"></el-rate>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'MovieResult',
  props: {
    // movie: {
    //   type: Object,
    //   required: true
    // },
  },
  data(){
    return{
      movie:{
        imageUrl: 'http://www.baidu.com/img/bdlogo.png',
        name: '电影名称示例',
        starring: '主演1, 主演2',
        rating: 4.5 // 评分范围在 0 - 5 之间
      },
    }
  }
};
</script>

<style>
.movie-result {
  //display: flex;
  padding: 10px;
}

.movie-image {
  width: 180px;
  height: auto;
  margin-right: 20px;
}

.movie-details {
  flex: 1;
}

.movie-rating {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>