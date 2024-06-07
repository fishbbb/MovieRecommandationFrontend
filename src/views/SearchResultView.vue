<template>
<div>
  <h1>|  搜索{{this.searchKeywords}}结果</h1>
  <movie-result v-for="movie in movieList" :key="movie.id" :movie="movie" />
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      :total="movieList.length"
      layout="total, sizes, prev, pager, next, jumper"
  >
  </el-pagination>
</div>
</template>

<script>
import movieRequest from "@/api/movie";
import {useRoute} from "vue-router";
import MovieResult from "@/components/movie/MovieResult.vue";
export default {
  name:'SearchResult',
  components:{MovieResult},
  data(){
    return{
      searchKeywords: null,
      searchResultList:[],//TODO:到时候换成这个
      movieList: [
        {
          id: 1,
          imageUrl: 'http://www.baidu.com/img/bdlogo.png',
          name: '电影名称1',
          starring: '主演1, 主演2',
          rating: 4.5
        },
        {
          id: 2,
          imageUrl: 'http://www.baidu.com/img/bdlogo.png',
          name: '电影名称2',
          starring: '主演3, 主演4',
          rating: 3.8
        },
        // 可继续添加更多电影数据
      ],
      pageSize: 10,
      currentPage: 1,
    }
  },
  created() {
    const route = useRoute(); // Use useRoute to get the current route
    this.searchKeywords = route.query.searchKeywords; // Access the id from the current route
    console.log(this.searchKeywords)
    this.fetchSearchResult()
  },
  methods:{
    fetchSearchResult(){
      movieRequest.search(this.searchKeywords,this.currentPage,this.pageSize).then(res => {
        console.log(res)
        this.searchResultList = res.data;
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 重置当前页数以显示新的评论
      this.fetchSearchResult();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.fetchSearchResult();
    },
  }
}
</script>

<style scoped>

</style>