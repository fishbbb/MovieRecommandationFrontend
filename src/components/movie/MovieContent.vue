<template>
<div class="movie-content">
  <div class="changeView">
    <el-button class="list-button view-button" text>
      <el-icon :size="30"><List/></el-icon>
    </el-button>
    <el-button class="grid-button view-button" text>
      <el-icon :size="30"><Grid/></el-icon>
    </el-button>
  </div>
  <div class="movie-view">
    <div class="movie-list">
      <template v-for="(item,index) in movieList" :key="index">
        <movie-card :movie="item"></movie-card>
      </template>
    </div>
    <div class="movie-pagination">
      <el-pagination background layout="sizes,prev,pager,next"
                     :total="total"
                     :page-sizes="size"
                     v-model:page-size="size1"
                     v-model:current-page="currentPage"
                     ></el-pagination>
    </div>
  </div>
  <el-backtop :right="100" />

</div>

</template>

<style scoped>
.movie-content{
  width: 80%;
  height: 100vh;
  //margin-top: 20px;
  margin: 20px auto 20px;
  border: #eaeaf6 2px solid;
  padding: 10px;
}
.changeView{
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  margin-top: 20px;
}
.movie-view{
  margin-left: 20px;
  margin-top: 40px;
  border: 2px solid black;
 }
.movie-list{
  width: 90%;
  height: 50%;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  border: #42b983 1px solid;
  gap: 30px;


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


import {Grid, List} from "@element-plus/icons-vue";
import MovieCard from "@/components/movie/MovieCard.vue";
import {reactive} from "vue";




export default {
  name:"MovieContent",
  components: {MovieCard, Grid, List},
  data() {
    const movieList = reactive([{id :"1", name: "a", score:"3.5"},
      {id :"2", name: "b", score:"4.5"},
      {id :"3", name: "c", score:"2.6"},
      {id :"4", name: "d", score:"3.2"},
      {id :"5", name: "e", score:"8.7"},
      {id :"6", name: "f", score:"6.8"},
      {id :"7", name: "g", score:"9.0"},
      {id :"8", name: "h", score:"4.6"},
      {id :"9", name: "i", score:"10.0"},
      {id :"10", name: "j", score:"4.7"},
        {id :"11", name: "k", score:"3.5"},
        {id :"12", name: "l", score:"4.5"},
        {id :"13", name: "m", score:"2.6"},
        {id :"14", name: "n", score:"3.2"},
        {id :"15", name: "o", score:"8.7"},
    ])
    const total = movieList.length;
    let size = [2,3,4,5];
    let size1 = 4;
    let currentPage = 1;

    return{
      movieList,
      total,
      size,
      size1,
      currentPage,
    }
  }

}
</script>