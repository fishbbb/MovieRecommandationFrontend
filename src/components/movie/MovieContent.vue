<template>
  <div class="movie-tags">
    <div class="type">
      <span class="tag-text">Genre</span>
      <div class="button">
        <el-radio-group class="type-button"
                        v-for="(t, index) in genres"
                        :key="index"
                        v-model="genre"
                        @change="getMovieWithConditions()"
                        fill="rgba(188, 180, 50, 0.8)"
                        text-color="white">
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
                        v-model="year"
                        @change="getMovieWithConditions()"
                        fill="rgba(188, 180, 50, 0.8)"
                        text-color="white">
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
                        text-color="white">
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
                     v-model:page-size="size1"
                     v-model:current-page="currentPage"
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
  //background-color: rgba(188, 180, 121, 0.25);
  display: flex;
  flex-direction: column;

}
.type,
.year,
.language{
  display: flex;
}
/*.year,
.language{
  margin-top: 30px;
}*/
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
  grid-gap: 15px 30px;
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
  font-size: 18px;
}
.type-button :deep(.el-radio-button__inner:hover) {
  background-color: rgba(231, 204, 145, 0.33);
  color: #e0863c;
}
.movie-content{
  width: 80%;
  height: 100%;
  //margin-top: 20px;
  margin: 20px auto 20px;
  border: #eaeaf6 2px solid;
  //background-color: white;
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
<!--<style>-->
<!--.movie-tags .el-pagination.is-background .el-pager li:not(.disabled).active {-->
<!--  background-color: #FD7A3A !important;   /*进行修改背景和字体*/-->
<!--  color: #d14242;-->
<!--}-->
<!--</style>-->
<script>


import {CaretBottom, CaretTop} from "@element-plus/icons-vue";
import MovieCard from "@/components/movie/MovieCard.vue";
import {reactive, ref} from "vue";
import movieRequest from "@/api/movie";



export default {
  name:"MovieContent",
  components: {CaretBottom, CaretTop, MovieCard},
  data() {
    const movieList = reactive([{id :"1", name: "a", score:"3.5",pic:1,description:'这是一部电影'},
      {id :"2", name: "b", score:"4.5",pic:2,description:'这是一部电影'},
      {id :"3", name: "c", score:"2.6",pic:3,description:'这是一部电影'},
      {id :"4", name: "d", score:"3.2",pic:4,description:'这是一部电影'},
      {id :"5", name: "e", score:"8.7",pic:5,description:'这是一部电影'},
      {id :"6", name: "f", score:"6.8",pic:6,description:'这是一部电影'},
      {id :"7", name: "g", score:"9.0",pic:7,description:'这是一部电影'},
      {id :"8", name: "h", score:"4.6",pic:8,description:'这是一部电影'},
      {id :"9", name: "i", score:"10.0",pic:9,description:'这是一部电影'},
      {id :"10", name: "j", score:"4.7",pic:10,description:'这是一部电影'},
        {id :"11", name: "k", score:"3.5",pic:5,description:'这是一部电影'},
        {id :"12", name: "l", score:"4.5",pic:2,description:'这是一部电影'},
        {id :"13", name: "m", score:"2.6",pic:3,description:'这是一部电影'},
        {id :"14", name: "n", score:"3.2",pic:4,description:'这是一部电影'},
        {id :"15", name: "o", score:"8.7",pic:5,description:'这是一部电影'},
    ])
    const total = movieList.length;
    let size = [2,3,4,5];
    let size1 = 4;
    let currentPage = 1;
    let movieViewType = "GRID";

    let genre = ref('All');
    let year = ref('All');
    let language = ref('All');
    const genres = reactive(
        ['All','Drama', 'Comedy', 'Thriller',
          'Romance', 'Action', 'Horror', 'Crime',
          'Documentary', 'Adventure', 'Science Fiction',
          'Family', 'Mystery','Fantasy',
          'Animation', 'Foreign', 'Music', 'History','War','Western','TV Movie']);
    const years = reactive(
        ['All','2020','2019', '2018', '2017', '2016',
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
      page: 1
    };

    return{
      movieList,
      total,
      size,
      size1,
      currentPage,
      movieViewType,

      genre,
      genres,
      year,
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
    changeListView(){
      console.log("111");
      //this.movieViewType = "LIST";

    },
    changeGridView(){
      console.log("222");
      this.movieViewType = "GRID";
    },
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
      const optionalParam = {};
      if(this.genre){
        optionalParam['genre'] = this.genre;

        //console.log("test",e.target);
      }
      if(this.year){
        optionalParam['year'] = this.year;
      }
      if(this.language){
        optionalParam['language'] = this.language;
      }
      if(this.sort_by_popularity){
        optionalParam['sort_by_popularity'] = this.sort_by_popularity;
      }
      if(this.sort_by_ratings){
        optionalParam['sort_by_ratings'] = this.sort_by_ratings;
      }
      if(this.sort_by_date){
        optionalParam['sort_by_date'] = this.sort_by_date;
      }
      optionalParam['page'] = this.currentPage;
      optionalParam['page_size'] = this.size1;
      const newParams = { ...this.defaultParams, ...optionalParam };
      console.log(newParams);
      movieRequest.getMoviesWithConditions(newParams)
          .then(()=>{
            //console.log("success!!!" + response);
            //     this.movieList = response.data;

          })
          .catch((error) => {
            console.error('Error adding comment:', error);
          });

    }
  }
}
</script>