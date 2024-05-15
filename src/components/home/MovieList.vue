<template>
  <div>
    <p class="panel-title">
      <span v-if="opt === 1">猜你喜欢</span>
      <span v-if="opt === 2">最多人看</span>
      <span v-if="opt === 3">评分最高</span>
      {{ tag }}...
    </p>

    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <template v-for="(movie, index) in mockMovies" :key="movie.id">
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
                推荐指数: {{ movie.idx }}%
              </div>
            </template>

            <template v-else-if="opt === 2" v-slot:footer>
              <div class="watched-num-div">
                {{ movie.num }}人评价
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
    opt: Number, // Pass the sorting option as a prop
    tag: String, // Pass the tag as a prop
  },
  data() {
    return {
      mockMovies: [ // Mock movie data
        { id: 1, idx: 90, num: 100 },
        { id: 2, idx: 85, num: 150 },
        { id: 3, idx: 95, num: 80 },
        { id: 4, idx: 95, num: 80 },
        { id: 5, idx: 95, num: 80 },
        { id: 6, idx: 95, num: 80 },
        { id: 7, idx: 95, num: 80 },
        { id: 8, idx: 95, num: 80 },

        // Add more mock movie data as needed
      ],
    };
  },
};
</script>

<style scoped>
.panel-title {
  font-size: 26px;
  color: #e52a0d;
  font-weight: bold;
  margin-bottom: 1rem;
}

.scrollbar-flex-content {
  display: flex;
  flex-wrap: nowrap;
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