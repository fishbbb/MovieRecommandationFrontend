<template>
  <el-container>
    <el-aside>
      <main-side/>
    </el-aside>

    <el-main class="content" style="padding: 0">
      <router-view/>
    </el-main>

    <el-footer class="footer" style="padding: 0">
      <main-footer/>
    </el-footer>

  </el-container>
</template>

<script>
import MainFooter from "@/components/layout/MainFooter.vue"
import MainSide from "@/components/admin/MainSider.vue";

export default {
  name: "IndexView",
  components: {MainFooter,MainSide},
}
</script>

<style scoped>
/* 让header吸顶 */
.header {
  position: sticky;
  /* 必须设一个值，否则不生效 */
  top: 0;
}

/* 让footer保持在最下方 */
.content {
  min-height: calc(100vh - 105px);
}

.footer {
  height: 54px;
}

@media screen and (max-width: 450px) {
  .footer {
    height: 73px;
  }
}
</style>