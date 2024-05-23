<template>
  <div class="main-container">
    <div class="flex-container">
      <main-carousel/>
    </div>
<!--    <router-link to="/movie/info">-->
<!--      <el-button>点击我进入一个具体电影的具体信息页面</el-button>-->
<!--    </router-link>-->
      <el-button @click=getUserName()>Test</el-button>
    <div class="recommand-container">
<!--      <movie-list/>-->
      <movie-list
          :opt="1"
          v-if="isLogin"
          :movies="recommendedMovies"
          class="movie-list my-border"
      />
    </div>

      <div v-if=!isLogin>
        <h2>您需要登录才能查看个性化推荐内容。</h2>
        <!-- 这里放置登录按钮或者其他登录提示 -->
        <router-link :to="{ path: '/login'}">
          <el-button>登录</el-button>
        </router-link>
      </div>
    <div class="recommand-container">
      <!--      <movie-list/>-->
      <movie-list
          :opt="2"
          v-if="1 !== 0"
          :movies="recommendedMovies"
          class="movie-list my-border"
      />
    </div>
    <div class="recommand-container">
      <!--      <movie-list/>-->
      <movie-list
          :opt="3"
          v-if="1 !== 0"
          :movies="recommendedMovies"
          class="movie-list my-border"
      />
    </div>
  </div>
</template>
<script>
//TODO：这个页面有无登录时有差别的，查询推荐电影要带用户id
import { useStore } from 'vuex'
import MainCarousel from "@/components/home/MainCarousel.vue";
import MovieList from "@/components/home/MovieList.vue";
import { useRouter } from "vue-router";
import store from "@/store/store";
export default {
  name:"HomeView",
  components:{MainCarousel,MovieList},
  data() {
    return {
        store:useStore(),
        router:useRouter(),
        isLogin:store.state.isLogin,
    };
  },
  methods:{
      getUserName(){
        console.log(store.state.userName)
      }
  }
}
</script>

<style>

.flex-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  margin-left: 25%;
  margin-right: 25%;

}
.movie-list {
  padding: 1rem;
  margin: 1rem 5% 1rem 5%;
}

/* 响应式布局 - 当屏幕小于 1200 像素宽时，让两列堆叠而不是并排 */
@media screen and (max-width: 1200px) {
  .flex-container {
    margin-left: 5%;
    margin-right: 5%;
  }

  .movie-list {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>