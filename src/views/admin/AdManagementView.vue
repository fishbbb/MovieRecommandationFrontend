<template>
  <div>
    <el-button color="yellow" @click="addMovieToAd" type="primary" class="button-container" :icon="Plus">添加广告电影</el-button>
    <el-card class="card-container">
      <el-table :data="movies" style="width: 100%">
        <el-table-column prop="movieID" label="电影ID"></el-table-column>
        <el-table-column prop="movieName" label="电影ID"></el-table-column>
        <el-table-column prop="movieInfo" label="电影ID"></el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button @click="deleteMovieFromAd(row.movieID)" type="danger" size="default">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
        title="添加广告位电影"
        v-model="addIsVisible"
        @update:visible="addIsVisible = $event"
        :close-on-click-modal="false"
        :show-close="false"
    >
      <el-autocomplete
          v-model="searchKeywords"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入电影名"
          @select="handleSelect"
          class="long-input"
      >
      </el-autocomplete>
      <div class="dialog-footer">
        <el-button @click="addIsVisible = false">取消</el-button>
        <el-button type="primary" @click="add">添加</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import movieRequest from "@/api/movie";
import {Plus} from "@element-plus/icons";
import adminRequest from "@/api/admin";

export default {
  computed: {
    Plus() {
      return Plus
    }
  },
  data() {
    return {
      addIsVisible:false,
      searchKeywords:'',
      selectedMovie: '',
      movies: [
        { movieID: 1,movieName:'name1',movieInfo:'info1' },
        { movieID: 2,movieName:'name2',movieInfo:'info2'},
        { movieID: 3,movieName:'name3',movieInfo:'info3' }
      ]
    };
  },
  created() {
    this.getMoviesInAd();
  },
  methods: {
    addMovieToAd() {
      this.addIsVisible = true
    },
    deleteMovieFromAd(movieID) {
      console.log(movieID)
      adminRequest.deleteAdMovie(movieID).then(res=>{
        console.log(res);
        alert("删除成功")
      }).catch(err=>{
        console.log(err)
        alert("删除失败")
      })
    },
    getMoviesInAd() {
        movieRequest.getAdMovie().then(res => {
          this.movies = res.data
        }).catch(err=>{
          console.log(err)
        })
    },
    handleSelect(item){
      this.selectedMovie = item;
    },
    async querySearchAsync(queryString, cb){
      console.log(queryString)
      //movieRequest.searchSuggestions(queryString).then(res => {
        const result = [
          {"value": "123",},
          {"value": "234",},
          {"value": "345",},
          {"value": "456",}

        ]
       // console.log(res)
        //res.data.forEach((name, index) => {
          result.push({'value': name})
         // console.log(index)
       // })
        cb(result)
     //  }).catch(err => {
       // console.error(err)
     // })
    },
    add () {
      console.log('选中的电影:', this.selectedMovie);
      this.addIsVisible = false;
      adminRequest.addAdMovie(this.selectedMovie).then(res =>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }

  }
};
</script>

<style>
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.button-container{
  margin:10px
}
.card-container{
  margin: 10px;
}
</style>