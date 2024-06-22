<template>
  <div class="master">
    <movie-info  v-on:tranMovie = 'showMsgfromChild'/>

    <div class="list-and-comments my-border">
      <movie-list v-if="movies.length" class="list" :tag="tag" :movies="movies" :opt="0"/>
    </div>
    <div class="comments-container">
      <movie-comments :mid="mid" style="margin-top: 1.5rem;"></movie-comments>
    </div>
  </div>
</template>

<script>
import MovieInfo from "@/components/movie/MovieInfo";
import MovieComments from "@/components/movie/MovieComments";
import MovieList from "@/components/home/MovieList";
import {reactive, ref} from "vue";
import movieRequest from "@/api/movie";
import {useRouter} from "vue-router";
// import {ErrorMessage} from "@/utils/my-message";
// import {Edit} from "@element-plus/icons";
// import CommentStrip from "@/components/basic/CommentStrip";

export default {
  name: 'MovieInfoView',
  // components: {CommentStrip, Edit, MovieInfo, MovieComments, MovieList},
  components: { MovieInfo, MovieList,MovieComments},
  setup() {
    const router = useRouter()

    // let tag = ref('喜欢这部电影的人也喜欢')
    // let movies = reactive([])
    // let mid = ref(router.currentRoute.value.params.id)
    let tag = ref('喜欢这部电影的人也喜欢');
    let movies = ref([]);

    let mid = ref(router.currentRoute.value.params.id);
    let movie = ref(null)
    let title = ref(null)
    const showMsgfromChild = (movieFromChild) => {
      console.log('Received movie from child:', movieFromChild);
      movie.value = movieFromChild; // Ensure you use .value to update a ref
      title.value = movieFromChild.title; // Set title to the value of movie's title field

      // Assuming movieRequest.searchSuggestions requires title as an argument
      movieRequest.searchSuggestions(movieFromChild.title).then(res => {
        movies.value = res.data
        console.log(res.data);
      });
    };
    return {
      tag,
      movies,
      mid,
      movie,
      showMsgfromChild,
      title
    }
  },
}
</script>

<style lang="less" scoped>
.list-and-comments {
  margin: 2rem 20%;

  .list {
    margin-left: 2rem;
    margin-right: 2rem;
  }
}

/deep/ .el-dialog {
  width: 40%
}
.comments-container{
  padding: 1rem;
  margin: 1rem 10% 1rem 10%;
}
/* 响应式布局 - 当屏幕小于 1200 像素宽 */
@media screen and (max-width: 1200px) {
  .list-and-comments {
    margin-left: 5%;
    margin-right: 5%;
  }

  /deep/ .el-dialog {
    width: 60%
  }
}

/* 响应式布局 - 当屏幕 小于 800像素 宽 */
@media screen and (max-width: 800px) {
  .list-and-comments {
    margin-left: 0;
    margin-right: 0;
  }

  /deep/ .el-dialog {
    width: 80%
  }
}
</style>
