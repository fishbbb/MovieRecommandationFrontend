<template>
  <div class="main-container">
   <p>欢迎页</p>
  </div>
</template>
<script>
export default {
  name:"AdminHome",
}
</script>

<style>

.flex-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  margin-left: 25%;
  margin-right: 25%;

}
.movie-list {
  padding: 1rem;
  margin: 1rem 5% 1rem 5%;
}

/* 响应式布局 - 当屏幕小于 1200 像素宽时，让两列堆叠而不是并排 */
@media screen and (max-width: 1200px) {
  .flex-container {
    margin-left: 5%;
    margin-right: 5%;
  }

  .movie-list {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>