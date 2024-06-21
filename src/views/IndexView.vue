<template>
  <el-container>
    <main-header class="header"/>

    <el-main class="content" style="padding: 0">
      <router-view/>
    </el-main>

    <el-footer class="footer" style="padding: 0">
      <main-footer/>
    </el-footer>

  </el-container>
</template>

<script>
import MainHeader from "../components/layout/MainHeader.vue"
import MainFooter from "../components/layout/MainFooter.vue"

export default {
  name: "IndexView",
  components: {MainHeader, MainFooter},
}
</script>

<style scoped>
/* 让header吸顶 */
.header {
  position: sticky;
  /* 必须设一个值，否则不生效 */
  width: 100%;
  top: 0;
  height:60px;
}

/* 让footer保持在最下方 */
.content {
  min-height: calc(100vh - 105px);
  margin-top: 0;
  background-color: rgba(0, 0, 0, 0.89);
}

.footer {
  height: 50px;
  width: 100%;
  bottom: 0;
  position: sticky;
  z-index: 8;
}

@media screen and (max-width: 450px) {
  .footer {
    height: 73px;
  }
}
</style>