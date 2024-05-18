<template>
  <div class="movie-tags">
    <div class="type">
      <span>类型</span>
      <el-radio-group class="type-button"
                      v-for="(t, index) in genres"
                      :key="index"
                      v-model="genre">
        <el-radio-button  :label= t />
      </el-radio-group>

    </div>
    <div class="year">
      <span>年份</span>
      <el-radio-group class="type-button"
                      v-for="(t, index) in years"
                      :key="index"
                      v-model="year">
        <el-radio-button  :label= t />
      </el-radio-group>
    </div>

  </div>

</template>

<style scoped>

.movie-tags{
  width: 80%;
  height: 40%;
  margin: 20px auto 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color:white ;
  display: flex;
  flex-direction: column;

  //position: fixed;
  //left: calc(50% - 40%);
  //top:15%;
  //z-index: 999;

}
span{
  //padding-top: 5px;
  font-size: 20px;
}
.type,.year{
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 10px;

}

.type-button /deep/ .el-radio-button__inner{
  border: none;
}
.type-button /deep/ .el-radio-button__inner:hover{
  background-color: #90d6ff;
  color: black;
}



</style>
<script>
import {reactive, ref} from "vue";

export default {
  name: "MovieTags",
  setup() {
    let genre = ref('全部类型');
    let year = ref('全部年份');
    const genres = reactive(
        ['全部类型','动作', '喜剧', '爱情', '科幻',
                '动画', '悬疑', '惊悚', '恐怖',
                '犯罪', '音乐', '歌舞',
                '传记', '历史', '战争', '西部',
                '奇幻', '冒险', '灾难', '武侠']);
    const years = reactive(
        ['全部年份','2024','2023', '2022', '2021', '2020',
                '2019', '2018', '2017', '2016',
                '2015', '2014', '2013', '2012',
                '2011', '2010', '00年代', '90年代',
               '80年代', '70年代', '60年代', '更早']);



    return {
      genre,
      genres,
      year,
      years
    }

  }

}
</script>