<template>
  <div class="movie-tags">
    <div class="type">
      <span class="tag-text">Genre</span>
      <div class="button">
        <el-radio-group class="type-button"
                        v-for="(t, index) in genreList"
                        :key="index"
                        v-model="genres"
                        @change="getMovieWithConditions()"
                        fill="rgba(188, 180, 50, 0.8)"
                        text-color="black">
          <el-radio-button  :label= t />
        </el-radio-group>
      </div>
    </div>
    <el-divider class="divider"/>
    <div class="year">
      <span class="tag-text">Year</span>
      <div class="button">
        <el-radio-group class="type-button"
                        v-for="(t, index) in years"
                        :key="index"
                        v-model="stage"
                        @change="getMovieWithConditions()"
                        fill="rgba(188, 180, 50, 0.8)"
                        text-color="black">
          <el-radio-button  :label= t />
        </el-radio-group>
      </div>

    </div>
    <el-divider  class="divider"/>
    <div class="language">
      <span class="tag-text">Language</span>
      <div class="button1">
        <el-radio-group class="type-button"
                        v-for="(item,index) in languages"
                        :key="index"
                        v-model="language"
                        @change="getMovieWithConditions()"
                        fill="rgba(188, 180, 50, 0.8)"
                        text-color="black">
          <el-radio-button :label="item"/>
        </el-radio-group>
      </div>

    </div>
  </div>
  <div class="movie-content">
  <div class="changeView">
    <div class="orderView">
      <div class="popularity-order">
        <span class="order-text">Popularity</span>
        <div class="order-button-container">
          <el-button class="popularity-button-top popularity-button order-button" ref="popularityButtonTop" @click="orderMovieByPopularityAsc()" text>
            <el-icon :size="25"><CaretTop/></el-icon>
          </el-button>
          <el-button class="popularity-button-bottom popularity-button order-button" ref="popularityButtonBottom" @click="orderMovieByPopularityDesc()" text>
            <el-icon :size="25"><CaretBottom/></el-icon>
          </el-button>
        </div>
      </div>
      <div class="rate-order">
        <span class="order-text">Rate</span>
        <div class="order-button-container">
          <el-button ref="rateButtonTop" class="rate-button-top rate-button order-button" @click="orderMovieByRateAsc()" text>
            <el-icon :size="25"><CaretTop/></el-icon>
          </el-button>
          <el-button ref="rateButtonBottom" class="rate-button-bottom rate-button order-button" @click="orderMovieByRateDesc()" text>
            <el-icon :size="25"><CaretBottom/></el-icon>
          </el-button>
        </div>

      </div>
      <div class="time-order">
        <span class="order-text">Release Time</span>
        <div class="order-button-container">
          <el-button class="time-button-top time-button order-button" ref="timeButtonTop" @click="orderMovieByTimeAsc()" text>
            <el-icon :size="25"><CaretTop/></el-icon>
          </el-button>
          <el-button class="time-button-bottom time-button order-button" ref="timeButtonBottom" @click="orderMovieByTimeDesc()" text>
            <el-icon :size="25"><CaretBottom/></el-icon>
          </el-button>
        </div>

      </div>
      <button class="reset-order-button" @click="resetOrder">Reset</button>
    </div>


  </div>

  <div class="movie-view">
    <div class= movies-view>
      <template v-for="(item,index) in movieList" :key="index">
        <movie-card :movie="item" v-if="movieViewType === 'GRID'"></movie-card>
      </template>
    </div>
    <div class="movie-pagination">
      <el-pagination background layout="sizes,prev,pager,next"
                     class="pagination"
                     :total="total"
                     :page-sizes="size"
                     v-model:page-size="pageSize"
                     v-model:current-page="page"
                     @current-change="getMovieWithConditions()"
                     @size-change="getMovieWithConditions()"></el-pagination>
    </div>
  </div>
  <el-backtop :right="100" />

</div>

</template>

<style scoped>
.movie-tags{
  width: 80%;
  margin: 20px auto 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.type,
.year,
.language{
  display: flex;
}

.tag-text{
  font-size: 28px;
  text-align: center;
  width: 250px;
  color: #d2ae5b;
  font-weight: bold;
}
.button{
  display: grid;
  grid-template-columns: repeat(6, 150px);
  grid-template-rows: repeat(3,30px);
  grid-gap: 15px 30px;
  margin-left: 10px;
}
.button1{
  display: grid;
  grid-template-columns: repeat(6, 150px);
  grid-template-rows: repeat(2,30px);
  grid-gap: 10px 30px;
  margin-left: 10px;
}
.divider{
  margin: 20px auto;
}
.type-button{
  margin-right: 50px;
  width: 40px;
  height: 40px;
}
.type-button :deep(.el-radio-button__inner) {
  border: none;
  //color: #ba8a4b;
  color: white;
  background-color: transparent;
  font-size: 17px;
}
.type-button :deep(.el-radio-button__inner:hover) {
  background-color: rgba(231, 204, 145, 0.33);
  color: #e0863c;
}
.movie-content{
  width: 80%;
  height: 100%;
  margin: 20px auto 20px;
  border: #eaeaf6 2px solid;
  padding: 10px;
}
.changeView{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}
.orderView{
  display: flex;
  align-items: center;
  height:80px;
  gap: 20px;
  margin-left: 20px;
}
.popularity-order,
.rate-order,
.time-order{
  display: flex;
  gap: 10px;
  align-items: center;
}
.order-text{
  text-align: center;
  line-height: 80px;
  color: white;
  font-size: 18px;
}
.order-button-container{
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 40px;
}
.popularity-button,
.rate-button,
.time-button{
  margin-left: 0;
  padding: 0;
}
.el-button.is-text:hover
{
  color: #d2ae5b;
  background-color: transparent;
}
.reset-order-button{
  border-radius: 10px;
  background-color: #ff9900;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  cursor: pointer;
}
:deep(.pagination .el-pager li),
:deep(.pagination .btn-prev),
:deep(.pagination .btn-next),
:deep(.pagination .el-select),
:deep(.el-select .el-select__wrapper),
:deep(.el-select__placeholder)
{
  background-color: transparent !important;
  color: #eae2b8;
  font-size: 18px;
}
:deep(.el-pager li:hover),
:deep(.btn-prev:hover),
:deep(.btn-next:hover)
{
  background-color: #ffa200 !important;
  color:black;
}

.movie-view{
  margin-left: 20px;
  margin-top: 20px;
  border: 2px solid black;
 }
.movies-view{
  width: 90%;
  margin: 20px auto;
  display: grid;
  /*使用auto-fit，一行中有剩余宽度时不会以空白格填充，而是根据视窗宽度自适应调整单元格宽度;*/
  grid-template-columns: repeat(auto-fit, 250px);
  justify-content: center;
  grid-gap: 30px;

  //border: #42b983 1px solid;
}
.movie-pagination{
  width: 40%;
  margin: 20px auto;
  //border: 2px solid gold;
  display: flex;
  justify-content: center;
}
el-pagination{
  width: 100%;
}
</style>

<script>


import {CaretBottom, CaretTop} from "@element-plus/icons-vue";
import MovieCard from "@/components/movie/MovieCard.vue";
import {reactive, ref} from "vue";
import movieRequest from "@/api/movie";



export default {
  name:"MovieContent",
  components: {CaretBottom, CaretTop, MovieCard},
  data() {
    const movieList = reactive([{movieId :"1", title: "a", voteAverage:"3.5",pic:1,description:'当星光消失在城市的天际，\n' +
          '我在电子花园中寻找静谧的灵魂。',releaseDate:'2023.10.1'},
      {id :"2", title: "Movies", voteAverage:"4.5",pic:2,description:'在深海的梦境中漫步，\n' +
            '触摸珊瑚的柔软和蓝色的忧伤。',releaseDate:'2023.10.1'},
      {id :"3", title: "TestABC Color", voteAverage:"2.6",pic:3,description:'当微风拂过夜的梦境，\n' +
            '我在星空下，等待黎明的指引。',releaseDate:'2023.10.1'},
      {id :"4", title: "TestABC Living", voteAverage:"3.2",pic:4,description:'当城市的喧嚣被晨曦吞噬，\n' +
            '我在寂静中品味未来的微光。',releaseDate:'2023.10.1'},
      {id :"5", title: "TestABC Head", voteAverage:"8.7",pic:5,description:'披星戴月，穿越无垠，\n' +
            '寻觅远方，寄托心底的希冀。',releaseDate:'2023.10.1'},
      {id :"6", title: "TestABC String", voteAverage:"6.8",pic:6,description:'这是一部电影',releaseDate:'2023.10.1'},
      {id :"7", title: "TestABC Menulist", voteAverage:"9.0",pic:7,description:'这是一部电影',releaseDate:'2023.10.1'},
      {id :"8", title: "TestABC delicate", voteAverage:"4.6",pic:8,description:'这是一部电影',releaseDate:'2023.10.1'},
      {id :"9", title: "TestABC memory", voteAverage:"10",pic:9,description:'这是一部电影',releaseDate:'2023.10.1'},
      {id :"10", title: "TestABC query", voteAverage:"4.7",pic:10,description:'这是一部电影',releaseDate:'2023.10.1'},
        {id :"11", title: "TestABC friendly", voteAverage:"3.5",pic:5,description:'这是一部电影',releaseDate:'2023.10.1'},
        {id :"12", title: "TestABC Numpy", voteAverage:"4.5",pic:2,description:'这是一部电影',releaseDate:'2023.10.1'},
        {id :"13", title: "TestABC Render", voteAverage:"2.6",pic:3,description:'这是一部电影',releaseDate:'2023.10.1'},
        {id :"14", title: "TestABC Michel Jackson", voteAverage:"3.2",pic:4,description:'这是一部电影',releaseDate:'2023.10.1'},
        {id :"15", title: "TestABC Sam Smith", voteAverage:"8.7",pic:5,description:'这是一部电影',releaseDate:'2023.10.1'},
    ])
    const total = movieList.length;
    let size = [2,3,4,5];
    let pageSize = 4;
    let page = 1;

    let genres = ref('All');
    let stage = ref('All');
    let language = ref('All');
    const genreList = reactive(
        ['All','Drama', 'Comedy', 'Thriller',
          'Romance', 'Action', 'Horror', 'Crime',
          'Documentary', 'Adventure', 'Science Fiction',
          'Family', 'Mystery','Fantasy',
          'Animation', 'Foreign', 'Music', 'History','War','Western','TV Movie']);
    const years = reactive(
        ['All','最近', '2017', '2016',
          '2015', '2014', '2013', '2012',
          '2011', '2010', '00年代', '90年代',
          '80年代', '70年代', '60年代', '更早']);
    const languages = reactive(['All','Chinese','English','French','Deutsch','Other'])
    let sort_by_popularity = '';
    let sort_by_ratings = '';
    let sort_by_date = '';
    // let page = 1;
    // let page_size = 4;
    const defaultParams = {
      userId: 1,
    };

    return{
      movieList,
      total,
      size,
      pageSize,
      page,
      genres,
      genreList,
      stage,
      years,
      language,
      languages,
      sort_by_popularity,
      sort_by_ratings,
      sort_by_date,
      defaultParams
    }
  },
  methods:{
    changeColor(ele,selector,color){
      //修改样式
      const buttons = document.querySelectorAll(selector);
      buttons.forEach(button => {
        button.style.color = '#606266'; // 恢复原始颜色
      });
      ele.style.color = color;

    },

    orderMovieByPopularityAsc(){
      this.changeColor(this.$refs.popularityButtonTop.$el,".popularity-button",'#eacd29');
      this.sort_by_popularity = '0';
      this.getMovieWithConditions();
    },
    orderMovieByPopularityDesc(){
      this.changeColor(this.$refs.popularityButtonBottom.$el,".popularity-button",'#eacd29');
      this.sort_by_popularity = '1';
      this.getMovieWithConditions();
    },
    orderMovieByRateAsc(){
      this.changeColor(this.$refs.rateButtonTop.$el,".rate-button",'#eacd29');
      this.sort_by_ratings = '0';
      this.getMovieWithConditions();
      //const userId = store.state.userId;
    },
    orderMovieByRateDesc(){
      this.changeColor(this.$refs.rateButtonBottom.$el,".rate-button",'#eacd29');
      this.sort_by_ratings = '1';
      this.getMovieWithConditions();
    },

    orderMovieByTimeAsc(){
      this.changeColor(this.$refs.timeButtonTop.$el,".time-button",'#eacd29');
      this.sort_by_date = '0';
      this.getMovieWithConditions();
    },
    orderMovieByTimeDesc(){
      this.changeColor(this.$refs.timeButtonBottom.$el,".time-button",'#eacd29');
      this.sort_by_date = '1';
      this.getMovieWithConditions();
    },
    resetOrder(){
      this.sort_by_popularity = '';
      this.sort_by_ratings = '';
      this.sort_by_date = '';
      const buttons = document.querySelectorAll('.order-button');
      buttons.forEach(button => {
        button.style.color = '#606266'; // 恢复原始颜色
      });
    },
    getMovieWithConditions(){
      let page = 1;
      let stage = 'All';
      let language = 'All';
      let genres = 'All';
      let sort_by_popularity = '';
      let sort_by_ratings = '';
      let sort_by_date = '';
      let pageSize = 4;

      if(this.genres){
        genres = this.genres;
      }
      if(this.stage){
        if(this.stage.toString().includes("年代")){
          stage = this.stage.toString().substring(0,2);
        }else if(this.stage.toString().includes("更早")){
          stage = 'before';
        }else if(this.stage.toString().includes("最近")){
          stage = 'lately';
        }else{
          stage = this.stage;
        }
      }
      if(this.language){
        language = this.language;
      }
      if(this.sort_by_popularity){
        sort_by_popularity = this.sort_by_popularity;
      }
      if(this.sort_by_ratings){
        sort_by_ratings = this.sort_by_ratings;
      }
      if(this.sort_by_date){
        sort_by_date = this.sort_by_date;
      }
      page = this.page;
      pageSize = this.pageSize;
      const newParams = { ...this.defaultParams,
                              page,
                              pageSize,
                              stage, genres, language,
                              sort_by_date,sort_by_ratings,sort_by_popularity};
      //console.log(newParams);
      movieRequest.getMoviesWithConditions(newParams)
          .then((response)=>{
            console.log("success!!!" + response);
            this.movieList = response.data;
          })
          .catch((error) => {
            console.error('Error adding comment:', error);
          });

    }
  }
}
</script>