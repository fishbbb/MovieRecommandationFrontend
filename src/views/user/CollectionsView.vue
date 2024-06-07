<template>
  <div class="movie-collection">
    <h1>用户收藏的电影</h1>
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <movie-card :movie="movie"></movie-card>
        <el-button @click="cancelFavorite(movie.id)">取消收藏</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import MovieCard from "@/components/movie/MovieCard.vue";
import {useStore} from "vuex";
import store from "@/store/store";
import userRequest from "@/api/user";

export default {
  name: "CollectionView",
  components: { MovieCard },
  data() {
    return {
      // 假数据
      movies: [
        { id: 1, title: '电影1', director: '导演1', year: 2020 },
        { id: 2, title: '电影2', director: '导演2', year: 2019 },
        { id: 3, title: '电影3', director: '导演3', year: 2021 }
        // 继续添加更多数据
      ],
      store:useStore(),
      userID:store.state.userId
    };
  },
  created() {
    this.fetchFavorite()
  },
  methods: {
    fetchFavorite(){
      userRequest.getCollections(this.userID).then(res=>{
        this.movies = res.data
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })
    },
    cancelFavorite(movieID) {
      const data={
        movieID:movieID,
        userID:this.userID
      }
      userRequest.deleteCollections(data).then(res =>{
        console.log(res.data)
        alert("删除成功")
      }).catch(err=>{
        console.log(err)
      })
      // 处理取消收藏操作
      console.log(movieID);
    },
  }
};
</script>

<style scoped>
.movie-collection {
  padding: 20px;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
}

.movie-item {
  flex: 0 0 25%; /* 每行显示4个电影，根据需要调整 */
  padding: 10px;
}
</style>