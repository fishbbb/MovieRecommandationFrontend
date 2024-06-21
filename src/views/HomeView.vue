<template>
  <div class="main-container">
    <div class="flex-container">
      <main-carousel/>
    </div>
    <div class="recommend-container">
      <movie-list
          :opt="1"
          v-if="isLogin"
          :movies="recommendedMovies"
          class="movie-list my-border"
      />
    </div>

    <div v-if="!isLogin" class="recommend-container">
      <el-card class="login-card">
        <h2>您需要登录才能查看个性化推荐内容。</h2>
        <div class="icon-container">
          <el-icon style="font-size: 50px"><Lock /></el-icon>
        </div>
        <router-link :to="{ path: '/login'}">
          <el-button>登录</el-button>
        </router-link>
      </el-card>
    </div>
    <div class="recommend-container">
      <movie-list
          :opt="2"
          v-if="1 !== 0"
          :movies="hottestMovies"
          class="movie-list my-border"
      />
    </div>
    <div class="recommend-container">
      <movie-list
          :opt="3"
          v-if="1 !== 0"
          :movies="highestRatingMovies"
          class="movie-list my-border"
      />
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import MainCarousel from "@/components/home/MainCarousel.vue";
import MovieList from "@/components/home/MovieList.vue";
import { useRouter } from "vue-router";
import store from "@/store/store";
import axios from 'axios';
import movieRequest from "@/api/movie";
export default {
  name:"HomeView",
  components:{MainCarousel,MovieList},
  data() {
    return {
        store:useStore(),
        router:useRouter(),
        isLogin:store.state.isLogin,
        recommendedMovies:[],
        highestRatingMovies:[],
        hottestMovies:[],
        userIP: ''
    };
  },

    // fetch('https://api.ipify.org?format=json').
    // then(response => response.json()).
    // then(data => {
    //   const ip = data.ip
    //   //通过ip地址获取所在地
    //   fetch(`https://api.vore.top/api/IPdata?ip=${ip}`).
    //   then((res) => res.json()
    //       .then((data) => {
    //         console.log(data);
    //       })
    //   )
    // })
    //     .catch(error => { console.error(error) })
  methods:{
    getUserName(){
        console.log(store.state.userName)
    },
    async getUserIP() {
      try {
        const response = await axios.get('https://ipinfo.io/json');
        this.userIP = response.data.ip;
        console.log(this.userIP)
      } catch (error) {
        console.error('Failed to get user IP:', error);
      }
    },
    getHottestMovies(){
      movieRequest.getHottestMovies().then(res =>{
        this.hottestMovies = res.data;
        console.log(res.data)
      }).catch(err =>{
        console.log(err)
      })
    },
    getHighestRatedMovies(){
      movieRequest.getHighestRatedMovies().then(response => {
        this.highestRatingMovies = response.data
        console.log(response)
      }).catch(error => {
        console.error(error);
      });
    },
    getRecommendedMovie(){
      if(this.isLogin){
        movieRequest.getRecommendedMovie(store.state.userId)
            .then(res =>{
              this.recommendedMovies = res.data;
            }).catch(err =>{
              console.log(err)
        })
      }
    }
  },
  created() {
    this.getUserIP()
    this.getHighestRatedMovies()
    this.getHottestMovies()
    this.getRecommendedMovie()
  },
  mounted() {

  }
  //TODO:先注释掉了，到时候在这里打开，獲取推薦和評分排名
  // mounted() {
  //   if (this.isLogin) {
  //     this.getRecommendedMovie(store.state.userId)
  //         .then(response => {
  //           this.recommendedMovies = response.data; // 假设 response 返回推荐的电影数据
  //         })
  //         .catch(error => {
  //           console.error(error);
  //         });
  //   }
  //
  //   this.getHighestRatedMovies()
  //       .then(response => {
  //         this.highestRatingMovies = response.data; // 假设 response 返回评分最高榜单电影数据
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //
  //   this.getHottestMovies()
  //       .then(response => {
  //         this.hottestMovies = response.data; // 假设 response 返回评分最高榜单电影数据
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  // }
}
</script>

<style>
.main-container{
  //background-color: black;

}
.flex-container {
  //margin-top: 2rem;
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 2rem auto;
}
.movie-list {
  padding: 1rem;
  margin: 1rem 5% 1rem 5%;
}
.recommend-container{
  //border: #5a84fd 2px solid;
}

.login-card {
  width: 85%;
  text-align: center;
  background: rgba(255, 255, 255, 0.7); /* Semi-transparent background */
  backdrop-filter: blur(5px); /* Adds a blur effect */
  padding: 20px;
  margin: 15px auto; /* Center the card horizontally */
}

.icon-container {
  margin-top: 10px; /* Adjust margin between button and icon */
}

.card-header {
  margin-bottom: 20px;
}

.card-lock {
  font-size: 4em; /* Adjust size of lock icon */
  color: #333; /* Color of the lock icon */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card-content {
  margin-bottom: 20px;
}
</style>