<template>
  <div>
    <p class="panel-title">
      <span v-if="opt === 1">猜你喜欢</span>
      <span v-if="opt === 2">本站热榜</span>
      <span v-if="opt === 3">评分最高</span>
      {{ tag }}
    </p>

    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <template v-for="(movie, index) in movies" :key="movie.movieID">
          <movie-card :movie="movie" class="movie-card-item">
            <template v-if="opt === 1 || opt === 2 || opt === 3" v-slot:header>
              <span v-if="opt === 1 && index <= 2" class="recommendation-svg-first" style="color: rgb(255,215,0)">👍</span>
              <span v-else-if="opt === 1" class="recommendation-svg-second" style="color: rgb(48,208,186)">👍</span>
              <span v-if="opt === 2 && index <= 2" class="hot-svg" style="color: rgb(238,63,77)">🔥</span>
              <span v-else-if="opt === 2" class="hot-svg" style="color: rgb(49,112,167)">🔥</span>
              <span v-if="opt === 3 && index <= 2" class="highest-score-svg-first">🥇</span>
              <span v-else-if="opt === 3" class="highest-score-svg-first" style="color: rgb(48,208,186)">🏅</span>
            </template>

            <template v-if="opt === 1" v-slot:footer>
              <div class="recommendation-index-div">
                推荐指数:
              </div>
            </template>

            <template v-else-if="opt === 2" v-slot:footer>
              <div class="watched-num-div">
                {{ movie.voteCount }}人评价
              </div>
            </template>
          </movie-card>
        </template>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import MovieCard from "@/components/movie/MovieCard.vue";

export default {
  name: "MovieList",
  components: { MovieCard },
  props: {
    /**
     * 1：猜你喜欢
     * 2：本站熱榜
     * 3：评分最高
     */
    opt: Number, // Pass the sorting option as a prop
    tag: String, // Pass the tag as a prop
    movies:Array,
  },
  // setup(props) {
  //   props.movies.forEach((movie) => {
  //     if (movie.idx) {
  //       movie.idx *= 100
  //       // 保留两位小数（四舍五入）
  //       movie.idx = movie.idx.toFixed(2)
  //     }
  //   })
  // },

  //--------------假數據-------------------
  data() {
    return {

    };
  },
};
</script>

<style scoped>
.panel-title {
  font-size: 30px;
  color: #d2ae5b;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.scrollbar-flex-content {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  //border: #5a84fd 2px solid;
  height: 32rem;
}

.movie-card-item {
  margin: 1rem;
}

.recommendation-svg-first {
  position: absolute;
  top: -3px;
  left: -3px;
  z-index: 10;
  width: 2rem;
  height: 2rem;
}

.recommendation-svg-second {
  position: absolute;
  top: -3px;
  left: -3px;
  z-index: 10;
  width: 3rem;
  height: 3rem;
}

.recommendation-index-div {
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(250, 114, 104);
}

.highest-score-svg-first {
  position: absolute;
  z-index: 10;
  width: 2rem;
  height: 2rem;
}

.watched-num-div {
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(125, 197, 235);
}

</style>