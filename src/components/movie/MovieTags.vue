<!--<template>-->
<!--&lt;!&ndash;  <div class="movie-tags">&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="type">&ndash;&gt;-->
<!--&lt;!&ndash;      <span>电影类型</span>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="button">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-radio-group class="type-button"&ndash;&gt;-->
<!--&lt;!&ndash;                        v-for="(t, index) in genres"&ndash;&gt;-->
<!--&lt;!&ndash;                        :key="index"&ndash;&gt;-->
<!--&lt;!&ndash;                        v-model="genre"&ndash;&gt;-->
<!--&lt;!&ndash;                        @change="getMovieWithConditions()">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-radio-button  :label= t />&ndash;&gt;-->
<!--&lt;!&ndash;        </el-radio-group>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="year">&ndash;&gt;-->
<!--&lt;!&ndash;      <span>电影年份</span>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="button">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-radio-group class="type-button"&ndash;&gt;-->
<!--&lt;!&ndash;                        v-for="(t, index) in years"&ndash;&gt;-->
<!--&lt;!&ndash;                        :key="index"&ndash;&gt;-->
<!--&lt;!&ndash;                        v-model="year"&ndash;&gt;-->
<!--&lt;!&ndash;                        @change="getMovieWithConditions()">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-radio-button  :label= t />&ndash;&gt;-->
<!--&lt;!&ndash;        </el-radio-group>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->

<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="language">&ndash;&gt;-->
<!--&lt;!&ndash;      <span>电影语言</span>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="button1">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-radio-group class="type-button"&ndash;&gt;-->
<!--&lt;!&ndash;                        v-for="(item,index) in languages"&ndash;&gt;-->
<!--&lt;!&ndash;                        :key="index"&ndash;&gt;-->
<!--&lt;!&ndash;                        v-model="language"&ndash;&gt;-->
<!--&lt;!&ndash;                        @change="getMovieWithConditions()">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-radio-button :label="item"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-radio-group>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->

<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->

<!--</template>-->

<!--<style scoped>-->

<!--/*.movie-tags{*/-->
<!--/*  width: 80%;*/-->
<!--/*  margin: 20px auto 20px;*/-->
<!--/*  padding: 10px;*/-->
<!--/*  border: 1px solid #ccc;*/-->
<!--/*  border-radius: 10px;*/-->
<!--/*  background-color:white ;*/-->
<!--/*  display: flex;*/-->
<!--/*  flex-direction: column;*/-->

<!--/*  //position: fixed;*/-->
<!--/*  //left: calc(50% - 40%);*/-->
<!--/*  //top:15%;*/-->
<!--/*  //z-index: 999;*/-->

<!--/*}*/-->
<!--/*.type,*/-->
<!--/*.year,*/-->
<!--/*.language{*/-->
<!--/*  display: flex;*/-->

<!--/*}*/-->
<!--/*.year,*/-->
<!--/*.language{*/-->
<!--/*  margin-top: 30px;*/-->
<!--/*}*/-->
<!--/*span{*/-->
<!--/*  //padding-top: 5px;*/-->
<!--/*  font-size: 25px;*/-->
<!--/*  //padding-top: 5px;*/-->
<!--/*  text-align: center;*/-->
<!--/*  width: 250px;*/-->
<!--/*  color: #8cbee1;*/-->
<!--/*  //border: #ff9900 1px solid;*/-->
<!--/*}*/-->
<!--/*.button{*/-->
<!--/*  display: grid;*/-->
<!--/*  grid-template-columns: repeat(6, 150px);*/-->
<!--/*  grid-template-rows: repeat(3,30px);*/-->
<!--/*  grid-gap: 15px 30px;*/-->
<!--/*  margin-left: 10px;*/-->
<!--/*}*/-->
<!--/*.button1{*/-->
<!--/*  display: grid;*/-->
<!--/*  grid-template-columns: repeat(6, 150px);*/-->
<!--/*  grid-template-rows: repeat(2,30px);*/-->
<!--/*  grid-gap: 15px 30px;*/-->
<!--/*  margin-left: 10px;*/-->
<!--/*}*/-->

<!--/*.type-button{*/-->
<!--/*  margin-right: 50px;*/-->
<!--/*}*/-->
<!--/*.type-button /deep/ .el-radio-button__inner{*/-->
<!--/*  border: none;*/-->
<!--/*}*/-->
<!--/*.type-button /deep/ .el-radio-button__inner:hover{*/-->
<!--//  background-color: #90d6ff;-->
<!--//  color: black;-->
<!--//}-->



<!--</style>-->
<!--<script>-->
<!--import {reactive, ref} from "vue";-->
<!--import movieRequest from "@/api/movie";-->

<!--export default {-->
<!--  name: "MovieTags",-->
<!--  data() {-->
<!--    let genre = ref('All');-->
<!--    let year = ref('All');-->
<!--    let language = ref('All');-->
<!--    const genres = reactive(-->
<!--        ['All','Drama', 'Comedy', 'Thriller',-->
<!--                'Romance', 'Action', 'Horror', 'Crime',-->
<!--                'Documentary', 'Adventure', 'Science Fiction',-->
<!--                'Family', 'Mystery','Fantasy',-->
<!--                'Animation', 'Foreign', 'Music', 'History','War','Western','TV Movie']);-->
<!--    const years = reactive(-->
<!--        ['All','2020','2019', '2018', '2017', '2016',-->
<!--                '2015', '2014', '2013', '2012',-->
<!--                '2011', '2010', '00年代', '90年代',-->
<!--               '80年代', '70年代', '60年代', '更早']);-->
<!--    const languages = reactive(['All','Chinese','English','Japanese','Korean','Other'])-->
<!--    const defaultParams = {-->
<!--        userId: 1-->
<!--    };-->
<!--    return {-->
<!--      genre,-->
<!--      genres,-->
<!--      year,-->
<!--      years,-->
<!--      language,-->
<!--      languages,-->
<!--      defaultParams-->
<!--    }-->

<!--  },-->
<!--  methods:{-->
<!--    getMovieWithConditions(){-->
<!--      const optionalParam = {};-->
<!--      if(this.genre){-->
<!--        optionalParam['genre'] = this.genre;-->
<!--      }-->
<!--      if(this.year){-->
<!--        optionalParam['year'] = this.year;-->
<!--      }-->
<!--      if(this.language){-->
<!--        optionalParam['language'] = this.language;-->
<!--      }-->
<!--      const newParams = { ...this.defaultParams, ...optionalParam };-->
<!--      console.log(newParams);-->
<!--      movieRequest.getMoviesWithConditions(newParams)-->
<!--          .then(()=>{-->
<!--            //console.log("success!!!" + response);-->
<!--          })-->
<!--          .catch((error) => {-->
<!--            console.error('Error adding comment:', error);-->
<!--          });-->

<!--    }-->

<!--  }-->

<!--}-->
<!--</script>-->