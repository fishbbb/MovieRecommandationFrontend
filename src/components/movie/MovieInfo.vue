<template>
<div class="blur-bg" :style="`background-image: url(${movie.url}); opacity: 1;`"></div>
  <div class="movie-info-top">
    <div class="background">
      <el-row>
        <el-col :span="8">
          <div class="movie-info-top-left">
            <img class="image" :src="movie.url"/>
          </div>
          <el-button color="yellow" class="collect-button" size="large" type="primary" @click="addToFavorites" round :icon="isStarSolid ? 'StarFilled' : 'Star'">|   收藏电影
          </el-button>
        </el-col>


        <el-col :span="16">
          <div class="movie-info-top-right">
            <!-- 电影名 -->
            <div class="movie-name">
              {{ movie.title }}
            </div>

            <!-- 基本信息 + 评分 -->
            <el-row>
              <el-col :span="8">
                <div class="each">
                  <span>导演：</span>
                  <span>{{ director}}</span>
                </div>
                <div class="each">
                  <span>类型：</span>
                  <span>{{ movie.types }}</span>
                </div>
                <div class="each">
                  <span>制片国家/地区：</span>
                  <span>{{ movie.regions }}</span>
                </div>
                <div class="each">
                  <span>语言：</span>
                  <span>{{ movie.originalLanguage }}</span>
                </div>
              </el-col>

              <el-col :span="10">
                <div class="movie-rating">
                  <span>     评分：</span>
                  <el-rate
                      v-model="movie.voteAverage"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value} points"
                      allow-half
                      :max="10"
                      size="large"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  />
                  <el-col>
                    <span>    评分人次：</span>
                    <span>{{ movie.voteCount }}</span>
                  </el-col>

                </div>
              </el-col>
            </el-row>
            <div class="show-first">
              <el-row class="actors-and-introduction">
                <el-col :span="8">
                  <span>主演：</span>
                  <span class="actors">{{ movie.actors }}</span>
                </el-col>
                <el-col :span="16">
                  <div class="introduction">
                    <el-collapse>
                      <el-collapse-item title="&nbsp;&nbsp;&nbsp;&nbsp;电影简介" name="introduction">
                        <div style="margin: 0 1rem" class="detail-content">
                          {{ movie.overview }}
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {useRoute, useRouter} from 'vue-router';
import {Star} from "@element-plus/icons";
import {useStore} from "vuex";
import store from "@/store/store";
import userRequest from "@/api/user";
import movieRequest from "@/api/movie";
export default {

  name: 'MovieInfo',
  computed: {
    Star() {
      return Star
    }
  },
  data() {
    return {
      store:useStore(),
      route:useRouter(),
      userID:store.state.userId,
      id:null,
      actorsDialogVisible: false,
      introductionDialogVisible: false,
      isStarSolid:false,
      director:'',
      actor:[],
      movie: {
        actors: 'John Doe, Jane Smith',
        alias: 'Alias Movie',
        did: 'Director Name',
        directors: 'Director Name',
        five: 'Five Star Data',
        four: 'Four Star Data',
        movieID: '123456',
        overview: 'Introduction of the movie goes here.',
        languages: 'English',
        title: 'Dummy Movie',
        num: 'Some Number',
        one: 'One Star Data',
        pic: 'https://img0.baidu.com/it/u=544253529,1605576325&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281', // Placeholder image URL
        regions: 'Region Data',
        releaseDate: 'Release Date Data',
        runtime: 'Runtime Data',
        voteAverage : 8.5,
        voteCount:200,
        types: 'Action, Drama',
        writers: 'Writer Name',
        year: 'Release Year Data',
      },
    };
  },
  created() {
    const route = useRoute(); // Use useRoute to get the current route
    this.id = route.query.id; // Access the id from the current route
    console.log(this.id);
    this.fetchMovieInfo();
  },
   methods: {
    fetchMovieInfo() {
      movieRequest.getMovieInfo(this.id)
        .then(res => {
        console.log(res)
        this.movie= res.data;
           const castNames = res.data.cast.slice(0, 3).map(cast => cast.name); // 解析出crew的第一个元素的name值
           const crewName = res.data.crew[0].name;
           console.log(castNames); // 输出: ["Arnold Mostowicz", "Jürgen Andreas", "Artur Brauner"]
           console.log(crewName); // 输出: "Dariusz Jabłoński"
        })
        .catch(err => {
          console.error('Error fetching movie info:', err);
        });
    },
     addToFavorites(){
      console.log(this.userID)
      if(this.userID===null){
        alert('请先登录')
        this.route.replace('/login')
      }
       this.isStarSolid = !this.isStarSolid;
       const data ={
         UserID:this.userID,
         MovieID:this.id,
       }
       userRequest.addCollections(data)
           .then(() => {
             this.isStarSolid = !this.isStarSolid;
           })
           .catch(err => {
             console.error('Error adding comment:', err);
           });
     }
   },
};
</script>

<style scoped>
.detail-content{
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 设置显示的行数 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blur-bg {
  height: 32rem;
  width: 100%;
  filter: blur(1rem) brightness(85%);
  position: absolute;
  background-size: cover;
  background-color: black; /* 新增背景色为黑色 */
}

.movie-info-top {
  height: 38rem;
  width: 100%;
  background-size: cover;
  background-color: black; /* 新增背景色为黑色 */
}

.movie-info-top .background {
  height: 36rem;
}

.movie-info-top-left, .movie-info-top-right {
  width: 100%;
  height: 100%;
}

/************** top left **************/
.movie-info-top-left .image {
  margin-top: 5%;
  margin-left: 20%;
  text-align: center;
  width: 60%;
}

/************** top right **************/
.movie-info-top-right .movie-name {
  padding-top: 2rem;
  color: #ffd700;
  width: 80%;
  font-size: 2rem;
  font-weight: bold;
}

.movie-info-top-right .each {
  color: #ffd700;
  margin-top: 1rem;
  max-width: 100%;
}

.movie-info-top-right .rate {
  font-size: 0.7rem;
  margin-left: 2rem;
  margin-top: 5px;
  width: 30%;
}

.movie-info-top-right .actors-and-introduction {
  color: #ffd700;
  margin-top: 1rem;
}

.movie-info-top-right .introduction {
  margin-left: 2rem;
  width: 50%;
}

.collect-button{
  margin-left: 150px;
  font-size: 28px;
  padding: 20px;
}

/deep/ .el-rate__text {
  color: #ff9900;
}

/************** 主演 和 简介 样式2 **************/
.actors-second, .introduction-second {
  font-size: 1.3rem;
}

.introduction-second {
  margin-left: 2rem;
}

@media screen and (max-width: 1200px) {
  .show-first {
    display: none;
  }

  .show-second {
    display: block;
  }

  .movie-info-top {
    height: 100%;
  }

  .movie-info-top .background {
    height: 100%;
  }

  .movie-info-top-left .image {
    margin-top: 20%;
  }

  .movie-info-top-right .rate {
    width: 60%;
  }
}
.movie-rating{
  color: #ffd700;
}
/* 新增评分人次字体颜色为黄色 */
.movie-info-top-right .rate span {
  color: #ffd700;
}


</style>
